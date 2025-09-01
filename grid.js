// Global variables
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
    const totalSlots = 24 * slotsPerHour;
    const indices = timeDirection === 'column-reverse' ? [...Array(totalSlots).keys()].reverse() : [...Array(totalSlots).keys()];
    indices.forEach(i => {
        const totalMinutes = i * resolution;
        const hour = Math.floor(totalMinutes / 60) % 24;
        const minute = totalMinutes % 60;
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i; // Use the slot index
        div.dataset.time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')}${hour < 12 ? 'AM' : 'PM'}`;
        div.innerHTML = `<span class="slot-time">${div.dataset.time}</span>`;
        div.addEventListener('click', (e) => {
            if (selectedCat !== null && !e.target.classList.contains('block')) {
                dropBlock(window.currentDay, i);
                console.log('Clicked slot', i, 'with selectedCat', selectedCat);
            }
        });
        dayDiv.appendChild(div);
    });
    dayDiv.style.flexDirection = timeDirection;
    grid.appendChild(dayDiv);
    updateGrid();
    updateCategories();
    updateLegend();
    console.log('Grid reset with times displayed, direction:', timeDirection, 'resolution:', resolution);
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        const originalIndex = parseInt(slot.dataset.index);
        slot.innerHTML = `<span class="slot-time">${slot.dataset.time}</span>`;
        const slotsPerHour = 60 / resolution;
        const slotIndex = Math.floor(originalIndex / slotsPerHour) * slotsPerHour; // Map to resolution boundary
        const block = window.gridData[window.currentDay][slotIndex]; // Use resolution-based index
        if (block) {
            slot.innerHTML = ''; // Clear slot to avoid overlap
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            blockDiv.style.backgroundColor = block.color;
            const startHour = Math.floor(slotIndex / slotsPerHour);
            const startMinute = (slotIndex % slotsPerHour) * resolution;
            const endHour = Math.floor((slotIndex * resolution + resolution) / 60) % 24;
            const endMinute = (slotIndex * resolution + resolution) % 60;
            const startPeriod = startHour >= 12 ? 'PM' : 'AM';
            const endPeriod = endHour >= 12 ? 'PM' : 'AM';
            const startTime = `${startHour % 12 || 12}:${startMinute.toString().padStart(2, '0')} ${startPeriod}`;
            const endTime = `${endHour % 12 || 12}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`;
            blockDiv.innerHTML = `<span class="block-label">${block.name} (${block.mindset}) ${startTime} - ${endTime}</span>`;
            slot.appendChild(blockDiv);
        }
    });
}

function updateCategories() {
    const catDiv = document.getElementById('categories');
    if (!catDiv) {
        console.error('Categories div not found');
        return;
    }
    catDiv.innerHTML = '';
    window.categories.forEach((cat, index) => {
        const catElement = document.createElement('div');
        catElement.className = 'category' + (selectedCat === index ? ' selected' : '');
        catElement.textContent = cat.name;
        catElement.style.backgroundColor = cat.color;
        catElement.addEventListener('click', () => {
            selectedCat = index;
            updateCategories();
            console.log('Selected category index:', index, 'name:', cat.name);
        });
        catDiv.appendChild(catElement);
    });
}

function updateLegend() {
    const legendDiv = document.getElementById('legend');
    if (legendDiv) {
        legendDiv.innerHTML = '<h3>Legend</h3>';
        window.categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            const colorBox = document.createElement('span');
            colorBox.style.backgroundColor = cat.color;
            item.appendChild(colorBox);
            item.appendChild(document.createTextNode(`${cat.name} (${cat.mindset})`));
            legendDiv.appendChild(item);
        });
    }
}

function dropBlock(dayIndex, slotIndex) {
    if (selectedCat === null || selectedCat < 0 || selectedCat >= window.categories.length) {
        alert('Please select a category first!');
        return;
    }
    const slotsPerHour = 60 / resolution;
    const slotIndexAdjusted = Math.floor(slotIndex / slotsPerHour) * slotsPerHour; // Adjust to resolution boundary
    if (window.gridData[dayIndex][slotIndexAdjusted] !== null) {
        alert('Slot is occupied! Remove the existing block first!');
        return;
    }
    const cat = window.categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    window.gridData[dayIndex][slotIndexAdjusted] = { ...cat, mindset, slotIndex: slotIndexAdjusted };
    if (!hasBlock) { // Only set on first block
        hasBlock = true;
        disableResolution();
    }
    resetGrid();
    console.log('Block placed at', slotIndexAdjusted, 'for day', dayIndex, 'with selectedCat', selectedCat);
}

function disableResolution() {
    const resolutionSelect = document.getElementById('resolution');
    if (resolutionSelect) {
        resolutionSelect.disabled = true;
        resolutionSelect.title = 'Resolution is locked after placing the first block. Create a new schedule for a different resolution.';
    }
}

function exportToCalendar() {
    const startDate = new Date('2025-08-31'); // Start of week (Monday, August 31, 2025)
    const icsContent = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BlockTime Scheduler//EN'];
    for (let day = 0; day < 7; day++) {
        let currentIndex = 0;
        while (currentIndex < gridData[day].length) {
            if (gridData[day][currentIndex]) {
                const startBlock = gridData[day][currentIndex];
                let endIndex = currentIndex;
                // Group consecutive blocks of the same category
                while (endIndex + 1 < gridData[day].length && gridData[day][endIndex + 1] && 
                       gridData[day][endIndex + 1].name === startBlock.name) {
                    endIndex++;
                }
                const startTime = new Date(startDate);
                startTime.setDate(startDate.getDate() + day);
                const slotsPerHour = 60 / resolution;
                const startHour = Math.floor(currentIndex / slotsPerHour);
                const startMinute = (currentIndex % slotsPerHour) * resolution;
                startTime.setHours(startHour, startMinute, 0, 0);
                const endTime = new Date(startTime);
                endTime.setMinutes(endTime.getMinutes() + (endIndex - currentIndex + 1) * resolution);
                icsContent.push('BEGIN:VEVENT');
                icsContent.push(`DTSTART:${startTime.toISOString().replace(/-|:|\.\d+/g, '')}`);
                icsContent.push(`DTEND:${endTime.toISOString().replace(/-|:|\.\d+/g, '')}`);
                icsContent.push(`SUMMARY:${startBlock.name} (${startBlock.mindset})`);
                icsContent.push('END:VEVENT');
                currentIndex = endIndex + 1;
            } else {
                currentIndex++;
            }
        }
    }
    icsContent.push('END:VCALENDAR');
    const blob = new Blob([icsContent.join('\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule.ics';
    a.click();
    URL.revokeObjectURL(url);
    console.log('Exported to calendar as schedule.ics');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Ensure empty grid with times on load
    resetGrid();

    document.getElementById('day-select').addEventListener('change', () => {
        window.currentDay = parseInt(document.getElementById('day-select').value);
        resetGrid();
        console.log('Switched to day:', window.currentDay);
    });

    const resolutionSelect = document.getElementById('resolution');
    if (resolutionSelect) {
        resolutionSelect.addEventListener('change', () => {
            if (!hasBlock) {
                resolution = parseInt(resolutionSelect.value);
                resetGrid();
                console.log('Resolution changed to:', resolution);
            } else {
                resolutionSelect.value = resolution.toString(); // Reset to current resolution
            }
        });
    } else {
        console.error('Resolution select element not found. Verify ID "resolution" in index.html.');
    }
});
