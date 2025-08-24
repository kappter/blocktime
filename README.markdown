# BlockTime

## Overview
BlockTime is a simple web app that helps users visualize and manage their weekly time allocation. Inspired by a Lego-based time management concept, it allows users to create custom categories, assign colors, and "drop" blocks into a 7-day grid (Monday to Sunday) to represent time spent on activities. Each block shows its category and time range (e.g., "Sleep: 8:00-8:30 PM"), with running totals for categories and the overall week displayed below the grid. Users can copy a day's schedule, save it as a reusable "day type" (e.g., Work, Weekend), save/load the schedule as a JSON file (including resolution), and undo mistaken block placements. The app supports time resolutions (15, 30, or 60 minutes per block) and generates a report with a summary, table, color-coded week view, and pie chart, downloadable as a PDF in landscape orientation for better readability. It’s optimized for desktop and mobile with a touch-friendly interface, ideal for students planning their week for assignments.

## Features
- **Custom Categories**: Define activity categories with names and colors.
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute blocks, saved/loaded with the schedule.
- **Interactive Grid**: Drop blocks into a single-day view (switchable via dropdown) that stack from the bottom, Connect Four-style.
- **Block Labels**: Each block shows its category and time range (e.g., "Sleep: 8:00-8:30 PM").
- **Running Totals**: Displays hours per category and total hours below the grid, updated dynamically.
- **Copy Day**: Copy the current day’s schedule to another day (e.g., Monday to Wednesday).
- **Day Types**: Save a day’s schedule as a named type (e.g., "Work", "Weekend") and apply it to any day.
- **Save/Load Schedule**: Save the entire schedule (resolution, categories, grid, day types) as a JSON file and load it back to edit.
- **Undo Action**: Revert the last block placement, day copy, or day type application.
- **Time Markers**: Simplified labels at 12AM, 6AM, 12PM, 6PM, integrated as a table-like column.
- **Legend**: Scrollable strip showing all categories and colors.
- **Dark Mode**: Toggle between light and dark themes.
- **Enhanced Report**: Includes student name, dynamic summary with motivational text, table, color-coded week view (all 7 days), and pie chart.
- **PDF Export**: Download the report as a PDF in landscape orientation with name, summary, table, week view (larger, spanning ~260mm), and pie chart (~100mm), with improved text readability.
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
     - Chart.js (`https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`) for the pie chart.
     - jsPDF (`https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`) for PDF export.
     - jspdf-autotable (`https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js`) for table rendering in PDF.

## Usage
1. **Build the Day (Top Section)**:
   - Use the top controls to set resolution, add categories, and drop blocks into the grid.
   - Select a day from the dropdown (e.g., Monday).
   - Tap/click a category button to select it (it highlights).
   - Tap/click the day column to drop a block. Blocks stack from the bottom, showing the category and time range (e.g., "Sleep: 12:00-12:30 AM").
   - Check the "Time Allocation Totals" section below the grid for category and overall hours.
2. **Copy/Save Features (Bottom Section)**:
   - Use the bottom features for copying days, saving/applying day types, save/load schedules, and undo.
   - Select a target day from the "Copy Day" dropdown and tap/click "Copy Current Day" to duplicate the current day’s schedule.
   - Enter a name (e.g., "Work") in the "Save Day Type" input and tap/click "Save Day Type" to store the current day’s schedule.
   - Select a saved day type from the "Apply Day Type" dropdown and tap/click "Apply Day Type" to populate the current day.
   - Tap/click "Save Schedule" to download a `BlockTime_Schedule.json` file (includes resolution).
   - Upload a `BlockTime_Schedule.json` file via the file input to load a saved schedule, including the correct resolution.
   - Tap/click "Undo Last Action" to revert the last block placement, day copy, or day type application.
3. **Generate Report**:
   - Enter your name in the report section.
   - Tap/click "Generate Report" to see a summary, table, color-coded week view (all 7 days), and pie chart.
   - The summary includes total hours, top category, and motivational text (e.g., "Great job, [Name]! 🎉").
   - The week view shows all days with color-coded blocks and time labels (12AM, 6AM, 12PM, 6PM).
