// Teacher Dashboard Management System
class TeacherDashboard {
  constructor() {
    this.courses = [
      {
        id: "SE-401",
        name: "Software Engineering",
        students: 45,
        pending: 8,
        performance: 85,
        color: "primary",
      },
      {
        id: "DB-301",
        name: "Database Systems",
        students: 38,
        pending: 6,
        performance: 78,
        color: "success",
      },
      {
        id: "NET-201",
        name: "Computer Networks",
        students: 32,
        pending: 5,
        performance: 82,
        color: "info",
      },
      {
        id: "AI-301",
        name: "Artificial Intelligence",
        students: 12,
        pending: 4,
        performance: 90,
        color: "warning",
      },
    ];

    this.pendingSubmissions = [
      {
        id: 1,
        student: "Abenezer Bekele",
        studentId: "0998/24",
        course: "SE-401",
        assignment: "Design Patterns Project",
        submitted: "2 hours ago",
        dueDate: "Dec 15, 2024",
      },
      {
        id: 2,
        student: "Biruk Gebre",
        studentId: "0113/24",
        course: "DB-301",
        assignment: "Database Optimization",
        submitted: "1 day ago",
        dueDate: "Dec 14, 2024",
      },
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeCharts();
    this.loadDashboardData();
    this.setupFormHandlers();
  }

  setupEventListeners() {
    // Quick action buttons
    document
      .getElementById("selectAllSubmissions")
      ?.addEventListener("change", (e) =>
        this.toggleSelectAll(e.target.checked),
      );

    // Form submissions
    const forms = [
      "uploadMaterialForm",
      "addAssignmentForm",
      "gradeStudentForm",
      "createQuizForm",
      "scheduleSessionForm",
    ];

    forms.forEach((formId) => {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener("submit", (e) =>
          this.handleFormSubmit(e, formId),
        );
      }
    });
  }

