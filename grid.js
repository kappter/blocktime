let gridData = Array(7).fill().map(() => Array(24).fill(null));
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let resolution = 60;
let currentDay = 0;
let selectedCat = null;
let timeDirection = 'bottom';

function resetGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const slotsPerDay = 24; // Fixed to 24 hours
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][currentDay];
    grid.appendChild(label);
    for (let i = 0; i < slotsPerDay; i++) {
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i;
        div.dataset.time = `${(i % 12 || 12)}${i < 12 ? 'AM' : 'PM'}`;
        div.addEventListener('click', (e) => {
            if (selectedCat !== null && !e.target.classList.contains('block')) {
                dropBlock(currentDay, i);
            }
        });
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        dayDiv.appendChild(div);
    }
    grid.appendChild(dayDiv);
    updateGrid();
    updateCategories();
    console.log('Grid reset, slots:', slotsPerDay); // Debug
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
            blockDiv.draggable = true;
            blockDiv.addEventListener('dragstart', dragStart);
            blockDiv.addEventListener('dblclick', () => deleteBlock(currentDay, parseInt(slot.dataset.index))); // Delete
            blockDiv.innerHTML = `<span class="block-label">${block.name}<br>${block.mindset}</span>`;
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
        catElement.textContent = cat.name;
        catElement.style.backgroundColor = cat.color;
        catElement.addEventListener('click', () => {
            selectedCat = index;
            updateCategories();
            console.log('Selected category:', cat.name); // Debug
        });
        catDiv.appendChild(catElement);
    });
}

function dragOver(e) {
    e.preventDefault();
    if (!e.target.classList.contains('block')) {
        e.target.classList.add('hover-highlight');
    }
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('hover-highlight');
    if (e.target.classList.contains('slot')) {
        const dayIndex = parseInt(document.getElementById('day-select').value);
        const slotIndex = parseInt(e.target.dataset.index);
        const draggedBlockIndex = gridData[currentDay].findIndex((b, i) => i === slotIndex && b !== null);
        if (draggedBlockIndex !== -1 && selectedCat === null) {
            moveBlock(dayIndex, draggedBlockIndex, slotIndex);
        } else if (selectedCat !== null) {
            dropBlock(dayIndex, slotIndex);
        }
    }
}

function dragStart(e) {
    const block = e.target.querySelector('.block-label');
    selectedCat = categories.findIndex(cat => cat.name === block.textContent.split('<br>')[0]);
    e.dataTransfer.setData('text/plain', e.target.parentElement.dataset.index);
}

function dropBlock(dayIndex, slotIndex) {
    console.log('Dropping block at', dayIndex, slotIndex, 'with selectedCat:', selectedCat); // Debug
    if (selectedCat === null || selectedCat < 0 || selectedCat >= categories.length) {
        alert('Please select a category first!');
        return;
    }
    pushUndoState();
    const cat = categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    if (gridData[dayIndex][slotIndex] === null) {
        gridData[dayIndex][slotIndex] = { ...cat, mindset, slotIndex };
    } else {
        alert('Slot is occupied! Move or delete the existing block first.');
    }
    resetGrid();
    selectedCat = null; // Reset selection
}

function moveBlock(dayIndex, oldIndex, newSlotIndex) {
    pushUndoState();
    const block = gridData[dayIndex][oldIndex];
    if (gridData[dayIndex][newSlotIndex] === null) {
        gridData[dayIndex][newSlotIndex] = block;
        gridData[dayIndex][oldIndex] = null;
        resetGrid();
    } else {
        alert('Target slot is occupied!');
    }
}

function deleteBlock(dayIndex, slotIndex) {
    pushUndoState();
    gridData[dayIndex][slotIndex] = null;
    resetGrid();
    alert('Block deleted!');
}

function toggleTimeDirection() {
    timeDirection = timeDirection === 'bottom' ? 'column' : 'column-reverse';
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection);
    resetGrid();
}

document.getElementById('toggle-time-direction')?.addEventListener('click', toggleTimeDirection);
document.getElementById('resolution')?.addEventListener('change', () => {
    resolution = parseInt(document.getElementById('resolution').value);
    resetGrid();
});
document.getElementById('day-select').addEventListener('change', () => {
    currentDay = parseInt(document.getElementById('day-select').value);
    resetGrid();
});
