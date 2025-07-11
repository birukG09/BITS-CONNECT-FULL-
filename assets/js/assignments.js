// Assignments Management
class AssignmentsManager {
  constructor() {
    this.assignments = [];
    this.filteredAssignments = [];
    this.currentView = "list";
    this.currentEditId = null;
    this.init();
  }

  init() {
    this.loadAssignments();
    this.setupEventListeners();
    this.updateStats();
  }

  loadAssignments() {
    // Demo assignments data
    this.assignments = [
      {
        id: 1,
        title: "Database Design Project",
        course: "Database Systems",
        courseCode: "db-301",
        description:
          "Design and implement a complete database system for a library management system",
        dueDate: "2024-12-25",
        priority: "high",
        status: "in-progress",
        createdDate: "2024-12-01",
        progress: 60,
      },
      {
        id: 2,
        title: "Network Security Analysis",
        course: "Cybersecurity",
        courseCode: "sec-301",
        description:
          "Analyze network vulnerabilities and propose security measures",
        dueDate: "2024-12-20",
        priority: "high",
        status: "pending",
        createdDate: "2024-11-28",
        progress: 0,
      },
      {
        id: 3,
        title: "React Web Application",
        course: "Software Engineering",
        courseCode: "se-401",
        description: "Build a complete web application using React and Node.js",
        dueDate: "2024-12-30",
        priority: "medium",
        status: "in-progress",
        createdDate: "2024-11-25",
        progress: 40,
      },
      {
        id: 4,
        title: "Network Protocol Implementation",
        course: "Computer Networks",
        courseCode: "net-201",
        description: "Implement a simple network protocol in C++",
        dueDate: "2024-12-18",
        priority: "medium",
        status: "completed",
        createdDate: "2024-11-20",
        progress: 100,
      },
      {
        id: 5,
        title: "Algorithm Analysis Paper",
        course: "Software Engineering",
        courseCode: "se-401",
        description: "Write a research paper on algorithm complexity analysis",
        dueDate: "2024-12-22",
        priority: "low",
        status: "pending",
        createdDate: "2024-11-15",
        progress: 0,
      },
      {
        id: 6,
        title: "SQL Query Optimization",
        course: "Database Systems",
        courseCode: "db-301",
        description: "Optimize complex SQL queries for better performance",
        dueDate: "2024-12-28",
        priority: "medium",
        status: "pending",
        createdDate: "2024-11-10",
        progress: 20,
      },
      {
        id: 7,
        title: "Firewall Configuration",
        course: "Cybersecurity",
        courseCode: "sec-301",
        description: "Configure and test firewall rules for enterprise network",
        dueDate: "2024-12-15",
        priority: "high",
        status: "completed",
        createdDate: "2024-11-05",
        progress: 100,
      },
      {
        id: 8,
        title: "Mobile App Development",
        course: "Software Engineering",
        courseCode: "se-401",
        description: "Develop a cross-platform mobile application",
        dueDate: "2025-01-05",
        priority: "low",
        status: "pending",
        createdDate: "2024-11-01",
        progress: 0,
      },
      {
        id: 9,
        title: "Network Topology Design",
        course: "Computer Networks",
        courseCode: "net-201",
        description: "Design optimal network topology for a corporate office",
        dueDate: "2024-12-19",
        priority: "medium",
        status: "in-progress",
        createdDate: "2024-10-28",
        progress: 75,
      },
      {
        id: 10,
        title: "Database Backup Strategy",
        course: "Database Systems",
        courseCode: "db-301",
        description:
          "Develop comprehensive database backup and recovery strategy",
        dueDate: "2024-12-16",
        priority: "high",
        status: "completed",
        createdDate: "2024-10-25",
        progress: 100,
      },
      {
        id: 11,
        title: "Penetration Testing Report",
        course: "Cybersecurity",
        courseCode: "sec-301",
        description: "Conduct penetration testing and document findings",
        dueDate: "2024-12-27",
        priority: "high",
        status: "pending",
        createdDate: "2024-10-20",
        progress: 0,
      },
      {
        id: 12,
        title: "Software Testing Framework",
        course: "Software Engineering",
        courseCode: "se-401",
        description:
          "Implement automated testing framework for web applications",
        dueDate: "2025-01-10",
        priority: "low",
        status: "pending",
        createdDate: "2024-10-15",
        progress: 10,
      },
    ];

    this.filteredAssignments = [...this.assignments];
    this.renderAssignments();
  }

