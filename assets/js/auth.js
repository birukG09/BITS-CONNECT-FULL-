// Simplified Authentication - NO RESTRICTIONS
class AuthManager {
  constructor() {
    this.user = {
      id: 1,
      name: "Demo User",
      email: "demo@bitscollege.edu.et",
      role: "student",
      program: "software_engineering",
    };
    this.isDemoMode = true;
    this.init();
  }

  init() {
    this.saveToStorage();
    this.updateUI();
    this.setupEventListeners();
  }

  saveToStorage() {
    localStorage.setItem("bits_user", JSON.stringify(this.user));
    localStorage.setItem("bits_demo_mode", "true");
  }

  enableDemoMode() {
    this.isDemoMode = true;
    this.user = {
      id: 1,
      name: "Demo User",
      email: "demo@bitscollege.edu.et",
      role: "student",
      program: "software_engineering",
    };
    this.saveToStorage();
    this.updateUI();
    console.log("🎓 Demo mode enabled - all features accessible");
  }

  async login(email, password) {
    const accounts = {
      "student@bitscollege.edu.et": {
        name: "Abenezer Bekele",
        studentId: "0998/24",
        role: "student",
        program: "software_engineering",
      },
      "teacher@bitscollege.edu.et": {
        name: "Aymen Abrar",
        teacherId: "0184/24",
        role: "teacher",
        program: null,
      },
      "admin@bitscollege.edu.et": {
        name: "Biruk Gebre",
        adminId: "0113/24",
        role: "admin",
        program: null,
      },
    };

    if (accounts[email] && password === "password") {
      this.user = {
        id: Math.floor(Math.random() * 1000),
        email: email,
        ...accounts[email],
      };
      this.saveToStorage();
      this.updateUI();
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  }

  async register(userData) {
    this.user = {
      id: Math.floor(Math.random() * 1000),
      name: userData.name,
      email: userData.email,
      role: userData.role || "student",
      program: userData.program,
    };
    this.saveToStorage();
    this.updateUI();
    return { success: true };
  }

  logout() {
    // Don't actually logout in demo mode - just switch back to demo user
    this.user = {
      id: 1,
      name: "Demo User",
      email: "demo@bitscollege.edu.et",
      role: "student",
      program: "software_engineering",
    };
    this.saveToStorage();
    this.updateUI();
  }

  isAuthenticated() {
    return true; // ALWAYS authenticated
  }

  updateUI() {
    const authElements = document.querySelectorAll(".auth-only");
    const userNameElements = document.querySelectorAll(
      "#userName, #dashboardUserName, #heroUserName",
    );
    const userRoleElements = document.querySelectorAll("#userRole");
    const demoIndicators = document.querySelectorAll("#demoIndicator");

    // Always show as authenticated
    authElements.forEach((el) => el.classList.remove("d-none"));

    userNameElements.forEach((el) => {
      if (el) el.textContent = this.user.name || this.user.email;
    });
    userRoleElements.forEach((el) => {
      if (el) el.textContent = this.user.role || "student";
    });

    if (this.isDemoMode) {
      demoIndicators.forEach((el) => el.classList.remove("d-none"));
    }
  }

  setupEventListeners() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const result = await this.login(email, password);
        if (result.success) {
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("loginModal"),
          );
          if (modal) modal.hide();

          if (window.showToast) {
            window.showToast("Login successful!", "success");
          }

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1000);
        }
      });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
          name: document.getElementById("registerName").value,
          email: document.getElementById("registerEmail").value,
          password: document.getElementById("registerPassword").value,
          program: document.getElementById("registerProgram").value,
          role: document.getElementById("registerRole").value,
        };

        const result = await this.register(userData);
        if (result.success) {
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("registerModal"),
          );
          if (modal) modal.hide();

          if (window.showToast) {
            window.showToast("Registration successful!", "success");
          }

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1000);
        }
      });
    }
  }
}

// Global functions
function switchToRegister() {
  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal"),
  );
  const registerModal = new bootstrap.Modal(
    document.getElementById("registerModal"),
  );

  if (loginModal) loginModal.hide();
  setTimeout(() => registerModal.show(), 300);
}

function switchToLogin() {
  const registerModal = bootstrap.Modal.getInstance(
    document.getElementById("registerModal"),
  );
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));

  if (registerModal) registerModal.hide();
  setTimeout(() => loginModal.show(), 300);
}

function logout() {
  if (window.authManager) {
    window.authManager.logout();
  }
}

function enableDemoMode() {
  if (window.authManager) {
    window.authManager.enableDemoMode();
  }
}

// Initialize immediately
document.addEventListener("DOMContentLoaded", () => {
  window.authManager = new AuthManager();
});
