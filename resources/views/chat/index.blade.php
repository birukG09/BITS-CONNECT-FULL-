@extends('layouts.app')

@section('content')
<div class="container-fluid h-100">
    <div class="row h-100">
        <!-- Sidebar for Conversations -->
        <div class="col-md-4 col-lg-3 border-end bg-light sidebar d-flex flex-column">
            <div class="p-3 border-bottom">
                <h5 class="mb-0">
                    <i class="bi bi-chat-dots me-2"></i>Conversations
                </h5>
            </div>
            <div class="list-group list-group-flush flex-grow-1 overflow-auto">
                @forelse($users as $user)
                    <a href="{{ route('chat.conversation', $user) }}" class="list-group-item list-group-item-action py-3 lh-tight">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1">{{ $user->name }}</strong>
                            <small class="text-muted">Online</small> <!-- Placeholder for online status -->
                        </div>
                        <div class="col-10 mb-1 small text-muted">
                            <!-- Placeholder for last message preview -->
                            Click to start chat...
                        </div>
                    </a>
                @empty
                    <div class="p-3 text-center text-muted">No other users found.</div>
                @endforelse
            </div>
        </div>

        <!-- Main Chat Window -->
        <div class="col-md-8 col-lg-9 d-flex flex-column">
            <div class="d-flex flex-column flex-grow-1 justify-content-center align-items-center text-muted">
                <i class="bi bi-chat-left-text display-1"></i>
                <p class="mt-3 h4">Select a conversation to start chatting</p>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="{{ asset('js/app.js') }}"></script> <!-- Laravel Echo setup -->
<script>
    // Basic client-side logic for chat list (no real-time updates here yet)
    // Real-time updates for last message preview and unread counts would require more complex JS/Echo setup.
</script>
@endpush