  setupEventListeners() {
    // Filters
    document
      .getElementById("statusFilter")
      .addEventListener("change", () => this.filterAssignments());
    document
      .getElementById("priorityFilter")
      .addEventListener("change", () => this.filterAssignments());
    document
      .getElementById("courseFilter")
      .addEventListener("change", () => this.filterAssignments());

    // View mode
    document.querySelectorAll('input[name="viewMode"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.currentView = e.target.id === "listView" ? "list" : "card";
        this.renderAssignments();
      });
    });

    // Add assignment form
    document
      .getElementById("addAssignmentForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.addAssignment();
      });

    // Edit assignment form
    document
      .getElementById("editAssignmentForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.updateAssignment();
      });
  }

  filterAssignments() {
    const statusFilter = document.getElementById("statusFilter").value;
    const priorityFilter = document.getElementById("priorityFilter").value;
    const courseFilter = document.getElementById("courseFilter").value;

    this.filteredAssignments = this.assignments.filter((assignment) => {
      const matchesStatus = !statusFilter || assignment.status === statusFilter;
      const matchesPriority =
        !priorityFilter || assignment.priority === priorityFilter;
      const matchesCourse =
        !courseFilter || assignment.courseCode === courseFilter;

      return matchesStatus && matchesPriority && matchesCourse;
    });

    this.renderAssignments();
    this.updateResultCount();
    this.updateStats();
  }

  renderAssignments() {
    const container = document.getElementById("assignmentsContainer");

    if (this.filteredAssignments.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-inbox text-muted h1"></i>
          <h5 class="text-muted">No assignments found</h5>
          <p class="text-muted">Try adjusting your filters or add a new assignment</p>
        </div>
      `;
      return;
    }

    if (this.currentView === "list") {
      container.innerHTML = this.filteredAssignments
        .map((assignment) => this.createAssignmentListItem(assignment))
        .join("");
    } else {
      container.innerHTML = `
        <div class="row g-4">
          ${this.filteredAssignments
            .map((assignment) => this.createAssignmentCard(assignment))
            .join("")}
        </div>
      `;
    }
  }

  createAssignmentListItem(assignment) {
    const statusClass = this.getStatusClass(assignment.status);
    const priorityClass = this.getPriorityClass(assignment.priority);
    const isOverdue =
      new Date(assignment.dueDate) < new Date() &&
      assignment.status !== "completed";
    const daysUntilDue = this.getDaysUntilDue(assignment.dueDate);

    return `
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="d-flex align-items-start">
                <div class="me-3">
                  <div class="bg-${statusClass} bg-opacity-10 rounded p-2">
                    <i class="bi ${this.getStatusIcon(assignment.status)} text-${statusClass}"></i>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-1">${assignment.title}</h6>
                  <p class="text-muted small mb-1">${assignment.course}</p>
                  <p class="text-muted small mb-0">${assignment.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="text-center">
                <div class="small text-muted mb-1">Due Date</div>
                <div class="fw-medium ${isOverdue ? "text-danger" : ""}">${this.formatDate(assignment.dueDate)}</div>
                <small class="text-muted">${daysUntilDue}</small>
              </div>
            </div>
            <div class="col-md-2">
              <div class="text-center">
                <span class="badge bg-${priorityClass}">${assignment.priority.toUpperCase()}</span>
                <div class="mt-2">
                  <span class="badge bg-${statusClass}">${assignment.status.replace("-", " ").toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div class="col-md-1">
              <div class="dropdown">
                <button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" onclick="editAssignment(${assignment.id})">
                    <i class="bi bi-pencil me-2"></i>Edit
                  </a></li>
                  <li><a class="dropdown-item" href="#" onclick="toggleStatus(${assignment.id})">
                    <i class="bi bi-check-circle me-2"></i>Mark as ${assignment.status === "completed" ? "Pending" : "Completed"}
                  </a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" onclick="confirmDelete(${assignment.id})">
                    <i class="bi bi-trash me-2"></i>Delete
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
          ${
            assignment.status !== "completed" && assignment.progress > 0
              ? `
          <div class="row mt-3">
            <div class="col-12">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="text-muted">Progress</small>
                <small class="text-muted">${assignment.progress}%</small>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-${statusClass}" style="width: ${assignment.progress}%"></div>
              </div>
            </div>
          </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  createAssignmentCard(assignment) {
    const statusClass = this.getStatusClass(assignment.status);
    const priorityClass = this.getPriorityClass(assignment.priority);
    const isOverdue =
      new Date(assignment.dueDate) < new Date() &&
      assignment.status !== "completed";
    const daysUntilDue = this.getDaysUntilDue(assignment.dueDate);

    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm hover-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="bg-${statusClass} bg-opacity-10 rounded p-2">
                <i class="bi ${this.getStatusIcon(assignment.status)} text-${statusClass}"></i>
              </div>
              <div class="dropdown">
                <button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" onclick="editAssignment(${assignment.id})">
                    <i class="bi bi-pencil me-2"></i>Edit
                  </a></li>
                  <li><a class="dropdown-item" href="#" onclick="toggleStatus(${assignment.id})">
                    <i class="bi bi-check-circle me-2"></i>Mark as ${assignment.status === "completed" ? "Pending" : "Completed"}
                  </a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" onclick="confirmDelete(${assignment.id})">
                    <i class="bi bi-trash me-2"></i>Delete
                  </a></li>
                </ul>
              </div>
            </div>

            <h6 class="card-title mb-2">${assignment.title}</h6>
            <p class="text-muted small mb-2">${assignment.course}</p>
            <p class="card-text text-muted small mb-3" style="height: 3rem; overflow: hidden;">
              ${assignment.description}
            </p>

            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-${priorityClass}">${assignment.priority.toUpperCase()}</span>
                <span class="badge bg-${statusClass}">${assignment.status.replace("-", " ").toUpperCase()}</span>
              </div>
              <div class="text-center">
                <div class="small text-muted">Due Date</div>
                <div class="fw-medium ${isOverdue ? "text-danger" : ""}">${this.formatDate(assignment.dueDate)}</div>
                <small class="text-muted">${daysUntilDue}</small>
              </div>
            </div>

            ${
              assignment.status !== "completed" && assignment.progress > 0
                ? `
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small class="text-muted">Progress</small>
                <small class="text-muted">${assignment.progress}%</small>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-${statusClass}" style="width: ${assignment.progress}%"></div>
              </div>
            </div>
            `
                : ""
            }

            <div class="d-grid">
              <button class="btn btn-outline-primary btn-sm" onclick="editAssignment(${assignment.id})">
                <i class="bi bi-pencil me-1"></i>Edit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  addAssignment() {
    const form = document.getElementById("addAssignmentForm");
    const formData = new FormData(form);

    const newAssignment = {
      id: Math.max(...this.assignments.map((a) => a.id)) + 1,
      title: document.getElementById("assignmentTitle").value,
      course:
        document.getElementById("assignmentCourse").selectedOptions[0].text,
      courseCode: document.getElementById("assignmentCourse").value,
      description: document.getElementById("assignmentDescription").value,
      dueDate: document.getElementById("assignmentDueDate").value,
      priority: document.getElementById("assignmentPriority").value,
      status: document.getElementById("assignmentStatus").value,
      createdDate: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    this.assignments.unshift(newAssignment);
    this.filterAssignments();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addAssignmentModal"),
    );
    modal.hide();
    form.reset();

    window.showToast("Assignment added successfully!", "success");
  }

  editAssignment(id) {
    const assignment = this.assignments.find((a) => a.id === id);
    if (!assignment) return;

    this.currentEditId = id;

    // Populate edit form
    document.getElementById("editAssignmentId").value = assignment.id;
    document.getElementById("editTitle").value = assignment.title;
    document.getElementById("editCourse").value = assignment.courseCode;
    document.getElementById("editDueDate").value = assignment.dueDate;
    document.getElementById("editPriority").value = assignment.priority;
    document.getElementById("editStatus").value = assignment.status;
    document.getElementById("editDescription").value = assignment.description;

    // Show modal
    const modal = new bootstrap.Modal(
      document.getElementById("editAssignmentModal"),
    );
    modal.show();
  }

  updateAssignment() {
    const id = this.currentEditId;
    const assignmentIndex = this.assignments.findIndex((a) => a.id === id);

    if (assignmentIndex === -1) return;

    this.assignments[assignmentIndex] = {
      ...this.assignments[assignmentIndex],
      title: document.getElementById("editTitle").value,
      course: document.getElementById("editCourse").selectedOptions[0].text,
      courseCode: document.getElementById("editCourse").value,
      description: document.getElementById("editDescription").value,
      dueDate: document.getElementById("editDueDate").value,
      priority: document.getElementById("editPriority").value,
      status: document.getElementById("editStatus").value,
    };

    this.filterAssignments();

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editAssignmentModal"),
    );
    modal.hide();

    window.showToast("Assignment updated successfully!", "success");
  }

  deleteAssignment() {
    const id = this.currentEditId;
    this.assignments = this.assignments.filter((a) => a.id !== id);
    this.filterAssignments();

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editAssignmentModal"),
    );
    modal.hide();

    window.showToast("Assignment deleted successfully!", "success");
  }

  toggleStatus(id) {
    const assignment = this.assignments.find((a) => a.id === id);
    if (!assignment) return;

    assignment.status =
      assignment.status === "completed" ? "pending" : "completed";
    assignment.progress =
      assignment.status === "completed" ? 100 : assignment.progress;

    this.filterAssignments();
    window.showToast(`Assignment marked as ${assignment.status}!`, "success");
  }

  updateStats() {
    const total = this.filteredAssignments.length;
    const pending = this.filteredAssignments.filter(
      (a) => a.status === "pending",
    ).length;
    const inProgress = this.filteredAssignments.filter(
      (a) => a.status === "in-progress",
    ).length;
    const completed = this.filteredAssignments.filter(
      (a) => a.status === "completed",
    ).length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("inProgressCount").textContent = inProgress;
    document.getElementById("completedCount").textContent = completed;
  }

  updateResultCount() {
    const count = this.filteredAssignments.length;
    document.getElementById("resultCount").textContent =
      `Showing ${count} assignment${count !== 1 ? "s" : ""}`;
  }

  getStatusClass(status) {
    const classes = {
      pending: "warning",
      "in-progress": "info",
      completed: "success",
      overdue: "danger",
    };
    return classes[status] || "secondary";
  }

  getPriorityClass(priority) {
    const classes = {
      low: "success",
      medium: "warning",
      high: "danger",
    };
    return classes[priority] || "secondary";
  }

  getStatusIcon(status) {
    const icons = {
      pending: "bi-clock",
      "in-progress": "bi-play-circle",
      completed: "bi-check-circle",
      overdue: "bi-exclamation-triangle",
    };
    return icons[status] || "bi-circle";
  }

  getDaysUntilDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `${diffDays} days left`;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

// Global functions
function editAssignment(id) {
  window.assignmentsManager.editAssignment(id);
}

function toggleStatus(id) {
  window.assignmentsManager.toggleStatus(id);
}

function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this assignment?")) {
    window.assignmentsManager.currentEditId = id;
    window.assignmentsManager.deleteAssignment();
  }
}

function deleteAssignment() {
  window.assignmentsManager.deleteAssignment();
}

function clearFilters() {
  document.getElementById("statusFilter").value = "";
  document.getElementById("priorityFilter").value = "";
  document.getElementById("courseFilter").value = "";
  window.assignmentsManager.filterAssignments();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.assignmentsManager = new AssignmentsManager();
  }, 100);
});
