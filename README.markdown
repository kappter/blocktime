# BlockTime

## Overview
BlockTime is a simple web app that helps users visualize and manage their weekly time allocation. Inspired by a Lego-based time management concept, it allows users to create custom categories, assign colors, and "drop" blocks into a 7-day grid (Monday to Sunday) to represent time spent on activities. Each block shows its category and time range (e.g., "Sleep: 12:00-12:30 AM"), with running totals for categories and the overall week displayed below the grid. Users can toggle the time axis (12AM at top or bottom), copy a day's schedule, save it as a reusable "day type" (e.g., Work, Weekend), save/load the schedule as a JSON file (including resolution and time direction), and undo mistaken block placements (via a button in the top controls). The app supports time resolutions (15, 30, or 60 minutes per block) and generates a report with a summary, table, color-coded week view, and pie chart, downloadable as a PDF in landscape orientation for better readability. It’s optimized for desktop and mobile with a touch-friendly interface, ideal for students planning their week for assignments.

## Features
- **Custom Categories**: Define activity categories with names and colors.
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute blocks, saved/loaded with the schedule.
- **Time Axis Toggle**: Use the "Time Render" button to switch between 12AM at the top (ascending) or bottom (descending) of the grid, updating time markers (12AM, 6AM, 12PM, 6PM) and block time allocations in both the grid and report week view.
- **Interactive Grid**: Drop blocks into a single-day view (switchable via dropdown) that stack from the bottom (or top, based on time direction), Connect Four-style.
- **Block Labels**: Each block shows its category and time range (e.g., "Sleep: 12:00-12:30 AM"), correctly aligned with time direction (ascending or descending).
- **Running Totals**: Displays hours per category and total hours below the grid, updated dynamically.
- **Copy Day**: Copy the current day’s schedule to another day (e.g., Monday to Wednesday).
- **Day Types**: Save a day’s schedule as a named type (e.g., "Work", "Weekend") and apply it to any day.
- **Save/Load Schedule**: Save the entire schedule (resolution, time direction, categories, grid, day types) as a JSON file and load it back to edit.
- **Undo Action**: Revert the last block placement, day copy, or day type application (up to 10 actions) using the "Undo Last Action" button in the top controls near "Add".
- **Time Markers**: Simplified labels at 12AM, 6AM, 12PM, 6PM, integrated as a table-like column in the grid and drawn on the left in the week view, updating with time direction to align with block time ranges.
- **Legend**: Scrollable strip showing all categories and colors.
- **Dark Mode**: Toggle between light and dark themes.
- **Enhanced Report**: Includes student name, dynamic summary with motivational text, table, color-coded week view (all 7 days, matching time direction), and pie chart.
- **PDF Export**: Download the report as a PDF in landscape orientation with name, summary, table, week view (spanning ~260mm with larger text), and pie chart (~100mm), with time markers and block labels reflecting the selected time direction.
- **Reset Option**: Clear the grid to start over.
- **Mobile-Friendly**: Single-day view, touch and click support, responsive design.

## Setup
1. **Download the App**:
   - Save the following files in a project folder:
     - `index.html` (main app structure)
     - `styles.css` (styling)
     - `script.js` (logic and PDF export)
     - `.nojekyll` (for GitHub Pages to bypass Jekyll)
2. **Run Locally**:
   - Place all files in the same directory.
   - Open `index.html` in a modern web browser (e.g., Chrome, Firefox, Safari) on desktop or mobile.
   - For best results, use a local server (e.g., `python -m http.server` and access `http://localhost:8000`) to avoid file protocol issues.
   - No additional installation is required; the app uses pure HTML, CSS, and JavaScript.
3. **Dependencies**:
   - Internet connection for CDNs:
     - Chart.js (`https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`) for the pie chart.
     - jsPDF (`https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`) for PDF export.
     - jspdf-autotable (`https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js`) for table rendering in PDF.

## Deployment to GitHub Pages
1. **Create a GitHub Repository**:
   - Create a new repository named `BlockTime` (or your preferred name) on GitHub.
   - Initialize it with a `main` branch (default).
2. **Add Files**:
   - Clone the repository locally: `git clone https://github.com/your-username/BlockTime.git`
   - Copy the following files into the repository root:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `.nojekyll` (empty file to disable Jekyll processing)
   - Commit the files:
     ```bash
     git add .
     git commit -m "Initial commit with BlockTime files"
     git push origin main
     ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Choose the `main` branch and `/ (root)` as the folder.
   - Click **Save**.
   - Wait a few minutes for deployment. GitHub Pages will provide a URL (e.g., `https://your-username.github.io/BlockTime/`).
