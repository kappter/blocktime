let gridData = Array(7).fill().map(() => Array(24).fill(null));
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let currentDay = 0;
let selectedCat = null;
let timeDirection = 'column-reverse'; // Default to reverse

function resetGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][currentDay];
    grid.appendChild(label);
    const slots = [];
    for (let i = 0; i < 24; i++) {
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i;
        div.dataset.time = `${(i % 12 || 12)}${i < 12 ? 'AM' : 'PM'}`;
        div.addEventListener('click', (e) => {
            if (selectedCat !== null && !e.target.classList.contains('block')) {
                dropBlock(currentDay, i);
                console.log('Clicked slot', i, 'with selectedCat', selectedCat); // Debug
            }
        });
        slots.push(div);
    }
    // Sort slots based on timeDirection
    const sortedSlots = timeDirection === 'column-reverse' ? slots.reverse() : slots;
    sortedSlots.forEach(div => dayDiv.appendChild(div));
    dayDiv.style.flexDirection = timeDirection;
    grid.appendChild(dayDiv);
    updateGrid();
    updateCategories();
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.innerHTML = '';
        const block = gridData[currentDay][parseInt(slot.dataset.index)];
        if (block) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            blockDiv.style.backgroundColor = block.color;
            blockDiv.innerHTML = `<span class="block-label">${block.name} (${block.mindset}, ${slot.dataset.time})</span>`;
            slot.appendChild(blockDiv);
        }
        slot.title = slot.dataset.time; // Show time on hover
    });
}

function updateCategories() {
    const catDiv = document.getElementById('categories');
    catDiv.innerHTML = '';
    categories.forEach((cat, index) => {
        const catElement = document.createElement('div');
        catElement.className = 'category' + (selectedCat === index ? ' selected' : '');
        catElement.textText = cat.name;
        catElement.style.backgroundColor = cat.color;
        catElement.addEventListener('click', () => {
            selectedCat = index;
            updateCategories();
            console.log('Selected category index:', index, 'name:', cat.name); // Debug
        });
        catDiv.appendChild(catElement);
    });
}

function dropBlock(dayIndex, slotIndex) {
    if (selectedCat === null || selectedCat < 0 || selectedCat >= categories.length) {
        alert('Please select a category first!');
        return;
    }
    if (gridData[dayIndex][slotIndex] !== null) {
        alert('Slot is occupied! Remove the existing block first.');
        return;
    }
    const cat = categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    gridData[dayIndex][slotIndex] = { ...cat, mindset, slotIndex };
    resetGrid();
    console.log('Block placed at', slotIndex, 'for day', dayIndex, 'with selectedCat', selectedCat); // Debug
}

document.getElementById('day-select').addEventListener('change', () => {
    currentDay = parseInt(document.getElementById('day-select').value);
    resetGrid();
    console.log('Switched to day:', currentDay); // Debug
});

const toggleButton = document.getElementById('toggle-time-direction');
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        timeDirection = timeDirection === 'column-reverse' ? 'column' : 'column-reverse';
        document.documentElement.style.setProperty('--day-flex-direction', timeDirection);
        resetGrid();
        console.log('Toggled time direction to:', timeDirection); // Debug
    });
} else {
    console.error('Toggle button not found'); // Debug
}

document.getElementById('resolution')?.addEventListener('change', () => {
    console.log('Resolution change not supported yet');
});
