@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3">Admin Dashboard</h1>
                <span class="text-muted">System Overview</span>
            </div>

            <!-- Summary Cards -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100 bg-primary text-white">
                        <div class="card-body">
                            <i class="bi bi-people fs-1"></i>
                            <h5 class="card-title mt-2">Total Students</h5>
                            <h2>{{ $totalStudents }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100 bg-success text-white">
                        <div class="card-body">
                            <i class="bi bi-file-earmark fs-1"></i>
                            <h5 class="card-title mt-2">Total Files</h5>
                            <h2>{{ $totalFiles }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100 bg-info text-white">
                        <div class="card-body">
                            <i class="bi bi-person-check fs-1"></i>
                            <h5 class="card-title mt-2">Active Users</h5>
                            <h2>{{ $activeUsers }}</h2>
                            <small>Last 24 hours</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card card-hover text-center h-100 bg-warning text-white">
                        <div class="card-body">
                            <i class="bi bi-journal-text fs-1"></i>
                            <h5 class="card-title mt-2">Blog Posts</h5>
                            <h2>{{ $totalBlogs }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Approvals Alert -->
            @if($pendingFiles > 0)
            <div class="alert alert-warning d-flex align-items-center mb-4" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                    <strong>{{ $pendingFiles }}</strong> files are pending approval. 
                    <a href="#" class="alert-link">Review now</a>
                </div>
            </div>
            @endif

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Monthly User Registration</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="monthlyActivityChart" height="100"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Popular Categories</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="categoriesChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GPA by Department -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Average GPA by Department</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="gpaChart" height="150"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Quick Management</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <a href="#" class="btn btn-outline-primary">
                                    <i class="bi bi-people me-2"></i>Manage Users
                                </a>
                                <a href="#" class="btn btn-outline-success">
                                    <i class="bi bi-file-earmark-check me-2"></i>Approve Files ({{ $pendingFiles }})
                                </a>
                                <a href="#" class="btn btn-outline-info">
                                    <i class="bi bi-journal-plus me-2"></i>Create Blog Post
                                </a>
                                <a href="#" class="btn btn-outline-warning">
                                    <i class="bi bi-gear me-2"></i>System Settings
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Recent System Activity</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Details</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2 min ago</td>
                                            <td>John Doe</td>
                                            <td>File Upload</td>
                                            <td>Advanced Algorithms.pdf</td>
                                            <td><span class="badge bg-warning">Pending</span></td>
                                        </tr>
                                        <tr>
                                            <td>5 min ago</td>
                                            <td>Jane Smith</td>
                                            <td>User Registration</td>
                                            <td>Computer Science</td>
                                            <td><span class="badge bg-success">Completed</span></td>
                                        </tr>
                                        <tr>
                                            <td>10 min ago</td>
                                            <td>Mike Johnson</td>
                                            <td>Blog Post</td>
                                            <td>Introduction to Machine Learning</td>
                                            <td><span class="badge bg-success">Published</span></td>
                                        </tr>
                                    </tbody>
                                </table>
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
    // Monthly Activity Chart
    const monthlyCtx = document.getElementById('monthlyActivityChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: {!! json_encode($monthlyActivity['labels']) !!},
            datasets: [{
                label: 'New Users',
                data: {!! json_encode($monthlyActivity['data']) !!},
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Categories Chart
    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    new Chart(categoriesCtx, {
        type: 'doughnut',
        data: {
            labels: {!! json_encode($popularCategories['labels']) !!},
            datasets: [{
                data: {!! json_encode($popularCategories['data']) !!},
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
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

    // GPA Chart
    const gpaCtx = document.getElementById('gpaChart').getContext('2d');
    new Chart(gpaCtx, {
        type: 'bar',
        data: {
            labels: {!! json_encode($gpaByDepartment['labels']) !!},
            datasets: [{
                label: 'Average GPA',
                data: {!! json_encode($gpaByDepartment['data']) !!},
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
                    max: 4.0,
                    title: {
                        display: true,
                        text: 'GPA'
                    }
                }
            }
        }
    });
</script>
@endpush
