// Global variables
let gridData = Array(7).fill().map(() => Array(24).fill(null)); // Base 60-minute slots
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
        const hour = Math.floor(i / slotsPerHour);
        const minute = (i % slotsPerHour) * resolution;
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i; // Use the slot index
        div.dataset.time = `${(hour % 12 || 12)}:${minute.toString().padStart(2, '0')}${hour < 12 ? 'AM' : 'PM'}`;
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
    console.log('Grid reset with times displayed, direction:', timeDirection, 'resolution:', resolution);
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        const originalIndex = parseInt(slot.dataset.index);
        slot.innerHTML = `<span class="slot-time">${slot.dataset.time}</span>`;
        const slotsPerHour = 60 / resolution;
        const hour = Math.floor(originalIndex / slotsPerHour);
        const blockIndex = hour * slotsPerHour; // Map to nearest hour boundary
        const block = window.gridData[window.currentDay][blockIndex]; // Use hour-based index
        if (block) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            blockDiv.style.backgroundColor = block.color;
            blockDiv.innerHTML = `<span class="block-label">${block.name} (${block.mindset})</span>`;
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

function dropBlock(dayIndex, slotIndex) {
    if (selectedCat === null || selectedCat < 0 || selectedCat >= window.categories.length) {
        alert('Please select a category first!');
        return;
    }
    const slotsPerHour = 60 / resolution;
    const hourIndex = Math.floor(slotIndex / slotsPerHour) * slotsPerHour;
    if (window.gridData[dayIndex][hourIndex] !== null) {
        alert('Slot is occupied! Remove the existing block first!');
        return;
    }
    const cat = window.categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    window.gridData[dayIndex][hourIndex] = { ...cat, mindset, slotIndex: hourIndex };
    if (!hasBlock) { // Only set on first block
        hasBlock = true;
        disableResolution();
    }
    resetGrid();
    console.log('Block placed at', hourIndex, 'for day', dayIndex, 'with selectedCat', selectedCat);
}

function disableResolution() {
    const resolutionSelect = document.getElementById('resolution');
    if (resolutionSelect) {
        resolutionSelect.disabled = true;
        resolutionSelect.title = 'Resolution is locked after placing the first block. Create a new schedule for a different resolution.';
    }
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
