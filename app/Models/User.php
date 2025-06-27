<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department',
        'profile_photo',
        'last_activity',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_activity' => 'datetime',
        'password' => 'hashed',
    ];

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isStudent()
    {
        return $this->role === 'student';
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'uploader_id');
    }

    public function gpaEntries()
    {
        return $this->hasMany(GpaEntry::class);
    }

    public function studyLogs()
    {
        return $this->hasMany(StudyLog::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'author_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(ChatMessage::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(ChatMessage::class, 'receiver_id');
    }

    public function calculateCurrentGpa()
    {
        $entries = $this->gpaEntries()->get();
        if ($entries->isEmpty()) return 0;

        $totalPoints = $entries->sum(function ($entry) {
            return $entry->grade_points * $entry->credit_hours;
        });
        $totalCredits = $entries->sum('credit_hours');

        return $totalCredits > 0 ? round($totalPoints / $totalCredits, 2) : 0;
    }

    public function getWeeklyStudyHours()
    {
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();

        return $this->studyLogs()
            ->whereBetween('date', [$startOfWeek, $endOfWeek])
            ->sum('hours');
    }
}
