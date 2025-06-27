@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">
                        <i class="bi bi-book me-2"></i>{{ $resource->title }}
                    </h4>
                    <a href="{{ route('library.index') }}" class="btn btn-sm btn-secondary">
                        <i class="bi bi-arrow-left me-1"></i>Back to Library
                    </a>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-md-4 text-center">
                            @if($resource->type == 'PDF')
                                <i class="bi bi-file-pdf text-danger display-1"></i>
                            @elseif($resource->type == 'Video')
                                <i class="bi bi-file-play text-primary display-1"></i>
                            @elseif($resource->type == 'Audio')
                                <i class="bi bi-file-music text-info display-1"></i>
                            @else
                                <i class="bi bi-file-earmark text-secondary display-1"></i>
                            @endif
                            <p class="mt-2 text-muted">{{ $resource->type }}</p>
                        </div>
                        <div class="col-md-8">
                            <p class="lead">{{ $resource->description }}</p>
                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item">
                                    <strong>Category:</strong> <span class="badge bg-secondary">{{ $resource->category }}</span>
                                </li>
                                <li class="list-group-item">
                                    <strong>Uploader:</strong> {{ $resource->uploader->name }}
                                </li>
                                <li class="list-group-item">
                                    <strong>Uploaded On:</strong> {{ $resource->created_at->format('M d, Y') }}
                                </li>
                                <li class="list-group-item">
                                    <strong>File Size:</strong> {{ $resource->file_size_formatted }}
                                </li>
                                <li class="list-group-item">
                                    <strong>Downloads:</strong> {{ $resource->downloads }}
                                </li>
                                <li class="list-group-item">
                                    <strong>Views:</strong> {{ $resource->views }}
                                </li>
                                <li class="list-group-item">
                                    <strong>Rating:</strong> 
                                    @for($i = 1; $i <= 5; $i++)
                                        <i class="bi bi-star{{ $i <= $resource->rating ? '-fill text-warning' : '' }}"></i>
                                    @endfor
                                    <small class="text-muted">({{ $resource->rating_count }} reviews)</small>
                                </li>
                            </ul>
                            <a href="{{ route('library.download', $resource) }}" class="btn btn-primary btn-lg w-100">
                                <i class="bi bi-download me-2"></i>Download Resource
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Resources -->
            @if($relatedResources->count() > 0)
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="mb-0">Related Resources</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        @foreach($relatedResources as $related)
                        <div class="col-md-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        @if($related->type == 'PDF')
                                            <i class="bi bi-file-pdf text-danger fs-3"></i>
                                        @elseif($related->type == 'Video')
                                            <i class="bi bi-file-play text-primary fs-3"></i>
                                        @else
                                            <i class="bi bi-file-earmark text-secondary fs-3"></i>
                                        @endif
                                    </div>
                                    <div>
                                        <h6 class="mb-1">{{ Str::limit($related->title, 40) }}</h6>
                                        <small class="text-muted">{{ $related->category }} • {{ $related->type }}</small>
                                        <br>
                                        <a href="{{ route('library.show', $related) }}" class="btn btn-sm btn-link p-0">View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
