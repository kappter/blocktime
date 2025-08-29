// Global variables
let gridData = Array(7).fill().map(() => Array(24).fill(null));
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let currentDay = 0;
let selectedCat = null;
let timeDirection = 'column-reverse'; // Default direction, no toggle

// Make variables globally accessible
window.gridData = gridData;
window.categories = categories;
window.currentDay = currentDay; // Ensure currentDay is global

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
    const indices = timeDirection === 'column-reverse' ? [...Array(24)].map((_, i) => 23 - i) : [...Array(24)].keys();
    indices.forEach(i => {
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i; // Use the reordered index
        div.dataset.time = `${(i % 12 || 12)}${i < 12 ? 'AM' : 'PM'}`;
        div.innerHTML = `<span class="slot-time">${div.dataset.time}</span>`;
        div.addEventListener('click', (e) => {
            if (selectedCat !== null && !e.target.classList.contains('block')) {
                dropBlock(window.currentDay, i);
                console.log('Clicked slot', i, 'with selectedCat', selectedCat);
            }
        });
        dayDiv.appendChild(div);
    });
    dayDiv.style.flexDirection = timeDirection; // Fixed direction
    grid.appendChild(dayDiv);
    updateGrid();
    updateCategories();
    console.log('Grid reset with times displayed, direction:', timeDirection);
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        const originalIndex = parseInt(slot.dataset.index);
        slot.innerHTML = `<span class="slot-time">${slot.dataset.time}</span>`;
        const block = window.gridData[window.currentDay][originalIndex]; // Use original index for data
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
    if (window.gridData[dayIndex][slotIndex] !== null) {
        alert('Slot is occupied! Remove the existing block first!');
        return;
    }
    const cat = window.categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    window.gridData[dayIndex][slotIndex] = { ...cat, mindset, slotIndex };
    resetGrid();
    console.log('Block placed at', slotIndex, 'for day', dayIndex, 'with selectedCat', selectedCat);
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

    document.getElementById('resolution')?.addEventListener('change', () => {
        console.log('Resolution change not supported yet');
    });
});
