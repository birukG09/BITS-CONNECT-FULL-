// BiTS Connect - Real API Integration
class BiTSAPI {
  constructor() {
    this.baseURL = window.location.origin + "/api";
    this.token = localStorage.getItem("bits_token");
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.token) {
      defaultOptions.headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);

      // Check if response is JSON before trying to parse
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend not available - non-JSON response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Authentication
  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.token = data.token;
      localStorage.setItem("bits_token", data.token);
    }

    return data;
  }

  async register(userData) {
    return await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    this.token = null;
    localStorage.removeItem("bits_token");
  }

  async getCurrentUser() {
    return await this.request("/auth/user");
  }

  // Assignments
  async getAssignments() {
    return await this.request("/assignments");
  }

  async createAssignment(assignment) {
    return await this.request("/assignments", {
      method: "POST",
      body: JSON.stringify(assignment),
    });
  }

  async updateAssignment(id, updates) {
    return await this.request(`/assignments/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async deleteAssignment(id) {
    return await this.request(`/assignments/${id}`, {
      method: "DELETE",
    });
  }

  // Library
  async getLibraryResources(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return await this.request(`/library?${queryParams}`);
  }

  async getLibraryResource(id) {
    return await this.request(`/library/${id}`);
  }

  async createLibraryResource(resource) {
    return await this.request("/library", {
      method: "POST",
      body: JSON.stringify(resource),
    });
  }

  // GPA
  async getGPAData() {
    return await this.request("/gpa");
  }

  async getGPAAnalytics() {
    return await this.request("/gpa/analytics");
  }

  async addCourse(courseData) {
    return await this.request("/gpa/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  async setGPAGoal(goalData) {
    return await this.request("/gpa/goals", {
      method: "POST",
      body: JSON.stringify(goalData),
    });
  }

  // Health check
  async ping() {
    return await this.request("/ping");
  }
}

// Initialize global API instance
window.biTSAPI = new BiTSAPI();

// Setup auth manager with API fallback when available
function setupAuthAPIIntegration() {
  if (!window.authManager) return;

  const originalLogin = window.authManager.login;
  const originalLogout = window.authManager.logout;

  // Override login method to try API first, fallback to demo
  window.authManager.login = async function (email, password) {
    // If API is not available, use demo mode immediately
    if (!window.apiAvailable) {
      return originalLogin.call(this, email, password);
    }

    try {
      const result = await window.biTSAPI.login(email, password);
      if (result.success) {
        this.user = result.user;
        this.saveToStorage();
        this.updateUI();
        return { success: true };
      }
    } catch (error) {
      console.log("API login failed, using demo mode:", error.message);
      // Fallback to demo mode
      return originalLogin.call(this, email, password);
    }
  };

  // Override logout to try API first, fallback to demo
  window.authManager.logout = async function () {
    if (window.apiAvailable) {
      try {
        await window.biTSAPI.logout();
      } catch (error) {
        console.log("API logout failed:", error.message);
      }
    }
    originalLogout.call(this);
  };
}

// Global API availability flag
window.apiAvailable = false;

async function testAPIConnection() {
  try {
    const response = await fetch(window.biTSAPI.baseURL + "/ping", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    // Check for JSON response
    const contentType = response.headers.get("content-type");
    if (
      response.ok &&
      contentType &&
      contentType.includes("application/json")
    ) {
      window.apiAvailable = true;
      console.log("✅ Backend connected");
      if (window.showToast) {
        window.showToast("Backend connected successfully!", "success");
      }
    } else {
      throw new Error("API not responding with JSON");
    }
  } catch (error) {
    window.apiAvailable = false;
    console.log("📱 Using demo mode - backend not available");

    // Enable demo mode in auth manager
    if (window.authManager) {
      window.authManager.enableDemoMode();
    }

    // Show demo mode notification after a delay
    setTimeout(() => {
      if (window.showToast) {
        window.showToast("Demo mode active - all features available!", "info");
      }
    }, 1000);
  }

  // Setup auth integration after API test
  setupAuthAPIIntegration();
}

// Test connection when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", testAPIConnection);
} else {
  setTimeout(testAPIConnection, 500);
}
