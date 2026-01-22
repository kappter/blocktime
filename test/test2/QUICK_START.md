# BlockTime - Quick Start Guide

## Getting Started

### 1. Open BlockTime
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### 2. Create Your Schedule

**Option A: Use a Lifestyle Template**
1. Select a template from the dropdown (e.g., "🎓 College Student")
2. Click "Load Weekly Template"
3. The template applies to the current day

**Option B: Build Manually**
1. Click on time blocks in the grid to assign activities
2. Select an activity category first (Sleep, Work, Study, etc.)
3. Click time slots to fill them with that activity

### 3. Navigate Days
- Use **‹ ›** buttons to move between days
- Click the **date picker** to jump to any date
- Current day is highlighted in the calendar

### 4. Export to Google Calendar

**IMPORTANT for Timezone Accuracy:**
1. Scroll down to **⚙️ Time Settings**
2. Check **Export Timezone** dropdown
3. Select **UTC-7 (MST - Mountain)** (or your timezone)
4. Scroll to **📅 Calendar Integration**
5. Click **📋 Export ICS File**
6. Import the downloaded file into Google Calendar

## Key Features

### Multi-Column Time Grid
- **Night/Early Morning** (12AM-7:59AM)
- **Daytime** (8AM-3:59PM)
- **Evening/Night** (4PM-11:59PM)

No vertical scrolling needed!

### Time Block Sizes
- 60 minutes (24 blocks per day)
- 30 minutes (48 blocks per day)
- 15 minutes (96 blocks per day) - default

### Activity Categories
- Pre-defined: Sleep, Work, Exercise, Meals, Commute, Leisure, Study, Family
- Add custom categories with custom colors

### Week & Month Planning
- Apply current day to selected weekdays
- Apply current day to selected days in the month
- View weekly and monthly totals

### Data Management
- **Export Day**: Save single day as JSON
- **Import Day**: Load previously saved day
- **Export Full Calendar**: Save all days as JSON
- **Import Calendar**: Load complete calendar
- **Reset Day**: Clear current day
- **Reset All Data**: Clear everything

## Timezone Settings

### Why This Matters
Without proper timezone settings, events may appear on the wrong date when imported into Google Calendar.

### Recommended Settings
- **For Mountain Time users**: Select **UTC-7 (MST - Mountain)**
- **For other timezones**: Select your timezone from the dropdown
- **Auto-detect**: Available but manual selection is more reliable

### How It Works
When you export, BlockTime creates an ICS file with:
- Proper VTIMEZONE component
- Your selected timezone (e.g., America/Denver)
- Correct UTC offsets (-0700 for MST, -0600 for MDT)
- All events tagged with timezone information

## Tips & Tricks

1. **Build Monthly Calendars**: Create a week, then copy to other weeks in the month
2. **Use Templates**: Start with a template and customize
3. **Color Coding**: Use distinct colors for different activity types
4. **Regular Exports**: Export weekly to build your Google Calendar gradually
5. **Check Timezone**: Always verify timezone setting before exporting

## Troubleshooting

### Events appear one day off in Google Calendar
- **Solution**: Select UTC-7 (or your timezone) in Export Timezone dropdown before exporting

### Template doesn't load
- **Solution**: Make sure you clicked "Load Weekly Template" after selecting from dropdown

### Time blocks won't fill
- **Solution**: Select an activity category first, then click time blocks

### Data disappeared
- **Solution**: Data is stored in browser localStorage. Clearing browser data will erase schedules. Use Export/Import to backup.

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (Not supported)

## File Structure

- `index.html` - Main application
- `script.js` - Application logic and ICS export
- `styles.css` - Styling and layout
- `SAMPLE_EXPORT.ics` - Example export with correct timezone
- `TIMEZONE_FIX_README.md` - Technical documentation

## Support

For issues or questions about the timezone fix, refer to `TIMEZONE_FIX_README.md` for technical details.

---

**Enjoy planning your time with BlockTime!** 📅✨
