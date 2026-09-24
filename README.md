# BDM Capstone

An interactive data science case study analyzing seasonal enrollment trends at A Computer Center in Jaspur, Uttarakhand, India.

## Overview

This project examines student admissions, fee transactions, course demand, and seasonal patterns using operational records from 2023 and 2024.

The case study includes:

- 211 student enrollment records
- 343 fee transaction records
- Enrollment trends from January 2023 to September 2024
- Fee transaction records through November 2024
- Data preparation and standardization methods
- Interactive charts and visual analysis
- Findings and recommendations for operational planning

## Key Findings

- 70 of 211 enrollments occurred during May and June, representing 33.2% of total admissions.
- January to September enrollment was stable year over year, with 89 students in 2023 and 88 in 2024.
- Tally was the most selected course, with 44 enrollments.

## Project Structure

```text
.
├── index.html
├── assets/
│   └── data/project-data.js
├── css/
│   ├── base.css
│   ├── case-study.css
│   ├── components.css
│   └── variables.css
└── js/
	├── charts.js
	├── main.js
	└── theme.js
```

## Technologies

- HTML5
- CSS3
- JavaScript
- Chart.js
- Google Fonts

## Running the Project

This is a static website and does not require a build step or package installation.

Open `index.html` in a browser, or serve the project directory with a local web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Author

Anas Khan