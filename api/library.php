<?php
/**
 * BiTS Connect - Library API
 */

switch ($method) {
    case 'GET':
        if (isset($segments[1]) && is_numeric($segments[1])) {
            getResource($db, $segments[1]);
        } else {
            getResources($db);
        }
        break;
    case 'POST':
        createResource($db);
        break;
    case 'PUT':
        updateResource($db, $segments[1]);
        break;
    case 'DELETE':
        deleteResource($db, $segments[1]);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getResources($db) {
    $category = $_GET['category'] ?? '';
    $subject = $_GET['subject'] ?? '';
    $search = $_GET['search'] ?? '';
    
    $sql = "SELECT l.*, u.name as uploaded_by_name FROM library_resources l 
            LEFT JOIN users u ON l.uploaded_by = u.id 
            WHERE l.status = 'active'";
    $params = [];
    
    if ($category) {
        $sql .= " AND l.category = ?";
        $params[] = $category;
    }
    
    if ($subject) {
        $sql .= " AND l.subject = ?";
        $params[] = $subject;
    }
    
    if ($search) {
        $sql .= " AND (l.title LIKE ? OR l.author LIKE ? OR l.description LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }
    
    $sql .= " ORDER BY l.created_at DESC";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $resources = $stmt->fetchAll();
    
    echo json_encode($resources);
}

function getResource($db, $id) {
    $stmt = $db->prepare("
        SELECT l.*, u.name as uploaded_by_name 
        FROM library_resources l 
        LEFT JOIN users u ON l.uploaded_by = u.id 
        WHERE l.id = ? AND l.status = 'active'
    ");
    $stmt->execute([$id]);
    $resource = $stmt->fetch();
    
    if (!$resource) {
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
        return;
    }
    
    // Increment download count
    $stmt = $db->prepare("UPDATE library_resources SET downloads = downloads + 1 WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode($resource);
}

function createResource($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $title = $input['title'] ?? '';
    $author = $input['author'] ?? '';
    $type = $input['type'] ?? '';
    $category = $input['category'] ?? '';
    $subject = $input['subject'] ?? '';
    $description = $input['description'] ?? '';
    $uploadedBy = $_SESSION['user_id'] ?? null;
    
    if (empty($title) || empty($type)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and type required']);
        return;
    }
    
    $stmt = $db->prepare("
        INSERT INTO library_resources (title, author, type, category, subject, description, uploaded_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([$title, $author, $type, $category, $subject, $description, $uploadedBy]);
    
    $resourceId = $db->lastInsertId();
    
    // Get the created resource
    $stmt = $db->prepare("
        SELECT l.*, u.name as uploaded_by_name 
        FROM library_resources l 
        LEFT JOIN users u ON l.uploaded_by = u.id 
        WHERE l.id = ?
    ");
    $stmt->execute([$resourceId]);
    $resource = $stmt->fetch();
    
    echo json_encode([
        'success' => true,
        'message' => 'Resource created successfully',
        'resource' => $resource
    ]);
}

function updateResource($db, $id) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateFields = [];
    $params = [];
    
    if (isset($input['title'])) {
        $updateFields[] = "title = ?";
        $params[] = $input['title'];
    }
    if (isset($input['author'])) {
        $updateFields[] = "author = ?";
        $params[] = $input['author'];
    }
    if (isset($input['description'])) {
        $updateFields[] = "description = ?";
        $params[] = $input['description'];
    }
    if (isset($input['rating'])) {
        $updateFields[] = "rating = ?";
        $params[] = $input['rating'];
    }
    
    $params[] = $id;
    
    $stmt = $db->prepare("UPDATE library_resources SET " . implode(', ', $updateFields) . " WHERE id = ?");
    $stmt->execute($params);
    
    echo json_encode(['success' => true, 'message' => 'Resource updated successfully']);
}

function deleteResource($db, $id) {
    $stmt = $db->prepare("UPDATE library_resources SET status = 'inactive' WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true, 'message' => 'Resource deleted successfully']);
}
?>
