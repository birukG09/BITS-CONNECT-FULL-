// Study Groups functionality
class StudyGroups {
  constructor() {
    this.myGroups = [];
    this.availableGroups = [];
    this.todaySessions = [];
    this.init();
  }

  init() {
    this.loadData();
    this.setupEventListeners();
  }

  loadData() {
    // Demo my groups data
    this.myGroups = [
      {
        id: 1,
        name: "Advanced Algorithms Study Group",
        subject: "software-engineering",
        description: "Deep dive into complex algorithms and data structures",
        members: 6,
        maxMembers: 8,
        meetingDay: "monday",
        meetingTime: "14:00",
        meetingType: "in-person",
        location: "Computer Lab 1",
        isOwner: true,
        status: "active",
      },
      {
        id: 2,
        name: "Database Design Workshop",
        subject: "database-systems",
        description: "Collaborative database design and optimization",
        members: 4,
        maxMembers: 6,
        meetingDay: "wednesday",
        meetingTime: "16:00",
        meetingType: "online",
        location: "https://zoom.us/j/123456789",
        isOwner: false,
        status: "active",
      },
      {
        id: 3,
        name: "Network Security Discussion",
        subject: "cybersecurity",
        description: "Weekly discussions on network security topics",
        members: 5,
        maxMembers: 10,
        meetingDay: "friday",
        meetingTime: "15:30",
        meetingType: "hybrid",
        location: "Room 205 / Online",
        isOwner: false,
        status: "active",
      },
    ];

    // Demo available groups data
    this.availableGroups = [
      {
        id: 4,
        name: "Mobile App Development Circle",
        subject: "software-engineering",
        description: "Building mobile apps with React Native and Flutter",
        members: 3,
        maxMembers: 8,
        meetingDay: "tuesday",
        meetingTime: "17:00",
        meetingType: "online",
        location: "Discord Channel",
        owner: "Rahel Tesfaye",
        canJoin: true,
      },
      {
        id: 5,
        name: "AI & Machine Learning Lab",
        subject: "software-engineering",
        description: "Exploring AI algorithms and machine learning concepts",
        members: 7,
        maxMembers: 8,
        meetingDay: "thursday",
        meetingTime: "18:00",
        meetingType: "in-person",
        location: "AI Lab",
        owner: "Biniam Amare",
        canJoin: true,
      },
      {
        id: 6,
        name: "Web Security Experts",
        subject: "cybersecurity",
        description: "Advanced web security and penetration testing",
        members: 8,
        maxMembers: 8,
        meetingDay: "saturday",
        meetingTime: "10:00",
        meetingType: "hybrid",
        location: "Security Lab",
        owner: "Samson Desta",
        canJoin: false,
      },
      {
        id: 7,
        name: "Database Optimization Team",
        subject: "database-systems",
        description: "Performance tuning and query optimization",
        members: 2,
        maxMembers: 6,
        meetingDay: "sunday",
        meetingTime: "14:00",
        meetingType: "online",
        location: "Google Meet",
        owner: "Selamawit Abebe",
        canJoin: true,
      },
    ];

    // Demo today's sessions
    this.todaySessions = [
      {
        id: 1,
        groupId: 1,
        groupName: "Advanced Algorithms",
        title: "Binary Trees Deep Dive",
        time: "14:00 - 16:00",
        location: "Computer Lab 1",
        status: "upcoming",
      },
      {
        id: 2,
        groupId: 2,
        groupName: "Database Design",
        title: "Normalization Workshop",
        time: "16:00 - 18:00",
        location: "Online",
        status: "upcoming",
      },
      {
        id: 3,
        groupId: 3,
        groupName: "Network Security",
        title: "Firewall Configuration",
        time: "15:30 - 17:30",
        location: "Room 205",
        status: "upcoming",
      },
    ];

    this.renderMyGroups();
    this.renderAvailableGroups();
    this.renderTodaySessions();
  }

  setupEventListeners() {
    // Create group form
    document
      .getElementById("createGroupForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.createGroup();
      });

