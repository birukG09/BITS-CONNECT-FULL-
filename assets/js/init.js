// Simple Initialization - NO RESTRICTIONS
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎓 BiTS Connect - All Pages Accessible");

  // Ensure everything works immediately
  initializeEverything();
});

function initializeEverything() {
  // 1. Initialize authentication (always logged in)
  if (!window.authManager) {
    window.authManager = new AuthManager();
  }

  // 2. Initialize main app
  if (!window.biTSApp) {
    window.biTSApp = new BiTSApp();
  }

  // 3. Make sure all links work
  ensureAllLinksWork();

  // 4. Add quick login buttons everywhere
  addQuickLoginButtons();

  // 5. Show success message
  setTimeout(() => {
    if (window.showToast) {
      window.showToast("✅ All features accessible!", "success");
    }
  }, 500);
}

function ensureAllLinksWork() {
  // Remove any restrictions on links
  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      // Let all links work normally
      console.log("Navigating to:", this.href);

      // Ensure proper navigation - no preventDefault
      const href = this.getAttribute("href");
      if (href && href.endsWith(".html")) {
        // Force navigation if needed
        setTimeout(() => {
          if (
            window.location.pathname === "/" ||
            window.location.pathname === "/index.html"
          ) {
            window.location.href = href;
          }
        }, 10);
      }
    });
  });

  // Fix any dropdown links that might not have .html extension
  document
    .querySelectorAll(
      'a[href]:not([href$=".html"]):not([href^="#"]):not([href^="javascript"])',
    )
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href &&
        !href.includes("://") &&
        !href.startsWith("#") &&
        !href.startsWith("javascript")
      ) {
        console.log("Fixing link:", href);
        link.setAttribute("href", href + ".html");
      }
    });
}

function addQuickLoginButtons() {
  // Add floating quick access buttons
  const quickAccess = document.createElement("div");
  quickAccess.id = "quickAccess";
  quickAccess.className = "position-fixed bottom-0 start-0 p-3";
  quickAccess.style.zIndex = "9999";
  quickAccess.innerHTML = `
        <div class="d-flex flex-column gap-2">
            <button class="btn btn-primary btn-sm" onclick="navigateTo('dashboard')">
                <i class="bi bi-speedometer2 me-1"></i>Dashboard
            </button>
            <button class="btn btn-success btn-sm" onclick="navigateTo('library')">
                <i class="bi bi-book me-1"></i>Library
            </button>
            <button class="btn btn-info btn-sm" onclick="navigateTo('gpa-tracker')">
                <i class="bi bi-bar-chart me-1"></i>GPA
            </button>
            <button class="btn btn-warning btn-sm" onclick="navigateTo('assignments')">
                <i class="bi bi-file-text me-1"></i>Tasks
            </button>
            <button class="btn btn-secondary btn-sm" onclick="navigateTo('nav-test')">
                <i class="bi bi-tools me-1"></i>Test Nav
            </button>
        </div>
    `;

  if (!document.getElementById("quickAccess")) {
    document.body.appendChild(quickAccess);
  }
}

// Global functions for immediate access
window.goToPage = function (page) {
  console.log("goToPage called with:", page);
  console.log("Current location:", window.location.href);
  console.log("Origin:", window.location.origin);

  try {
    window.location.href = page;
  } catch (error) {
    console.error("Navigation error:", error);
    // Fallback method
    window.location.assign(page);
  }
};

// Debug function to check all links
window.debugNavigation = function () {
  console.log("🔍 Debug Navigation Check:");
  console.log("Current URL:", window.location.href);
  console.log("Available pages:");

  document.querySelectorAll("a[href]").forEach((link, index) => {
    const href = link.getAttribute("href");
    const text = link.textContent.trim();
    console.log(`${index + 1}. "${text}" -> "${href}"`);
  });
};

window.quickLogin = function (role) {
  const accounts = {
    student: { email: "student@bitscollege.edu.et", password: "password" },
    teacher: { email: "teacher@bitscollege.edu.et", password: "password" },
    admin: { email: "admin@bitscollege.edu.et", password: "password" },
  };

  const account = accounts[role];
  if (account && window.authManager) {
    window.authManager.login(account.email, account.password).then((result) => {
      if (result.success) {
        if (window.showToast) {
          window.showToast(`Logged in as ${role}!`, "success");
        }
        setTimeout(() => {
          console.log("Redirecting to dashboard...");
          window.goToPage("dashboard.html");
        }, 1000);
      }
    });
  }
};

window.logout = function () {
  if (window.authManager) {
    window.authManager.logout();
  }
};

// Test navigation function
window.testNavigation = function () {
  const pages = [
    "dashboard.html",
    "library.html",
    "about.html",
    "gpa-tracker.html",
  ];
  console.log("🧪 Testing navigation...");

  pages.forEach((page) => {
    fetch(page)
      .then((response) => {
        console.log(`✅ ${page}: ${response.status}`);
      })
      .catch((error) => {
        console.log(`❌ ${page}: ${error.message}`);
      });
  });
};

// Ensure all pages work immediately
window.addEventListener("load", () => {
  console.log("🚀 BiTS Connect Ready - All Pages Accessible");

  // Run navigation test
  setTimeout(() => {
    window.testNavigation();
  }, 2000);
});
