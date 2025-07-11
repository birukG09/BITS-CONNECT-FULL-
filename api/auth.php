<?php
/**
 * BiTS Connect - Authentication API
 */

session_start();

switch ($method) {
    case 'POST':
        if ($segments[1] === 'login') {
            handleLogin($db);
        } elseif ($segments[1] === 'register') {
            handleRegister($db);
        } elseif ($segments[1] === 'logout') {
            handleLogout();
        }
        break;
    case 'GET':
        if ($segments[1] === 'user') {
            getCurrentUser();
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function handleLogin($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password required']);
        return;
    }

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Create session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_role'] = $user['role'];

        // Generate token
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        $stmt = $db->prepare("INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $token, $expires]);

        unset($user['password']); // Don't send password
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

function handleRegister($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $role = $input['role'] ?? 'student';
    $program = $input['program'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email and password required']);
        return;
    }

    // Check if user exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'User already exists']);
        return;
    }

    // Create user
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $studentId = $role === 'student' ? generateStudentId($db) : null;
    $teacherId = $role === 'teacher' ? generateTeacherId($db) : null;

    $stmt = $db->prepare("INSERT INTO users (name, email, password, role, program, student_id, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $role, $program, $studentId, $teacherId]);

    $userId = $db->lastInsertId();

    // Get created user
    $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    unset($user['password']);

    // Create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['role'];

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => $user
    ]);
}

function handleLogout() {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
}

function getCurrentUser() {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'id' => $_SESSION['user_id'],
            'email' => $_SESSION['user_email'],
            'role' => $_SESSION['user_role']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated']);
    }
}

function generateStudentId($db) {
    $year = date('y');
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND student_id LIKE ?");
    $stmt->execute(["%/$year"]);
    $count = $stmt->fetch()['count'] + 1;
    return sprintf("%04d/%s", $count, $year);
}

function generateTeacherId($db) {
    $year = date('y');
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND teacher_id LIKE ?");
    $stmt->execute(["%/$year"]);
    $count = $stmt->fetch()['count'] + 100;
    return sprintf("%04d/%s", $count, $year);
}
?>