    // Schedule session form
    document
      .getElementById("scheduleSessionForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.scheduleSession();
      });

    // Subject filter
    document.getElementById("subjectFilter").addEventListener("change", () => {
      this.filterAvailableGroups();
    });

    // Group view toggle
    document.querySelectorAll('input[name="groupView"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        this.renderMyGroups();
      });
    });
  }

  renderMyGroups() {
    const container = document.getElementById("myGroupsList");
    const showAll = document.getElementById("allGroups").checked;

    let groupsToShow = this.myGroups;
    if (!showAll) {
      groupsToShow = this.myGroups.filter((group) => group.status === "active");
    }

    container.innerHTML = groupsToShow
      .map(
        (group) => `
      <div class="border-bottom p-3">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center mb-2">
              <h6 class="mb-0 me-2">${group.name}</h6>
              ${
                group.isOwner
                  ? '<span class="badge bg-warning text-dark">Owner</span>'
                  : '<span class="badge bg-success">Member</span>'
              }
            </div>
            <p class="text-muted small mb-2">${group.description}</p>
            <div class="row g-2 text-muted small">
              <div class="col-auto">
                <i class="bi bi-people me-1"></i>${group.members}/${group.maxMembers} members
              </div>
              <div class="col-auto">
                <i class="bi bi-calendar me-1"></i>${this.formatMeetingTime(group)}
              </div>
              <div class="col-auto">
                <i class="bi bi-geo-alt me-1"></i>${group.location}
              </div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" onclick="viewGroupDetails(${group.id})">
                <i class="bi bi-eye me-2"></i>View Details
              </a></li>
              <li><a class="dropdown-item" href="#" onclick="scheduleSession(${group.id})">
                <i class="bi bi-calendar-plus me-2"></i>Schedule Session
              </a></li>
              ${
                group.isOwner
                  ? `
                <li><a class="dropdown-item" href="#" onclick="editGroup(${group.id})">
                  <i class="bi bi-pencil me-2"></i>Edit Group
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="deleteGroup(${group.id})">
                  <i class="bi bi-trash me-2"></i>Delete Group
                </a></li>
              `
                  : `
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="leaveGroup(${group.id})">
                  <i class="bi bi-box-arrow-right me-2"></i>Leave Group
                </a></li>
              `
              }
            </ul>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  renderAvailableGroups() {
    const container = document.getElementById("availableGroupsList");

    container.innerHTML = this.availableGroups
      .map(
        (group) => `
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 m-3 shadow-sm hover-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h6 class="card-title mb-0">${group.name}</h6>
              <span class="badge bg-${this.getSubjectColor(group.subject)}">${this.formatSubject(group.subject)}</span>
            </div>

            <p class="card-text text-muted small mb-3">${group.description}</p>

            <div class="mb-3">
              <div class="d-flex justify-content-between text-muted small mb-1">
                <span><i class="bi bi-people me-1"></i>${group.members}/${group.maxMembers} members</span>
                <span><i class="bi bi-person me-1"></i>${group.owner}</span>
              </div>
              <div class="text-muted small">
                <i class="bi bi-calendar me-1"></i>${this.formatMeetingTime(group)}
              </div>
              <div class="text-muted small">
                <i class="bi bi-geo-alt me-1"></i>${group.location}
              </div>
            </div>

            <div class="d-grid">
              ${
                group.canJoin
                  ? `<button class="btn btn-primary btn-sm" onclick="joinGroup(${group.id})">
                       <i class="bi bi-plus-lg me-1"></i>Join Group
                     </button>`
                  : `<button class="btn btn-secondary btn-sm" disabled>
                       <i class="bi bi-x-circle me-1"></i>Group Full
                     </button>`
              }
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  renderTodaySessions() {
    const container = document.getElementById("todaySessionsList");

    if (this.todaySessions.length === 0) {
      container.innerHTML = `
        <div class="p-4 text-center">
          <i class="bi bi-calendar-x text-muted h3"></i>
          <p class="text-muted mb-0">No sessions scheduled for today</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.todaySessions
      .map(
        (session) => `
      <div class="border-bottom p-3">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1">${session.title}</h6>
            <p class="text-muted small mb-1">${session.groupName}</p>
            <div class="text-muted small">
              <div><i class="bi bi-clock me-1"></i>${session.time}</div>
              <div><i class="bi bi-geo-alt me-1"></i>${session.location}</div>
            </div>
          </div>
          <span class="badge bg-${this.getSessionStatusColor(session.status)}">${session.status}</span>
        </div>
      </div>
    `,
      )
      .join("");
  }

  createGroup() {
    const form = document.getElementById("createGroupForm");

    const newGroup = {
      id:
        Math.max(
          ...this.myGroups.map((g) => g.id),
          ...this.availableGroups.map((g) => g.id),
        ) + 1,
      name: document.getElementById("groupName").value,
      subject: document.getElementById("groupSubject").value,
      description: document.getElementById("groupDescription").value,
      maxMembers: parseInt(document.getElementById("maxMembers").value),
      meetingType: document.getElementById("meetingType").value,
      location: document.getElementById("meetingLocation").value,
      meetingDay: document.getElementById("meetingDay").value,
      meetingTime: document.getElementById("meetingTime").value,
      members: 1,
      isOwner: true,
      status: "active",
    };

    this.myGroups.push(newGroup);
    this.renderMyGroups();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("createGroupModal"),
    );
    modal.hide();
    form.reset();

    window.showToast("Study group created successfully!", "success");
  }

  joinGroup(id) {
    const group = this.availableGroups.find((g) => g.id === id);
    if (!group || !group.canJoin) return;

    // Move to my groups
    const newMyGroup = {
      ...group,
      isOwner: false,
      status: "active",
      members: group.members + 1,
    };

    this.myGroups.push(newMyGroup);

    // Update available groups
    group.members++;
    if (group.members >= group.maxMembers) {
      group.canJoin = false;
    }

    this.renderMyGroups();
    this.renderAvailableGroups();

    window.showToast(`Joined "${group.name}" successfully!`, "success");
  }

  scheduleSession(groupId) {
    document.getElementById("sessionGroupId").value = groupId;
    const modal = new bootstrap.Modal(
      document.getElementById("scheduleSessionModal"),
    );
    modal.show();
  }

  scheduleSessionSubmit() {
    const groupId = document.getElementById("sessionGroupId").value;
    const title = document.getElementById("sessionTitle").value;
    const date = document.getElementById("sessionDate").value;
    const time = document.getElementById("sessionTime").value;
    const duration = document.getElementById("sessionDuration").value;
    const agenda = document.getElementById("sessionAgenda").value;

    // Add to today's sessions if it's today
    const today = new Date().toISOString().split("T")[0];
    if (date === today) {
      const group = this.myGroups.find((g) => g.id == groupId);
      const newSession = {
        id: Math.max(...this.todaySessions.map((s) => s.id)) + 1,
        groupId: parseInt(groupId),
        groupName: group ? group.name : "Unknown Group",
        title: title,
        time: `${time} - ${this.addHours(time, duration)}`,
        location: group ? group.location : "TBD",
        status: "upcoming",
      };

      this.todaySessions.push(newSession);
      this.renderTodaySessions();
    }

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("scheduleSessionModal"),
    );
    modal.hide();
    document.getElementById("scheduleSessionForm").reset();

    window.showToast("Study session scheduled successfully!", "success");
  }

  filterAvailableGroups() {
    const selectedSubject = document.getElementById("subjectFilter").value;

    if (!selectedSubject) {
      this.renderAvailableGroups();
      return;
    }

    const filteredGroups = this.availableGroups.filter(
      (group) => group.subject === selectedSubject,
    );

    const container = document.getElementById("availableGroupsList");
    container.innerHTML = filteredGroups
      .map(
        (group) => `
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 m-3 shadow-sm hover-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h6 class="card-title mb-0">${group.name}</h6>
              <span class="badge bg-${this.getSubjectColor(group.subject)}">${this.formatSubject(group.subject)}</span>
            </div>

            <p class="card-text text-muted small mb-3">${group.description}</p>

            <div class="mb-3">
              <div class="d-flex justify-content-between text-muted small mb-1">
                <span><i class="bi bi-people me-1"></i>${group.members}/${group.maxMembers} members</span>
                <span><i class="bi bi-person me-1"></i>${group.owner}</span>
              </div>
              <div class="text-muted small">
                <i class="bi bi-calendar me-1"></i>${this.formatMeetingTime(group)}
              </div>
              <div class="text-muted small">
                <i class="bi bi-geo-alt me-1"></i>${group.location}
              </div>
            </div>

            <div class="d-grid">
              ${
                group.canJoin
                  ? `<button class="btn btn-primary btn-sm" onclick="joinGroup(${group.id})">
                       <i class="bi bi-plus-lg me-1"></i>Join Group
                     </button>`
                  : `<button class="btn btn-secondary btn-sm" disabled>
                       <i class="bi bi-x-circle me-1"></i>Group Full
                     </button>`
              }
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  formatMeetingTime(group) {
    return `${this.capitalize(group.meetingDay)}s at ${this.formatTime(group.meetingTime)}`;
  }

  formatTime(time) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  addHours(time, hours) {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);
    date.setHours(date.getHours() + parseInt(hours));
    return date.toTimeString().slice(0, 5);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  formatSubject(subject) {
    return subject
      .split("-")
      .map((word) => this.capitalize(word))
      .join(" ");
  }

  getSubjectColor(subject) {
    const colors = {
      "software-engineering": "primary",
      "database-systems": "success",
      "computer-networks": "info",
      cybersecurity: "danger",
      algorithms: "warning",
      "mobile-development": "secondary",
    };
    return colors[subject] || "secondary";
  }

  getSessionStatusColor(status) {
    const colors = {
      upcoming: "primary",
      ongoing: "success",
      completed: "secondary",
      cancelled: "danger",
    };
    return colors[status] || "secondary";
  }
}

// Global functions
function joinGroup(id) {
  window.studyGroups.joinGroup(id);
}

function scheduleSession(groupId) {
  window.studyGroups.scheduleSession(groupId);
}

function viewGroupDetails(id) {
  window.showToast("Group details available in full version", "info");
}

function editGroup(id) {
  window.showToast("Edit functionality available in full version", "info");
}

function deleteGroup(id) {
  if (confirm("Are you sure you want to delete this group?")) {
    window.showToast("Group deleted successfully!", "success");
  }
}

function leaveGroup(id) {
  if (confirm("Are you sure you want to leave this group?")) {
    window.showToast("Left group successfully!", "success");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.studyGroups = new StudyGroups();

    // Schedule session form handler
    document
      .getElementById("scheduleSessionForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        window.studyGroups.scheduleSessionSubmit();
      });
  }, 100);
});
