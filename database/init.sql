-- BiTS Connect Database Initialization
-- Run this script to create the database and sample data

CREATE DATABASE IF NOT EXISTS bits_connect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bits_connect;

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
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
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
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
);

-- Assignment submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
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
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
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
);

-- Library resources table
CREATE TABLE IF NOT EXISTS library_resources (
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
);

-- Study groups table
CREATE TABLE IF NOT EXISTS study_groups (
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
);

-- Study group members table
CREATE TABLE IF NOT EXISTS study_group_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    user_id INT,
    role ENUM('member', 'moderator') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES study_groups(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_membership (group_id, user_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
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
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
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
);

-- Sessions table for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) UNIQUE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample users
INSERT IGNORE INTO users (name, email, password, role, program, student_id, teacher_id) VALUES
('Hirut Getachew', 'student@bitscollege.edu.et', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', 'software_engineering', '0998/24', NULL),
('Alemayehu Worku', 'teacher@bitscollege.edu.et', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', NULL, NULL, '0184/24'),
('Biruk Gebre', 'admin@bitscollege.edu.et', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NULL, NULL, '0113/24'),
('Dawit Bekele', 'dawit.bekele@student.bitscollege.edu.et', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', 'it_systems', '0999/24', NULL),
('Selamawit Abebe', 'selamawit.abebe@bitscollege.edu.et', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', NULL, NULL, '0185/24');

-- Insert sample courses
INSERT IGNORE INTO courses (code, name, description, credits, teacher_id, program, semester, year) VALUES
('SE-401', 'Software Engineering Principles', 'Advanced software engineering concepts and practices', 3, 2, 'software_engineering', 1, 2024),
('DB-301', 'Database Systems', 'Database design and management fundamentals', 4, 2, 'software_engineering', 1, 2024),
('NET-201', 'Computer Networks', 'Network protocols and system administration', 3, 5, 'it_systems', 1, 2024),
('ALG-301', 'Algorithms and Data Structures', 'Advanced algorithms and data structure concepts', 4, 2, 'software_engineering', 2, 2024);

-- Insert sample assignments
INSERT IGNORE INTO assignments (title, description, course_id, teacher_id, due_date, max_score, priority, status) VALUES
('Design Patterns Project', 'Implement various design patterns in a software project', 1, 2, '2024-12-25 23:59:59', 100, 'high', 'published'),
('Database Normalization Exercise', 'Normalize a given database schema to 3NF', 2, 2, '2024-12-20 23:59:59', 100, 'medium', 'published'),
('Network Configuration Lab', 'Configure a small office network', 3, 5, '2024-12-22 23:59:59', 100, 'medium', 'published');

-- Insert sample library resources
INSERT IGNORE INTO library_resources (title, author, type, category, subject, description, uploaded_by, downloads, rating) VALUES
('Introduction to Software Engineering', 'Dr. Alemayehu Worku', 'pdf', 'textbooks', 'software-engineering', 'Comprehensive guide to software engineering principles', 2, 245, 4.5),
('Database Design Fundamentals', 'Prof. Hirut Getachew', 'epub', 'textbooks', 'database-systems', 'Complete textbook on database design and management', 2, 189, 4.3),
('Advanced Algorithms Guide', 'Dr. Dawit Bekele', 'pdf', 'textbooks', 'algorithms', 'In-depth coverage of advanced algorithms and data structures', 2, 178, 4.6);

-- Insert sample grades
INSERT IGNORE INTO grades (student_id, course_id, grade, letter_grade, gpa_points, semester, year) VALUES
(1, 1, 87, 'B+', 3.3, 1, 2024),
(1, 2, 92, 'A-', 3.7, 1, 2024),
(4, 3, 89, 'B+', 3.3, 1, 2024);

-- Insert sample study groups
INSERT IGNORE INTO study_groups (name, description, subject, max_members, meeting_day, meeting_time, meeting_type, location, owner_id) VALUES
('Advanced Algorithms Study Group', 'Weekly discussions on complex algorithms and problem-solving techniques', 'software-engineering', 8, 'wednesday', '19:00:00', 'online', 'Zoom', 1),
('Database Design Workshop', 'Collaborative learning for database design and optimization', 'database-systems', 6, 'friday', '18:30:00', 'offline', 'Room 201', 4);

-- Insert sample blog posts
INSERT IGNORE INTO blog_posts (title, content, excerpt, author_id, category, featured, status, views, likes, published_at) VALUES
('Welcome to BITS College', 'Welcome to our educational platform...', 'Introduction to BITS College educational platform', 2, 'announcement', TRUE, 'published', 156, 23, NOW()),
('Study Tips for Software Engineering', 'Here are some effective study strategies...', 'Proven study techniques for software engineering students', 1, 'study-tips', FALSE, 'published', 89, 12, NOW());
