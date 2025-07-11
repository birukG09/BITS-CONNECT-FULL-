// Messaging functionality
class Messaging {
  constructor() {
    this.conversations = [];
    this.currentConversation = null;
    this.currentUser = null;
    this.init();
  }

  init() {
    this.currentUser = window.authManager?.getCurrentUser();
    this.loadConversations();
    this.setupEventListeners();
  }

  loadConversations() {
    // Demo conversations data
    this.conversations = [
      {
        id: 1,
        participants: [
          {
            id: 1,
            name: "Dr. Alemayehu Worku",
            role: "teacher",
            avatar: null,
            status: "online",
          },
          {
            id: 2,
            name: this.currentUser?.name || "You",
            role: this.currentUser?.role || "student",
            avatar: null,
            status: "online",
          },
        ],
        lastMessage: {
          id: 1,
          senderId: 1,
          content: "Great work on your project! Keep it up.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
        },
        unreadCount: 1,
      },
      {
        id: 2,
        participants: [
          {
            id: 3,
            name: "Hirut Getachew",
            role: "student",
            avatar: null,
            status: "offline",
          },
          {
            id: 2,
            name: this.currentUser?.name || "You",
            role: this.currentUser?.role || "student",
            avatar: null,
            status: "online",
          },
        ],
        lastMessage: {
          id: 2,
          senderId: 2,
          content: "Can we meet tomorrow for the group project?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: 3,
        participants: [
          {
            id: 4,
            name: "Prof. Hirut Getachew",
            role: "teacher",
            avatar: null,
            status: "away",
          },
          {
            id: 2,
            name: this.currentUser?.name || "You",
            role: this.currentUser?.role || "student",
            avatar: null,
            status: "online",
          },
        ],
        lastMessage: {
          id: 3,
          senderId: 4,
          content: "Please submit your assignment by Friday.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: false,
        },
        unreadCount: 2,
      },
      {
        id: 4,
        participants: [
          {
            id: 5,
            name: "Dawit Bekele",
            role: "student",
            avatar: null,
            status: "online",
          },
          {
            id: 2,
            name: this.currentUser?.name || "You",
            role: this.currentUser?.role || "student",
            avatar: null,
            status: "online",
          },
        ],
        lastMessage: {
          id: 4,
          senderId: 5,
          content: "Thanks for sharing the study materials!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          read: true,
        },
        unreadCount: 0,
      },
    ];

    // Demo messages for conversations
    this.messages = {
      1: [
        {
          id: 1,
          senderId: 1,
          content: "Hello! How are you doing with the database project?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true,
        },
        {
          id: 2,
          senderId: 2,
          content:
            "Hi Dr. Alemayehu! I'm making good progress. Just finished the ER diagram.",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          read: true,
        },
        {
          id: 3,
          senderId: 1,
          content: "Great work on your project! Keep it up.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
        },
      ],
      2: [
        {
          id: 1,
          senderId: 3,
          content: "Hey! Are you free to work on the group project tomorrow?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          read: true,
        },
        {
          id: 2,
          senderId: 2,
          content: "Can we meet tomorrow for the group project?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          read: true,
        },
      ],
      3: [
        {
          id: 1,
          senderId: 4,
          content: "Good morning! I hope you're doing well.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
          read: false,
        },
        {
          id: 2,
          senderId: 4,
          content: "Please submit your assignment by Friday.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          read: false,
        },
      ],
      4: [
        {
          id: 1,
          senderId: 2,
          content: "Here are the study materials we discussed.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49),
          read: true,
        },
        {
          id: 2,
          senderId: 5,
          content: "Thanks for sharing the study materials!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          read: true,
        },
      ],
    };

    this.renderConversations();
    this.updateUnreadCount();
  }

  setupEventListeners() {
    // Search messages
    document.getElementById("searchMessages").addEventListener("input", (e) => {
      this.searchConversations(e.target.value);
    });

    // Send message form
    document
      .getElementById("sendMessageForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.sendMessage();
      });

    // New message form
    document
      .getElementById("newMessageForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.createNewConversation();
      });