  setupFormHandlers() {
    // Material upload form
    const uploadForm = document.getElementById("uploadMaterialForm");
    if (uploadForm) {
      uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.uploadMaterial();
      });
    }

    // Assignment creation form
    const assignmentForm = document.getElementById("addAssignmentForm");
    if (assignmentForm) {
      assignmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.createAssignment();
      });
    }

    // Grading form
    const gradeForm = document.getElementById("gradeStudentForm");
    if (gradeForm) {
      gradeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitGrade();
      });
    }

    // Quiz creation form
    const quizForm = document.getElementById("createQuizForm");
    if (quizForm) {
      quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.createQuiz();
      });
    }

    // Session scheduling form
    const sessionForm = document.getElementById("scheduleSessionForm");
    if (sessionForm) {
      sessionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.scheduleSession();
      });
    }
  }

  initializeCharts() {
    // Performance Analytics Chart
    const performanceCtx = document.getElementById("performanceChart");
    if (performanceCtx) {
      new Chart(performanceCtx, {
        type: "bar",
        data: {
          labels: ["SE-401", "DB-301", "NET-201", "AI-301"],
          datasets: [
            {
              label: "Average Performance (%)",
              data: [85, 78, 82, 90],
              backgroundColor: [
                "rgba(13, 110, 253, 0.8)",
                "rgba(25, 135, 84, 0.8)",
                "rgba(13, 202, 240, 0.8)",
                "rgba(255, 193, 7, 0.8)",
              ],
              borderColor: [
                "rgba(13, 110, 253, 1)",
                "rgba(25, 135, 84, 1)",
                "rgba(13, 202, 240, 1)",
                "rgba(255, 193, 7, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Submission Trends Chart
    const submissionCtx = document.getElementById("submissionChart");
    if (submissionCtx) {
      new Chart(submissionCtx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Submissions",
              data: [12, 8, 15, 10, 20, 5, 3],
              borderColor: "rgba(25, 135, 84, 1)",
              backgroundColor: "rgba(25, 135, 84, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Graded",
              data: [10, 6, 12, 8, 15, 4, 2],
              borderColor: "rgba(13, 110, 253, 1)",
              backgroundColor: "rgba(13, 110, 253, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  loadDashboardData() {
    // Update statistics
    this.updateStatistics();
    this.loadPendingSubmissions();
  }

  updateStatistics() {
    const totalStudents = this.courses.reduce(
      (sum, course) => sum + course.students,
      0,
    );
    const totalPending = this.courses.reduce(
      (sum, course) => sum + course.pending,
      0,
    );
    const upcomingClasses = 8; // Mock data

    document.getElementById("totalCourses").textContent = this.courses.length;
    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("pendingGrading").textContent = totalPending;
    document.getElementById("upcomingClasses").textContent = upcomingClasses;
  }

  loadPendingSubmissions() {
    const tbody = document.getElementById("pendingSubmissionsTable");
    if (!tbody) return;

    tbody.innerHTML = this.pendingSubmissions
      .map(
        (submission) => `
      <tr>
        <td>
          <input type="checkbox" class="form-check-input submission-check" value="${submission.id}">
        </td>
        <td>
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
              <i class="bi bi-person text-primary"></i>
            </div>
            <div>
              <div class="fw-semibold">${submission.student}</div>
              <small class="text-muted">${submission.studentId}</small>
            </div>
          </div>
        </td>
        <td><span class="badge bg-${this.getCourseColor(submission.course)}">${submission.course}</span></td>
        <td>${submission.assignment}</td>
        <td><small class="text-success">${submission.submitted}</small></td>
        <td><small class="text-muted">${submission.dueDate}</small></td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" onclick="teacherDashboard.viewSubmission(${submission.id})">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-success" onclick="teacherDashboard.gradeSubmission(${submission.id})">
              <i class="bi bi-award"></i>
            </button>
            <button class="btn btn-outline-info" onclick="teacherDashboard.provideFeedback(${submission.id})">
              <i class="bi bi-chat-text"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("");
  }

  getCourseColor(courseId) {
    const course = this.courses.find((c) => c.id === courseId);
    return course ? course.color : "secondary";
  }

  // Course Management Functions
  manageCourse(courseId) {
    alert(`Opening course management for ${courseId}`);
    // In a real app, this would navigate to course details page
  }

  viewStudents(courseId) {
    alert(`Viewing students for ${courseId}`);
    // In a real app, this would show student list modal
  }

  uploadContent(courseId) {
    // Open upload modal with pre-selected course
    const modal = new bootstrap.Modal(
      document.getElementById("uploadMaterialModal"),
    );
    document.getElementById("materialCourse").value = courseId;
    modal.show();
  }

  // Material Upload Functions
  uploadMaterial() {
    const form = document.getElementById("uploadMaterialForm");
    const formData = new FormData(form);

    // Simulate upload
    this.showToast("Material uploaded successfully!", "success");
    bootstrap.Modal.getInstance(
      document.getElementById("uploadMaterialModal"),
    ).hide();
    form.reset();
  }

  // Assignment Management Functions
  createAssignment() {
    const form = document.getElementById("addAssignmentForm");
    const formData = new FormData(form);

    // Simulate assignment creation
    this.showToast("Assignment created successfully!", "success");
    bootstrap.Modal.getInstance(
      document.getElementById("addAssignmentModal"),
    ).hide();
    form.reset();
  }

  // Grading Functions
  gradeSubmission(submissionId) {
    const submission = this.pendingSubmissions.find(
      (s) => s.id === submissionId,
    );
    if (submission) {
      // Pre-populate grading modal
      const modal = new bootstrap.Modal(
        document.getElementById("gradeStudentModal"),
      );
      document.getElementById("gradeStudent").innerHTML = `
        <option value="${submission.id}" selected>
          ${submission.student} - ${submission.assignment}
        </option>
      `;
      modal.show();
    }
  }

  submitGrade() {
    const form = document.getElementById("gradeStudentForm");
    const score = document.getElementById("gradeScore").value;
    const feedback = document.getElementById("gradeFeedback").value;

    // Simulate grade submission
    this.showToast(`Grade submitted: ${score}/100`, "success");
    bootstrap.Modal.getInstance(
      document.getElementById("gradeStudentModal"),
    ).hide();
    form.reset();

    // Remove from pending list (simulation)
    this.loadPendingSubmissions();
  }

  viewSubmission(submissionId) {
    alert(`Opening submission ${submissionId} for review`);
    // In a real app, this would open the submission viewer
  }

  provideFeedback(submissionId) {
    alert(`Opening feedback form for submission ${submissionId}`);
    // In a real app, this would open feedback modal
  }

  gradeSelected() {
    const selected = document.querySelectorAll(
      ".submission-check:checked",
    ).length;
    if (selected === 0) {
      alert("Please select submissions to grade");
      return;
    }
    alert(`Batch grading ${selected} submissions`);
  }

  approveAll() {
    if (confirm("Are you sure you want to approve all pending submissions?")) {
      this.showToast("All submissions approved!", "success");
      this.loadPendingSubmissions();
    }
  }

  // Quiz Management Functions
  createQuiz() {
    const form = document.getElementById("createQuizForm");
    const formData = new FormData(form);

    // Simulate quiz creation
    this.showToast("Quiz created successfully!", "success");
    bootstrap.Modal.getInstance(
      document.getElementById("createQuizModal"),
    ).hide();
    form.reset();
  }

  // Session Management Functions
  scheduleSession() {
    const form = document.getElementById("scheduleSessionForm");
    const formData = new FormData(form);

    // Simulate session scheduling
    this.showToast("Session scheduled successfully!", "success");
    bootstrap.Modal.getInstance(
      document.getElementById("scheduleSessionModal"),
    ).hide();
    form.reset();
  }

  // Communication Functions
  sendAnnouncement() {
    const message = prompt("Enter announcement message:");
    if (message) {
      this.showToast("Announcement sent to all students!", "success");
    }
  }

  // Utility Functions
  toggleSelectAll(checked) {
    document
      .querySelectorAll(".submission-check")
      .forEach((checkbox) => (checkbox.checked = checked));
  }

  exportReports() {
    // Simulate report generation
    this.showToast(
      "Generating reports... Download will start shortly.",
      "info",
    );
    setTimeout(() => {
      this.showToast("Reports exported successfully!", "success");
    }, 2000);
  }

  showToast(message, type = "info") {
    // Create toast notification
    const toastContainer = this.getOrCreateToastContainer();
    const toastId = `toast-${Date.now()}`;

    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Clean up after toast is hidden
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
    });
  }

  getOrCreateToastContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      container.style.zIndex = "1080";
      document.body.appendChild(container);
    }
    return container;
  }

  handleFormSubmit(event, formId) {
    event.preventDefault();

    switch (formId) {
      case "uploadMaterialForm":
        this.uploadMaterial();
        break;
      case "addAssignmentForm":
        this.createAssignment();
        break;
      case "gradeStudentForm":
        this.submitGrade();
        break;
      case "createQuizForm":
        this.createQuiz();
        break;
      case "scheduleSessionForm":
        this.scheduleSession();
        break;
    }
  }
}

// Global functions for button clicks
function manageCourse(courseId) {
  window.teacherDashboard.manageCourse(courseId);
}

function viewStudents(courseId) {
  window.teacherDashboard.viewStudents(courseId);
}

function uploadContent(courseId) {
  window.teacherDashboard.uploadContent(courseId);
}

function exportReports() {
  window.teacherDashboard.exportReports();
}

function sendAnnouncement() {
  window.teacherDashboard.sendAnnouncement();
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("bits_user");
    localStorage.removeItem("bits_demo_mode");
    window.location.href = "index.html";
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.teacherDashboard = new TeacherDashboard();
});
