// Dashboard-specific functionality
class Dashboard {
  constructor() {
    this.init();
  }

  init() {
    this.loadDashboardData();
    this.setupGPAChart();
    this.startAutoRefresh();
  }

  loadDashboardData() {
    // Update user name
    const user = window.authManager?.getCurrentUser();
    if (user) {
      document.getElementById("dashboardUserName").textContent = user.name;
    }

    // Load demo data
    this.loadRecentActivity();
    this.loadUpcomingDeadlines();
    this.loadStudySessions();
    this.loadRecentMessages();
    this.updateStats();
  }

  loadRecentActivity() {
    const activityContainer = document.getElementById("recentActivity");
    const activities = [
      {
        icon: "bi-check-circle",
        color: "success",
        title: "Assignment completed",
        description: "Data Structures Project submission",
        time: "2 hours ago",
      },
      {
        icon: "bi-upload",
        color: "info",
        title: "Resource uploaded",
        description: "Machine Learning Notes.pdf",
        time: "4 hours ago",
      },
      {
        icon: "bi-people",
        color: "primary",
        title: "Joined study group",
        description: "Advanced Algorithms Study Group",
        time: "1 day ago",
      },
      {
        icon: "bi-chat-dots",
        color: "warning",
        title: "New message received",
        description: "From Dr. Alemayehu about project feedback",
        time: "2 days ago",
      },
      {
        icon: "bi-book",
        color: "secondary",
        title: "Downloaded resource",
        description: "Database Systems Textbook Chapter 5",
        time: "3 days ago",
      },
    ];

    activityContainer.innerHTML = activities
      .map(
        (activity) => `
      <div class="list-group-item list-group-item-action border-0">
        <div class="d-flex align-items-center">
          <div class="bg-${activity.color} bg-opacity-10 rounded-circle p-2 me-3">
            <i class="bi ${activity.icon} text-${activity.color}"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h6 class="mb-1">${activity.title}</h6>
                <p class="mb-0 text-muted small">${activity.description}</p>
              </div>
              <small class="text-muted">${activity.time}</small>
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  loadUpcomingDeadlines() {
    const deadlinesContainer = document.getElementById("upcomingDeadlines");
    const deadlines = [
      {
        title: "Software Engineering Project",
        course: "SE 401",
        dueDate: "Dec 20, 2024",
        priority: "high",
        daysLeft: 3,
      },
      {
        title: "Database Design Assignment",
        course: "DB 301",
        dueDate: "Dec 22, 2024",
        priority: "medium",
        daysLeft: 5,
      },
      {
        title: "Network Security Essay",
        course: "NS 201",
        dueDate: "Dec 25, 2024",
        priority: "low",
        daysLeft: 8,
      },
      {
        title: "Mobile App Prototype",
        course: "MA 401",
        dueDate: "Dec 28, 2024",
        priority: "high",
        daysLeft: 11,
      },
    ];

    deadlinesContainer.innerHTML = deadlines
      .map((deadline) => {
        const priorityClass = {
          high: "danger",
          medium: "warning",
          low: "success",
        }[deadline.priority];

        return `
        <div class="list-group-item border-0">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1">${deadline.title}</h6>
              <p class="mb-1 text-muted small">${deadline.course}</p>
              <small class="text-muted">${deadline.dueDate}</small>
            </div>
            <div class="text-end">
              <span class="badge bg-${priorityClass}">${deadline.priority.toUpperCase()}</span>
              <div class="small text-muted mt-1">${deadline.daysLeft} days left</div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  loadStudySessions() {
    const sessionsContainer = document.getElementById("studySessions");
    const sessions = [
      {
        title: "Algorithms Study Group",
        time: "2:00 PM - 4:00 PM",
        location: "Computer Lab 1",
        participants: 8,
        status: "ongoing",
      },
      {
        title: "Database Project Review",
        time: "5:00 PM - 6:30 PM",
        location: "Room 205",
        participants: 5,
        status: "upcoming",
      },
      {
        title: "Mobile Development Workshop",
        time: "7:00 PM - 9:00 PM",
        location: "Online (Zoom)",
        participants: 12,
        status: "upcoming",
      },
    ];

    if (sessions.length === 0) {
      sessionsContainer.innerHTML = `
        <div class="list-group-item border-0 text-center py-4">
          <i class="bi bi-calendar-x text-muted h3"></i>
          <p class="text-muted mb-0">No study sessions scheduled for today</p>
        </div>
      `;
      return;
    }

    sessionsContainer.innerHTML = sessions
      .map((session) => {
        const statusClass =
          session.status === "ongoing" ? "success" : "primary";
        const statusIcon =
          session.status === "ongoing" ? "bi-play-circle" : "bi-clock";

        return `
        <div class="list-group-item border-0">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1">${session.title}</h6>
              <p class="mb-1 text-muted small">
                <i class="bi bi-clock me-1"></i>${session.time}
              </p>
              <p class="mb-1 text-muted small">
                <i class="bi bi-geo-alt me-1"></i>${session.location}
              </p>
              <small class="text-muted">
                <i class="bi bi-people me-1"></i>${session.participants} participants
              </small>
            </div>
            <span class="badge bg-${statusClass}">
              <i class="bi ${statusIcon} me-1"></i>${session.status}
            </span>
          </div>
        </div>
      `;
      })
      .join("");
  }

  loadRecentMessages() {
    const messagesContainer = document.getElementById("recentMessages");
    const messages = [
      {
        sender: "Dr. Alemayehu Worku",
        subject: "Project Feedback Available",
        time: "1 hour ago",
        unread: true,
      },
      {
        sender: "Hirut Getachew",
        subject: "Study Group Meeting Tomorrow",
        time: "3 hours ago",
        unread: true,
      },
      {
        sender: "BiTS Admin",
        subject: "System Maintenance Notice",
        time: "1 day ago",
        unread: false,
      },
      {
        sender: "Dawit Bekele",
        subject: "Assignment Collaboration",
        time: "2 days ago",
        unread: false,
      },
    ];

    messagesContainer.innerHTML = messages
      .map(
        (message) => `
      <div class="list-group-item border-0 ${message.unread ? "bg-light" : ""}">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h6 class="mb-1 ${message.unread ? "fw-bold" : ""}">${message.sender}</h6>
                <p class="mb-1 text-muted small">${message.subject}</p>
                <small class="text-muted">${message.time}</small>
              </div>
              ${message.unread ? '<span class="badge bg-primary rounded-pill">New</span>' : ""}
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  updateStats() {
    // Simulate real-time stats updates
    const stats = {
      totalAssignments: Math.floor(Math.random() * 5) + 10,
      completedAssignments: Math.floor(Math.random() * 3) + 6,
      pendingAssignments: Math.floor(Math.random() * 3) + 2,
      currentGPA: (Math.random() * 0.5 + 3.2).toFixed(2),
    };

    Object.keys(stats).forEach((key) => {
      const element = document.getElementById(key);
      if (element) {
        element.textContent = stats[key];
      }
    });
  }

  setupGPAChart() {
    const ctx = document.getElementById("gpaChart");
    if (!ctx) return;

    // Demo GPA data
    const gpaData = {
      labels: ["Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "GPA",
          data: [3.2, 3.4, 3.6, 3.45],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };

    new Chart(ctx, {
      type: "line",
      data: gpaData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 2.0,
            max: 4.0,
            ticks: {
              stepSize: 0.5,
            },
          },
        },
        elements: {
          point: {
            radius: 6,
            hoverRadius: 8,
          },
        },
      },
    });
  }

  startAutoRefresh() {
    // Refresh dashboard data every 5 minutes
    setInterval(
      () => {
        this.updateStats();
      },
      5 * 60 * 1000,
    );
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait for auth manager to be ready
  setTimeout(() => {
    window.dashboard = new Dashboard();
  }, 100);
});
