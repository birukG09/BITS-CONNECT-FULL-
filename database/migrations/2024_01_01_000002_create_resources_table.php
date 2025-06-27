<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('type'); // PDF, Video, Audio, etc.
            $table->string('file_path');
            $table->string('file_size');
            $table->unsignedBigInteger('uploader_id');
            $table->boolean('approved')->default(false);
            $table->integer('downloads')->default(0);
            $table->integer('views')->default(0);
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('rating_count')->default(0);
            $table->timestamps();

            $table->foreign('uploader_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('resources');
    }
};
