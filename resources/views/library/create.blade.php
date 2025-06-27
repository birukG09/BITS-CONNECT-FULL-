@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="mb-0">
                        <i class="bi bi-cloud-upload me-2"></i>Upload Resource
                    </h4>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('library.store') }}" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="mb-3">
                            <label for="title" class="form-label">Title *</label>
                            <input type="text" class="form-control @error('title') is-invalid @enderror" 
                                   id="title" name="title" value="{{ old('title') }}" required>
                            @error('title')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control @error('description') is-invalid @enderror" 
                                      id="description" name="description" rows="3">{{ old('description') }}</textarea>
                            @error('description')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="category" class="form-label">Category *</label>
                                    <select class="form-select @error('category') is-invalid @enderror" 
                                            id="category" name="category" required>
                                        <option value="">Select Category</option>
                                        <option value="Computer Science" {{ old('category') == 'Computer Science' ? 'selected' : '' }}>Computer Science</option>
                                        <option value="Mathematics" {{ old('category') == 'Mathematics' ? 'selected' : '' }}>Mathematics</option>
                                        <option value="Physics" {{ old('category') == 'Physics' ? 'selected' : '' }}>Physics</option>
                                        <option value="Engineering" {{ old('category') == 'Engineering' ? 'selected' : '' }}>Engineering</option>
                                        <option value="Business" {{ old('category') == 'Business' ? 'selected' : '' }}>Business</option>
                                    </select>
                                    @error('category')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="type" class="form-label">Type *</label>
                                    <select class="form-select @error('type') is-invalid @enderror" 
                                            id="type" name="type" required>
                                        <option value="">Select Type</option>
                                        <option value="PDF" {{ old('type') == 'PDF' ? 'selected' : '' }}>PDF Document</option>
                                        <option value="Video" {{ old('type') == 'Video' ? 'selected' : '' }}>Video Lecture</option>
                                        <option value="Audio" {{ old('type') == 'Audio' ? 'selected' : '' }}>Audio Book</option>
                                        <option value="Presentation" {{ old('type') == 'Presentation' ? 'selected' : '' }}>Presentation</option>
                                        <option value="Notes" {{ old('type') == 'Notes' ? 'selected' : '' }}>Lecture Notes</option>
                                    </select>
                                    @error('type')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="file" class="form-label">File *</label>
                            <input type="file" class="form-control @error('file') is-invalid @enderror" 
                                   id="file" name="file" required>
                            <div class="form-text">Maximum file size: 50MB. Supported formats: PDF, DOC, PPT, MP4, MP3, etc.</div>
                            @error('file')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex justify-content-between">
                            <a href="{{ route('library.index') }}" class="btn btn-secondary">
                                <i class="bi bi-arrow-left me-1"></i>Back to Library
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-cloud-upload me-1"></i>Upload Resource
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // File size validation
    document.getElementById('file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 50 * 1024 * 1024; // 50MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 50MB');
                e.target.value = '';
            }
        }
    });
</script>
@endpush
