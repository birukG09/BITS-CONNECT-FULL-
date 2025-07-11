// Main Application JavaScript - NO RESTRICTIONS
class BiTSApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupAnimations();
    this.setupInteractivity();
    this.setupFormValidation();
    // NO page access checks - everything is open
  }

  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".card, .section").forEach((el) => {
      observer.observe(el);
    });

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add("animate-fade-in");
      }, 300);
    }
  }

  setupInteractivity() {
    // Fixed smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "" || href.length <= 1) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.getElementById("mainNav");
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add("navbar-scrolled");
        } else {
          navbar.classList.remove("navbar-scrolled");
        }
      }
    });

    // Button hover effects
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }

  setupFormValidation() {
    const forms = document.querySelectorAll(".needs-validation");
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      });
    });

    document.querySelectorAll('input[type="email"]').forEach((input) => {
      input.addEventListener("blur", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
          this.setCustomValidity("Please enter a valid email address");
          this.classList.add("is-invalid");
        } else {
          this.setCustomValidity("");
          this.classList.remove("is-invalid");
          if (this.value) this.classList.add("is-valid");
        }
      });
    });

    document.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.value && this.value.length < 6) {
          this.setCustomValidity("Password must be at least 6 characters");
          this.classList.add("is-invalid");
        } else {
          this.setCustomValidity("");
          this.classList.remove("is-invalid");
          if (this.value) this.classList.add("is-valid");
        }
      });
    });
  }

  showLoading(element) {
    if (element) {
      element.classList.add("loading");
      const spinner = document.createElement("div");
      spinner.className = "spinner-border spinner-border-sm me-2";
      element.prepend(spinner);
    }
  }

  hideLoading(element) {
    if (element) {
      element.classList.remove("loading");
      const spinner = element.querySelector(".spinner-border");
      if (spinner) spinner.remove();
    }
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className =
        "toast-container position-fixed top-0 end-0 p-3";
      toastContainer.style.zIndex = "9999";
      document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    toast.addEventListener("hidden.bs.toast", () => {
      toast.remove();
    });
  }

  generateDemoData(type, count = 10) {
    const ethiopianNames = [
      "Hirut Getachew",
      "Alemayehu Worku",
      "Eden Tilahun",
      "Dawit Bekele",
      "Selamawit Abebe",
      "Yonas Hailu",
      "Rahel Tesfaye",
      "Biniam Amare",
      "Bethlehem Gebru",
      "Samson Desta",
      "Hanan Bekele",
      "Ephrem Wolde",
      "Bethlehem Gebru",
      "Daniel Kebede",
      "Eden Tilahun",
    ];

    const programs = [
      "Software Engineering",
      "Information Technology Management",
      "Information Technology and Systems",
    ];

    const courses = [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Software Engineering Principles",
      "Computer Networks",
      "Operating Systems",
      "Web Development",
      "Mobile App Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Cybersecurity",
    ];

    switch (type) {
      case "students":
        return Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          name: ethiopianNames[i % ethiopianNames.length],
          email: `student${i + 1}@bitscollege.edu.et`,
          program: programs[i % programs.length],
          gpa: (Math.random() * 2 + 2).toFixed(2),
          year: Math.floor(Math.random() * 4) + 1,
        }));

      case "assignments":
        return Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          title: `Assignment ${i + 1}: ${courses[i % courses.length]}`,
          course: courses[i % courses.length],
          dueDate: new Date(
            Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0],
          status: ["pending", "in-progress", "completed"][
            Math.floor(Math.random() * 3)
          ],
          priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        }));

      case "resources":
        return Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          title: `${courses[i % courses.length]} - Resource ${i + 1}`,
          type: ["PDF", "EPUB", "Video"][Math.floor(Math.random() * 3)],
          category: ["Textbooks", "Research Papers", "Study Guides"][
            Math.floor(Math.random() * 3)
          ],
          author: ethiopianNames[i % ethiopianNames.length],
          uploadDate: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0],
          downloads: Math.floor(Math.random() * 1000),
          rating: (Math.random() * 2 + 3).toFixed(1),
        }));

      default:
        return [];
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.biTSApp = new BiTSApp();
});

// Global utility functions
window.showToast = (message, type) => window.biTSApp?.showToast(message, type);
window.showLoading = (element) => window.biTSApp?.showLoading(element);
window.hideLoading = (element) => window.biTSApp?.hideLoading(element);
