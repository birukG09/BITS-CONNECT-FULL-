BiTS Connect - Digital Learning Platform
Overview
BiTS Connect is a comprehensive digital learning platform designed for students, featuring:

Resource sharing and management

GPA tracking

Chat functionality .

External content integration (YouTube, Telegram, blogs)

Admin dashboard for content management

Features
Core Functionality
User Authentication: Secure login system with role-based access

Resource Management: Upload, download, and organize study materials

GPA Tracking: Semester-wise GPA calculation and tracking

Chat System: Real-time communication with study groups

Content Integration
Telegram Channels: Access educational content from popular Telegram channels

YouTube Videos: Curated programming tutorials from top YouTube channels

External Blogs: Aggregated tech blog posts from various sources

Admin Features
User management

Content moderation

System analytics

Resource approval system
Installation
Clone the repository:

bash
git clone https://github.com/abeni360/BITS-CONNECT-FULL-.git
Configure the database:

Create a MySQL database named bits_connect

Update config/config.php with your database credentials

Set up the web server:

Point your web server to the public directory

Ensure PHP 7.4+ is installed

Configure API keys:

Update YouTube API key in youtube.php

Set Telegram bot token in config.php

Usage
Admin Access
Access the admin dashboard at /dashboard.php (requires admin privileges)

API Endpoints
Authentication: /api/auth.php

Resources: /api/resources.php

GPA Tracking: /api/gpa.php

Chat: /api/chat.php

Dependencies
PHP 7.4+

MySQL 5.7+

Bootstrap 5

Chart.js

Font Awesome

Security Considerations
Always keep API keys secure

Regularly update dependencies

Set proper file permissions for uploads directory

Use HTTPS in production
