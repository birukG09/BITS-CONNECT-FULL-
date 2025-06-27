<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('excerpt')->nullable();
            $table->string('featured_image')->nullable();
            $table->string('category');
            $table->enum('type', ['internal', 'external'])->default('internal');
            $table->unsignedBigInteger('author_id');
            $table->boolean('featured')->default(false);
            $table->integer('views')->default(0);
            $table->integer('read_time')->default(0);
            $table->boolean('published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('blogs');
    }
};