4. **Download PDF**:
   - Tap/click "Download PDF" to save the report as `BlockTime_Report_[Name].pdf` in landscape orientation.
   - The PDF includes the name, summary, table, week view (spanning ~260mm with larger text), and pie chart (~100mm) for improved readability.
5. **Reset**:
   - Tap/click "Reset" to clear the grid and totals.
6. **Toggle Theme**:
   - Tap/click "Toggle Dark Mode" to switch themes, updating the week view accordingly.

## Example
- Use top controls to choose "30 minutes" resolution (48 slots per day).
- Add categories: "Sleep" (blue), "Study" (yellow), "Work" (red).
- Select "Monday", tap/click "Sleep", then tap/click the column 16 times for 8 hours of sleep (blocks labeled, e.g., "Sleep: 12:00-12:30 AM").
- If you accidentally add a "Work" block, use the bottom "Undo Last Action" to remove it.
- Check totals (e.g., "Sleep: 8.0 hours, Total: 8.0 hours").
- Use bottom features to save Monday as "Work" day type, then apply it to Tuesday.
- Copy Monday’s schedule to Wednesday.
- Tap/click "Save Schedule" to download `BlockTime_Schedule.json` (includes resolution: 30).
- Start a new session, upload the JSON file, and verify the schedule and resolution (30 minutes) are restored.
- Enter your name (e.g., "Alex"), tap/click "Generate Report" to see a breakdown (e.g., "Sleep: 56 hours, 33.3%"), week view, and pie chart, then download as PDF.

## Notes
- The app runs in the browser and does not save data between sessions (day types, schedules, and undo stack reset on reload unless saved/loaded).
- The saved JSON file includes the resolution (15, 30, or 60 minutes), ensuring accurate time calculations when loaded.
- Block labels show the category and time range, making it clear what time each block represents.
- The "Time Allocation Totals" section shows running hours per category and overall, updated as you add, copy, load, or undo blocks.
- The "Undo Last Action" button reverts the last block placement, day copy, or day type application (up to 10 actions).
- The "Copy Day" feature duplicates a day’s schedule, and "Day Types" let you save and reuse schedules (e.g., for Work or Weekend days).
- The "Save Schedule" feature downloads a JSON file with resolution, categories, grid, and day types, and "Load Schedule" restores it.
- The PDF export is now in landscape orientation, with a larger week view (~260mm wide, ~60mm tall) and pie chart (~100mm) for better readability, using larger fonts for block labels, time markers, and day labels.
- The single-day view, touch/click support, and responsive design (85vw grid, 80vh height) ensure a smooth mobile experience.
- Time markers are integrated as a table-like column on the left, with labels spanning multiple slots for clarity.
- Controls are simplified with a clean, minimal design (reduced padding, shadows, and font sizes).
- If controls don’t appear or layout issues occur, check DevTools (F12) Console for errors.
- If you encounter issues (e.g., script loading, Chart.js, or jsPDF errors), ensure files are in the same directory and use a local server. Test in Incognito mode to rule out extension interference (e.g., MindStudio content scripts). Check the console for CDN-related errors and ensure an internet connection is available.
- Future enhancements could include persistent storage, swipe gestures, or default day types with pre-set categories.

## Troubleshooting
- **Chart.js or jsPDF Errors**: If you see errors like `Chart is not defined` or `window.jspdf is undefined`, check your internet connection, as the app relies on CDNs for Chart.js and jsPDF. Open DevTools (F12) and look for console errors related to CDN URLs (e.g., `https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`). Try refreshing the page or testing in Incognito mode to disable extensions (e.g., MindStudio) that may interfere.
- **PDF Readability**: The PDF is now in landscape orientation with a larger week view (~260mm wide, ~60mm tall) and pie chart (~100mm), with scaled-up text (e.g., 8px for block labels, 10px for time markers, 12px for day labels) for better readability. If text is still hard to read, ensure you’re using a PDF viewer that supports zooming (e.g., Adobe Acrobat, browser PDF viewer).
- **General Issues**: If the app doesn’t load or controls are missing, ensure all files (`index.html`, `styles.css`, `script.js`) are in the same directory. Use a local server (`python -m http.server`) instead of opening `index.html` directly. Test in Incognito mode to rule out extension interference. Check the console for errors and report them for further assistance.

## License
This is a free, open-source tool for educational use. No warranty is provided.