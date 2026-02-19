# BlockTime - Daily Time Blocker

A comprehensive web-based time management application that combines visual time blocking with emotional spectrum tracking. Plan your day, track how you feel about each activity, and gain insights into your emotional relationship with time.

![BlockTime Screenshot](screenshot.png)

## Features

### Core Time Management

**Visual Time Blocking**: Organize your day into color-coded time blocks with customizable resolution (60, 30, or 15-minute intervals). Each block can be assigned to activity categories like Sleep, Work, Exercise, Meals, and more.

**Smart Fill**: Quickly fill recurring patterns across multiple days. Set up your entire work week (9AM-5PM Monday-Friday) or sleep schedule (11PM-7AM daily) with just a few clicks instead of manually filling dozens of time slots.

**Flexible Time Resolution**: Switch between 60-minute blocks for high-level planning, 30-minute blocks for detailed scheduling, or 15-minute blocks for precision time management.

### Emotional Spectrum Tracking

**Two-Dimensional Tracking**: Every time block captures both your happiness level (Unhappy 😞 / Meh 😐 / Happy 😊) and willingness level (Forced 🚫 / Meh 😑 / Willing ✅), giving you a complete picture of your emotional relationship with each activity.

**Category Defaults**: Set default emotional states for each category. Your "Work" category might default to "Meh & Meh" while "Leisure" defaults to "Happy & Willing", saving time during planning.

**Per-Block Overrides**: Override category defaults for specific time blocks when needed, allowing you to capture variations like an exciting work project or a tedious leisure task.

### Lifestyle Templates

**Pre-built Schedules**: Choose from professionally designed templates including Professional Athlete, Professional Musician, College Student, and High School Student. Each template provides a realistic daily schedule with appropriate emotional states.

**Quick Start**: Load a template to see how BlockTime works, then customize it to match your actual lifestyle and preferences.

### Data Management

**Import/Export**: Export individual days or your entire calendar to JSON format. Import schedules to restore backups or transfer between devices.

**Calendar Integration**: Export to ICS format for seamless integration with Google Calendar, Outlook, and other calendar applications. Your time blocks become calendar events with emotional state information in the description.

**Local Storage Persistence**: All data is automatically saved to your browser's localStorage, ensuring your schedules survive page refreshes and browser restarts.

**Reset Options**: Clear individual days or reset all data when you need a fresh start.

### Visualization & Reporting

**Week View**: See your entire week at a glance with color-coded activity indicators for each day.

**Month Calendar**: Navigate through months with visual indicators showing which days have scheduled activities.

**Daily Summary**: View time totals by activity and emotional spectrum distribution for each day, helping you understand how you spend your time and how you feel about it.

**Detailed Reports**: Access comprehensive analytics showing patterns in your time usage and emotional states over extended periods.

### User Experience

**Light/Dark Mode**: Toggle between light and dark themes to match your environment and reduce eye strain.

**Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices with touch-friendly controls.

**Intuitive Interface**: Click time slots to assign activities, hover for quick edits, and use keyboard shortcuts for efficient planning.

## Getting Started

### Installation

BlockTime is a static web application that runs entirely in your browser with no server required.

**Option 1: Direct Use**
1. Clone this repository: `git clone https://github.com/yourusername/blocktime.git`
2. Open `index.html` in your web browser
3. Start planning your day!

**Option 2: Local Server**
1. Clone the repository
2. Run a local web server: `python3 -m http.server 8080`
3. Navigate to `http://localhost:8080` in your browser

**Option 3: GitHub Pages**
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access your instance at `https://yourusername.github.io/blocktime`

### Quick Start Guide

**Step 1: Set Up Categories**

The application comes with default categories (Sleep, Work, Exercise, Meals, etc.), but you can customize them. Click the edit button (✏️) next to any category to change its color or default emotional state, or add new categories using the form at the top.

**Step 2: Choose Your Time Resolution**

