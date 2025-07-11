// BiTS Connect - Navigation Fix
// Ensures all navigation works properly

(function () {
  "use strict";

  console.log("🔧 Navigation Fix Script Loaded");

  function fixNavigation() {
    // Remove any event listeners that might interfere with navigation
    document.removeEventListener("click", handleNavigationClick);
    document.addEventListener("click", handleNavigationClick);

    // Fix all links to use relative paths
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      // Skip external links, anchors, javascript links
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      // Ensure HTML extension for local pages
      if (href && !href.includes(".") && !href.includes("/") && href !== "") {
        link.setAttribute("href", href + ".html");
        console.log("Fixed link:", href, "->", href + ".html");
      }

      // Remove any absolute URLs that might have been added
      if (href.includes("fly.dev") || href.includes("localhost:")) {
        const newHref = href.split("/").pop();
        link.setAttribute("href", newHref);
        console.log("Fixed absolute URL:", href, "->", newHref);
      }
    });
  }

  function handleNavigationClick(e) {
    const link = e.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");

    // Skip if it's an external link, anchor, or javascript
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href.startsWith("mailto:")
    ) {
      return;
    }

    // For local HTML files, ensure navigation works
    if (href.endsWith(".html")) {
      console.log("Navigating to:", href);

      // Prevent any interference
      e.stopPropagation();

      // Use the browser's natural navigation
      return true;
    }
  }

  // Force enable all navigation
  function enableAllNavigation() {
    // Remove any disabled attributes
    document.querySelectorAll("a[disabled]").forEach((link) => {
      link.removeAttribute("disabled");
    });

    // Remove any click prevention
    document.querySelectorAll("a").forEach((link) => {
      link.style.pointerEvents = "auto";
    });

    console.log("✅ All navigation enabled");
  }

  // Test navigation
  function testNavigation() {
    const testPages = ["dashboard.html", "about.html", "library.html"];
    console.log("🧪 Testing navigation...");

    testPages.forEach((page) => {
      fetch(page)
        .then((response) => {
          console.log(`✅ ${page}: Status ${response.status}`);
        })
        .catch((error) => {
          console.error(`❌ ${page}: ${error.message}`);
        });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    fixNavigation();
    enableAllNavigation();

    // Run test after a short delay
    setTimeout(testNavigation, 1000);

    // Re-fix navigation periodically in case something modifies links
    setInterval(fixNavigation, 5000);
  }

  // Global function to navigate
  window.navigateTo = function (page) {
    console.log("navigateTo called:", page);

    // Ensure .html extension
    if (!page.includes(".") && !page.includes("/")) {
      page = page + ".html";
    }

    try {
      window.location.href = page;
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback
      window.location.assign(page);
    }
  };

  console.log("🚀 Navigation fix script initialized");
})();
