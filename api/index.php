<?php
/**
 * BiTS Connect - Main API Endpoint
 * Educational Platform Backend API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

// Initialize database
$database = new Database();
$db = $database->getConnection();

// Create tables if they don't exist
try {
    $database->createTables();
    $database->seedSampleData();
} catch (Exception $e) {
    error_log("Database initialization error: " . $e->getMessage());
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);
$segments = explode('/', trim($path, '/'));

// Route the request
try {
    switch ($segments[0]) {
        case 'auth':
            require_once 'auth.php';
            break;
        case 'users':
            require_once 'users.php';
            break;
        case 'courses':
            require_once 'courses.php';
            break;
        case 'assignments':
            require_once 'assignments.php';
            break;
        case 'library':
            require_once 'library.php';
            break;
        case 'groups':
            require_once 'groups.php';
            break;
        case 'messages':
            require_once 'messages.php';
            break;
        case 'blog':
            require_once 'blog.php';
            break;
        case 'gpa':
            require_once 'gpa.php';
            break;
        case 'ping':
            echo json_encode([
                'message' => 'BiTS Connect API is working!',
                'timestamp' => date('Y-m-d H:i:s'),
                'status' => 'healthy'
            ]);
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