Select your preferred time block size from the Time Settings section. Start with 60-minute blocks for simplicity, or use 15-minute blocks for detailed planning.

**Step 3: Fill Your Schedule**

Click any time slot to assign it to a category. The emotional state selector appears automatically, allowing you to set how you feel about that activity. Use the Smart Fill feature for recurring patterns like work hours or sleep schedules.

**Step 4: Review and Adjust**

Check the daily summary to see your time distribution and emotional spectrum. Make adjustments as needed to balance your activities and emotional well-being.

## Usage Examples

### Example 1: Setting Up a Work Week

Use the Smart Fill feature to establish your work schedule. Click "🎯 Smart Fill", select "Work" as the category, check "Weekdays", set the time range to 9:00 AM - 5:00 PM, and click Apply. This fills 40 time slots (8 hours × 5 days) instantly.

### Example 2: Planning Sleep Schedule

Create a consistent sleep routine by using Smart Fill with the "Sleep" category, selecting "All Days", and setting the time range from 11:00 PM to 7:00 AM. The system handles the midnight crossing automatically.

### Example 3: Tracking Emotional Patterns

After using BlockTime for a week, review the Detailed Reports to identify patterns. You might discover that certain activities consistently make you unhappy or that you feel forced to do things at specific times of day, helping you make informed lifestyle changes.

### Example 4: Exporting to Google Calendar

Click "📋 Export ICS File" to download your schedule in calendar format. Import this file into Google Calendar to sync your time blocks with your phone and receive notifications throughout the day.

## Technical Details

### Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid and Flexbox, custom properties for theming
- **Vanilla JavaScript**: No frameworks required, pure ES6+ for maximum compatibility
- **LocalStorage API**: Client-side data persistence

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### File Structure

```
blocktime/
├── index.html              # Main application HTML
├── styles.css              # All styling and themes
├── script.js               # Application logic
├── README.md               # This file
├── LICENSE                 # MIT License
├── SMART_FILL_FEATURE.md   # Smart Fill documentation
└── BUG_FIX_REPORT.md       # Development notes
```

### Data Format

Schedule data is stored in localStorage as JSON with the following structure:

```json
{
  "2026-02-16": {
    "9": {
      "category": "Work",
      "happiness": 1,
      "willingness": 1
    },
    "10": {
      "category": "Work",
      "happiness": 1,
      "willingness": 1
    }
  }
}
```

Keys are date strings (YYYY-MM-DD) containing objects where time slot indices map to activity data.

## Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes BlockTime better for everyone.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

- Maintain the vanilla JavaScript approach (no frameworks)
- Test on multiple browsers before submitting
- Ensure localStorage persistence works correctly
- Follow the existing code style and naming conventions
- Update documentation for new features

### Reporting Issues

Found a bug or have a feature request? Open an issue on GitHub with:
- Clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Browser and version information

## Roadmap

Future enhancements under consideration:

- **Multi-week Smart Fill**: Fill recurring patterns across multiple weeks or months
- **Template Saving**: Save your custom schedules as reusable templates
- **Undo/Redo**: Revert recent changes with keyboard shortcuts
- **Conflict Detection**: Warn before overwriting existing time blocks
- **Advanced Analytics**: Deeper insights into time usage and emotional patterns
- **Cloud Sync**: Optional account system for cross-device synchronization
- **Mobile App**: Native iOS and Android applications
- **Collaboration**: Share schedules with family or team members

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Emoji artwork provided by browser vendors
- Inspired by time blocking methodologies from productivity experts
- Built with feedback from users seeking better work-life balance

## Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Check existing documentation in the repository
- Review the Smart Fill feature guide for advanced usage

## Privacy

BlockTime runs entirely in your browser with no server communication. All data is stored locally on your device using the browser's localStorage. No personal information is collected, transmitted, or stored on external servers.

---

**Start taking control of your time and emotions today with BlockTime!** 🚀