    // Auto-scroll to bottom when new messages arrive
    const messagesContainer = document.getElementById("messagesContainer");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  renderConversations() {
    const allContainer = document.getElementById("conversationsList");
    const unreadContainer = document.getElementById("unreadConversationsList");

    const allConversationsHTML = this.conversations
      .map((conv) => this.createConversationItem(conv))
      .join("");

    const unreadConversationsHTML = this.conversations
      .filter((conv) => conv.unreadCount > 0)
      .map((conv) => this.createConversationItem(conv))
      .join("");

    allContainer.innerHTML = allConversationsHTML;
    unreadContainer.innerHTML =
      unreadConversationsHTML ||
      '<div class="p-3 text-center text-muted">No unread messages</div>';
  }

  createConversationItem(conversation) {
    const otherParticipant = conversation.participants.find(
      (p) => p.name !== (this.currentUser?.name || "You"),
    );
    const isUnread = conversation.unreadCount > 0;

    return `
      <div class="list-group-item list-group-item-action ${isUnread ? "bg-light" : ""}"
           onclick="openConversation(${conversation.id})">
        <div class="d-flex align-items-center">
          <div class="me-3 position-relative">
            <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                 style="width: 40px; height: 40px;">
              <i class="bi bi-person text-white"></i>
            </div>
            <span class="position-absolute bottom-0 end-0 bg-${this.getStatusColor(otherParticipant.status)} border border-white rounded-circle"
                  style="width: 12px; height: 12px;"></span>
          </div>
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="mb-1 ${isUnread ? "fw-bold" : ""}">${otherParticipant.name}</h6>
              <small class="text-muted">${this.formatTime(conversation.lastMessage.timestamp)}</small>
            </div>
            <p class="mb-1 text-muted small text-truncate">
              ${conversation.lastMessage.content}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">${otherParticipant.role}</small>
              ${conversation.unreadCount > 0 ? `<span class="badge bg-primary rounded-pill">${conversation.unreadCount}</span>` : ""}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  openConversation(conversationId) {
    this.currentConversation = this.conversations.find(
      (c) => c.id === conversationId,
    );
    if (!this.currentConversation) return;

    // Mark as read
    this.currentConversation.unreadCount = 0;
    this.currentConversation.lastMessage.read = true;

    // Update UI
    this.showChatInterface();
    this.renderMessages();
    this.renderConversations();
    this.updateUnreadCount();
  }

  showChatInterface() {
    const otherParticipant = this.currentConversation.participants.find(
      (p) => p.name !== (this.currentUser?.name || "You"),
    );

    // Show chat elements
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("chatHeader").style.display = "block";
    document.getElementById("messagesContainer").style.display = "block";
    document.getElementById("messageInput").style.display = "block";

    // Update header
    document.getElementById("chatUserName").textContent = otherParticipant.name;
    document.getElementById("chatUserStatus").textContent =
      `${otherParticipant.status} • ${otherParticipant.role}`;
  }

  renderMessages() {
    const container = document.getElementById("messagesContainer");
    const messages = this.messages[this.currentConversation.id] || [];

    container.innerHTML = messages
      .map((message) => this.createMessageBubble(message))
      .join("");

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  createMessageBubble(message) {
    const isCurrentUser = message.senderId === 2; // Assuming current user ID is 2
    const sender = this.currentConversation.participants.find(
      (p) => p.id === message.senderId,
    );

    return `
      <div class="mb-3 d-flex ${isCurrentUser ? "justify-content-end" : "justify-content-start"}">
        <div class="d-flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} align-items-end" style="max-width: 70%;">
          ${
            !isCurrentUser
              ? `
            <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                 style="width: 32px; height: 32px; min-width: 32px;">
              <i class="bi bi-person text-white small"></i>
            </div>
          `
              : ""
          }
          <div>
            <div class="bg-${isCurrentUser ? "primary" : "light"} text-${isCurrentUser ? "white" : "dark"} rounded-3 px-3 py-2">
              <p class="mb-0">${message.content}</p>
            </div>
            <small class="text-muted d-block ${isCurrentUser ? "text-end" : "text-start"} mt-1">
              ${this.formatTime(message.timestamp)}
              ${isCurrentUser && message.read ? '<i class="bi bi-check2-all text-primary ms-1"></i>' : ""}
            </small>
          </div>
        </div>
      </div>
    `;
  }

  sendMessage() {
    const messageText = document.getElementById("messageText").value.trim();
    if (!messageText || !this.currentConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: 2, // Current user ID
      content: messageText,
      timestamp: new Date(),
      read: false,
    };

    // Add to messages
    if (!this.messages[this.currentConversation.id]) {
      this.messages[this.currentConversation.id] = [];
    }
    this.messages[this.currentConversation.id].push(newMessage);

    // Update conversation
    this.currentConversation.lastMessage = newMessage;

    // Update UI
    this.renderMessages();
    this.renderConversations();

    // Clear input
    document.getElementById("messageText").value = "";

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      this.simulateReply();
    }, 2000);
  }

  simulateReply() {
    if (!this.currentConversation) return;

    const otherParticipant = this.currentConversation.participants.find(
      (p) => p.name !== (this.currentUser?.name || "You"),
    );

    const replies = [
      "Thanks for your message!",
      "I'll get back to you soon.",
      "That sounds good to me.",
      "Let me check and respond.",
      "Understood, thank you.",
    ];

    const replyMessage = {
      id: Date.now(),
      senderId: otherParticipant.id,
      content: replies[Math.floor(Math.random() * replies.length)],
      timestamp: new Date(),
      read: false,
    };

    this.messages[this.currentConversation.id].push(replyMessage);
    this.currentConversation.lastMessage = replyMessage;
    this.currentConversation.unreadCount++;

    this.renderMessages();
    this.renderConversations();
    this.updateUnreadCount();
  }

  createNewConversation() {
    const form = document.getElementById("newMessageForm");
    const recipient = document.getElementById("recipient").value;
    const subject = document.getElementById("subject").value;
    const messageBody = document.getElementById("messageBody").value;

    // Simulate creating new conversation
    const newConversation = {
      id: Math.max(...this.conversations.map((c) => c.id)) + 1,
      participants: [
        {
          id: 999,
          name: document.getElementById("recipient").selectedOptions[0].text,
          role: "unknown",
          avatar: null,
          status: "offline",
        },
        {
          id: 2,
          name: this.currentUser?.name || "You",
          role: this.currentUser?.role || "student",
          avatar: null,
          status: "online",
        },
      ],
      lastMessage: {
        id: 1,
        senderId: 2,
        content: messageBody,
        timestamp: new Date(),
        read: false,
      },
      unreadCount: 0,
    };

    this.conversations.unshift(newConversation);
    this.messages[newConversation.id] = [newConversation.lastMessage];

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("newMessageModal"),
    );
    modal.hide();
    form.reset();

    // Open the new conversation
    this.openConversation(newConversation.id);
    this.renderConversations();

    window.showToast("Message sent successfully!", "success");
  }

  searchConversations(query) {
    if (!query.trim()) {
      this.renderConversations();
      return;
    }

    const filteredConversations = this.conversations.filter((conv) => {
      const otherParticipant = conv.participants.find(
        (p) => p.name !== (this.currentUser?.name || "You"),
      );
      return (
        otherParticipant.name.toLowerCase().includes(query.toLowerCase()) ||
        conv.lastMessage.content.toLowerCase().includes(query.toLowerCase())
      );
    });

    const allContainer = document.getElementById("conversationsList");
    const unreadContainer = document.getElementById("unreadConversationsList");

    const allConversationsHTML = filteredConversations
      .map((conv) => this.createConversationItem(conv))
      .join("");

    const unreadConversationsHTML = filteredConversations
      .filter((conv) => conv.unreadCount > 0)
      .map((conv) => this.createConversationItem(conv))
      .join("");

    allContainer.innerHTML =
      allConversationsHTML ||
      '<div class="p-3 text-center text-muted">No conversations found</div>';
    unreadContainer.innerHTML =
      unreadConversationsHTML ||
      '<div class="p-3 text-center text-muted">No unread messages found</div>';
  }

  updateUnreadCount() {
    const totalUnread = this.conversations.reduce(
      (sum, conv) => sum + conv.unreadCount,
      0,
    );
    const unreadCountElement = document.getElementById("unreadCount");
    if (unreadCountElement) {
      unreadCountElement.textContent = totalUnread;
      unreadCountElement.style.display = totalUnread > 0 ? "inline" : "none";
    }
  }

  getStatusColor(status) {
    const colors = {
      online: "success",
      away: "warning",
      offline: "secondary",
    };
    return colors[status] || "secondary";
  }

  formatTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 1 ? "now" : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? "1d" : `${diffInDays}d`;
    }
  }
}

// Global functions
function openConversation(conversationId) {
  window.messaging.openConversation(conversationId);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.messaging = new Messaging();
  }, 100);
});
