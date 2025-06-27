<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ChatMessage;
use App\Events\NewChatMessage; // We'll create this event

class ChatController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', Auth::id())->get();
        // For simplicity, we'll just show all other users for 1:1 chat
        // In a real app, you'd fetch recent conversations/groups
        return view('chat.index', compact('users'));
    }

    public function conversation(User $user)
    {
        $messages = ChatMessage::where(function ($query) use ($user) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $user->id);
            })->orWhere(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                      ->where('receiver_id', Auth::id());
            })
            ->orderBy('created_at', 'asc')
            ->get();

        // Mark messages as read
        ChatMessage::where('sender_id', $user->id)
                   ->where('receiver_id', Auth::id())
                   ->where('is_read', false)
                   ->update(['is_read' => true, 'read_at' => now()]);

        return view('chat.conversation', compact('user', 'messages'));
    }

    public function send(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:2000',
        ]);

        $message = ChatMessage::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'type' => 'text',
        ]);

        // Broadcast the message for real-time
        broadcast(new NewChatMessage($message))->toOthers();

        return response()->json(['status' => 'Message sent!', 'message' => $message]);
    }

    public function getMessages(User $user)
    {
        $messages = ChatMessage::where(function ($query) use ($user) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $user->id);
            })->orWhere(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                      ->where('receiver_id', Auth::id());
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}
