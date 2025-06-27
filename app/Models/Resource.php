<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'type',
        'file_path',
        'file_size',
        'uploader_id',
        'approved',
        'downloads',
        'views',
        'rating',
        'rating_count',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploader_id');
    }

    public function incrementDownloads()
    {
        $this->increment('downloads');
    }

    public function incrementViews()
    {
        $this->increment('views');
    }

    public function getFileSizeFormattedAttribute()
    {
        $bytes = floatval($this->file_size);
        $units = ['B', 'KB', 'MB', 'GB'];
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
