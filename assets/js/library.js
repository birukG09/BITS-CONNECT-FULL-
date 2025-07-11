// Digital Library functionality
class DigitalLibrary {
  constructor() {
    this.resources = [];
    this.filteredResources = [];
    this.currentView = "grid";
    this.init();
  }

  init() {
    this.loadResources();
    this.setupEventListeners();
    this.setupFilters();
  }

  loadResources() {
    // Demo resources data
    this.resources = [
      {
        id: 1,
        title: "Introduction to Software Engineering",
        author: "Dr. Alemayehu Worku",
        type: "PDF",
        category: "textbooks",
        subject: "software-engineering",
        description:
          "Comprehensive guide to software engineering principles and practices",
        uploadDate: "2024-12-10",
        downloads: 245,
        rating: 4.5,
        hasReader: true,
      },
      {
        id: 2,
        title: "Database Design Fundamentals",
        author: "Prof. Hirut Getachew",
        type: "EPUB",
        category: "textbooks",
        subject: "database-systems",
        description: "Complete textbook on database design and management",
        uploadDate: "2024-12-08",
        downloads: 189,
        rating: 4.3,
        hasReader: true,
      },
      {
        id: 3,
        title: "Advanced Algorithms and Data Structures",
        author: "Dr. Dawit Bekele",
        type: "PDF",
        category: "research",
        subject: "algorithms",
        description: "Research paper on advanced algorithmic techniques",
        uploadDate: "2024-12-05",
        downloads: 156,
        rating: 4.7,
        hasReader: true,
      },
      {
        id: 4,
        title: "Network Security Best Practices",
        author: "Hirut Getachew",
        type: "PDF",
        category: "guides",
        subject: "security",
        description:
          "Practical guide to implementing network security measures",
        uploadDate: "2024-12-03",
        downloads: 98,
        rating: 4.2,
        hasReader: true,
      },
      {
        id: 5,
        title: "Mobile App Development Tutorial",
        author: "Yonas Hailu",
        type: "Video",
        category: "videos",
        subject: "mobile-dev",
        description: "Step-by-step video tutorial for mobile app development",
        uploadDate: "2024-12-01",
        downloads: 67,
        rating: 4.6,
        hasReader: false,
      },
      {
        id: 6,
        title: "Machine Learning Basics",
        author: "Rahel Tesfaye",
        type: "EPUB",
        category: "textbooks",
        subject: "ai-ml",
        description:
          "Introduction to machine learning concepts and applications",
        uploadDate: "2024-11-28",
        downloads: 134,
        rating: 4.4,
        hasReader: true,
      },
      {
        id: 7,
        title: "Web Development with React",
        author: "Biniam Amare",
        type: "PDF",
        category: "guides",
        subject: "software-engineering",
        description: "Complete guide to building web applications with React",
        uploadDate: "2024-11-25",
        downloads: 203,
        rating: 4.8,
        hasReader: true,
      },
      {
        id: 8,
        title: "Computer Networks Fundamentals",
        author: "Selamawit Abebe",
        type: "PDF",
        category: "textbooks",
        subject: "networks",
        description: "Essential concepts in computer networking",
        uploadDate: "2024-11-22",
        downloads: 178,
        rating: 4.1,
        hasReader: true,
      },
      {
        id: 9,
        title: "Cybersecurity Framework",
        author: "Samson Desta",
        type: "EPUB",
        category: "research",
        subject: "security",
        description: "Comprehensive cybersecurity framework and implementation",
        uploadDate: "2024-11-20",
        downloads: 87,
        rating: 4.5,
        hasReader: true,
      },
      {
        id: 10,
        title: "Agile Development Methodology",
        author: "Hanan Bekele",
        type: "PDF",
        category: "guides",
        subject: "software-engineering",
        description: "Guide to implementing agile development practices",
        uploadDate: "2024-11-18",
        downloads: 156,
        rating: 4.3,
        hasReader: true,
      },
      {
        id: 11,
        title: "Data Science with Python",
        author: "Ephrem Wolde",
        type: "EPUB",
        category: "textbooks",
        subject: "ai-ml",
        description: "Complete guide to data science using Python programming",
        uploadDate: "2024-11-15",
        downloads: 298,
        rating: 4.7,
        hasReader: true,
      },
      {
        id: 12,
        title: "Cloud Computing Architecture",
        author: "Bethlehem Gebru",
        type: "PDF",
        category: "research",
        subject: "networks",
        description: "Research on modern cloud computing architectures",
        uploadDate: "2024-11-12",
        downloads: 123,
        rating: 4.2,
        hasReader: true,
      },
      {
        id: 13,
        title: "User Interface Design Principles",
        author: "Daniel Kebede",
        type: "PDF",
        category: "guides",
        subject: "software-engineering",
        description: "Best practices for designing user interfaces",
        uploadDate: "2024-11-10",
        downloads: 89,
        rating: 4.4,
        hasReader: true,
      },
      {
        id: 14,
        title: "Artificial Intelligence Ethics",
        author: "Eden Tilahun",
        type: "EPUB",
        category: "research",
        subject: "ai-ml",
        description: "Exploring ethical considerations in AI development",
        uploadDate: "2024-11-08",
        downloads: 76,
        rating: 4.6,
        hasReader: true,
      },
      {
        id: 15,
        title: "DevOps Best Practices",
        author: "Alemayehu Bekele",
        type: "Video",
        category: "videos",
        subject: "software-engineering",
        description: "Video series on implementing DevOps practices",
        uploadDate: "2024-11-05",
        downloads: 145,
        rating: 4.5,
        hasReader: false,
      },
    ];

    this.filteredResources = [...this.resources];
    this.renderResources();
  }

