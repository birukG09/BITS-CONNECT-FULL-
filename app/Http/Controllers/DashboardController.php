<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Resource;
use App\Models\Blog;
use App\Models\StudyLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function studentDashboard()
    {
        $user = Auth::user();
        
        // Calculate current GPA
        $currentGpa = $user->calculateCurrentGpa();
        
        // Get weekly study hours
        $weeklyStudyHours = $user->getWeeklyStudyHours();
        
        // Get file upload count
        $fileUploadCount = $user->resources()->count();
        
        // Calculate study streak
        $studyStreak = $this->calculateStudyStreak($user);
        
        // Get recent uploads
        $recentUploads = $user->resources()
            ->latest()
            ->take(5)
            ->get();
        
        // Get study hours chart data (last 7 days)
        $studyHoursData = $this->getStudyHoursChartData($user);
        
        // Get subject-wise study time for pie chart
        $subjectStudyData = $this->getSubjectStudyData($user);
        
        return view('dashboard.student', compact(
            'currentGpa',
            'weeklyStudyHours',
            'fileUploadCount',
            'studyStreak',
            'recentUploads',
            'studyHoursData',
            'subjectStudyData'
        ));
    }

    public function adminDashboard()
    {
        // Total statistics
        $totalStudents = User::where('role', 'student')->count();
        $totalFiles = Resource::count();
        $activeUsers = User::where('last_activity', '>=', Carbon::now()->subHours(24))->count();
        $totalBlogs = Blog::count();
        
        // Pending approvals
        $pendingFiles = Resource::where('approved', false)->count();
        
        // Monthly activity data
        $monthlyActivity = $this->getMonthlyActivityData();
        
        // Popular categories
        $popularCategories = $this->getPopularCategoriesData();
        
        // GPA analytics by department
        $gpaByDepartment = $this->getGpaByDepartment();
        
        return view('dashboard.admin', compact(
            'totalStudents',
            'totalFiles',
            'activeUsers',
            'totalBlogs',
            'pendingFiles',
            'monthlyActivity',
            'popularCategories',
            'gpaByDepartment'
        ));
    }

    private function calculateStudyStreak($user)
    {
        $streak = 0;
        $currentDate = Carbon::now();
        
        while ($currentDate->gte(Carbon::now()->subDays(30))) {
            $hasStudied = StudyLog::where('user_id', $user->id)
                ->whereDate('date', $currentDate)
                ->exists();
            
            if ($hasStudied) {
                $streak++;
                $currentDate->subDay();
            } else {
                break;
            }
        }
        
        return $streak;
    }

    private function getStudyHoursChartData($user)
    {
        $data = [];
        $labels = [];
        
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $hours = StudyLog::where('user_id', $user->id)
                ->whereDate('date', $date)
                ->sum('hours');
            
            $labels[] = $date->format('M j');
            $data[] = $hours;
        }
        
        return [
            'labels' => $labels,
            'data' => $data
        ];
    }

    private function getSubjectStudyData($user)
    {
        $subjects = StudyLog::where('user_id', $user->id)
            ->selectRaw('subject, SUM(hours) as total_hours')
            ->groupBy('subject')
            ->get();
        
        return [
            'labels' => $subjects->pluck('subject')->toArray(),
            'data' => $subjects->pluck('total_hours')->toArray()
        ];
    }

    private function getMonthlyActivityData()
    {
        $data = [];
        $labels = [];
        
        for ($i = 11; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $users = User::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->count();
            
            $labels[] = $month->format('M Y');
            $data[] = $users;
        }
        
        return [
            'labels' => $labels,
            'data' => $data
        ];
    }

    private function getPopularCategoriesData()
    {
        $categories = Resource::selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->orderByDesc('count')
            ->take(5)
            ->get();
        
        return [
            'labels' => $categories->pluck('category')->toArray(),
            'data' => $categories->pluck('count')->toArray()
        ];
    }

    private function getGpaByDepartment()
    {
        $departments = User::where('role', 'student')
            ->whereNotNull('department')
            ->get()
            ->groupBy('department')
            ->map(function ($users) {
                $totalGpa = $users->sum(function ($user) {
                    return $user->calculateCurrentGpa();
                });
                return $users->count() > 0 ? round($totalGpa / $users->count(), 2) : 0;
            });
        
        return [
            'labels' => $departments->keys()->toArray(),
            'data' => $departments->values()->toArray()
        ];
    }
}
