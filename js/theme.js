/**
 * Theme Manager: Light / Dark Mode
 * Handles system preferences, local storage persistence, and dispatching theme-change events
 * so Chart.js can dynamically refresh palette colors without reloading.
 */

(function () {
  const THEME_STORAGE_KEY = "bdm_case_study_theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update toggle button accessibility and labels
    const toggleBtn = document.getElementById("themeToggleBtn");
    const toggleLabel = document.getElementById("themeToggleLabel");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      if (toggleLabel) {
        toggleLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
      }
    }

    // Dispatch custom event for Chart.js updates
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  // Initial application immediately to prevent flash
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());

    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
      });
    }

    // Listen to OS theme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });
})();
