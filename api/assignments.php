<?php
/**
 * BiTS Connect - Assignments API
 */

switch ($method) {
    case 'GET':
        getAssignments($db);
        break;
    case 'POST':
        createAssignment($db);
        break;
    case 'PUT':
        updateAssignment($db, $segments[1]);
        break;
    case 'DELETE':
        deleteAssignment($db, $segments[1]);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getAssignments($db) {
    $userId = $_SESSION['user_id'] ?? null;
    $role = $_SESSION['user_role'] ?? 'student';
    
    if ($role === 'teacher') {
        // Teachers see assignments they created
        $stmt = $db->prepare("
            SELECT a.*, c.name as course_name, c.code as course_code,
                   COUNT(s.id) as submission_count
            FROM assignments a 
            LEFT JOIN courses c ON a.course_id = c.id 
            LEFT JOIN assignment_submissions s ON a.id = s.assignment_id
            WHERE a.teacher_id = ?
            GROUP BY a.id
            ORDER BY a.due_date ASC
        ");
        $stmt->execute([$userId]);
    } else {
        // Students see all published assignments
        $stmt = $db->prepare("
            SELECT a.*, c.name as course_name, c.code as course_code,
                   s.status as submission_status, s.score, s.submitted_at
            FROM assignments a 
            LEFT JOIN courses c ON a.course_id = c.id 
            LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.student_id = ?
            WHERE a.status = 'published'
            ORDER BY a.due_date ASC
        ");
        $stmt->execute([$userId]);
    }
    
    $assignments = $stmt->fetchAll();
    
    // Add status indicators
    foreach ($assignments as &$assignment) {
        $assignment['is_overdue'] = strtotime($assignment['due_date']) < time();
        $assignment['days_remaining'] = ceil((strtotime($assignment['due_date']) - time()) / 86400);
    }
    
    echo json_encode($assignments);
}

function createAssignment($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $courseId = $input['course_id'] ?? null;
    $dueDate = $input['due_date'] ?? null;
    $maxScore = $input['max_score'] ?? 100;
    $priority = $input['priority'] ?? 'medium';
    $teacherId = $_SESSION['user_id'] ?? null;
    
    if (empty($title) || empty($dueDate)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and due date required']);
        return;
    }
    
    $stmt = $db->prepare("
        INSERT INTO assignments (title, description, course_id, teacher_id, due_date, max_score, priority, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'published')
    ");
    
    $stmt->execute([$title, $description, $courseId, $teacherId, $dueDate, $maxScore, $priority]);
    
    $assignmentId = $db->lastInsertId();
    
    // Get the created assignment
    $stmt = $db->prepare("
        SELECT a.*, c.name as course_name, c.code as course_code
        FROM assignments a 
        LEFT JOIN courses c ON a.course_id = c.id 
        WHERE a.id = ?
    ");
    $stmt->execute([$assignmentId]);
    $assignment = $stmt->fetch();
    
    echo json_encode([
        'success' => true,
        'message' => 'Assignment created successfully',
        'assignment' => $assignment
    ]);
}

function updateAssignment($db, $id) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateFields = [];
    $params = [];
    
    if (isset($input['title'])) {
        $updateFields[] = "title = ?";
        $params[] = $input['title'];
    }
    if (isset($input['description'])) {
        $updateFields[] = "description = ?";
        $params[] = $input['description'];
    }
    if (isset($input['due_date'])) {
        $updateFields[] = "due_date = ?";
        $params[] = $input['due_date'];
    }
    if (isset($input['status'])) {
        $updateFields[] = "status = ?";
        $params[] = $input['status'];
    }
    
    $params[] = $id;
    
    $stmt = $db->prepare("UPDATE assignments SET " . implode(', ', $updateFields) . " WHERE id = ?");
    $stmt->execute($params);
    
    echo json_encode(['success' => true, 'message' => 'Assignment updated successfully']);
}

function deleteAssignment($db, $id) {
    $stmt = $db->prepare("DELETE FROM assignments WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true, 'message' => 'Assignment deleted successfully']);
}
?>
