@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <!-- Main Content -->
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3">Student Dashboard</h1>
                <span class="text-muted">Welcome back, {{ Auth::user()->name }}!</span>
            </div>

            <!-- Summary Cards -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100">
                        <div class="card-body">
                            <i class="bi bi-trophy text-warning fs-1"></i>
                            <h5 class="card-title mt-2">Current GPA</h5>
                            <h2 class="text-primary">{{ $currentGpa }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100">
                        <div class="card-body">
                            <i class="bi bi-clock text-info fs-1"></i>
                            <h5 class="card-title mt-2">Study Hours</h5>
                            <h2 class="text-info">{{ $weeklyStudyHours }}h</h2>
                            <small class="text-muted">This week</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100">
                        <div class="card-body">
                            <i class="bi bi-file-earmark-arrow-up text-success fs-1"></i>
                            <h5 class="card-title mt-2">Files Uploaded</h5>
                            <h2 class="text-success">{{ $fileUploadCount }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100">
                        <div class="card-body">
                            <i class="bi bi-fire text-danger fs-1"></i>
                            <h5 class="card-title mt-2">Study Streak</h5>
                            <h2 class="text-danger">{{ $studyStreak }}</h2>
                            <small class="text-muted">days</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Study Hours This Week</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="studyHoursChart" height="100"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Study Distribution</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="subjectDistributionChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">Recent Uploads</h5>
                            <a href="{{ route('library.create') }}" class="btn btn-sm btn-primary">
                                <i class="bi bi-plus-circle me-1"></i>Upload
                            </a>
                        </div>
                        <div class="card-body">
                            @if($recentUploads->count() > 0)
                                @foreach($recentUploads as $upload)
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="me-3">
                                            @if(in_array(strtolower(pathinfo($upload->file_path, PATHINFO_EXTENSION)), ['pdf']))
                                                <i class="bi bi-file-pdf text-danger fs-4"></i>
                                            @elseif(in_array(strtolower(pathinfo($upload->file_path, PATHINFO_EXTENSION)), ['mp4', 'avi', 'mov']))
                                                <i class="bi bi-file-play text-primary fs-4"></i>
                                            @else
                                                <i class="bi bi-file-earmark text-secondary fs-4"></i>
                                            @endif
                                        </div>
                                        <div class="flex-grow-1">
                                            <h6 class="mb-1">{{ $upload->title }}</h6>
                                            <small class="text-muted">
                                                {{ $upload->type }} • {{ $upload->file_size_formatted }} • {{ $upload->created_at->diffForHumans() }}
                                            </small>
                                        </div>
                                    </div>
                                @endforeach
                            @else
                                <p class="text-muted text-center">No uploads yet</p>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">Quick Actions</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <a href="{{ route('gpa.calculator') }}" class="btn btn-outline-primary">
                                    <i class="bi bi-calculator me-2"></i>Calculate GPA
                                </a>
                                <a href="{{ route('library.index') }}" class="btn btn-outline-success">
                                    <i class="bi bi-book me-2"></i>Browse Library
                                </a>
                                <a href="{{ route('chat.index') }}" class="btn btn-outline-info">
                                    <i class="bi bi-chat-dots me-2"></i>Start Chat
                                </a>
                                <a href="{{ route('blogs.index') }}" class="btn btn-outline-warning">
                                    <i class="bi bi-journal-text me-2"></i>Read Blogs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Study Hours Chart
    const studyHoursCtx = document.getElementById('studyHoursChart').getContext('2d');
    new Chart(studyHoursCtx, {
        type: 'bar',
        data: {
            labels: {!! json_encode($studyHoursData['labels']) !!},
            datasets: [{
                label: 'Study Hours',
                data: {!! json_encode($studyHoursData['data']) !!},
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                }
            }
        }
    });

    // Subject Distribution Chart
    const subjectCtx = document.getElementById('subjectDistributionChart').getContext('2d');
    new Chart(subjectCtx, {
        type: 'pie',
        data: {
            labels: {!! json_encode($subjectStudyData['labels']) !!},
            datasets: [{
                data: {!! json_encode($subjectStudyData['data']) !!},
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
</script>
@endpush
