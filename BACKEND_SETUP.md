# BiTS Connect - Backend Setup Guide

## 🚀 Complete PHP/MySQL Backend Setup

### Prerequisites

- **PHP 7.4+** (recommended 8.0+)
- **MySQL 8.0+** or **MariaDB 10.4+**
- **Apache** or **Nginx** web server
- **Web server with PHP support** (XAMPP, WAMP, MAMP, or Linux server)

### Quick Setup

#### Option 1: Using XAMPP (Recommended for Development)

1. **Download and Install XAMPP**

   - Download from: https://www.apachefriends.org/
   - Install and start Apache + MySQL

2. **Copy Project Files**

   ```bash
   # Copy all project files to XAMPP htdocs folder
   cp -r * /opt/lampp/htdocs/bits-connect/
   # or on Windows: copy to C:\xampp\htdocs\bits-connect\
   ```

3. **Setup Database**

   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Import the database: `database/init.sql`
   - Or run the SQL commands manually

4. **Configure Database Connection**

   - Edit `config/database.php`
   - Update credentials if needed:

   ```php
   private $host = 'localhost';
   private $db_name = 'bits_connect';
   private $username = 'root';
   private $password = ''; // Usually empty for XAMPP
   ```

5. **Access the Application**
   - Frontend: http://localhost/bits-connect/
   - API: http://localhost/bits-connect/api/

#### Option 2: Production Server Setup

1. **Upload Files**

   ```bash
   # Upload all files to your web server
   # Make sure PHP and MySQL are available
   ```

2. **Create Database**

   ```sql
   -- Connect to MySQL
   mysql -u your_username -p

   -- Run the initialization script
   source database/init.sql;
   ```

3. **Configure Database**

   ```php
   // Edit config/database.php
   private $host = 'your_mysql_host';
   private $db_name = 'bits_connect';
   private $username = 'your_db_username';
   private $password = 'your_db_password';
   ```

4. **Set Permissions**
   ```bash
   chmod 755 api/
   chmod 644 api/*.php
   chmod 644 config/*.php
   ```

### Database Schema

The backend includes these tables:

- **users** - User accounts (students, teachers, admins)
- **courses** - Course information
- **assignments** - Assignment management
- **assignment_submissions** - Student submissions
- **grades** - Grade tracking
- **library_resources** - Digital library
- **study_groups** - Study group management
- **study_group_members** - Group memberships
- **messages** - Messaging system
- **blog_posts** - Blog platform
- **user_sessions** - Authentication sessions

### API Endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

#### Assignments

- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment
- `PUT /api/assignments/{id}` - Update assignment
- `DELETE /api/assignments/{id}` - Delete assignment

#### Library

- `GET /api/library` - List resources
- `GET /api/library/{id}` - Get specific resource
- `POST /api/library` - Upload resource
- `PUT /api/library/{id}` - Update resource

#### GPA

- `GET /api/gpa` - Get GPA data
- `GET /api/gpa/analytics` - Get analytics
- `POST /api/gpa/courses` - Add course grade
- `POST /api/gpa/goals` - Set GPA goal

#### Health Check

- `GET /api/ping` - Check if API is working

### Default User Accounts

After running the database setup, these accounts are available:

```
Student Account:
Email: student@bitscollege.edu.et
Password: password
Role: Student

Teacher Account:
Email: teacher@bitscollege.edu.et
Password: password
Role: Teacher

Admin Account:
Email: admin@bitscollege.edu.et
Password: password
Role: Admin
```

### Testing the Backend

1. **API Health Check**

   ```bash
   curl http://localhost/bits-connect/api/ping
   ```

2. **Test Login**

   ```bash
   curl -X POST http://localhost/bits-connect/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"student@bitscollege.edu.et","password":"password"}'
   ```

3. **Frontend Integration**
   - Open: http://localhost/bits-connect/
   - Try logging in with demo accounts
   - Check browser console for API responses

### Troubleshooting

#### Common Issues

1. **Database Connection Error**

   - Check MySQL is running
   - Verify credentials in `config/database.php`
   - Ensure database `bits_connect` exists

2. **Permission Denied**

   - Check file permissions
   - Ensure web server can read PHP files

3. **API Not Found (404)**

   - Check Apache mod_rewrite is enabled
   - Verify .htaccess file exists
   - Check server configuration

4. **CORS Issues**
   - Headers are already set in `api/index.php`
   - If still having issues, check server configuration

#### Debug Mode

Enable debug mode by adding to `config/database.php`:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Security Notes

For production deployment:

1. **Change Default Passwords**

   ```sql
   UPDATE users SET password = PASSWORD('new_secure_password') WHERE email = 'admin@bitscollege.edu.et';
   ```

2. **Update Database Credentials**

   - Use strong database passwords
   - Create dedicated database user

3. **Enable HTTPS**

   - Use SSL certificate
   - Update API URLs to use HTTPS

4. **Secure File Uploads**
   - Validate file types
   - Limit file sizes
   - Scan for malware

### Performance Optimization

1. **Database Indexing**

   ```sql
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_assignments_due_date ON assignments(due_date);
   CREATE INDEX idx_grades_student_id ON grades(student_id);
   ```

2. **PHP Optimization**

   - Enable OPcache
   - Use connection pooling
   - Cache frequently accessed data

3. **Web Server Optimization**
   - Enable gzip compression
   - Set appropriate cache headers
   - Use CDN for static assets

## ✅ Success!

Once setup is complete, you'll have a fully functional educational platform with:

- ✅ Real user authentication
- ✅ Working assignment management
- ✅ Functional GPA tracking
- ✅ Digital library with database storage
- ✅ Study group management
- ✅ Messaging system
- ✅ Blog platform
- ✅ Admin dashboard

The frontend will automatically detect the backend and switch from demo mode to real functionality! 🎉
