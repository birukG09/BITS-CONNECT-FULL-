// BiTS Connect - URL Fix Script
// Forces all links to use relative paths instead of absolute URLs

(function () {
  "use strict";

  console.log("🔧 URL Fix Script Starting...");

  function fixAllLinks() {
    let fixedCount = 0;

    // Find all links with absolute URLs
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      // Skip if it's already a relative link, anchor, or external
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      // Check if it's an absolute URL with fly.dev or localhost
      if (
        href.includes("fly.dev") ||
        href.includes("localhost:") ||
        href.startsWith("http")
      ) {
        // Extract just the filename
        const parts = href.split("/");
        const filename = parts[parts.length - 1];

        // If it's an HTML file, make it relative
        if (
          filename.endsWith(".html") ||
          filename === "" ||
          filename.includes("?") ||
          filename.includes("#")
        ) {
          let newHref = filename;

          // Handle root/index page
          if (
            filename === "" ||
            filename === "index.html" ||
            filename.startsWith("?") ||
            filename.startsWith("#")
          ) {
            newHref = "index.html";
            if (filename.startsWith("?") || filename.startsWith("#")) {
              newHref = newHref + filename;
            }
          }

          link.setAttribute("href", newHref);
          console.log(`Fixed: ${href} → ${newHref}`);
          fixedCount++;
        }
      }
    });

    if (fixedCount > 0) {
      console.log(`✅ Fixed ${fixedCount} links`);
    }

    return fixedCount;
  }

  function preventAbsoluteURLs() {
    // Override any functions that might set absolute URLs
    const originalSetAttribute = Element.prototype.setAttribute;

    Element.prototype.setAttribute = function (name, value) {
      if (name === "href" && this.tagName === "A") {
        // If someone tries to set an absolute URL, convert it to relative
        if (
          value &&
          (value.includes("fly.dev") ||
            value.includes("localhost:") ||
            (value.startsWith("http") &&
              !value.startsWith("http://") &&
              !value.startsWith("https://external")))
        ) {
          const parts = value.split("/");
          const filename = parts[parts.length - 1];
          if (filename.endsWith(".html") || filename === "") {
            value = filename || "index.html";
            console.log("Prevented absolute URL, using:", value);
          }
        }
      }
      return originalSetAttribute.call(this, name, value);
    };
  }

  function initializeFixing() {
    console.log("🚀 Initializing URL fixing...");

    // Fix existing links
    fixAllLinks();

    // Prevent future absolute URLs
    preventAbsoluteURLs();

    // Monitor for changes and re-fix
    const observer = new MutationObserver(function (mutations) {
      let needsFixing = false;

      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "href"
        ) {
          needsFixing = true;
        } else if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (
              node.nodeType === 1 &&
              (node.tagName === "A" || node.querySelector("a"))
            ) {
              needsFixing = true;
            }
          });
        }
      });

      if (needsFixing) {
        setTimeout(fixAllLinks, 10);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    // Re-fix periodically as a safety measure
    setInterval(fixAllLinks, 3000);
  }

  // Start fixing immediately
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFixing);
  } else {
    initializeFixing();
  }

  // Also fix when page becomes visible (in case of iframe scenarios)
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      setTimeout(fixAllLinks, 100);
    }
  });

  console.log("🔧 URL Fix Script Loaded");
})();
