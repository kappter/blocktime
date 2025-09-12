let slotsPerDay = 24 * 60 / resolution; // 24 slots for 60-minute resolution
let categories = [];
let selectedCat = null;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let dayTypes = {};
let undoStack = [];
let timeDirection = 'bottom'; // 'bottom' for 12AM at bottom, 'top' for 12AM at top
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mindsets = ['Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering', 'Peace, Groundedness'];

function initGrid() {
    resolution = 60; // Enforce 60-minute resolution
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Resolution set to ${resolution} min, slotsPerDay: ${slotsPerDay}`);

    gridData = gridData.map(day => day.slice(0, slotsPerDay));

    resetGrid();
    renderTimeMarkers();
    renderWeekView();
}

function renderTimeMarkers() {
    const markersDiv = document.getElementById('time-markers');
    if (markersDiv) markersDiv.innerHTML = '';
    const hoursToShow = [0, 6, 12, 18];
    const slotsPerHour = 60 / resolution;
    const totalSlots = 24 * slotsPerHour;
    const slotHeight = 70 / totalSlots;
    hoursToShow.forEach((hour) => {
        const slotIndex = timeDirection === 'bottom' ? (23 - hour) * slotsPerHour : hour * slotsPerHour;
        const yPosition = (slotIndex + 0.5) * slotHeight;
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
        marker.style.top = `${yPosition}vh`;
        markersDiv.appendChild(marker);
    });
}

function formatTime(slotIndex) {
    const totalMinutes = slotIndex * resolution;
    const startMinutes = totalMinutes % 1440;
    const endMinutes = (totalMinutes + resolution) % 1440;
    const hours = Math.floor(startMinutes / 60);
    const mins = startMinutes % 60;
