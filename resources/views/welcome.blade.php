@extends('layouts.app')

@section('content')
<!-- Hero Section -->
<section class="hero-section d-flex align-items-center">
    <div class="container">
        <div class="row justify-content-center text-center text-white">
            <div class="col-lg-8">
                <h1 class="display-3 fw-bold mb-3">Welcome to <span style="color: #8bc34a;">BiTS</span></h1>
                <p class="lead mb-4" style="font-style: italic; color: #e0e0e0;">
                    <i class="bi bi-quote me-2"></i>From collecting.. to connecting..
                </p>
                <p class="lead mb-5">
                    Your modern educational platform for digital learning resources. Transform, organize, and access your study materials with cutting edge tools designed for the future of education.
                </p>
                
                @guest
                    <div class="d-flex gap-3 justify-content-center">
                        <a href="{{ route('register') }}" class="btn btn-success btn-lg px-5">
                            Get Started
                        </a>
                        <a href="{{ route('library.index') }}" class="btn btn-outline-light btn-lg px-5">
                            Explore Resources
                        </a>
                    </div>
                @else
                    <a href="{{ Auth::user()->isAdmin() ? route('admin.dashboard') : route('student.dashboard') }}" 
                       class="btn btn-success btn-lg px-5">
                        <i class="bi bi-speedometer2 me-2"></i>Go to Dashboard
                    </a>
                @endguest
            </div>
        </div>
    </div>
</section>
@endsection
