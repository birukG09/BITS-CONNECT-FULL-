<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpaEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course',
        'grade',
        'credit_hours',
        'semester',
        'grade_points',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getGradePoints($grade)
    {
        $gradePoints = [
            'A+' => 4.00,
            'A' => 4.00,
            'A-' => 3.70,
            'B+' => 3.30,
            'B' => 3.00,
            'B-' => 2.70,
            'C+' => 2.30,
            'C' => 2.00,
            'C-' => 1.70,
            'D+' => 1.30,
            'D' => 1.00,
            'F' => 0.00,
        ];

        return $gradePoints[$grade] ?? 0.00;
    }
}
