// BiTS GPA Tracker with Complete Curriculum Database
class GPATracker {
  constructor() {
    this.courses = [];
    this.currentProgram = "software_engineering";
    this.totalCreditsRequired = 140;

    // BiTS Curriculum Database
    this.curriculum = {
      software_engineering: [
        // Core SE Courses
        {
          code: "SE101",
          title: "Introduction to Computer Systems",
          credits: 3,
        },
        {
          code: "SE104",
          title: "Introduction to Software Engineering",
          credits: 3,
        },
        { code: "SE131", title: "Fundamentals of Programming", credits: 3 },
        { code: "SE132", title: "Object Oriented Programming", credits: 3 },
        {
          code: "SE221",
          title: "Information Assurance and Systems Security",
          credits: 3,
        },
        {
          code: "SE223",
          title: "Software Requirements Engineering",
          credits: 3,
        },
        {
          code: "SE224",
          title: "Process Modeling and Workflow Design",
          credits: 3,
        },
        {
          code: "SE226",
          title: "Software Design and Architecture",
          credits: 3,
        },
        { code: "SE231", title: "Advanced Programming", credits: 3 },
        { code: "SE233", title: "Data Structures and Algorithms", credits: 3 },
        { code: "SE252", title: "Operating Systems", credits: 3 },
        {
          code: "SE322",
          title: "Software Quality Assurance and Testing",
          credits: 3,
        },
        {
          code: "SE324",
          title: "Software Usability and Management",
          credits: 3,
        },
        { code: "SE327", title: "Enterprise Systems", credits: 3 },
        { code: "SE331", title: "Mobile Application Development", credits: 3 },
        {
          code: "SE366",
          title: "Methods for Software Engineering Research",
          credits: 3,
        },
        { code: "SE376", title: "Software Project Management", credits: 3 },
        {
          code: "SE421",
          title: "Systems Thinking and Systems Approach",
          credits: 3,
        },
        {
          code: "SE424",
          title: "Continuous Integration and Deployment",
          credits: 3,
        },
        { code: "SE425", title: "Service-oriented Architecture", credits: 3 },
        { code: "SE426", title: "Seminar in Software Engineering", credits: 3 },
        { code: "SE478", title: "Software Product Management", credits: 3 },
        {
          code: "SE491",
          title: "Software Engineering Capstone Project I",
          credits: 4,
        },
        {
          code: "SE492",
          title: "Software Engineering Capstone Project II",
          credits: 4,
        },

        // Math Courses
        { code: "MT161", title: "Discrete Mathematics", credits: 3 },
        { code: "MT164", title: "Linear Algebra", credits: 3 },
        { code: "MT261", title: "Calculus", credits: 3 },
        { code: "MT266", title: "Boolean Algebra", credits: 3 },
        { code: "MT361", title: "Statistical Methods", credits: 3 },

        // IT Integration Courses
        {
          code: "IT154",
          title: "Data Communication and Computer Networks I",
          credits: 3,
        },
        { code: "IT463", title: "Foundations of Data Analytics", credits: 3 },

        // Elective Courses
        {
          code: "SE321",
          title: "Software Process Improvement (elective)",
          credits: 3,
        },
        { code: "SE427", title: "Ethical Computing (elective)", credits: 3 },
        {
          code: "IT365",
          title: "Introduction to Artificial Intelligence (elective)",
          credits: 3,
        },
        {
          code: "IT366",
          title: "Knowledge Discovery and Data Mining (elective)",
          credits: 3,
        },
        {
          code: "IT479",
          title: "Management Information Systems (elective)",
          credits: 3,
        },

        // Support Courses
        { code: "SP111", title: "English Communication I", credits: 2 },
        { code: "SP112", title: "English Communication II", credits: 2 },
        { code: "SP211", title: "Logic and Critical Thinking", credits: 3 },
        { code: "SP212", title: "Introduction to Psychology", credits: 3 },
        { code: "SP311", title: "Civics and Ethics", credits: 2 },
        { code: "SP312", title: "Introduction to Economics", credits: 3 },
        { code: "SP411", title: "Entrepreneurship", credits: 3 },
        { code: "SP416", title: "Physical Education", credits: 2 },
      ],

      it_systems: [
        // Core IT Courses
        { code: "IT105", title: "Introduction to ICT", credits: 3 },
        {
          code: "IT107",
          title: "Foundations of Information Systems",
          credits: 3,
        },
        { code: "IT146", title: "Database Systems I", credits: 3 },
        {
          code: "IT154",
          title: "Data Communications and Computer Networks I",
          credits: 3,
        },
        {
          code: "IT155",
          title: "Data Communications and Computer Networks II",
          credits: 3,
        },
        { code: "IT221", title: "Systems Analysis and Design I", credits: 3 },
        { code: "IT222", title: "Systems Analysis and Design II", credits: 3 },
        { code: "IT247", title: "Database Systems II", credits: 3 },
        {
          code: "IT284",
          title: "Introduction to Web Technologies",
          credits: 3,
        },
        { code: "IT325", title: "Software Design & Construction", credits: 3 },
        {
          code: "IT328",
          title: "IT Systems Acquisition and Integration",
          credits: 3,
        },
        {
          code: "IT358",
          title: "Cyber Security and Ethical Hacking",
          credits: 3,
        },
        {
          code: "IT374",
          title: "IT Needs Assessment and Management",
          credits: 3,
        },
        { code: "IT471", title: "IT Project Management", credits: 3 },
        { code: "IT474", title: "Special Topics in IT", credits: 3 },
        { code: "IT476", title: "IT Service Management", credits: 3 },
        {
          code: "IT481",
          title: "Cloud Computing and Data Centre Management",
          credits: 3,
        },
        { code: "IT493", title: "IT Capstone Project I", credits: 4 },
        { code: "IT494", title: "IT Capstone Project II", credits: 4 },

        // Shared SE Courses
        { code: "SE131", title: "Fundamentals of Programming", credits: 3 },
        { code: "SE132", title: "Object Oriented Programming", credits: 3 },
        {
          code: "SE221",
          title: "Information Assurance and Systems Security",
          credits: 3,
        },
        { code: "SE252", title: "Operating Systems", credits: 3 },
        { code: "SE327", title: "Enterprise Systems", credits: 3 },
        { code: "SE366", title: "Methods for IS Research", credits: 3 },
        { code: "SE381", title: "Web Systems and Services", credits: 3 },
        {
          code: "SE421",
          title: "Systems Thinking and Systems Approach",
          credits: 3,
        },

        // Math Courses
        { code: "MT161", title: "Discrete Mathematics", credits: 3 },
        { code: "MT164", title: "Linear Algebra", credits: 3 },
        { code: "MT361", title: "Statistical Methods", credits: 3 },

        // Elective Courses
        {
          code: "IT368",
          title: "Knowledge Discovery and Data Mining (elective)",
          credits: 3,
        },
        {
          code: "IT372",
          title: "Disaster Recovery & Business Continuity (elective)",
          credits: 3,
        },
        {
          code: "IT475",
          title: "IS Governance and Audit (elective)",
          credits: 3,
        },
        { code: "IT477", title: "IT Policy and Law (elective)", credits: 3 },
        {
          code: "IT479",
          title: "Management Information Systems (elective)",
          credits: 3,
        },

        // Support Courses (shared)
        { code: "SP111", title: "English Communication I", credits: 2 },
        { code: "SP112", title: "English Communication II", credits: 2 },
        { code: "SP211", title: "Logic and Critical Thinking", credits: 3 },
        { code: "SP212", title: "Introduction to Psychology", credits: 3 },
        { code: "SP311", title: "Civics and Ethics", credits: 2 },
        { code: "SP312", title: "Introduction to Economics", credits: 3 },
        { code: "SP411", title: "Entrepreneurship", credits: 3 },
        { code: "SP416", title: "Physical Education", credits: 2 },
      ],
    };

    // BiTS Grading Scale
    this.gradePoints = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.5,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.5,
      C: 2.0,
      "C-": 1.75,
      D: 1.0,
      F: 0.0,
    };

