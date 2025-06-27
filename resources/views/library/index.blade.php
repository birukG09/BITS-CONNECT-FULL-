@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3">Digital Library</h1>
                <a href="{{ route('library.create') }}" class="btn btn-primary">
                    <i class="bi bi-plus-circle me-1"></i>Upload Resource
                </a>
            </div>

            <!-- Search and Filters -->
            <div class="card mb-4">
                <div class="card-body">
                    <form method="GET" action="{{ route('library.index') }}" id="filterForm">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <input type="text" name="search" class="form-control" 
                                       placeholder="Search resources..." value="{{ request('search') }}">
                            </div>
                            <div class="col-md-3">
                                <select name="category" class="form-select">
                                    <option value="">All Categories</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category }}" {{ request('category') == $category ? 'selected' : '' }}>
                                            {{ $category }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select name="type" class="form-select">
                                    <option value="">All Types</option>
                                    @foreach($types as $type)
                                        <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>
                                            {{ $type }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-outline-primary w-100">
                                    <i class="bi bi-search me-1"></i>Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Resources Grid -->
            <div class="row">
                @forelse($resources as $resource)
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="card card-hover h-100">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    @if($resource->type == 'PDF')
                                        <i class="bi bi-file-pdf text-danger fs-2 me-3"></i>
                                    @elseif($resource->type == 'Video')
                                        <i class="bi bi-file-play text-primary fs-2 me-3"></i>
                                    @elseif($resource->type == 'Audio')
                                        <i class="bi bi-file-music text-info fs-2 me-3"></i>
                                    @else
                                        <i class="bi bi-file-earmark text-secondary fs-2 me-3"></i>
                                    @endif
                                    <div class="flex-grow-1">
                                        <span class="badge bg-secondary mb-1">{{ $resource->category }}</span>
                                        <br>
                                        <span class="badge bg-primary">{{ $resource->type }}</span>
                                    </div>
                                </div>
                                
                                <h6 class="card-title">{{ Str::limit($resource->title, 50) }}</h6>
                                <p class="card-text text-muted small">
                                    {{ Str::limit($resource->description, 80) }}
                                </p>
                                
                                <div class="row text-center small text-muted mb-3">
                                    <div class="col-4">
                                        <i class="bi bi-download"></i><br>
                                        {{ $resource->downloads }}
                                    </div>
                                    <div class="col-4">
                                        <i class="bi bi-eye"></i><br>
                                        {{ $resource->views }}
                                    </div>
                                    <div class="col-4">
                                        <i class="bi bi-hdd"></i><br>
                                        {{ $resource->file_size_formatted }}
                                    </div>
                                </div>
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="rating">
                                        @for($i = 1; $i <= 5; $i++)
                                            <i class="bi bi-star{{ $i <= $resource->rating ? '-fill text-warning' : '' }}"></i>
                                        @endfor
                                        <small class="text-muted">({{ $resource->rating_count }})</small>
                                    </div>
                                    <a href="{{ route('library.show', $resource) }}" class="btn btn-sm btn-outline-primary">
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center py-5">
                            <i class="bi bi-search display-1 text-muted"></i>
                            <h4 class="mt-3">No resources found</h4>
                            <p class="text-muted">Try adjusting your search or filters</p>
                        </div>
                    </div>
                @endforelse
            </div>

            <!-- Pagination -->
            {{ $resources->links() }}
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Auto-submit form on filter change
    document.querySelectorAll('#filterForm select').forEach(select => {
        select.addEventListener('change', function() {
            document.getElementById('filterForm').submit();
        });
    });
</script>
@endpush
