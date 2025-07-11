<?php
/**
 * BiTS Connect - Database Configuration
 * Educational Platform Backend
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'bits_connect';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                ]
            );
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw new Exception("Database connection failed");
        }

        return $this->conn;
    }

    public function createTables() {
        $queries = [
            // Users table
            "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
                program VARCHAR(100),
                student_id VARCHAR(20),
                teacher_id VARCHAR(20),
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",

            // Courses table
            "CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                code VARCHAR(20) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                credits INT DEFAULT 3,
                teacher_id INT,
                program VARCHAR(100),
                semester INT,
                year INT,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (teacher_id) REFERENCES users(id)
            )",

            // Assignments table
            "CREATE TABLE IF NOT EXISTS assignments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                course_id INT,
                teacher_id INT,
                due_date DATETIME,
                max_score INT DEFAULT 100,
                priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
                status ENUM('draft', 'published', 'closed') DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id),
                FOREIGN KEY (teacher_id) REFERENCES users(id)
            )",

            // Assignment submissions table
            "CREATE TABLE IF NOT EXISTS assignment_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                assignment_id INT,
                student_id INT,
                content TEXT,
                file_path VARCHAR(500),
                score INT,
                feedback TEXT,
                status ENUM('submitted', 'graded', 'late') DEFAULT 'submitted',
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                graded_at TIMESTAMP NULL,
                FOREIGN KEY (assignment_id) REFERENCES assignments(id),
                FOREIGN KEY (student_id) REFERENCES users(id)
            )",

            // Grades table
            "CREATE TABLE IF NOT EXISTS grades (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT,
                course_id INT,
                assignment_id INT NULL,
                grade DECIMAL(5,2),
                letter_grade VARCHAR(2),
                gpa_points DECIMAL(3,2),
                semester INT,
                year INT,
                type ENUM('assignment', 'midterm', 'final', 'project') DEFAULT 'assignment',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES users(id),
                FOREIGN KEY (course_id) REFERENCES courses(id),
                FOREIGN KEY (assignment_id) REFERENCES assignments(id)
            )",

            // Library resources table
            "CREATE TABLE IF NOT EXISTS library_resources (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255),
                type ENUM('pdf', 'epub', 'video', 'audio') NOT NULL,
                category VARCHAR(100),
                subject VARCHAR(100),
                description TEXT,
                file_path VARCHAR(500),
                file_size BIGINT,
                uploaded_by INT,
                downloads INT DEFAULT 0,
                rating DECIMAL(2,1) DEFAULT 0,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (uploaded_by) REFERENCES users(id)
            )",

            // Study groups table
            "CREATE TABLE IF NOT EXISTS study_groups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                subject VARCHAR(100),
                max_members INT DEFAULT 10,
                meeting_day ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
                meeting_time TIME,
                meeting_type ENUM('online', 'offline') DEFAULT 'online',
                location VARCHAR(255),
                owner_id INT,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (owner_id) REFERENCES users(id)
            )",

            // Study group members table
            "CREATE TABLE IF NOT EXISTS study_group_members (
                id INT AUTO_INCREMENT PRIMARY KEY,
                group_id INT,
                user_id INT,
                role ENUM('member', 'moderator') DEFAULT 'member',
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (group_id) REFERENCES study_groups(id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE KEY unique_membership (group_id, user_id)
            )",

            // Messages table
            "CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                sender_id INT,
                recipient_id INT,
                group_id INT NULL,
                subject VARCHAR(255),
                content TEXT,
                is_read BOOLEAN DEFAULT FALSE,
                message_type ENUM('direct', 'group') DEFAULT 'direct',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sender_id) REFERENCES users(id),
                FOREIGN KEY (recipient_id) REFERENCES users(id),
                FOREIGN KEY (group_id) REFERENCES study_groups(id)
            )",

            // Blog posts table
            "CREATE TABLE IF NOT EXISTS blog_posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content LONGTEXT,
                excerpt TEXT,
                author_id INT,
                category VARCHAR(100),
                tags JSON,
                featured BOOLEAN DEFAULT FALSE,
                status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
                views INT DEFAULT 0,
                likes INT DEFAULT 0,
                published_at TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(id)
            )",

            // Sessions table for authentication
            "CREATE TABLE IF NOT EXISTS user_sessions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                token VARCHAR(255) UNIQUE,
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )"
        ];

        foreach ($queries as $query) {
            $this->conn->exec($query);
        }
    }

    public function seedSampleData() {
        // Insert sample users
        $users = [
            ['Hirut Getachew', 'hirut.getachew@bitscollege.edu.et', password_hash('password', PASSWORD_DEFAULT), 'student', 'software_engineering', '0998/24', null],
            ['Alemayehu Worku', 'alemayehu.worku@bitscollege.edu.et', password_hash('password', PASSWORD_DEFAULT), 'teacher', null, null, '0184/24'],
            ['Biruk Gebre', 'admin@bitscollege.edu.et', password_hash('password', PASSWORD_DEFAULT), 'admin', null, null, '0113/24'],
            ['Dawit Bekele', 'dawit.bekele@student.bitscollege.edu.et', password_hash('password', PASSWORD_DEFAULT), 'student', 'it_systems', '0999/24', null],
            ['Selamawit Abebe', 'selamawit.abebe@bitscollege.edu.et', password_hash('password', PASSWORD_DEFAULT), 'teacher', null, null, '0185/24']
        ];

        $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, role, program, student_id, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($users as $user) {
            try {
                $stmt->execute($user);
            } catch (PDOException $e) {
                // User might already exist
                continue;
            }
        }

        // Insert sample courses
        $courses = [
            ['SE-401', 'Software Engineering Principles', 'Advanced software engineering concepts and practices', 3, 2, 'software_engineering', 1, 2024],
            ['DB-301', 'Database Systems', 'Database design and management fundamentals', 4, 2, 'software_engineering', 1, 2024],
            ['NET-201', 'Computer Networks', 'Network protocols and system administration', 3, 5, 'it_systems', 1, 2024]
        ];

        $stmt = $this->conn->prepare("INSERT INTO courses (code, name, description, credits, teacher_id, program, semester, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($courses as $course) {
            try {
                $stmt->execute($course);
            } catch (PDOException $e) {
                continue;
            }
        }
    }
}
