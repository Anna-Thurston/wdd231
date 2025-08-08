document.addEventListener("DOMContentLoaded", () => {
  // Populate hidden timestamp field
  const timestamp = document.getElementById("timestamp");
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  // Navigation toggle with aria-expanded for accessibility
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", function () {
    const expanded = this.getAttribute("aria-expanded") === "true" || false;
    this.setAttribute("aria-expanded", !expanded);
    this.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // Modal open for each "Learn More" link
  document.querySelectorAll(".benefits-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("href").substring(1);
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        // Set focus for accessibility
        modal.querySelector(".modal-content").focus();
      }
    });
  });

  // Modal close buttons
  document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal on clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // Update footer year and last modified
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
  }
});
