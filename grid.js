let gridData = Array(7).fill().map(() => []);
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let resolution = 60;
let currentDay = 0;
let selectedCat = null;
let timeDirection = 'bottom';

function resetGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const slotsPerDay = Math.floor(24 * 60 / resolution);
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
    console.log('Grid reset, slots:', slotsPerDay); // Debug
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.innerHTML = '';
        const block = gridData[currentDay].find(b => b.slotIndex === parseInt(slot.dataset.index));
        if (block) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            blockDiv.style.backgroundColor = block.color;
            blockDiv.draggable = true;
            blockDiv.addEventListener('dragstart', dragStart);
            blockDiv.addEventListener('dblclick', () => deleteBlock(currentDay, parseInt(slot.dataset.index))); // Delete on double-click
            blockDiv.innerHTML = `<span class="block-label">${block.name}<br>${block.mindset}</span>`;
            slot.appendChild(blockDiv);
        }
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
        const draggedBlockIndex = gridData[currentDay].findIndex(b => b.slotIndex === parseInt(e.target.dataset.index));
        if (draggedBlockIndex !== -1 && selectedCat === null) {
            moveBlock(dayIndex, draggedBlockIndex, slotIndex);
        } else if (selectedCat !== null) {
            dropBlock(dayIndex, slotIndex);
        }
    }
}

function dragStart(e) {
    const block = e.target.querySelector('.block-label');
    selectedCat = gridData[currentDay].findIndex(cat => cat.name === block.textContent.split('<br>')[0]);
    e.dataTransfer.setData('text/plain', e.target.parentElement.dataset.index);
}

function dropBlock(dayIndex, slotIndex) {
    console.log('Dropping block at', dayIndex, slotIndex, 'with selectedCat:', selectedCat); // Debug
    if (selectedCat === null || selectedCat < 0 || selectedCat >= categories.length) {
        alert('Please select a category first!');
        return;
    }
    const slotsPerDay = Math.floor(24 * 60 / resolution);
    if (gridData[dayIndex].length >= slotsPerDay) {
        alert('Day is full! Adjust resolution or reset.');
        return;
    }
    pushUndoState();
    const cat = categories[selectedCat];
    const mindset = document.getElementById('mindset-select').value || cat.mindset;
    const existingBlockIndex = gridData[dayIndex].findIndex(block => block.slotIndex === slotIndex);
    if (existingBlockIndex !== -1) {
        gridData[dayIndex][existingBlockIndex] = { ...cat, mindset, slotIndex };
    } else {
        gridData[dayIndex].push({ ...cat, mindset, slotIndex });
    }
    resetGrid();
    selectedCat = null; // Reset selection
}

function moveBlock
