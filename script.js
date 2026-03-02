(function () {
  "use strict";

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isActive = menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
      
      // Accessibility update
      menuToggle.setAttribute("aria-expanded", isActive);
      
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // --- Work Filter ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter work items with a slight fade effect
      workItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
          // Small timeout to allow display:block to apply before animating opacity
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => { item.style.display = "none"; }, 200); // matches CSS transition
        }
      });
    });
  });

  // --- Modal System ---
  const modalOverlay = document.getElementById("modalOverlay");
  const privacyBtn = document.getElementById("privacyBtn");
  const imprintBtn = document.getElementById("imprintBtn");
  const privacyModal = document.getElementById("privacyModal");
  const imprintModal = document.getElementById("imprintModal");
  const closeButtons = document.querySelectorAll(".modal-close");

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    // Focus the close button for accessibility
    modal.querySelector(".modal-close").focus();
  }

  function closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (privacyBtn) privacyBtn.addEventListener("click", () => openModal(privacyModal));
  if (imprintBtn) imprintBtn.addEventListener("click", () => openModal(imprintModal));

  // The missing close logic:
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeAllModals);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // --- Scroll Reveal Animation ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll("section:not(.hero)").forEach(section => {
    section.classList.add("reveal-element");
    revealObserver.observe(section);
  });

})();