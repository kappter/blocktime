# BlockTime

## Overview
BlockTime is a single-page web app that helps users visualize and manage their weekly time allocation. Inspired by a Lego-based time management concept, it allows users to create custom categories, assign them colors, and "drop" blocks into a 7-day grid (Monday to Sunday) to represent time spent on various activities. Users can choose time resolutions (15, 30, or 60 minutes per block) and generate a report summarizing their weekly time distribution with a pie chart.

This app is designed for educational purposes, enabling students to plan their week and submit a report as an assignment. It’s optimized for both desktop and mobile devices with a modern, touch-friendly interface.

## Features
- **Custom Categories**: Define your own activity categories with names and colors.
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute blocks to represent time.
- **Interactive Grid**: Drop colored blocks into a single-day view (switchable via dropdown) that stack from the bottom, Connect Four-style.
- **Time Markers**: Labels every 3 hours (e.g., 12AM, 3AM) for orientation.
- **Legend**: Displays all categories and their colors in a scrollable strip.
- **Dark Mode**: Toggle between light and dark themes for better visibility.
- **Report Generation**: View a table with hours and percentages per category, plus a pie chart.
- **Reset Option**: Clear the grid to start over.
- **Mobile-Friendly**: Single-day view, touch controls, and responsive design for phones.

## Setup
1. **Download the App**:
   - Save the `blocktime.html` file (the entire app is contained in this single file).
2. **Run the App**:
   - Open `blocktime.html` in a modern web browser (e.g., Chrome, Firefox, Edge) on desktop or mobile.
   - No server or additional setup is required; the app uses pure HTML, CSS, and JavaScript.
3. **Dependencies**:
   - Internet connection for the Chart.js CDN (`https://cdn.jsdelivr.net/npm/chart.js`) to render the pie chart.
   - No local installation of libraries is needed.

## Usage
1. **Access Controls**:
   - Tap the hamburger menu (☰) to show/hide the controls and legend.
2. **Set Time Resolution**:
   - Select 15, 30, or 60 minutes from the dropdown and tap "Set Resolution" to adjust the grid’s time slots (e.g., 96 slots for 15-minute blocks in a 24-hour day).
3. **Create Categories**:
   - Enter a category name (e.g., "Sleep", "Study") and pick a color using the color picker.
   - Tap "Add" to create the category. It appears as a tappable button in the menu.
4. **Drop Blocks**:
   - Select a day from the dropdown (e.g., Monday).
   - Tap a category button to select it (it highlights with a border).
   - Tap the day column to drop a block of the selected category. Blocks stack from the bottom.
   - Each block represents one time unit (based on your resolution).
5. **Generate Report**:
   - Tap "Generate Report" to see a table with hours and percentages per category, plus a pie chart.
   - Screenshot or copy the report for assignment submission.
6. **Reset**:
   - Tap "Reset" to clear the grid and start over.
7. **Toggle Theme**:
   - Tap "Toggle Dark Mode" to switch between light and dark themes.

## Example
- Choose "30 minutes" resolution (48 slots per day).
- Add categories: "Sleep" (blue), "Study" (yellow), "Leisure" (green).
- Select "Monday", tap "Sleep", then tap the column 16 times to allocate 8 hours of sleep.
- Repeat for other categories and days using the day dropdown.
- Tap "Generate Report" to see a breakdown (e.g., "Sleep: 56 hours, 33.3%").

## Notes
- The app runs entirely in the browser and does not save data between sessions.
- To capture the report, take a screenshot or copy the table.
- The single-day view and touch controls make it ideal for phones, with a responsive grid and large tap targets.
- Future enhancements could include swipe gestures for day switching, saving plans, or exporting to PDF/CSV.

## License
This is a free, open-source tool for educational use. No warranty is provided.