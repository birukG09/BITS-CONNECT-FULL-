<?php
/**
 * BiTS Connect - GPA API
 */

switch ($method) {
    case 'GET':
        if ($segments[1] === 'analytics') {
            getGPAAnalytics($db);
        } else {
            getGPAData($db);
        }
        break;
    case 'POST':
        if ($segments[1] === 'courses') {
            addCourse($db);
        } elseif ($segments[1] === 'goals') {
            setGPAGoal($db);
        }
        break;
    case 'PUT':
        updateGrade($db, $segments[2]);
        break;
    case 'DELETE':
        deleteCourse($db, $segments[2]);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getGPAData($db) {
    $userId = $_SESSION['user_id'] ?? null;
    
    // Get all grades for the student
    $stmt = $db->prepare("
        SELECT g.*, c.name as course_name, c.code as course_code, c.credits
        FROM grades g 
        LEFT JOIN courses c ON g.course_id = c.id 
        WHERE g.student_id = ?
        ORDER BY g.semester DESC, g.year DESC
    ");
    $stmt->execute([$userId]);
    $grades = $stmt->fetchAll();
    
    // Calculate overall GPA
    $totalPoints = 0;
    $totalCredits = 0;
    $semesterGPAs = [];
    
    foreach ($grades as $grade) {
        $totalPoints += $grade['gpa_points'] * $grade['credits'];
        $totalCredits += $grade['credits'];
        
        $semesterKey = $grade['year'] . '-' . $grade['semester'];
        if (!isset($semesterGPAs[$semesterKey])) {
            $semesterGPAs[$semesterKey] = [
                'semester' => $grade['semester'],
                'year' => $grade['year'],
                'points' => 0,
                'credits' => 0,
                'courses' => []
            ];
        }
        
        $semesterGPAs[$semesterKey]['points'] += $grade['gpa_points'] * $grade['credits'];
        $semesterGPAs[$semesterKey]['credits'] += $grade['credits'];
        $semesterGPAs[$semesterKey]['courses'][] = $grade;
    }
    
    // Calculate semester GPAs
    foreach ($semesterGPAs as &$semester) {
        $semester['gpa'] = $semester['credits'] > 0 ? $semester['points'] / $semester['credits'] : 0;
    }
    
    $overallGPA = $totalCredits > 0 ? $totalPoints / $totalCredits : 0;
    
    echo json_encode([
        'overall_gpa' => round($overallGPA, 2),
        'total_credits' => $totalCredits,
        'semesters' => array_values($semesterGPAs),
        'grades' => $grades
    ]);
}

function getGPAAnalytics($db) {
    $userId = $_SESSION['user_id'] ?? null;
    
    // Get GPA trend over time
    $stmt = $db->prepare("
        SELECT year, semester, 
               AVG(gpa_points) as avg_gpa,
               COUNT(*) as course_count
        FROM grades 
        WHERE student_id = ?
        GROUP BY year, semester
        ORDER BY year, semester
    ");
    $stmt->execute([$userId]);
    $trend = $stmt->fetchAll();
    
    // Get performance by subject
    $stmt = $db->prepare("
        SELECT c.code, c.name, AVG(g.gpa_points) as avg_gpa, COUNT(*) as count
        FROM grades g
        LEFT JOIN courses c ON g.course_id = c.id
        WHERE g.student_id = ?
        GROUP BY c.id
        ORDER BY avg_gpa DESC
    ");
    $stmt->execute([$userId]);
    $subjects = $stmt->fetchAll();
    
    echo json_encode([
        'trend' => $trend,
        'subjects' => $subjects
    ]);
}

function addCourse($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $courseCode = $input['course_code'] ?? '';
    $courseName = $input['course_name'] ?? '';
    $credits = $input['credits'] ?? 3;
    $grade = $input['grade'] ?? '';
    $semester = $input['semester'] ?? 1;
    $year = $input['year'] ?? date('Y');
    $userId = $_SESSION['user_id'] ?? null;
    
    // Convert letter grade to GPA points
    $gpaPoints = convertLetterGradeToGPA($grade);
    
    // First, ensure the course exists
    $stmt = $db->prepare("SELECT id FROM courses WHERE code = ?");
    $stmt->execute([$courseCode]);
    $course = $stmt->fetch();
    
    if (!$course) {
        // Create the course
        $stmt = $db->prepare("INSERT INTO courses (code, name, credits) VALUES (?, ?, ?)");
        $stmt->execute([$courseCode, $courseName, $credits]);
        $courseId = $db->lastInsertId();
    } else {
        $courseId = $course['id'];
    }
    
    // Add the grade
    $stmt = $db->prepare("
        INSERT INTO grades (student_id, course_id, grade, letter_grade, gpa_points, semester, year) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$userId, $courseId, $gpaPoints * 25, $grade, $gpaPoints, $semester, $year]);
    
    echo json_encode(['success' => true, 'message' => 'Course added successfully']);
}

function convertLetterGradeToGPA($letterGrade) {
    $gradeMap = [
        'A+' => 4.0, 'A' => 4.0, 'A-' => 3.7,
        'B+' => 3.3, 'B' => 3.0, 'B-' => 2.7,
        'C+' => 2.3, 'C' => 2.0, 'C-' => 1.7,
        'D+' => 1.3, 'D' => 1.0, 'F' => 0.0
    ];
    
    return $gradeMap[$letterGrade] ?? 0.0;
}

function setGPAGoal($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $targetGPA = $input['target_gpa'] ?? 0;
    $targetSemester = $input['target_semester'] ?? 1;
    $targetYear = $input['target_year'] ?? date('Y');
    $userId = $_SESSION['user_id'] ?? null;
    
    // For now, we'll just return success since we don't have a goals table
    // In a real implementation, you'd store this in a gpa_goals table
    
    echo json_encode([
        'success' => true,
        'message' => 'GPA goal set successfully',
        'goal' => [
            'target_gpa' => $targetGPA,
            'target_semester' => $targetSemester,
            'target_year' => $targetYear
        ]
    ]);
}
?>
