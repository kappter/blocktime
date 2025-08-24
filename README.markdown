# BlockTime

## Overview
BlockTime is a minimalist web app designed to help users, particularly students, manage their weekly time allocation. Inspired by a Lego-based time management concept, it allows users to create custom categories, assign colors, and "drop" blocks into a 7-day grid (Monday to Sunday) to represent time spent on activities. Each block shows its category and time range (e.g., "Sleep: 8:00-8:30 PM"), with time labels (12AM, 6AM, 12PM, 6PM) integrated into the grid. Running totals for categories and the week are displayed below the grid. Users can copy days, save/apply day types (e.g., Work, Weekend), save/load schedules as JSON, and undo actions. The app supports time resolutions (15, 30, or 60 minutes) and generates a report with a summary, table, and pie chart, downloadable as a PDF. It’s optimized for desktop and mobile with a touch-friendly, simple design.

## Features
- **Custom Categories**: Define activity categories with names and colors.
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute blocks.
- **Interactive Grid**: Drop blocks into a single-day view (switchable via dropdown) that stack from the bottom, Connect Four-style.
- **Block Labels**: Each block shows its category and time range (e.g., "Sleep: 8:00-8:30 PM").
- **Integrated Time Labels**: Time markers (12AM, 6AM, 12PM, 6PM) appear within the grid for better alignment.
- **Running Totals**: Displays hours per category and total hours below the grid, updated dynamically.
- **Copy Day**: Copy the current day’s schedule to another day (e.g., Monday to Wednesday).
- **Day Types**: Save a day’s schedule as a named type (e.g., "Work", "Weekend") and apply it to any day.
- **Save/Load Schedule**: Save the entire schedule (categories, grid, day types) as a JSON file and load it back to edit.
- **Undo Action**: Revert the last block placement, day copy, or day type application.
- **Legend**: Scrollable strip showing all categories and colors.
- **Dark Mode**: Toggle between light and dark themes.
- **Enhanced Report**: Includes student name, dynamic summary with motivational text, table, and pie chart.
- **PDF Export**: Download the report as a PDF with name, summary, table, and chart.
- **Reset Option**: Clear the grid to start over.
- **Mobile-Friendly**: Single-day view, touch and click support, minimalist responsive design.

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
1. **Access Build Controls**:
   - On mobile, tap/click the "☰ Menu" button to show/hide build controls (day selection, resolution, categories, legend). On desktop (≥600px), build controls are always visible.
2. **Set Time Resolution**:
   - Select 15, 30, or 60 minutes from the dropdown and tap/click "Set Resolution" to adjust the grid’s time slots (e.g., 96 slots for 15-minute blocks in a 24-hour day).
3. **Create Categories**:
   - Enter a category name (e.g., "Sleep", "Study") and pick a color.
   - Tap/click "Add" to create the category, which appears as a tappable button.
4. **Drop Blocks**:
   - Select a day from the dropdown (e.g., Monday).
   - Tap/click a category button to select it (it highlights).
   - Tap/click the day column to drop a block. Blocks stack from the bottom, showing the category and time range (e.g., "Sleep: 12:00-12:30 AM").
   - Check time labels (12AM, 6AM, 12PM, 6PM) integrated into the grid.
   - Check the "Time Allocation Totals" section below the grid for category and overall hours.
5. **Undo Action**:
   - If you mistakenly add a block, copy a day, or apply a day type, tap/click "Undo Last Action" in the manage section to revert.
6. **Copy Day**:
   - In the manage section, select a target day from the "Copy Day" dropdown.
   - Tap/click "Copy Current Day" to duplicate the current day’s schedule.
7. **Save and Apply Day Types**:
   - In the manage section, enter a name (e.g., "Work") in the "Save Day Type" input and tap/click "Save Day Type".
   - Select a saved day type from the "Apply Day Type" dropdown and tap/click "Apply Day Type".
8. **Save Schedule**:
   - In the manage section, tap/click "Save Schedule" to download a `BlockTime_Schedule.json` file.
9. **Load Schedule**:
   - In the manage section, tap/click the file input to upload a `BlockTime_Schedule.json` file to restore the schedule.
10. **Generate Report**:
    - Enter your name in the report section.
    - Tap/click "Generate Report" to see a summary, table, and pie chart.
    - The summary includes total hours, top category, and motivational text (e.g., "Great job, [Name]! 🎉").
11. **Download PDF**:
    - Tap/click "Download PDF" to save the report as `BlockTime_Report_[Name].pdf`.
12. **Reset**:
    - Tap/click "Reset" to clear the grid and totals.
13. **Toggle Theme**:
    - Tap/click "Toggle Dark Mode" in the build section to switch themes.

## Example
- Choose "30 minutes" resolution (48 slots per day).
- Add categories: "Sleep" (blue), "Study" (yellow), "Work" (red).
- Select "Monday", tap/click "Sleep", then tap/click the column 16 times for 8 hours of sleep (blocks labeled, e.g., "Sleep: 12:00-12:30 AM").
- Check time labels (12AM, 6AM, 12PM, 6PM) aligned in the grid.
- If you accidentally add a "Work" block, tap/click "Undo Last Action" to remove it.
- Check totals (e.g., "Sleep: 8.0 hours, Total: 8.0 hours").
- Save Monday as "Work" day type, then apply it to Tuesday.
- Copy Monday’s schedule to Wednesday and undo if copied incorrectly.
- Tap/click "Save Schedule" to download `BlockTime_Schedule.json`.
- Start a new session, upload the JSON file, and verify the schedule (categories, Monday/Wednesday blocks, "Work" day type) is restored.
- Enter your name (e.g., "Alex"), tap/click "Generate Report" to see a breakdown (e.g., "Sleep: 56 hours, 33.3%"), and download as PDF.

## Notes
- The app runs in the browser and does not save data between sessions (day types, schedules, and undo stack reset on reload unless saved/loaded).
- Block labels show the category and time range, and time labels (12AM, 6AM, 12PM, 6PM) are integrated into the grid for clarity.
- The "Time Allocation Totals" section shows running hours per category and overall, updated as you add, copy, load, or undo blocks.
- The "Undo Last Action" button reverts the last block placement, day copy, or day type application (up to 10 actions).
- The "Copy Day" and "Day Types" features are in the manage section for streamlined planning.
- The "Save Schedule" and "Load Schedule" features allow persistent editing via JSON files.
- The PDF export includes your name, a motivational summary, table, and pie chart, suitable for assignment submission.
- The minimalist design (top for building, bottom for managing) and responsive layout (85vw grid, 80vh height) ensure a smooth mobile experience.
- Build controls are always visible on desktop (≥600px) and toggled via a "☰ Menu" button on mobile.
- If controls don’t appear, tap/click the "☰ Menu" button or check DevTools (F12) Console for errors.
- If loading or undoing fails, ensure the uploaded file is a valid `BlockTime_Schedule.json` or check if actions are available (check Console for errors).
- If you encounter issues (e.g., script loading), ensure files are in the same directory and use a local server. Test in Incognito mode to rule out extension interference (e.g., MindStudio content scripts).
- Future enhancements could include persistent storage via localStorage, swipe gestures, or default categories.

## License
This is a free, open-source tool for educational use. No warranty is provided.