# Smart Fill Feature Documentation

## Overview

The **Smart Fill** feature allows users to quickly fill multiple time slots across selected days with a single category, dramatically reducing the time needed to create recurring schedule patterns.

## Features

### 1. Category Selection
- Choose any existing category from the dropdown
- Categories include all user-defined activities (Sleep, Work, Exercise, Meals, etc.)

### 2. Day Selection
- **Individual Days**: Check/uncheck Mon, Tue, Wed, Thu, Fri, Sat, Sun
- **Quick Select Buttons**:
  - **Weekdays**: Selects Mon-Fri
  - **Weekend**: Selects Sat-Sun
  - **All Days**: Selects all 7 days

### 3. Time Range
- **Start Time**: Select from 12:00 AM to 11:00 PM
- **End Time**: Select from 12:00 AM to 11:00 PM
- Automatically respects your current time resolution (60/30/15 minutes)

### 4. Emotional State (Optional)
- **Happiness**: Unhappy 😞 / Meh 😐 / Happy 😊
- **Willingness**: Forced 🚫 / Meh 😑 / Willing ✅
- If not specified, uses the category's default emotional state

### 5. Live Preview
- Shows exactly how many time slots will be filled
- Displays selected days and time range
- Updates in real-time as you change options

## Use Cases

### Work Schedule
**Pattern**: Work 9AM-5PM Monday-Friday
- Category: Work
- Days: Weekdays (Mon-Fri)
- Time: 9:00 AM - 5:00 PM
- Result: 40 slots filled (8 hours × 5 days)

### Sleep Pattern
**Pattern**: Sleep 11PM-7AM every day
- Category: Sleep
- Days: All Days
- Time: 11:00 PM - 7:00 AM (handles midnight crossing)
- Result: 56 slots filled (8 hours × 7 days)

### Meal Times
**Pattern**: Lunch 12PM-1PM every day
- Category: Meals
- Days: All Days
- Time: 12:00 PM - 1:00 PM
- Result: 7 slots filled (1 hour × 7 days)

### Weekend Activities
**Pattern**: Leisure Saturday-Sunday afternoons
- Category: Leisure
- Days: Weekend (Sat-Sun)
- Time: 2:00 PM - 6:00 PM
- Result: 8 slots filled (4 hours × 2 days)

## How to Use

1. **Open Smart Fill**
   - Click the "🎯 Smart Fill" button in the Data Management section

2. **Select Category**
   - Choose the activity category from the dropdown

3. **Choose Days**
   - Click individual day checkboxes, or
   - Use quick select buttons (Weekdays/Weekend/All Days)

4. **Set Time Range**
   - Select start time from the first dropdown
   - Select end time from the second dropdown

5. **Optional: Set Emotional State**
   - Choose happiness level (or leave as "Use category default")
   - Choose willingness level (or leave as "Use category default")

6. **Preview**
   - Check the preview message to confirm the number of slots

7. **Apply**
   - Click "Apply Smart Fill" to fill the slots
   - Click "Cancel" to close without applying

## Technical Details

### Data Model
- Uses the same `scheduleData` structure as manual time slot selection
- Stores data by date key (YYYY-MM-DD format)
- Each time slot stores: category, happiness, willingness

### Behavior
- **Overwrites existing data**: Smart Fill will replace any existing time slots in the selected range
- **Respects time resolution**: Fills slots according to your current time block size (60/30/15 min)
- **Persists to localStorage**: All changes are immediately saved
- **Updates UI**: The current day view refreshes automatically if affected

### Date Range
- Smart Fill operates on the current week (Sun-Sat)
- To fill multiple weeks, run Smart Fill multiple times
- Navigate to different weeks using the week navigation arrows

## Implementation Files

### HTML (`index.html`)
- Smart Fill button in Data Management section
- Modal dialog with form controls
- Preview display area

### CSS (`styles.css`)
- Modal styling with overlay
- Day checkbox layout
- Button styling for quick selects

### JavaScript (`script.js`)
- `showSmartFill()`: Opens modal and populates category dropdown
- `updateSmartFillPreview()`: Calculates and displays preview
- `applySmartFill()`: Fills time slots and saves to localStorage
- `populateTimeDropdowns()`: Generates time options based on resolution
- Helper functions for day selection (selectWeekdays, selectWeekend, selectAllDays)

## Future Enhancements

Possible improvements for future versions:
- Multi-week fill (fill pattern across multiple weeks)
- Recurring patterns (e.g., "every Monday for the next 3 months")
- Template saving (save common patterns for reuse)
- Conflict detection (warn before overwriting existing data)
- Undo functionality (revert last Smart Fill operation)
