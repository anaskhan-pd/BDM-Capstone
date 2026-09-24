/**
 * Case Study Interaction & Navigation Controller
 * Handles table of contents scroll spy, mobile navigation drawer, code copy micro-interactions, and scroll reveals
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Drawer Toggle
    const mobileToggleBtn = document.getElementById("mobileMenuToggle");
    const mobileNavDrawer = document.getElementById("mobileNavDrawer");

    if (mobileToggleBtn && mobileNavDrawer) {
      function toggleMobileMenu(open) {
        const isCurrentlyOpen = mobileToggleBtn.getAttribute("aria-expanded") === "true";
        const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;

        mobileToggleBtn.setAttribute("aria-expanded", String(shouldOpen));
        if (shouldOpen) {
          mobileNavDrawer.removeAttribute("hidden");
        } else {
          mobileNavDrawer.setAttribute("hidden", "");
        }
      }

      mobileToggleBtn.addEventListener("click", () => toggleMobileMenu());

      // Close mobile drawer when a link is clicked
      mobileNavDrawer.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          toggleMobileMenu(false);
        });
      });

      // Close on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileToggleBtn.getAttribute("aria-expanded") === "true") {
          toggleMobileMenu(false);
        }
      });
    }

    // 2. Code Snippet Copy Micro-Interaction
    const copyButtons = document.querySelectorAll(".code-copy-btn");
    copyButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const container = btn.closest(".prep-code-container");
        if (!container) return;
        const codeElement = container.querySelector("pre code");
        if (!codeElement) return;

        const codeText = codeElement.innerText;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(codeText);
          } else {
            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = codeText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
          }

          const textSpan = btn.querySelector(".copy-text") || btn;
          const originalText = textSpan.textContent;
          textSpan.textContent = "Copied ✓";
          btn.classList.add("copied");

          setTimeout(() => {
            textSpan.textContent = originalText;
            btn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code: ", err);
        }
      });
    });

    // 3. Section Scroll Spy (TOC and Desktop Nav)
    const tocLinks = document.querySelectorAll(".toc-link");
    const desktopLinks = document.querySelectorAll(".nav-item-link");
    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            // Update TOC links
            tocLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
                link.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
              } else {
                link.classList.remove("active");
              }
            });

            // Update Desktop Nav links if matching
            desktopLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach((section) => observer.observe(section));
    }

    // 4. Subtle Scroll Reveal Micro-Interaction
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const revealSections = document.querySelectorAll(".case-section");
      revealSections.forEach((sec) => sec.classList.add("reveal-init"));

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08
      });

      revealSections.forEach((sec) => revealObserver.observe(sec));
    }
  });
})();
