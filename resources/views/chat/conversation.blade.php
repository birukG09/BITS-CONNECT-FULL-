@extends('layouts.app')

@section('content')
<div class="container-fluid h-100">
    <div class="row h-100">
        <!-- Sidebar for Conversations (re-use from index) -->
        <div class="col-md-4 col-lg-3 border-end bg-light sidebar d-flex flex-column">
            <div class="p-3 border-bottom">
                <h5 class="mb-0">
                    <i class="bi bi-chat-dots me-2"></i>Conversations
                </h5>
            </div>
            <div class="list-group list-group-flush flex-grow-1 overflow-auto">
                @foreach($users as $u)
                    <a href="{{ route('chat.conversation', $u) }}" class="list-group-item list-group-item-action py-3 lh-tight {{ $u->id == $user->id ? 'active' : '' }}">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1">{{ $u->name }}</strong>
                            <small class="text-muted">Online</small>
                        </div>
                        <div class="col-10 mb-1 small text-muted">Click to start chat...</div>
                    </a>
                @endforeach
            </div>
        </div>

        <!-- Main Chat Window -->
        <div class="col-md-8 col-lg-9 d-flex flex-column">
            <div class="p-3 border-bottom bg-white">
                <h5 class="mb-0">
                    <i class="bi bi-person-circle me-2"></i>{{ $user->name }}
                </h5>
            </div>

            <!-- Message Area -->
            <div class="flex-grow-1 p-4 overflow-auto" id="messageArea">
                @foreach($messages as $message)
                    <div class="d-flex {{ $message->sender_id == Auth::id() ? 'justify-content-end' : 'justify-content-start' }} mb-3">
                        <div class="p-3 rounded-3 chat-message {{ $message->sender_id == Auth::id() ? 'message-sent' : 'message-received' }}">
                            {{ $message->message }}
                            <div class="text-end small mt-1 {{ $message->sender_id == Auth::id() ? 'text-white-50' : 'text-muted' }}">
                                {{ $message->created_at->diffForHumans() }}
                                @if($message->sender_id == Auth::id() && $message->is_read)
                                    <i class="bi bi-check-all ms-1" title="Read"></i>
                                @elseif($message->sender_id == Auth::id())
                                    <i class="bi bi-check ms-1" title="Sent"></i>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Message Input -->
            <div class="p-3 border-top bg-white">
                <div class="input-group">
                    <input type="text" id="chatMessageInput" class="form-control" placeholder="Type your message...">
                    <button class="btn btn-primary" type="button" id="sendMessageBtn">
                        <i class="bi bi-send"></i> Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="{{ asset('js/app.js') }}"></script> <!-- Laravel Echo setup -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const messageArea = document.getElementById('messageArea');
        const chatMessageInput = document.getElementById('chatMessageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const receiverId = {{ $user->id }};
        const currentUserId = {{ Auth::id() }};

        // Scroll to bottom on load
        messageArea.scrollTop = messageArea.scrollHeight;

        sendMessageBtn.addEventListener('click', sendMessage);
        chatMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const messageText = chatMessageInput.value.trim();
            if (messageText === '') {
                return;
            }

            fetch('{{ route('chat.send') }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    receiver_id: receiverId,
                    message: messageText
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'Message sent!') {
                    // Message will be added via Echo, but for immediate display for sender:
                    appendMessage(data.message.message, true, 'Just now', true);
                    chatMessageInput.value = '';
                }
            })
            .catch(error => console.error('Error sending message:', error));
        }

        function appendMessage(message, isSentByMe, timestamp, isRead = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('d-flex', 'mb-3');
            if (isSentByMe) {
                messageDiv.classList.add('justify-content-end');
            } else {
                messageDiv.classList.add('justify-content-start');
            }

            const messageContent = `
                <div class="p-3 rounded-3 chat-message ${isSentByMe ? 'message-sent' : 'message-received'}">
                    ${message}
                    <div class="text-end small mt-1 ${isSentByMe ? 'text-white-50' : 'text-muted'}">
                        ${timestamp}
                        ${isSentByMe ? (isRead ? '<i class="bi bi-check-all ms-1" title="Read"></i>' : '<i class="bi bi-check ms-1" title="Sent"></i>') : ''}
                    </div>
                </div>
            `;
            messageDiv.innerHTML = messageContent;
            messageArea.appendChild(messageDiv);
            messageArea.scrollTop = messageArea.scrollHeight; // Scroll to new message
        }

        // Laravel Echo setup for real-time messages
        // Ensure you have Pusher configured in .env and broadcasting enabled in config/app.php
        // And run 'npm install && npm run dev' to compile resources/js/app.js
        if (typeof Echo !== 'undefined') {
            Echo.channel('chat.' + currentUserId)
                .listen('NewChatMessage', (e) => {
                    if (e.sender_id === receiverId) { // Only append if from the current conversation partner
                        appendMessage(e.message, false, e.created_at);
                    }
                });
        } else {
            console.warn('Laravel Echo is not initialized. Real-time features will not work.');
        }
    });
</script>
@endpush
