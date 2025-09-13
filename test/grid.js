let gridData = Array(7).fill().map(() => Array(24 * 2).fill(null)); // Support up to 30-minute resolution (48 slots)
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let currentDay = 0;
let selectedCat = null;
let timeDirection = 'column-reverse'; // Fixed direction
let resolution = 60; // Default resolution in minutes
let hasBlock = false; // Track if a block is placed

// Make variables globally accessible
window.gridData = gridData;
window.categories = categories;
window.currentDay = currentDay;

// Global functions
function resetGrid() {
    const grid = document.getElementById('grid');
    if (!grid) {
        console.error('Grid element not found');
        return;
    }
    grid.innerHTML = '';
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][window.currentDay];
    grid.appendChild(label);
    const slotsPerHour = 60 / resolution;
