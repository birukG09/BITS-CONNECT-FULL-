// Admin Dashboard functionality
class AdminDashboard {
  constructor() {
    this.currentSection = "dashboard";
    this.users = [];
    this.activityChart = null;
    this.userDistributionChart = null;
    this.init();
  }

  init() {
    this.loadDemoData();
    this.setupEventListeners();
    this.setupCharts();
    this.renderRecentActivity();
    this.renderUsersTable();
  }

  loadDemoData() {
    // Demo users data
    this.users = [
      {
        id: 1,
        name: "Hirut Getachew",
        email: "hirut.getachew@bitscollege.edu.et",
        role: "student",
        program: "software_engineering",
        status: "active",
        lastActive: "2 hours ago",
        joinDate: "2024-09-15",
        avatar: null,
      },
      {
        id: 2,
        name: "Dr. Alemayehu Worku",
        email: "alemayehu.worku@bitscollege.edu.et",
        role: "teacher",
        program: null,
        status: "active",
        lastActive: "1 hour ago",
        joinDate: "2023-08-01",
        avatar: null,
      },
      {
        id: 3,
        name: "Hirut Getachew",
        email: "hirut.getachew@bitscollege.edu.et",
        role: "student",
        program: "it_systems",
        status: "active",
        lastActive: "30 minutes ago",
        joinDate: "2024-10-01",
        avatar: null,
      },
      {
        id: 4,
        name: "Dawit Bekele",
        email: "dawit.bekele@bitscollege.edu.et",
        role: "student",
        program: "it_management",
        status: "inactive",
        lastActive: "2 days ago",
        joinDate: "2024-08-20",
        avatar: null,
      },
      {
        id: 5,
        name: "Prof. Hirut Getachew",
        email: "prof.hirut@bitscollege.edu.et",
        role: "teacher",
        program: null,
        status: "active",
        lastActive: "5 hours ago",
        joinDate: "2023-01-15",
        avatar: null,
      },
      {
        id: 6,
        name: "Selamawit Abebe",
        email: "selamawit.abebe@bitscollege.edu.et",
        role: "student",
        program: "software_engineering",
        status: "suspended",
        lastActive: "1 week ago",
        joinDate: "2024-09-10",
        avatar: null,
      },
      {
        id: 7,
        name: "Yonas Hailu",
        email: "yonas.hailu@bitscollege.edu.et",
        role: "student",
        program: "it_systems",
        status: "active",
        lastActive: "15 minutes ago",
        joinDate: "2024-11-05",
        avatar: null,
      },
      {
        id: 8,
        name: "Rahel Tesfaye",
        email: "rahel.tesfaye@bitscollege.edu.et",
        role: "student",
        program: "software_engineering",
        status: "active",
        lastActive: "1 hour ago",
        joinDate: "2024-09-25",
        avatar: null,
      },
    ];

    // Demo activity data
    this.recentActivity = [
      {
        time: "10:30 AM",
        user: "Hirut Getachew",
        action: "Assignment Submitted",
        details: "Database Design Project",
        status: "success",
      },
      {
        time: "10:15 AM",
        user: "Dr. Alemayehu",
        action: "Course Updated",
        details: "Software Engineering 401",
        status: "info",
      },
      {
        time: "09:45 AM",
        user: "Hirut Getachew",
        action: "Login",
        details: "Web Portal Access",
        status: "success",
      },
      {
        time: "09:30 AM",
        user: "System",
        action: "Resource Uploaded",
        details: "Machine Learning Notes.pdf",
        status: "info",
      },
      {
        time: "09:15 AM",
        user: "Dawit Bekele",
        action: "Password Changed",
        details: "Account Security",
        status: "warning",
      },
      {
        time: "08:50 AM",
        user: "Yonas Hailu",
        action: "New Registration",
        details: "Student Account Created",
        status: "success",
      },
    ];
  }

