/**
 * Project Data Store
 * BDM Capstone: Analyzing Seasonal Enrollment Trends in a Computer Coaching Institute
 * Organization: Ganga Computer Center (Jaspur, Uttarakhand, India)
 * 
 * NOTE: Strictly factual and verified data points provided for the project.
 * No figures are fabricated.
 */

const PROJECT_DATA = {
  metadata: {
    title: "Analyzing Seasonal Enrollment Trends in a Computer Coaching Institute",
    shortTitle: "Seasonal Enrollment Trends Case Study",
    organization: "Ganga Computer Center",
    location: "Jaspur, Uttarakhand, India",
    capstone: "Business Data Management (BDM) Capstone",
    analyst: "Anas Khan",
    academicScope: "Academic Empirical Case Study"
  },

  datasets: {
    enrollments: {
      name: "Student Enrollment Dataset",
      totalRecords: 211,
      period: "January 2023 – September 2024",
      granularity: "Student Level",
      primaryKey: "Standardized Student ID",
      purpose: "Analyzed intake timing, seasonality distribution, and curriculum choice"
    },
    fees: {
      name: "Fee Transaction Dataset",
      totalRecords: 343,
      period: "January 2023 – 15 November 2024",
      granularity: "Transaction Level",
      foreignKey: "Standardized Student ID",
      purpose: "Tracked payment records, cash flow schedules, and fee receipts"
    }
  },

  findings: {
    // 33.2% of total enrollments occurred during May–June
    seasonalPeak: {
      window: "May – June",
      peakPercentage: 33.2,
      peakStudents: 70, // 211 * 0.332 ≈ 70
      nonPeakPercentage: 66.8,
      nonPeakStudents: 141,
      totalStudents: 211
    },

    // Jan–Sep year-over-year comparison
    yoyComparison: {
      periodLabel: "January – September",
      year2023: 89,
      year2024: 88,
      difference: -1,
      percentageChange: -1.12
    },

    // Course distribution
    courseDemand: {
      topCourse: "Tally",
      tallyEnrollments: 44,
      tallyPercentage: 20.85, // 44 / 211
      otherCoursesCombined: 167,
      otherPercentage: 79.15,
      totalStudents: 211
    }
  },

  preprocessing: [
    {
      step: 1,
      title: "Standardizing Student IDs",
      description: "Resolved inconsistent naming conventions, prefixes, and leading zero variations across both enrollment and transaction datasets to ensure reliable relational integrity.",
      field: "Student_ID",
      impact: "Unified primary/foreign key join capability across 211 students and 343 fee transactions."
    },
    {
      step: 2,
      title: "Standardizing Date Formats",
      description: "Transformed varied entry formats (DD/MM/YYYY, text dates, inconsistent timestamps) into standardized ISO 8601 temporal formats for longitudinal analysis.",
      field: "Enrollment_Date, Transaction_Date",
      impact: "Allowed precise monthly and seasonal window aggregation without date parsing errors."
    },
    {
      step: 3,
      title: "Converting Fee-Related Variables to Numeric Values",
      description: "Stripped currency symbols (₹, INR), whitespace, and comma delimiters from fee transaction columns, casting them into numeric float/integer types.",
      field: "Fee_Amount, Balance_Due",
      impact: "Eliminated string-based calculation errors and enabled arithmetic aggregation."
    },
    {
      step: 4,
      title: "Merging MS Office-Related Categories",
      description: "Consolidated fragmented, redundant course label variants (such as 'MS-Office', 'Office Automation', 'MS Word & Excel', 'Computer Basics') into a unified category definition.",
      field: "Course_Name / Category",
      impact: "Eliminated categorical fragmentation to isolate true curriculum demand."
    }
  ]
};

// Export for browser global scope
if (typeof window !== "undefined") {
  window.PROJECT_DATA = PROJECT_DATA;
}
