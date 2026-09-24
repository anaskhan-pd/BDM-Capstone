/**
 * Chart.js Visualizations Controller
 * Editorial Data Science Theme for Ganga Computer Center BDM study
 * Strictly factual data. Handles theme synchronization, accessible tooltips, and responsive redraws.
 */

(function () {
  let peakChartInstance = null;
  let yoyChartInstance = null;
  let courseChartInstance = null;

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      textColor: isDark ? "#f0f2f5" : "#15181c",
      mutedColor: isDark ? "#858e9c" : "#646d7c",
      gridColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
      tooltipBg: isDark ? "#141820" : "#15181c",
      tooltipText: isDark ? "#f0f2f5" : "#ffffff",
      tooltipBorder: isDark ? "#232a35" : "#3b424d",
      peakColor: isDark ? "#fbbf24" : "#b45309",
      nonPeakColor: isDark ? "#334155" : "#cbd5e1",
      bar2023Color: isDark ? "#475569" : "#94a3b8",
      bar2024Color: isDark ? "#60a5fa" : "#1e40af",
      tallyColor: isDark ? "#60a5fa" : "#1e40af",
      otherCoursesColor: isDark ? "#334155" : "#94a3b8",
      canvasBorder: isDark ? "#141820" : "#ffffff"
    };
  }

  function getBaseChartOptions(colors) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: colors.textColor,
            font: {
              family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              size: 12,
              weight: 500
            },
            padding: 18,
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 2,
          boxPadding: 4,
          titleFont: {
            family: "'Inter', sans-serif",
            weight: 600,
            size: 12
          },
          bodyFont: {
            family: "'JetBrains Mono', monospace",
            size: 11
          }
        }
      }
    };
  }

  // 1. Figure 1: Seasonal Peak Concentration Donut Chart
  function initPeakChart() {
    const canvas = document.getElementById("peakConcentrationChart");
    if (!canvas) return;

    const colors = getThemeColors();
    const data = window.PROJECT_DATA?.findings?.seasonalPeak || {
      peakStudents: 70,
      nonPeakStudents: 141,
      peakPercentage: 33.2,
      nonPeakPercentage: 66.8
    };

    if (peakChartInstance) {
      peakChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    peakChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          `May–June Summer Peak (${data.peakPercentage}%)`,
          `Remaining 10 Months (${data.nonPeakPercentage}%)`
        ],
        datasets: [
          {
            data: [data.peakStudents, data.nonPeakStudents],
            backgroundColor: [colors.peakColor, colors.nonPeakColor],
            borderWidth: 2,
            borderColor: colors.canvasBorder,
            hoverOffset: 3
          }
        ]
      },
      options: {
        ...getBaseChartOptions(colors),
        cutout: "72%",
        plugins: {
          ...getBaseChartOptions(colors).plugins,
          tooltip: {
            ...getBaseChartOptions(colors).plugins.tooltip,
            callbacks: {
              label: function (context) {
                const count = context.raw;
                const pct = context.dataIndex === 0 ? data.peakPercentage : data.nonPeakPercentage;
                return ` ${count} students (${pct}% of N=211 total)`;
              }
            }
          }
        }
      }
    });
  }

  // 2. Figure 2: Year-over-Year Demand Stability Bar Chart
  function initYoYChart() {
    const canvas = document.getElementById("yoyComparisonChart");
    if (!canvas) return;

    const colors = getThemeColors();
    const data = window.PROJECT_DATA?.findings?.yoyComparison || {
      year2023: 89,
      year2024: 88
    };

    if (yoyChartInstance) {
      yoyChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    yoyChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan–Sep 2023 (Baseline)", "Jan–Sep 2024 (Comparison)"],
        datasets: [
          {
            label: "Verified Student Enrollments (9-Month Cohort)",
            data: [data.year2023, data.year2024],
            backgroundColor: [colors.bar2023Color, colors.bar2024Color],
            borderRadius: 2,
            maxBarThickness: 54
          }
        ]
      },
      options: {
        ...getBaseChartOptions(colors),
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: colors.textColor,
              font: {
                family: "'Inter', sans-serif",
                weight: 500,
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: colors.gridColor },
            ticks: {
              stepSize: 20,
              color: colors.mutedColor,
              font: {
                family: "'JetBrains Mono', monospace",
                size: 11
              }
            },
            title: {
              display: true,
              text: "Students Enrolled (Count)",
              color: colors.mutedColor,
              font: {
                family: "'Inter', sans-serif",
                size: 11
              }
            }
          }
        },
        plugins: {
          ...getBaseChartOptions(colors).plugins,
          legend: { display: false },
          tooltip: {
            ...getBaseChartOptions(colors).plugins.tooltip,
            callbacks: {
              label: function (context) {
                const diffText = context.dataIndex === 1 ? " (Δ = -1 student, -1.12%)" : " (Reference Cohort)";
                return ` ${context.raw} Students${diffText}`;
              }
            }
          }
        }
      }
    });
  }

  // 3. Figure 3: Curriculum Concentration (Tally Vocational Lead)
  function initCourseChart() {
    const canvas = document.getElementById("courseDemandChart");
    if (!canvas) return;

    const colors = getThemeColors();
    const data = window.PROJECT_DATA?.findings?.courseDemand || {
      tallyEnrollments: 44,
      otherCoursesCombined: 167
    };

    if (courseChartInstance) {
      courseChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    courseChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Tally (Accounting Software)", "Other Programs Combined"],
        datasets: [
          {
            label: "Enrolled Students",
            data: [data.tallyEnrollments, data.otherCoursesCombined],
            backgroundColor: [colors.tallyColor, colors.otherCoursesColor],
            borderRadius: 2,
            maxBarThickness: 42
          }
        ]
      },
      options: {
        indexAxis: "y",
        ...getBaseChartOptions(colors),
        scales: {
          x: {
            beginAtZero: true,
            max: 200,
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.mutedColor,
              font: {
                family: "'JetBrains Mono', monospace",
                size: 11
              }
            },
            title: {
              display: true,
              text: "Total Enrolled Students (N=211)",
              color: colors.mutedColor,
              font: {
                family: "'Inter', sans-serif",
                size: 11
              }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: colors.textColor,
              font: {
                family: "'Inter', sans-serif",
                weight: 500,
                size: 12
              }
            }
          }
        },
        plugins: {
          ...getBaseChartOptions(colors).plugins,
          legend: { display: false },
          tooltip: {
            ...getBaseChartOptions(colors).plugins.tooltip,
            callbacks: {
              label: function (context) {
                const count = context.raw;
                const pct = ((count / 211) * 100).toFixed(1);
                return ` ${count} students (${pct}% of institute registry)`;
              }
            }
          }
        }
      }
    });
  }

  function initAllCharts() {
    initPeakChart();
    initYoYChart();
    initCourseChart();
  }

  // Redraw when theme changes
  window.addEventListener("themechange", () => {
    initAllCharts();
  });

  // Initialize once DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof Chart !== "undefined") {
      initAllCharts();
    } else {
      window.addEventListener("load", initAllCharts);
    }
  });
})();
