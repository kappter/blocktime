# Contributing to BlockTime

Thank you for your interest in contributing to BlockTime! This document provides guidelines and information for contributors.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful, constructive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

When reporting bugs, please include the following information to help us diagnose and fix the issue quickly.

**Required Information**: Provide a clear and descriptive title that summarizes the bug. Include detailed steps to reproduce the problem, starting from opening the application. Describe what you expected to happen versus what actually happened.

**Technical Details**: Specify your browser name and version (e.g., Chrome 120, Firefox 115, Safari 17). If applicable, include the contents of your browser's console (press F12 to open developer tools). Mention whether the issue occurs consistently or intermittently.

**Additional Context**: If relevant, describe your localStorage data size or any specific patterns in your schedule. Include screenshots or screen recordings if they help illustrate the problem.

### Suggesting Features

We welcome feature suggestions that align with BlockTime's core mission of time management with emotional awareness.

**Feature Proposals**: Clearly describe the feature and the problem it solves. Explain how it would benefit users and fit into the existing interface. Consider whether it could be implemented as an optional setting to maintain simplicity for users who don't need it.

**Design Considerations**: Think about how the feature would work on both desktop and mobile devices. Consider how it would interact with existing features like Smart Fill or emotional tracking. Propose UI/UX approaches if you have specific ideas.

### Submitting Code

**Before You Start**: Check existing issues and pull requests to avoid duplicate work. For major changes, open an issue first to discuss your approach. Ensure you can test your changes across multiple browsers.

**Development Process**: Fork the repository and create a new branch with a descriptive name like `feature/smart-fill-undo` or `fix/calendar-export-timezone`. Make your changes following the code style guidelines below. Test thoroughly in Chrome, Firefox, and Safari at minimum. Verify that localStorage persistence still works correctly after your changes.

**Pull Request Guidelines**: Write a clear title and description explaining what your PR does and why. Reference any related issues using keywords like "Fixes #123" or "Relates to #456". Include screenshots or GIFs for UI changes. Ensure all files use consistent formatting and indentation. Update documentation if you've added or changed features.

## Code Style Guidelines

### JavaScript

BlockTime uses vanilla JavaScript (ES6+) with no frameworks or build tools. This keeps the application simple, fast, and accessible.

**General Principles**: Use `const` for variables that won't be reassigned, and `let` for variables that will. Avoid `var` entirely. Use descriptive variable and function names like `calculateTimeSlotIndex()` rather than `calc()`. Add comments for complex logic, but write self-documenting code when possible.

**Functions**: Keep functions focused on a single responsibility. Use arrow functions for callbacks and short utilities. Use traditional function declarations for major features. Place helper functions near where they're used, or group related functions together.

**Data Handling**: Always validate data from localStorage before using it. Handle edge cases like midnight-crossing time ranges. Preserve existing data structure when adding new features. Use `JSON.parse()` and `JSON.stringify()` safely with try-catch blocks.

**DOM Manipulation**: Cache DOM queries in variables when used multiple times. Use `getElementById` for unique elements and `querySelector` for complex selections. Add event listeners in the `init()` function or dedicated setup functions. Clean up event listeners if you add dynamic elements.

### HTML

**Structure**: Use semantic HTML5 elements like `<section>`, `<nav>`, `<article>` where appropriate. Include ARIA labels for accessibility on interactive elements. Keep the structure flat and avoid deep nesting when possible. Use consistent ID and class naming conventions.

**Forms**: Always include labels for form inputs, even if visually hidden. Use appropriate input types like `type="color"` for color pickers. Add placeholder text to guide users. Include helpful hint text for complex controls.

### CSS

**Organization**: Group related styles together (e.g., all modal styles in one section). Use CSS custom properties (variables) for colors and repeated values. Follow the existing pattern of light/dark theme variables. Comment major sections for easy navigation.

**Naming**: Use descriptive class names like `.time-slot-container` rather than `.tsc`. Avoid overly specific selectors that are hard to override. Use BEM-style naming for component variants when appropriate.

**Responsive Design**: Test layouts at mobile (375px), tablet (768px), and desktop (1200px+) widths. Use flexbox and grid for layouts rather than floats. Ensure touch targets are at least 44x44 pixels for mobile usability.

## Testing Checklist

Before submitting a pull request, verify the following functionality works correctly.

**Core Features**: Time slot assignment and editing work across all time resolutions (60/30/15 min). Category creation, editing, and deletion function properly. Smart Fill correctly fills time slots across selected days. Daily, weekly, and monthly views display accurate data.

**Data Persistence**: Changes are saved to localStorage immediately. Page refresh preserves all data. Browser close/reopen maintains the schedule. Import/export functions produce valid JSON.

**Calendar Integration**: ICS export creates valid calendar files. Exported events import correctly into Google Calendar. Timezone handling works as expected.

**UI/UX**: Light and dark modes both display correctly. Modals open, close, and don't leave the page in a broken state. Buttons and controls provide visual feedback on interaction. Error messages are clear and helpful.

**Browser Compatibility**: Test in Chrome, Firefox, and Safari at minimum. Check console for JavaScript errors. Verify localStorage quota isn't exceeded with large schedules.

## Development Setup

BlockTime requires no build process or dependencies. Simply clone the repository and open `index.html` in your browser.

**Recommended Tools**: Use a code editor with HTML/CSS/JS support (VS Code, Sublime Text, etc.). Install a local web server for testing (Python's `http.server`, Node's `http-server`, or VS Code's Live Server extension). Use browser developer tools for debugging and testing.

**File Organization**: All application code is in three files: `index.html`, `styles.css`, and `script.js`. Documentation files include `README.md`, `CONTRIBUTING.md`, `SMART_FILL_FEATURE.md`, and `BUG_FIX_REPORT.md`. The repository should not include user data, screenshots, or build artifacts.

## Questions?

If you have questions about contributing, feel free to open an issue with the "question" label. We're here to help!

## Recognition

All contributors will be recognized in the project. Significant contributions may be highlighted in release notes.

Thank you for helping make BlockTime better! 🚀