4. **Verify Deployment**:
   - Visit the provided URL (e.g., `https://your-username.github.io/BlockTime/`).
   - Ensure the app loads, and test features (e.g., add a category, drop blocks, toggle time direction, generate report, download PDF).
   - Check the browser console (F12) for any errors (e.g., CDN failures).
5. **Notes**:
   - The `<base href="/BlockTime/">` tag in `index.html` assumes the repository name is `BlockTime`. If your repository has a different name, update the `href` to match (e.g., `/YourRepoName/`).
   - If deploying to a custom domain or user/organization site (`username.github.io`), remove the `<base>` tag or set it to `/`.
   - CDN scripts have `onerror` alerts to notify users of loading issues. Ensure an internet connection for Chart.js and jsPDF.

## Usage
1. **Build the Day (Grid Settings & Category Management)**:
   - Use the grid settings to set resolution and toggle time direction.
   - Select a day from the dropdown (e.g., Monday).
   - Click the "Time Render" button to toggle between 12AM at the top (ascending) or bottom (descending), updating time markers (12AM, 6AM, 12PM, 6PM) and block time allocations.
   - In category management, add categories, select mindset, tap/click a category button to select it (it highlights).
   - Tap/click the day column to drop a block. Blocks stack from the bottom (descending) or top (ascending), showing the category and time range (e.g., "Sleep: 12:00-12:30 AM" at the top for ascending).
   - Tap/click "Undo Last Action" to revert the last block placement, day copy, or day type application.
   - Check the "Time Allocation Totals" section below the grid for category and overall hours.
2. **Day Operations & Schedule Management**:
   - Select a target day from the "Copy Day" dropdown and tap/click "Copy Current Day" to duplicate the current day’s schedule.
   - Enter a name (e.g., "Work") in the "Save Day Type" input and tap/click "Save Day Type" to store the current day’s schedule.
   - Select a saved day type from the "Apply Day Type" dropdown and tap/click "Apply Day Type" to populate the current day.
   - Tap/click "Save Schedule" to download a `BlockTime_Schedule.json` file (includes resolution and time direction).
   - Upload a `BlockTime_Schedule.json` file via the file input to load a saved schedule, including the correct resolution and time direction.
3. **Generate Report**:
   - Enter your name in the report section.
   - Tap/click "Generate Report" to see a summary, table, color-coded week view (all 7 days, matching time direction), and pie chart.
   - The summary includes total hours, top category, and motivational text (e.g., "Great job, [Name]! 🎉").
   - The week view shows all days with color-coded blocks and time markers (12AM, 6AM, 12PM, 6PM, oriented to match time direction and block time allocations).
4. **Download PDF**:
   - Tap/click "Download PDF" to save the report as `BlockTime_Report_[Name].pdf` in landscape orientation.
   - The PDF includes the name, summary, table, week view (spanning ~260mm with larger text), and pie chart (~100mm) for improved readability.
5. **Reset**:
   - Tap/click "Reset" to clear the grid and totals.
6. **Toggle Theme**:
   - Tap/click "Toggle Dark Mode" to switch themes, updating the week view accordingly.

## Example
- Use grid settings to choose "30 minutes" resolution (48 slots per day).
- Click "Time Render" to set 12AM at the top (ascending, time flows downward).
- Add categories: "Sleep" (blue), "Study" (yellow), "Work" (red).
- Select "Monday", tap/click "Sleep", then tap/click the column 16 times for 8 hours of sleep (blocks labeled, e.g., "Sleep: 12:00-12:30 AM" at the top).
- If you accidentally add a "Work" block, use "Undo Last Action" to remove it.
- Verify time markers: 12AM at top, 6AM below, 12PM below, 6PM below, aligned with block time ranges (e.g., 12:00-12:30 AM at top for ascending).
- Check totals (e.g., "Sleep: 8.0 hours, Total: 8.0 hours").
- Use day operations to save Monday as "Work" day type, then apply it to Tuesday.
- Copy Monday’s schedule to Wednesday.
- Tap/click "Save Schedule" to download `BlockTime_Schedule.json` (includes resolution: 30, timeDirection: top).
- Start a new session, upload the JSON file, and verify the schedule, resolution (30 minutes), and time direction (12AM at top) are restored with correct time markers and block allocations.
- Enter your name (e.g., "Alex"), tap/click "Generate Report" to see a breakdown (e.g., "Sleep: 56 hours, 33.3%"), week view (with 12AM at top, time markers and blocks aligned), and pie chart, then download as PDF.

