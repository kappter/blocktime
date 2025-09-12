# BlockTime Application Setup Guide

## Overview

BlockTime is a web-based time management application that helps users visualize and manage their weekly time allocation using a Lego-inspired block system. The application allows you to create custom categories, assign colors, and drop time blocks into a 7-day grid to represent time spent on activities.

## What's Included

The BlockTime project contains the following files:
- `index.html` - Main application structure
- `styles.css` - Application styling
- `script.js` - Core application logic and PDF export functionality
- `categories.js` - Category management functionality
- `dayOperations.js` - Day copying and scheduling operations
- `grid.js` - Grid visualization and interaction logic
- `schedule.js` - Schedule saving/loading functionality
- `report.js` - Report generation functionality
- `report.html` - Report page template
- `comparison.html` - Schedule comparison functionality
- `README.markdown` - Detailed documentation
- `blocktime.png` - Application screenshot
- `grok/` - Additional implementation variant

## Setup Instructions

### Method 1: Local HTTP Server (Recommended)

1. **Extract the files** (already done):
   ```bash
   unzip blocktime-main.zip
   cd blocktime-main
   ```

2. **Start a local web server**:
   ```bash
   python3 -m http.server 8000
   ```

3. **Access the application**:
   - Open your web browser
   - Navigate to `http://localhost:8000`
   - The application should load and be fully functional

### Method 2: Direct File Access

1. Simply open `index.html` directly in your web browser
2. Note: Some features may not work properly due to browser security restrictions with the `file://` protocol

## Key Features Verified

✅ **Application loads successfully** - The web interface displays correctly
✅ **Category management works** - Successfully added a "Work" category
✅ **Time grid displays** - Monday schedule grid shows with hourly time slots
✅ **Interactive elements functional** - Buttons, inputs, and dropdowns are responsive
✅ **Day selection available** - All 7 days of the week are selectable
✅ **Multiple time resolutions** - 15, 30, and 60-minute block options

## Application Features

- **Custom Categories**: Create activity categories with names and colors
- **Flexible Time Resolution**: Choose 15, 30, or 60-minute time blocks
- **Interactive Grid**: Drop blocks into daily schedules with Connect Four-style stacking
- **Time Management**: Copy days, save day types, and manage weekly schedules
- **Reports & Analytics**: Generate reports with summaries, tables, and pie charts
- **PDF Export**: Download reports as landscape-oriented PDFs
- **Save/Load**: Export and import schedules as JSON files
- **Mobile-Friendly**: Responsive design for desktop and mobile use

## Dependencies

The application uses the following external libraries via CDN:
- **Chart.js** - For pie chart generation in reports
- **jsPDF** - For PDF export functionality
- **jspdf-autotable** - For table rendering in PDFs

*Note: An internet connection is required for these CDN resources to load properly.*

## Usage Tips

1. **Start by setting your time resolution** (15, 30, or 60 minutes)
2. **Create categories** for your activities (Work, Sleep, Study, etc.)
3. **Select a day** and click on time slots to add blocks
4. **Use day operations** to copy schedules between days
5. **Generate reports** to analyze your time allocation
6. **Save your schedule** as JSON for future use

## Troubleshooting

- **If the application doesn't load**: Ensure you're using a local server rather than opening the file directly
- **If charts don't appear**: Check your internet connection for CDN resources
- **If PDF export fails**: Verify that jsPDF libraries are loading correctly

## Current Status

✅ **Successfully extracted and set up**
✅ **Local web server running on port 8000**
✅ **Application accessible at http://localhost:8000**
✅ **Core functionality verified and working**

The BlockTime application is now ready for use!