  setupEventListeners() {
    // Search
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.filterResources();
    });

    // Category filters
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.filterResources();
      });
    });

    // Subject filter
    document.getElementById("subjectFilter").addEventListener("change", () => {
      this.filterResources();
    });

    // Sort options
    document.getElementById("sortBy").addEventListener("change", () => {
      this.sortResources();
    });

    // View mode
    document.querySelectorAll('input[name="viewMode"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.currentView = e.target.id === "gridView" ? "grid" : "list";
        this.renderResources();
      });
    });

    // Upload form
    document.getElementById("uploadForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleUpload();
    });

    // Request form
    document.getElementById("requestForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleRequest();
    });
  }

  setupFilters() {
    // Initial filter setup is done in loadResources
  }

  filterResources() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const selectedCategories = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((cb) => cb.value);
    const selectedSubject = document.getElementById("subjectFilter").value;

    this.filteredResources = this.resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.author.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(resource.category) ||
        selectedCategories.includes(resource.type.toLowerCase());

      const matchesSubject =
        !selectedSubject || resource.subject === selectedSubject;

      return matchesSearch && matchesCategory && matchesSubject;
    });

    this.sortResources();
    this.updateResultCount();
  }

  sortResources() {
    const sortBy = document.getElementById("sortBy").value;

    this.filteredResources.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "oldest":
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case "name":
          return a.title.localeCompare(b.title);
        case "downloads":
          return b.downloads - a.downloads;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    this.renderResources();
  }

  renderResources() {
    const container = document.getElementById("resourcesContainer");

    if (this.filteredResources.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="text-center py-5">
            <i class="bi bi-search text-muted h1"></i>
            <h5 class="text-muted">No resources found</h5>
            <p class="text-muted">Try adjusting your search criteria or filters</p>
          </div>
        </div>
      `;
      return;
    }

    if (this.currentView === "grid") {
      container.innerHTML = this.filteredResources
        .map((resource) => this.createResourceCard(resource))
        .join("");
    } else {
      container.innerHTML = this.filteredResources
        .map((resource) => this.createResourceListItem(resource))
        .join("");
    }

    // Add event listeners for resource actions
    this.setupResourceActions();
  }

  createResourceCard(resource) {
    const typeClass =
      {
        PDF: "danger",
        EPUB: "success",
        Video: "info",
      }[resource.type] || "secondary";

    const typeIcon =
      {
        PDF: "bi-file-earmark-pdf",
        EPUB: "bi-book",
        Video: "bi-play-circle",
      }[resource.type] || "bi-file-earmark";

    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm hover-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="bg-${typeClass} bg-opacity-10 rounded p-2">
                <i class="bi ${typeIcon} text-${typeClass} h5 mb-0"></i>
              </div>
              <span class="badge bg-${typeClass}">${resource.type}</span>
            </div>

            <h6 class="card-title mb-2">${resource.title}</h6>
            <p class="text-muted small mb-2">by ${resource.author}</p>
            <p class="card-text text-muted small mb-3" style="height: 3rem; overflow: hidden;">
              ${resource.description}
            </p>

            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <small>${resource.rating}</small>
                </div>
                <div>
                  <i class="bi bi-download text-muted me-1"></i>
                  <small class="text-muted">${resource.downloads}</small>
                </div>
              </div>
              <small class="text-muted">${this.formatDate(resource.uploadDate)}</small>
            </div>

            <div class="d-grid gap-2">
              ${
                resource.hasReader
                  ? `
                <button class="btn btn-primary btn-sm" onclick="openReader('${resource.type}', '${resource.title}')">
                  <i class="bi bi-eye me-1"></i>Read Online
                </button>
              `
                  : ""
              }
              <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary btn-sm flex-fill" onclick="downloadResource(${resource.id})">
                  <i class="bi bi-download me-1"></i>Download
                </button>
                <button class="btn btn-outline-primary btn-sm flex-fill" onclick="bookmarkResource(${resource.id})">
                  <i class="bi bi-bookmark me-1"></i>Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createResourceListItem(resource) {
    const typeClass =
      {
        PDF: "danger",
        EPUB: "success",
        Video: "info",
      }[resource.type] || "secondary";

    const typeIcon =
      {
        PDF: "bi-file-earmark-pdf",
        EPUB: "bi-book",
        Video: "bi-play-circle",
      }[resource.type] || "bi-file-earmark";

    return `
      <div class="col-12">
        <div class="card border-0 shadow-sm mb-3">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <div class="bg-${typeClass} bg-opacity-10 rounded p-2">
                  <i class="bi ${typeIcon} text-${typeClass} h5 mb-0"></i>
                </div>
              </div>
              <div class="col">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-1">${resource.title}</h6>
                    <p class="text-muted small mb-1">by ${resource.author}</p>
                    <p class="text-muted small mb-2">${resource.description}</p>
                    <div class="d-flex align-items-center">
                      <span class="badge bg-${typeClass} me-2">${resource.type}</span>
                      <div class="me-3">
                        <i class="bi bi-star-fill text-warning me-1"></i>
                        <small>${resource.rating}</small>
                      </div>
                      <div class="me-3">
                        <i class="bi bi-download text-muted me-1"></i>
                        <small class="text-muted">${resource.downloads}</small>
                      </div>
                      <small class="text-muted">${this.formatDate(resource.uploadDate)}</small>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    ${
                      resource.hasReader
                        ? `
                      <button class="btn btn-primary btn-sm" onclick="openReader('${resource.type}', '${resource.title}')">
                        <i class="bi bi-eye me-1"></i>Read Online
                      </button>
                    `
                        : ""
                    }
                    <button class="btn btn-outline-secondary btn-sm" onclick="downloadResource(${resource.id})">
                      <i class="bi bi-download me-1"></i>Download
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="bookmarkResource(${resource.id})">
                      <i class="bi bi-bookmark me-1"></i>Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupResourceActions() {
    // Resource actions are handled by global functions
  }

  updateResultCount() {
    const resultCount = document.getElementById("resultCount");
    resultCount.textContent = `Showing ${this.filteredResources.length} of ${this.resources.length} resources`;
  }

  handleUpload() {
    const form = document.getElementById("uploadForm");
    const formData = new FormData(form);

    // Simulate upload
    window.showToast("Resource uploaded successfully!", "success");

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("uploadModal"),
    );
    modal.hide();
    form.reset();
  }

  handleRequest() {
    const form = document.getElementById("requestForm");

    // Simulate request submission
    window.showToast("Resource request submitted successfully!", "success");

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("requestModal"),
    );
    modal.hide();
    form.reset();
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

// Global functions for resource actions
function openReader(type, title) {
  if (type === "PDF") {
    document.getElementById("pdfReaderTitle").textContent = title;
    const modal = new bootstrap.Modal(
      document.getElementById("pdfReaderModal"),
    );
    modal.show();
  } else if (type === "EPUB") {
    document.getElementById("epubReaderTitle").textContent = title;
    const modal = new bootstrap.Modal(
      document.getElementById("epubReaderModal"),
    );
    modal.show();
  }
}

function downloadResource(resourceId) {
  window.showToast("Download started!", "info");
}

function bookmarkResource(resourceId) {
  window.showToast("Resource bookmarked!", "success");
}

// Initialize library when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.digitalLibrary = new DigitalLibrary();
  }, 100);
});