## Notes
- The app runs in the browser and does not save data between sessions (day types, schedules, and undo stack reset on reload unless saved/loaded).
- The saved JSON file includes the resolution (15, 30, or 60 minutes) and time direction (bottom or top), ensuring accurate time calculations and grid orientation when loaded.
- Block labels show the category and time range, adjusted for time direction (e.g., first block is 12:00-12:30 AM at the top for ascending or bottom for descending), with correct time stamp progression in ascending mode.
- The "Time Allocation Totals" section shows running hours per category and overall, updated as you add, copy, load, or undo blocks.
- The "Undo Last Action" button reverts the last block placement, day copy, or day type application (up to 10 actions).
- The "Copy Day" feature duplicates a day's schedule, and "Day Types" let you save and reuse schedules (e.g., for Work or Weekend days).
- The "Time Render" button toggles the grid and week view between 12AM at the top (ascending, time flows downward) or bottom (descending, time flows upward), with time markers (12AM, 6AM, 12PM, 6PM) and block time allocations updating to match (e.g., block labels increase downward for ascending).
- The PDF export is in landscape orientation, with a larger week view (~260mm wide, ~60mm tall) and pie chart (~100mm), with scaled-up text (e.g., 8px for block labels, 10px for time markers, 12px for day labels) reflecting the selected time direction and correct time marker and block alignment.
- The single-day view, touch/click support, and responsive design (85vw grid, 80vh height) ensure a smooth mobile experience.
- Time markers are integrated as a table-like column in the grid (using absolute positioning) and drawn on the left in the week view, updating with time direction to match block time ranges.
- Controls are grouped into functional modules for better organization (e.g., Grid Settings, Category Management).
- If controls don’t appear or layout issues occur, check DevTools (F12) Console for errors.
- If you encounter issues (e.g., script loading, Chart.js, or jsPDF errors), ensure files are in the same directory and use a local server. Test in Incognito mode to rule out extension interference (e.g., MindStudio content scripts). Check the console for CDN-related errors and ensure an internet connection is available.
- Future enhancements could include persistent storage, swipe gestures, or default day types with pre-set categories.

## Troubleshooting
- **Chart.js or jsPDF Errors**: If you see errors like `Chart is not defined` or `window.jspdf is undefined`, check your internet connection, as the app relies on CDNs for Chart.js and jsPDF. Open DevTools (F12) and look for console errors related to CDN URLs (e.g., `https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`). Try refreshing the page or testing in Incognito mode to disable extensions (e.g., MindStudio) that may interfere.
- **PDF Readability**: The PDF is in landscape orientation with a larger week view (~260mm wide, ~60mm tall) and pie chart (~100mm), with scaled-up text (e.g., 8px for block labels, 10px for time markers, 12px for day labels) for better readability, matching the selected time direction and time marker/block alignment. If text is still hard to read, ensure you’re using a PDF viewer that supports zooming (e.g., Adobe Acrobat, browser PDF viewer).
- **Time Direction Issues**: If the grid or week view time markers or block time allocations do not update with the "Time Render" button or misalign with block time ranges (e.g., all blocks showing the same time in ascending mode), verify the "Time Render" button was clicked, or check if the loaded JSON file specifies `timeDirection`. Ensure the grid and week view time markers (12AM, 6AM, 12PM, 6PM) and block labels correctly align with time ranges in ascending mode (e.g., "12:00-12:30 AM" at top, "12:30-1:00 AM" below).
- **GitHub Pages Issues**: If the app doesn’t load at `https://your-username.github.io/BlockTime/`, verify the `<base href="/BlockTime/">` matches your repository name. Check the browser console for 404 errors on `styles.css` or `script.js`. Ensure all files are in the repository root and GitHub Pages is enabled for the `main` branch. If using a custom domain, remove the `<base>` tag.
- **General Issues**: If the app doesn’t load or controls are missing, ensure all files (`index.html`, `styles.css`, `script.js`, `.nojekyll`) are in the repository root. Test in Incognito mode to rule out extension interference. Check the console for errors and report them for further assistance.

## License
This is a free, open-source tool for educational use. No warranty is provided.