  setupEventListeners() {
    // Add user form
    const addUserForm = document.getElementById("addUserForm");
    if (addUserForm) {
      addUserForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.addUser();
      });
    }

    // Search and filter users
    document.getElementById("userSearch")?.addEventListener("input", (e) => {
      this.filterUsers();
    });

    document.getElementById("roleFilter")?.addEventListener("change", () => {
      this.filterUsers();
    });

    document.getElementById("statusFilter")?.addEventListener("change", () => {
      this.filterUsers();
    });

    document.getElementById("programFilter")?.addEventListener("change", () => {
      this.filterUsers();
    });

    // Select all checkbox
    document.getElementById("selectAll")?.addEventListener("change", (e) => {
      const checkboxes = document.querySelectorAll(".user-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
      });
    });
  }

  setupCharts() {
    // Activity Chart
    const activityCtx = document.getElementById("activityChart");
    if (activityCtx) {
      this.activityChart = new Chart(activityCtx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Active Users",
              data: [245, 289, 267, 312, 295, 203, 187],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "New Registrations",
              data: [12, 19, 15, 25, 18, 8, 5],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Course Enrollments",
              data: [35, 42, 38, 55, 48, 25, 18],
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "#f3f4f6",
              },
            },
            x: {
              grid: {
                color: "#f3f4f6",
              },
            },
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
        },
      });
    }

    // User Distribution Chart
    const userDistCtx = document.getElementById("userDistributionChart");
    if (userDistCtx) {
      this.userDistributionChart = new Chart(userDistCtx, {
        type: "doughnut",
        data: {
          labels: ["Students", "Teachers", "Administrators"],
          datasets: [
            {
              data: [285, 42, 8],
              backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },
          },
          cutout: "70%",
        },
      });
    }
  }

  renderRecentActivity() {
    const tableBody = document.getElementById("recentActivityTable");
    if (!tableBody) return;

    tableBody.innerHTML = this.recentActivity
      .map(
        (activity) => `
      <tr>
        <td>
          <small class="text-muted">${activity.time}</small>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <div class="bg-secondary rounded-circle me-2" style="width: 24px; height: 24px;"></div>
            <span class="fw-medium">${activity.user}</span>
          </div>
        </td>
        <td>${activity.action}</td>
        <td class="text-muted">${activity.details}</td>
        <td>
          <span class="badge bg-${this.getStatusColor(activity.status)}">${activity.status}</span>
        </td>
      </tr>
    `,
      )
      .join("");
  }

  renderUsersTable() {
    const tableBody = document.getElementById("usersTable");
    if (!tableBody) return;

    const filteredUsers = this.getFilteredUsers();

    tableBody.innerHTML = filteredUsers
      .map(
        (user) => `
      <tr>
        <td>
          <input type="checkbox" class="form-check-input user-checkbox" value="${user.id}">
        </td>
        <td>
          <div class="d-flex align-items-center">
            <div class="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
              <i class="bi bi-person text-white"></i>
            </div>
            <div>
              <div class="fw-medium">${user.name}</div>
              <small class="text-muted">${user.email}</small>
            </div>
          </div>
        </td>
        <td>
          <span class="badge bg-${this.getRoleColor(user.role)}">${this.formatRole(user.role)}</span>
        </td>
        <td>
          ${user.program ? this.formatProgram(user.program) : '<span class="text-muted">—</span>'}
        </td>
        <td>
          <span class="status-badge status-${user.status}">${user.status}</span>
        </td>
        <td class="text-muted">${user.lastActive}</td>
        <td>
          <div class="btn-group btn-group-sm" role="group">
            <button class="action-btn btn-view" onclick="viewUser(${user.id})" title="View">
              <i class="bi bi-eye"></i>
            </button>
            <button class="action-btn btn-edit" onclick="editUser(${user.id})" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="action-btn btn-delete" onclick="deleteUser(${user.id})" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("");
  }

  getFilteredUsers() {
    const search =
      document.getElementById("userSearch")?.value.toLowerCase() || "";
    const roleFilter = document.getElementById("roleFilter")?.value || "";
    const statusFilter = document.getElementById("statusFilter")?.value || "";
    const programFilter = document.getElementById("programFilter")?.value || "";

    return this.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      const matchesProgram = !programFilter || user.program === programFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesProgram;
    });
  }

  filterUsers() {
    this.renderUsersTable();
  }

  addUser() {
    const form = document.getElementById("addUserForm");
    const formData = new FormData(form);

    const newUser = {
      id: Math.max(...this.users.map((u) => u.id)) + 1,
      name: document.getElementById("newUserName").value,
      email: document.getElementById("newUserEmail").value,
      role: document.getElementById("newUserRole").value,
      program: document.getElementById("newUserProgram").value || null,
      status: document.getElementById("newUserStatus").value,
      lastActive: "Just now",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: null,
    };

    this.users.unshift(newUser);
    this.renderUsersTable();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addUserModal"),
    );
    modal.hide();
    form.reset();

    this.showNotification("User created successfully!", "success");
  }

  getStatusColor(status) {
    const colors = {
      success: "success",
      info: "info",
      warning: "warning",
      error: "danger",
    };
    return colors[status] || "secondary";
  }

  getRoleColor(role) {
    const colors = {
      admin: "danger",
      teacher: "warning",
      student: "primary",
    };
    return colors[role] || "secondary";
  }

  formatRole(role) {
    const roles = {
      admin: "Administrator",
      teacher: "Teacher",
      student: "Student",
    };
    return roles[role] || role;
  }

  formatProgram(program) {
    const programs = {
      software_engineering: "Software Engineering",
      it_systems: "IT Systems",
      it_management: "IT Management",
    };
    return programs[program] || program;
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible position-fixed`;
    notification.style.cssText =
      "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}

// Global functions for navigation and actions
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  const targetSection = document.getElementById(`${sectionId}-section`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update active nav link
  document.querySelectorAll(".sidebar-menu .nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // Update page title
  const titles = {
    dashboard: {
      title: "Admin Dashboard",
      subtitle: "Overview of BiTS Connect platform",
    },
    users: {
      title: "User Management",
      subtitle: "Manage students, teachers, and administrators",
    },
    courses: {
      title: "Courses & Programs",
      subtitle: "Manage academic courses and programs",
    },
    content: {
      title: "Content Management",
      subtitle: "Manage blog posts and announcements",
    },
    library: {
      title: "Digital Library",
      subtitle: "Manage library resources and uploads",
    },
    analytics: {
      title: "Analytics & Reports",
      subtitle: "Platform usage and performance analytics",
    },
    system: {
      title: "System Settings",
      subtitle: "Configure platform settings and preferences",
    },
    logs: {
      title: "Activity Logs",
      subtitle: "Monitor system activity and user actions",
    },
  };

  const titleInfo = titles[sectionId] || {
    title: "Admin Panel",
    subtitle: "BiTS Connect Administration",
  };
  document.getElementById("pageTitle").textContent = titleInfo.title;
  document.getElementById("pageSubtitle").textContent = titleInfo.subtitle;

  window.adminDashboard.currentSection = sectionId;
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
}

// User action functions
function viewUser(userId) {
  const user = window.adminDashboard.users.find((u) => u.id === userId);
  if (user) {
    window.adminDashboard.showNotification(
      `Viewing details for ${user.name}`,
      "info",
    );
  }
}

function editUser(userId) {
  const user = window.adminDashboard.users.find((u) => u.id === userId);
  if (user) {
    window.adminDashboard.showNotification(
      `Edit functionality for ${user.name}`,
      "info",
    );
  }
}

function deleteUser(userId) {
  const user = window.adminDashboard.users.find((u) => u.id === userId);
  if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
    window.adminDashboard.users = window.adminDashboard.users.filter(
      (u) => u.id !== userId,
    );
    window.adminDashboard.renderUsersTable();
    window.adminDashboard.showNotification(
      `${user.name} has been deleted`,
      "success",
    );
  }
}

function exportUsers() {
  window.adminDashboard.showNotification("Exporting user data...", "info");
}

function refreshUsers() {
  window.adminDashboard.renderUsersTable();
  window.adminDashboard.showNotification("User list refreshed", "success");
}

function generateReport() {
  window.adminDashboard.showNotification("Generating system report...", "info");
}

// Initialize admin dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.adminDashboard = new AdminDashboard();

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.querySelector("[onclick='toggleSidebar()']");

    if (
      window.innerWidth <= 992 &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target) &&
      sidebar.classList.contains("show")
    ) {
      sidebar.classList.remove("show");
    }
  });
});
