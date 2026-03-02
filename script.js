(function () {
  "use strict";

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.style.overflow = mobileNav.classList.contains(
        "active"
      )
        ? "hidden"
        : "";
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Work Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter work items
      workItems.forEach((item) => {
        if (filter === "all") {
          item.classList.remove("hidden");
        } else {
          item.classList.toggle(
            "hidden",
            item.dataset.category !== filter
          );
        }
      });
    });
  });

  // Modal System
  const modalOverlay = document.getElementById("modalOverlay");
  const privacyBtn = document.getElementById("privacyBtn");
  const imprintBtn = document.getElementById("imprintBtn");
  const privacyModal = document.getElementById("privacyModal");
  const imprintModal = document.getElementById("imprintModal");
  const closeButtons = document.querySelectorAll(".modal-close");

  function openModal(modal) {
    modal.classList.add("active");
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (privacyBtn && privacyModal) {
    privacyBtn.addEventListener("click", () => openModal(privacyModal));
  }

  if (imprintBtn && imprintModal) {
    imprintBtn.addEventListener("click", () => openModal(imprintModal));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeAllModals);
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeAllModals);
  });

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();