    this.init();
  }

  init() {
    this.loadSampleData();
    this.setupEventListeners();
    this.loadProgramCourses();
    this.renderCourses();
    this.updateStatistics();
    this.initializeChart();
  }

  loadSampleData() {
    // Sample completed courses for demonstration
    this.courses = [
      {
        id: 1,
        code: "SE101",
        title: "Introduction to Computer Systems",
        credits: 3,
        grade: "A",
        status: "completed",
        year: 1,
        semester: "1st Semester 2022",
      },
      {
        id: 2,
        code: "SE131",
        title: "Fundamentals of Programming",
        credits: 3,
        grade: "A+",
        status: "completed",
        year: 1,
        semester: "1st Semester 2022",
      },
      {
        id: 3,
        code: "MT161",
        title: "Discrete Mathematics",
        credits: 3,
        grade: "B+",
        status: "completed",
        year: 1,
        semester: "1st Semester 2022",
      },
      {
        id: 4,
        code: "SE132",
        title: "Object Oriented Programming",
        credits: 3,
        grade: "A",
        status: "completed",
        year: 1,
        semester: "2nd Semester 2023",
      },
      {
        id: 5,
        code: "SE233",
        title: "Data Structures and Algorithms",
        credits: 3,
        grade: "A-",
        status: "completed",
        year: 1,
        semester: "2nd Semester 2023",
      },
      {
        id: 6,
        code: "MT164",
        title: "Linear Algebra",
        credits: 3,
        grade: "B+",
        status: "completed",
        year: 1,
        semester: "2nd Semester 2023",
      },
      {
        id: 7,
        code: "SE226",
        title: "Software Design and Architecture",
        credits: 3,
        grade: "A",
        status: "completed",
        year: 2,
        semester: "1st Semester 2023",
      },
      {
        id: 8,
        code: "SE252",
        title: "Operating Systems",
        credits: 3,
        grade: "B+",
        status: "completed",
        year: 2,
        semester: "1st Semester 2023",
      },
      {
        id: 9,
        code: "MT261",
        title: "Calculus",
        credits: 3,
        grade: "A-",
        status: "completed",
        year: 2,
        semester: "1st Semester 2023",
      },
      {
        id: 10,
        code: "SE322",
        title: "Software Quality Assurance and Testing",
        credits: 3,
        grade: "A",
        status: "completed",
        year: 2,
        semester: "2nd Semester 2024",
      },
      {
        id: 11,
        code: "SE327",
        title: "Enterprise Systems",
        credits: 3,
        grade: "A+",
        status: "completed",
        year: 2,
        semester: "2nd Semester 2024",
      },
      {
        id: 12,
        code: "IT154",
        title: "Data Communication and Computer Networks I",
        credits: 3,
        grade: "B+",
        status: "completed",
        year: 2,
        semester: "2nd Semester 2024",
      },
      // In Progress Courses
      {
        id: 13,
        code: "SE376",
        title: "Software Project Management",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      {
        id: 14,
        code: "SE425",
        title: "Service-oriented Architecture",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      {
        id: 15,
        code: "SE331",
        title: "Mobile Application Development",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      {
        id: 16,
        code: "MT361",
        title: "Statistical Methods",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      {
        id: 17,
        code: "SE366",
        title: "Methods for Software Engineering Research",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      {
        id: 18,
        code: "IT463",
        title: "Foundations of Data Analytics",
        credits: 3,
        grade: "",
        status: "inprogress",
        year: 3,
        semester: "1st Semester 2024",
      },
      // Planned Courses
      {
        id: 19,
        code: "SE491",
        title: "Software Engineering Capstone Project I",
        credits: 4,
        grade: "",
        status: "planned",
        year: 3,
        semester: "2nd Semester 2025",
      },
      {
        id: 20,
        code: "SE492",
        title: "Software Engineering Capstone Project II",
        credits: 4,
        grade: "",
        status: "planned",
        year: 4,
        semester: "1st Semester 2025",
      },
    ];
  }

  setupEventListeners() {
    // Program selection
    document
      .getElementById("programSelect")
      ?.addEventListener("change", () => this.loadProgramCourses());

    // Add course form
    document
      .getElementById("addCourseForm")
      ?.addEventListener("submit", (e) => this.handleAddCourse(e));

    // Edit course form
    document
      .getElementById("editCourseForm")
      ?.addEventListener("submit", (e) => this.handleEditCourse(e));

    // Course selection in modal
    document
      .getElementById("courseSelect")
      ?.addEventListener("change", () => this.populateCourseDetails());
  }

  loadProgramCourses() {
    const program = document.getElementById("programSelect").value;
    this.currentProgram = program;

    const courseSelect = document.getElementById("courseSelect");
    if (!courseSelect) return;

    courseSelect.innerHTML =
      '<option value="">Choose from curriculum...</option>';

    const courses = this.curriculum[program] || [];
    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.code;
      option.textContent = `${course.code} - ${course.title} (${course.credits} credits)`;
      courseSelect.appendChild(option);
    });

    this.updateStatistics();
  }

  populateCourseDetails() {
    const selectedCode = document.getElementById("courseSelect").value;
    if (!selectedCode) return;

    const course = this.curriculum[this.currentProgram]?.find(
      (c) => c.code === selectedCode,
    );

    if (course) {
      document.getElementById("customCourseCode").value = course.code;
      document.getElementById("customCourseTitle").value = course.title;
      document.getElementById("courseCredits").value = course.credits;
    }
  }

  handleAddCourse(e) {
    e.preventDefault();

    const courseData = {
      id: Date.now(),
      code: document.getElementById("customCourseCode").value,
      title: document.getElementById("customCourseTitle").value,
      credits: parseInt(document.getElementById("courseCredits").value),
      grade: document.getElementById("courseGrade").value,
      status: document.getElementById("courseStatus").value,
      year: parseInt(document.getElementById("courseYear").value) || null,
      semester: document.getElementById("courseSemester").value,
    };

    // Validate required fields
    if (!courseData.code || !courseData.title || !courseData.credits) {
      alert("Please fill in all required fields");
      return;
    }

    // Check for duplicate course codes
    if (this.courses.find((c) => c.code === courseData.code)) {
      alert("Course with this code already exists");
      return;
    }

    this.courses.push(courseData);
    this.renderCourses();
    this.updateStatistics();

    // Close modal and reset form
    bootstrap.Modal.getInstance(
      document.getElementById("addCourseModal"),
    ).hide();
    document.getElementById("addCourseForm").reset();

    this.showToast("Course added successfully!", "success");
  }

  handleEditCourse(e) {
    e.preventDefault();

    const courseId = parseInt(document.getElementById("editCourseId").value);
    const courseIndex = this.courses.findIndex((c) => c.id === courseId);

    if (courseIndex !== -1) {
      this.courses[courseIndex] = {
        ...this.courses[courseIndex],
        code: document.getElementById("editCourseCode").value,
        title: document.getElementById("editCourseTitle").value,
        credits: parseInt(document.getElementById("editCourseCredits").value),
        grade: document.getElementById("editCourseGrade").value,
        status: document.getElementById("editCourseStatus").value,
        year: parseInt(document.getElementById("editCourseYear").value) || null,
        semester: document.getElementById("editCourseSemester").value,
      };

      this.renderCourses();
      this.updateStatistics();

      bootstrap.Modal.getInstance(
        document.getElementById("editCourseModal"),
      ).hide();

      this.showToast("Course updated successfully!", "success");
    }
  }

  renderCourses(filter = "all") {
    const tbody = document.getElementById("coursesTableBody");
    if (!tbody) return;

    let filteredCourses = this.courses;

    if (filter !== "all") {
      filteredCourses = this.courses.filter(
        (course) => course.status === filter,
      );
    }

    tbody.innerHTML = filteredCourses
      .map((course) => this.generateCourseRow(course))
      .join("");

    // Update filter buttons
    document.querySelectorAll("[id$='Btn']").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .getElementById(`${filter === "all" ? "allCourses" : filter}Btn`)
      ?.classList.add("active");
  }

  generateCourseRow(course) {
    const gradePoints = course.grade ? this.gradePoints[course.grade] : 0;
    const statusBadges = {
      completed: "success",
      inprogress: "warning",
      planned: "secondary",
    };

    const statusTexts = {
      completed: "Completed",
      inprogress: "In Progress",
      planned: "Planned",
    };

    const yearColors = {
      1: "primary",
      2: "success",
      3: "warning",
      4: "secondary",
    };

    return `
      <tr>
        <td>
          <div class="fw-semibold">${course.code}</div>
        </td>
        <td>
          <div class="course-title">${course.title}</div>
        </td>
        <td>
          ${course.year ? `<span class="badge bg-${yearColors[course.year]}">Year ${course.year}</span>` : '<span class="text-muted">--</span>'}
        </td>
        <td>
          <small class="text-muted">${course.semester || "N/A"}</small>
        </td>
        <td>
          <span class="badge bg-info">${course.credits}</span>
        </td>
        <td>
          ${
            course.grade
              ? `<span class="badge bg-${course.grade.includes("A") ? "success" : course.grade.includes("B") ? "primary" : course.grade.includes("C") ? "warning" : "danger"}">${course.grade}</span>`
              : '<span class="text-muted">Not graded</span>'
          }
        </td>
        <td>
          <div class="fw-semibold">${course.grade ? gradePoints.toFixed(2) : "0.00"}</div>
        </td>
        <td>
          <span class="badge bg-${statusBadges[course.status]}">${statusTexts[course.status]}</span>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" onclick="gpaTracker.editCourse(${course.id})" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger" onclick="gpaTracker.deleteCourse(${course.id})" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  editCourse(courseId) {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return;

    // Populate edit modal
    document.getElementById("editCourseId").value = course.id;
    document.getElementById("editCourseCode").value = course.code;
    document.getElementById("editCourseTitle").value = course.title;
    document.getElementById("editCourseCredits").value = course.credits;
    document.getElementById("editCourseGrade").value = course.grade || "";
    document.getElementById("editCourseStatus").value = course.status;
    document.getElementById("editCourseYear").value = course.year || "";
    document.getElementById("editCourseSemester").value = course.semester || "";

    // Show modal
    const modal = new bootstrap.Modal(
      document.getElementById("editCourseModal"),
    );
    modal.show();
  }

  deleteCourse(courseId) {
    if (confirm("Are you sure you want to delete this course?")) {
      this.courses = this.courses.filter((c) => c.id !== courseId);
      this.renderCourses();
      this.updateStatistics();
      this.showToast("Course deleted successfully!", "success");
    }
  }

  calculateGPA() {
    const completedCourses = this.courses.filter(
      (course) => course.status === "completed" && course.grade,
    );

    if (completedCourses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    completedCourses.forEach((course) => {
      const gradePoint = this.gradePoints[course.grade] || 0;
      totalPoints += gradePoint * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }

  calculateSemesterGPA(semester = "1st Semester 2024") {
    const semesterCourses = this.courses.filter(
      (course) =>
        course.semester === semester &&
        course.status === "completed" &&
        course.grade,
    );

    if (semesterCourses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    semesterCourses.forEach((course) => {
      const gradePoint = this.gradePoints[course.grade] || 0;
      totalPoints += gradePoint * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }

  calculateYearGPA(year) {
    const yearCourses = this.courses.filter(
      (course) =>
        course.year === year && course.status === "completed" && course.grade,
    );

    if (yearCourses.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    yearCourses.forEach((course) => {
      const gradePoint = this.gradePoints[course.grade] || 0;
      totalPoints += gradePoint * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }

  updateYearSemesterGPAs() {
    // Calculate and update year/semester GPAs
    const semesters = [
      { id: "year1sem1GPA", semester: "1st Semester 2022" },
      { id: "year1sem2GPA", semester: "2nd Semester 2023" },
      { id: "year2sem1GPA", semester: "1st Semester 2023" },
      { id: "year2sem2GPA", semester: "2nd Semester 2024" },
      { id: "year3sem1GPA", semester: "1st Semester 2024" },
      { id: "year3sem2GPA", semester: "2nd Semester 2025" },
      { id: "year4sem1GPA", semester: "1st Semester 2025" },
      { id: "year4sem2GPA", semester: "2nd Semester 2026" },
    ];

    semesters.forEach(({ id, semester }) => {
      const gpa = this.calculateSemesterGPA(semester);
      const element = document.getElementById(id);
      if (element) {
        element.textContent = gpa > 0 ? gpa.toFixed(2) : "--";
      }
    });

    // Calculate and update year GPAs
    for (let year = 1; year <= 4; year++) {
      const yearGPA = this.calculateYearGPA(year);
      const element = document.getElementById(`year${year}GPA`);
      if (element) {
        element.textContent = yearGPA > 0 ? yearGPA.toFixed(2) : "--";
      }
    }
  }

  updateStatistics() {
    const totalCredits = this.courses
      .filter((course) => course.status === "completed")
      .reduce((sum, course) => sum + course.credits, 0);

    const inProgressCredits = this.courses
      .filter((course) => course.status === "inprogress")
      .reduce((sum, course) => sum + course.credits, 0);

    const remainingCredits = this.totalCreditsRequired - totalCredits;
    const progressPercentage = Math.min(
      (totalCredits / this.totalCreditsRequired) * 100,
      100,
    );

    const currentGPA = this.calculateGPA();
    const semesterGPA = this.calculateSemesterGPA();

    // Update display elements
    document.getElementById("currentGPA").textContent = currentGPA.toFixed(2);
    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("semesterGPA").textContent = semesterGPA.toFixed(2);
    document.getElementById("graduationProgress").textContent =
      progressPercentage.toFixed(0) + "%";

    // Update progress bar
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      progressBar.style.width = progressPercentage + "%";
      progressBar.textContent = `${totalCredits}/${this.totalCreditsRequired} Credits`;
    }

    // Update credits breakdown
    document.getElementById("creditsRemaining").textContent =
      `${remainingCredits} credits remaining`;

    // Update program statistics
    const completedCourses = this.courses.filter(
      (c) => c.status === "completed",
    ).length;
    const totalProgramCourses =
      this.curriculum[this.currentProgram]?.length || 0;
    const remainingCourses = Math.max(
      0,
      totalProgramCourses - completedCourses,
    );

    document.getElementById("programCompleted").textContent = completedCourses;
    document.getElementById("programRemaining").textContent = remainingCourses;

    // Update year/semester specific GPAs
    this.updateYearSemesterGPAs();
  }

  initializeChart() {
    const ctx = document.getElementById("gpaChart");
    if (!ctx) return;

    // Sample semester data for chart
    const semesterData = {
      labels: [
        "1st Sem 2022",
        "2nd Sem 2023",
        "1st Sem 2023",
        "2nd Sem 2024",
        "1st Sem 2024",
      ],
      datasets: [
        {
          label: "Semester GPA",
          data: [3.67, 3.83, 3.67, 4.0, 3.92],
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Cumulative GPA",
          data: [3.67, 3.75, 3.71, 3.81, 3.85],
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };

    new Chart(ctx, {
      type: "line",
      data: semesterData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 4.0,
            ticks: {
              stepSize: 0.5,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  filterCourses(filter) {
    this.renderCourses(filter);
  }

  filterByYear() {
    const selectedYear = document.getElementById("yearFilter").value;
    if (selectedYear) {
      const filteredCourses = this.courses.filter(
        (course) => course.year == selectedYear,
      );
      this.renderFilteredCourses(filteredCourses, `Year ${selectedYear}`);
    } else {
      this.renderCourses("all");
    }
  }

  filterBySemester() {
    const selectedSemester = document.getElementById("semesterFilter").value;
    if (selectedSemester) {
      const filteredCourses = this.courses.filter(
        (course) => course.semester === selectedSemester,
      );
      this.renderFilteredCourses(filteredCourses, selectedSemester);
    } else {
      this.renderCourses("all");
    }
  }

  renderFilteredCourses(courses, filterTitle) {
    const tbody = document.getElementById("coursesTableBody");
    if (!tbody) return;

    tbody.innerHTML = courses
      .map((course) => this.generateCourseRow(course))
      .join("");

    // Update filter buttons
    document.querySelectorAll("[id$='Btn']").forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  exportTranscript() {
    // Generate transcript data
    const transcriptData = {
      program:
        this.currentProgram === "software_engineering"
          ? "Software Engineering - B.Sc."
          : "Information Technology and Systems - B.Sc.",
      student: "Abenezer Bekele",
      studentId: "0998/24",
      gpa: this.calculateGPA().toFixed(2),
      totalCredits: this.courses
        .filter((course) => course.status === "completed")
        .reduce((sum, course) => sum + course.credits, 0),
      courses: this.courses.filter((course) => course.status === "completed"),
      generatedDate: new Date().toLocaleDateString(),
    };

    // Simulate PDF generation
    this.showToast("Generating transcript PDF...", "info");
    setTimeout(() => {
      this.showToast("Transcript exported successfully!", "success");
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
}

// Global functions for button clicks
function filterCourses(filter) {
  window.gpaTracker.filterCourses(filter);
}

function calculateGPA() {
  window.gpaTracker.calculateGPA();
  window.gpaTracker.updateStatistics();
  window.gpaTracker.showToast("GPA recalculated successfully!", "success");
}

function exportTranscript() {
  window.gpaTracker.exportTranscript();
}

function filterByYear() {
  window.gpaTracker.filterByYear();
}

function filterBySemester() {
  window.gpaTracker.filterBySemester();
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("bits_user");
    localStorage.removeItem("bits_demo_mode");
    window.location.href = "index.html";
  }
}

// Initialize GPA Tracker when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.gpaTracker = new GPATracker();
});
