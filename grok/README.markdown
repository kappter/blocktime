# BlockTime

## Overview
BlockTime is a web app that helps users visualize and manage their weekly time allocation. Inspired by a Lego-based time management concept, it allows users to create custom categories, assign colors, and "drop" blocks into a 7-day grid (Monday to Sunday) to represent time spent on activities. Users can choose time resolutions (15, 30, or 60 minutes per block) and generate a report with a summary, table, and pie chart, which can be downloaded as a PDF. The app is optimized for both desktop and mobile devices with a modern, touch-friendly interface, ideal for students planning their week for assignments.

## Features
- **Custom Categories**: Define activity categories with names and colors.
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute blocks.
- **Interactive Grid**: Drop blocks into a single-day view (switchable via dropdown) that stack from the bottom, Connect Four-style.
- **Time Markers**: Simplified labels at 12AM, 6AM, 12PM, 6PM for clarity.
- **Legend**: Scrollable strip showing all categories and colors.
- **Dark Mode**: Toggle between light and dark themes.
- **Enhanced Report**: Includes student name, dynamic summary with motivational text, table, and pie chart.
- **PDF Export**: Download the report as a PDF with name, summary, table, and chart.
- **Reset Option**: Clear the grid to start over.
- **Mobile-Friendly**: Single-day view, touch and click support, responsive design.

## Setup
1. **Download the App**:
   - Save the following files in a project folder:
     - `index.html` (main app structure)
     - `styles.css` (styling)
     - `script.js` (logic and PDF export)
2. **Run the App**:
   - Place all files in the same directory.
   - Open `index.html` in a modern web browser (e.g., Chrome, Firefox, Safari) on desktop or mobile.
   - For best results, use a local server (e.g., `python -m http.server` and access `http://localhost:8000`) to avoid file protocol issues.
   - No additional installation is required; the app uses pure HTML, CSS, and JavaScript.
3. **Dependencies**:
   - Internet connection for CDNs:
     - Chart.js (`https://cdn.jsdelivr.net/npm/chart.js`) for the pie chart.
     - jsPDF (`https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`) for PDF export.

## Usage
1. **Access Controls**:
   - Tap/click the hamburger menu (☰) to show/hide controls and legend.
2. **Set Time Resolution**:
   - Select 15, 30, or 60 minutes from the dropdown and tap/click "Set Resolution" to adjust the grid’s time slots (e.g., 96 slots for 15-minute blocks in a 24-hour day).
3. **Create Categories**:
   - Enter a category name (e.g., "Sleep", "Study") and pick a color.
   - Tap/click "Add" to create the category, which appears as a tappable button.
4. **Drop Blocks**:
   - Select a day from the dropdown (e.g., Monday).
   - Tap/click a category button to select it (it highlights).
   - Tap/click the day column to drop a block. Blocks stack from the bottom.
   - Each block represents one time unit (based on resolution).
5. **Generate Report**:
   - Enter your name in the report section.
   - Tap/click "Generate Report" to see a summary, table, and pie chart.
   - The summary includes total hours, top category, and motivational text (e.g., "Great job, [Name]! 🎉").
6. **Download PDF**:
   - Tap/click "Download PDF" to save the report as `BlockTime_Report_[Name].pdf` (includes name, summary, table, and chart).
7. **Reset**:
   - Tap/click "Reset" to clear the grid.
8. **Toggle Theme**:
   - Tap/click "Toggle Dark Mode" to switch themes.

## Example
- Choose "30 minutes" resolution (48 slots per day).
- Add categories: "Sleep" (blue), "Study" (yellow), "Leisure" (green).
- Select "Monday", tap/click "Sleep", then tap/click the column 16 times for 8 hours of sleep.
- Repeat for other days using the dropdown.
- Enter your name (e.g., "Alex"), tap/click "Generate Report" to see a breakdown (e.g., "Sleep: 56 hours, 33.3%"), and download as PDF.

## Notes
- The app runs in the browser and does not save data between sessions.
- The PDF export includes your name, a motivational summary, table, and pie chart, suitable for assignment submission.
- The single-day view, touch/click support, and responsive design (85vw grid, 80vh height) ensure a smooth mobile experience.
- Time markers are simplified (12AM, 6AM, 12PM, 6PM) for clarity, with precise alignment.
- If you encounter errors (e.g., script loading issues), ensure files are in the same directory and use a local server. Test in Incognito mode to rule out extension interference (e.g., MindStudio content scripts).
- Future enhancements could include swipe gestures, saving plans, or additional report customization.

## License
This is a free, open-source tool for educational use. No warranty is provided.