<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Resource;
use App\Models\GpaEntry;
use App\Models\StudyLog;
use App\Models\Blog;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@bitsconnect.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'Administration',
            'email_verified_at' => now(),
        ]);

        // Create Sample Students
        $students = [
            [
                'name' => 'John Doe',
                'email' => 'john@student.com',
                'department' => 'Computer Science',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@student.com',
                'department' => 'Information Technology',
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike@student.com',
                'department' => 'Software Engineering',
            ],
        ];

        foreach ($students as $studentData) {
            $student = User::create([
                'name' => $studentData['name'],
                'email' => $studentData['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'department' => $studentData['department'],
                'email_verified_at' => now(),
                'last_activity' => now(),
            ]);

            // Create sample GPA entries
            $courses = [
                ['course' => 'Data Structures', 'grade' => 'A', 'credit_hours' => 3],
                ['course' => 'Algorithms', 'grade' => 'B+', 'credit_hours' => 3],
                ['course' => 'Database Systems', 'grade' => 'A-', 'credit_hours' => 4],
                ['course' => 'Web Development', 'grade' => 'A', 'credit_hours' => 3],
            ];

            foreach ($courses as $course) {
                GpaEntry::create([
                    'user_id' => $student->id,
                    'course' => $course['course'],
                    'grade' => $course['grade'],
                    'credit_hours' => $course['credit_hours'],
                    'semester' => 'Fall 2024',
                    'grade_points' => GpaEntry::getGradePoints($course['grade']),
                ]);
            }

            // Create sample study logs
            for ($i = 0; $i < 7; $i++) {
                StudyLog::create([
                    'user_id' => $student->id,
                    'date' => now()->subDays($i),
                    'hours' => rand(1, 8),
                    'subject' => ['Computer Science', 'Mathematics', 'Physics'][rand(0, 2)],
                ]);
            }
        }

        // Create sample resources
        $resources = [
            [
                'title' => 'Introduction to Algorithms',
                'description' => 'Comprehensive guide to algorithmic thinking',
                'category' => 'Computer Science',
                'type' => 'PDF',
                'file_path' => 'resources/sample.pdf',
                'file_size' => '2048000',
                'approved' => true,
            ],
            [
                'title' => 'Database Design Principles',
                'description' => 'Learn the fundamentals of database design',
                'category' => 'Computer Science',
                'type' => 'Video',
                'file_path' => 'resources/sample.mp4',
                'file_size' => '10485760',
                'approved' => true,
            ],
            [
                'title' => 'Linear Algebra Basics',
                'description' => 'Essential linear algebra concepts',
                'category' => 'Mathematics',
                'type' => 'PDF',
                'file_path' => 'resources/sample2.pdf',
                'file_size' => '1536000',
                'approved' => false,
            ],
        ];

        foreach ($resources as $index => $resourceData) {
            Resource::create(array_merge($resourceData, [
                'uploader_id' => User::where('role', 'student')->skip($index % 3)->first()->id,
                'downloads' => rand(10, 100),
                'views' => rand(50, 200),
                'rating' => rand(35, 50) / 10,
                'rating_count' => rand(5, 25),
            ]));
        }

        // Create sample blogs
        $blogs = [
            [
                'title' => 'The Future of Artificial Intelligence',
                'content' => 'Artificial Intelligence is revolutionizing the way we work and live...',
                'excerpt' => 'Exploring the latest trends in AI technology',
                'category' => 'Technology',
                'type' => 'internal',
                'published' => true,
                'published_at' => now(),
                'views' => rand(100, 500),
                'read_time' => 5,
            ],
            [
                'title' => 'Best Practices in Software Development',
                'content' => 'Writing clean, maintainable code is essential for any developer...',
                'excerpt' => 'Tips and tricks for better coding practices',
                'category' => 'Programming',
                'type' => 'internal',
                'published' => true,
                'published_at' => now()->subDays(2),
                'views' => rand(100, 500),
                'read_time' => 8,
            ],
        ];

        foreach ($blogs as $blogData) {
            Blog::create(array_merge($blogData, [
                'author_id' => User::where('role', 'admin')->first()->id,
            ]));
        }
    }
}
