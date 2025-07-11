// Blog functionality
class Blog {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentCategory = "all";
    this.init();
  }

  init() {
    this.loadPosts();
    this.setupEventListeners();
  }

  loadPosts() {
    // Demo blog posts data
    this.posts = [
      {
        id: 1,
        title:
          "Industry Partnership Program: Connecting Students to Real-World Opportunities",
        excerpt:
          "Learn about our strategic partnerships with technology leaders and how they enhance your educational experience at BITS College.",
        content: `Our Industry Partnership Program is designed to bridge the gap between academic learning and real-world application. Through strategic partnerships with leading technology companies, we provide our students with unparalleled opportunities for growth and development.

**Key Benefits:**
- Internship opportunities with top tech companies
- Guest lectures from industry experts
- Real-world project collaborations
- Career placement assistance
- Mentorship programs

These partnerships ensure that our graduates are not just academically prepared, but also industry-ready with practical experience and professional networks.`,
        category: "industry-news",
        tags: ["partnerships", "career", "internship", "industry"],
        author: "Dr. Alemayehu Worku",
        publishedAt: new Date("2024-12-12"),
        readTime: 6,
        views: 245,
        likes: 18,
        featured: false,
      },
      {
        id: 2,
        title: "State-of-the-Art Facilities: Technology Infrastructure at BITS",
        excerpt:
          "Explore our world-class computer labs, modern classrooms, and cutting-edge technology facilities designed for your success.",
        content: `BITS College takes pride in providing students with access to state-of-the-art facilities that support both learning and innovation. Our infrastructure is designed to create an environment where technology meets education.

**Our Facilities Include:**
- Modern computer labs with latest hardware and software
- High-speed internet connectivity across campus
- Digital library with extensive resources
- Collaborative study spaces
- Research laboratories for advanced projects

These facilities ensure that our students have access to the tools and resources they need to excel in their studies and prepare for successful careers in technology.`,
        category: "campus-life",
        tags: ["facilities", "infrastructure", "labs", "technology"],
        author: "Prof. Hirut Getachew",
        publishedAt: new Date("2024-12-10"),
        readTime: 4,
        views: 189,
        likes: 22,
        featured: false,
      },
      {
        id: 3,
        title: "Effective Study Techniques for Computer Science Students",
        excerpt:
          "Discover proven study methods that can help you master complex programming concepts and excel in your computer science courses.",
        content: `Studying computer science requires a unique approach that combines theoretical understanding with practical application. Here are some effective techniques to enhance your learning experience.

**Study Techniques:**
1. **Active Coding Practice** - Don't just read code, write it
2. **Concept Mapping** - Visualize relationships between concepts
3. **Peer Programming** - Learn through collaboration
4. **Project-Based Learning** - Apply knowledge to real projects
5. **Regular Review** - Consistent practice prevents forgetting

**Time Management Tips:**
- Use the Pomodoro Technique for focused study sessions
- Break down complex problems into smaller parts
- Create a study schedule and stick to it
- Take regular breaks to avoid burnout

Remember, consistency is key to mastering computer science concepts.`,
        category: "study-tips",
        tags: ["study-tips", "programming", "time-management", "learning"],
        author: "Hirut Getachew",
        publishedAt: new Date("2024-12-08"),
        readTime: 8,
        views: 342,
        likes: 45,
        featured: false,
      },
      {
        id: 4,
        title: "The Future of Artificial Intelligence in Education",
        excerpt:
          "Explore how AI is transforming the educational landscape and what it means for students and educators at BITS College.",
        content: `Artificial Intelligence is revolutionizing education, creating new opportunities for personalized learning and enhanced educational experiences. At BITS College, we're at the forefront of integrating AI into our curriculum.

**AI in Education:**
- Personalized learning paths
- Intelligent tutoring systems
- Automated assessment and feedback
- Predictive analytics for student success
- Virtual teaching assistants

**Benefits for Students:**
- Customized learning experiences
- Immediate feedback on assignments
- Adaptive learning content
- Better academic support
- Enhanced engagement

As future technology professionals, understanding AI's role in education prepares our students for the evolving landscape of technology and learning.`,
        category: "technology",
        tags: ["ai", "machine-learning", "education", "future"],
        author: "Dr. Biniam Amare",
        publishedAt: new Date("2024-12-06"),
        readTime: 7,
        views: 298,
        likes: 34,
        featured: true,
      },
      {
        id: 5,
        title: "Building Your First Mobile App: A Step-by-Step Guide",
        excerpt:
          "Learn the fundamentals of mobile app development and create your first application using modern frameworks and tools.",
        content: `Mobile app development is one of the most exciting areas in technology today. This guide will walk you through creating your first mobile application.

**Getting Started:**
1. Choose your development platform (iOS, Android, or Cross-platform)
2. Set up your development environment
3. Learn the basics of your chosen framework
4. Plan your app's user interface
5. Implement core functionality

**Popular Frameworks:**
- React Native for cross-platform development
- Flutter for modern UI experiences
- Swift for iOS native development
- Kotlin for Android native development

**Best Practices:**
- Start with a simple concept
- Focus on user experience
- Test on real devices
- Follow platform guidelines
- Optimize for performance

Remember, your first app doesn't need to be perfect – the goal is to learn and gain experience.`,
        category: "technology",
        tags: ["mobile-development", "programming", "apps", "tutorial"],
        author: "Rahel Tesfaye",
        publishedAt: new Date("2024-12-04"),
        readTime: 10,
        views: 456,
        likes: 67,
        featured: false,
      },
      {
        id: 6,
        title: "Preparing for Technical Interviews: Tips from Industry Experts",
        excerpt:
          "Get insider advice on how to ace technical interviews and land your dream job in the technology industry.",
        content: `Technical interviews can be challenging, but with proper preparation, you can significantly improve your chances of success. Here's what industry experts recommend.

**Interview Preparation:**
1. **Master the Fundamentals** - Data structures and algorithms
2. **Practice Coding Problems** - Use platforms like LeetCode, HackerRank
3. **System Design Knowledge** - Understand scalable system architecture
4. **Behavioral Questions** - Prepare STAR method responses
5. **Company Research** - Know the company's products and culture

**Common Interview Types:**
- Coding challenges
- System design discussions
- Behavioral interviews
- Technical presentations
- Take-home projects

**Day of Interview Tips:**
- Arrive early and well-prepared
- Think out loud during coding problems
- Ask clarifying questions
- Test your solutions
- Stay calm and confident

Remember, interviews are also an opportunity for you to evaluate the company and role.`,
        category: "career-guidance",
        tags: ["interviews", "career", "job-search", "technical-skills"],
        author: "Samson Desta",
        publishedAt: new Date("2024-12-02"),
        readTime: 9,
        views: 521,
        likes: 89,
        featured: false,
      },
      {
        id: 7,
        title: "Database Design Best Practices for Beginners",
        excerpt:
          "Learn the fundamental principles of database design and how to create efficient, scalable database schemas.",
        content: `Good database design is crucial for building efficient and scalable applications. This guide covers the essential principles every developer should know.

**Database Design Principles:**
1. **Normalization** - Eliminate data redundancy
2. **Primary Keys** - Ensure unique record identification
3. **Foreign Keys** - Maintain referential integrity
4. **Indexing** - Optimize query performance
5. **Data Types** - Choose appropriate data types

**Design Process:**
1. Understand requirements
2. Identify entities and relationships
3. Create ER diagrams
4. Normalize your design
5. Implement and test

**Common Mistakes to Avoid:**
- Over-normalization
- Ignoring performance implications
- Poor naming conventions
- Lack of documentation
- Not planning for growth

A well-designed database serves as the foundation for reliable and efficient applications.`,
        category: "technology",
        tags: ["database", "design", "sql", "development"],
        author: "Selamawit Abebe",
        publishedAt: new Date("2024-11-30"),
        readTime: 6,
        views: 267,
        likes: 31,
        featured: false,
      },
      {
        id: 8,
        title: "Student Life at BITS: Beyond the Classroom",
        excerpt:
          "Discover the vibrant student community, extracurricular activities, and opportunities for personal growth at BITS College.",
        content: `Life at BITS College extends far beyond academics. Our vibrant campus community offers numerous opportunities for personal growth, networking, and fun.

**Student Activities:**
- Technical clubs and societies
- Sports and recreation programs
- Cultural events and festivals
- Volunteer and community service
- Student government participation

**Professional Development:**
- Guest speaker series
- Industry workshops
- Hackathons and competitions
- Career fairs and networking events
- Leadership opportunities

**Support Services:**
- Academic counseling
- Career guidance
- Mental health resources
- Financial aid assistance
- Peer mentoring programs

**Campus Facilities:**
- Modern library and study spaces
- Recreation and fitness facilities
- Cafeteria and dining options
- Student common areas
- Computer labs and maker spaces

At BITS, we believe in developing well-rounded individuals who are prepared for both professional success and personal fulfillment.`,
        category: "campus-life",
        tags: ["student-life", "activities", "community", "development"],
        author: "Eden Tilahun",
        publishedAt: new Date("2024-11-28"),
        readTime: 5,
        views: 198,
        likes: 42,
        featured: false,
      },
    ];

    this.filteredPosts = [...this.posts];
    this.renderPosts();
    this.renderRecentPosts();
  }

  setupEventListeners() {
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.filterByCategory(e.target.id);
      });
    });

    // Create post form
    document
      .getElementById("createPostForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.createPost();
      });

    // Search form
    document.getElementById("searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchPosts();
    });
  }

  renderPosts() {
    const container = document.getElementById("blogPostsContainer");

    if (this.filteredPosts.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-search text-muted h1"></i>
          <h5 class="text-muted">No posts found</h5>
          <p class="text-muted">Try adjusting your search criteria or browse different categories</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredPosts
      .map((post) => this.createPostCard(post))
      .join("");
  }

  createPostCard(post) {
    return `
      <div class="card border-0 shadow-sm mb-4 hover-card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="badge bg-${this.getCategoryColor(post.category)} me-2">${this.formatCategory(post.category)}</span>
              ${post.featured ? '<span class="badge bg-warning">Featured</span>' : ""}
            </div>
            <small class="text-muted">${this.formatDate(post.publishedAt)}</small>
          </div>

          <h4 class="card-title mb-3">
            <a href="#" class="text-decoration-none" onclick="viewPost(${post.id})">${post.title}</a>
          </h4>

          <p class="card-text text-muted mb-3">${post.excerpt}</p>

          <div class="mb-3">
            ${post.tags
              .map(
                (tag) =>
                  `<span class="badge bg-light text-dark me-1">${tag}</span>`,
              )
              .join("")}
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="bg-secondary rounded-circle me-2" style="width: 32px; height: 32px;"></div>
              <div>
                <div class="fw-medium">${post.author}</div>
                <small class="text-muted">${post.readTime} min read • ${post.views} views</small>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary btn-sm me-2" onclick="likePost(${post.id})">
                <i class="bi bi-heart me-1"></i>${post.likes}
              </button>
              <button class="btn btn-outline-secondary btn-sm me-2" onclick="sharePost(${post.id})">
                <i class="bi bi-share"></i>
              </button>
              <a href="#" class="btn btn-primary btn-sm" onclick="viewPost(${post.id})">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRecentPosts() {
    const container = document.getElementById("recentPostsList");
    const recentPosts = this.posts
      .sort((a, b) => b.publishedAt - a.publishedAt)
      .slice(0, 5);

    container.innerHTML = recentPosts
      .map(
        (post) => `
      <div class="d-flex mb-3">
        <div class="bg-${this.getCategoryColor(post.category)} rounded me-3" style="width: 60px; height: 60px; min-width: 60px;">
          <div class="d-flex align-items-center justify-content-center h-100">
            <i class="bi ${this.getCategoryIcon(post.category)} text-white"></i>
          </div>
        </div>
        <div class="flex-grow-1 min-w-0">
          <h6 class="mb-1">
            <a href="#" class="text-decoration-none" onclick="viewPost(${post.id})">${post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title}</a>
          </h6>
          <small class="text-muted">${this.formatDate(post.publishedAt)} • ${post.readTime} min read</small>
        </div>
      </div>
    `,
      )
      .join("");
  }

  filterByCategory(categoryId) {
    if (categoryId === "allCategories") {
      this.filteredPosts = [...this.posts];
    } else {
      const categoryMap = {
        studyTips: "study-tips",
        technology: "technology",
        campus: "campus-life",
        careers: "career-guidance",
      };
      const category = categoryMap[categoryId];
      this.filteredPosts = this.posts.filter(
        (post) => post.category === category,
      );
    }

    this.renderPosts();
  }

  createPost() {
    const form = document.getElementById("createPostForm");

    const newPost = {
      id: Math.max(...this.posts.map((p) => p.id)) + 1,
      title: document.getElementById("postTitle").value,
      excerpt: document.getElementById("postExcerpt").value,
      content: document.getElementById("postContent").value,
      category: document.getElementById("postCategory").value,
      tags: document
        .getElementById("postTags")
        .value.split(",")
        .map((tag) => tag.trim()),
      author: window.authManager?.getCurrentUser()?.name || "Anonymous",
      publishedAt: new Date(),
      readTime: Math.ceil(
        document.getElementById("postContent").value.length / 1000,
      ),
      views: 0,
      likes: 0,
      featured: false,
    };

    this.posts.unshift(newPost);
    this.filteredPosts = [...this.posts];
    this.renderPosts();
    this.renderRecentPosts();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("createPostModal"),
    );
    modal.hide();
    form.reset();

    window.showToast("Post published successfully!", "success");
  }

  searchPosts() {
    const query = document.getElementById("searchQuery").value.toLowerCase();
    const category = document.getElementById("searchCategory").value;

    this.filteredPosts = this.posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory = !category || post.category === category;

      return matchesQuery && matchesCategory;
    });

    this.renderPosts();

    // Close search modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("searchModal"),
    );
    modal.hide();
    document.getElementById("searchForm").reset();

    window.showToast(
      `Found ${this.filteredPosts.length} post(s) matching your search`,
      "info",
    );
  }

  getCategoryColor(category) {
    const colors = {
      "study-tips": "success",
      technology: "primary",
      "campus-life": "info",
      "career-guidance": "warning",
      "industry-news": "danger",
    };
    return colors[category] || "secondary";
  }

  getCategoryIcon(category) {
    const icons = {
      "study-tips": "bi-lightbulb",
      technology: "bi-cpu",
      "campus-life": "bi-building",
      "career-guidance": "bi-briefcase",
      "industry-news": "bi-newspaper",
    };
    return icons[category] || "bi-file-text";
  }

  formatCategory(category) {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

// Global functions
function viewPost(postId) {
  const post = window.blog.posts.find((p) => p.id === postId);
  if (post) {
    post.views++;
    window.showToast(`Opening "${post.title}"`, "info");
  }
}

function likePost(postId) {
  const post = window.blog.posts.find((p) => p.id === postId);
  if (post) {
    post.likes++;
    window.blog.renderPosts();
    window.showToast("Post liked!", "success");
  }
}

function sharePost(postId) {
  const post = window.blog.posts.find((p) => p.id === postId);
  if (post) {
    window.showToast(`Sharing "${post.title}"`, "info");
  }
}

function saveDraft() {
  window.showToast("Draft saved!", "success");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.blog = new Blog();
  }, 100);
});
