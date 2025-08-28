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
    dayDiv.addEventListener('click', (e) => {
        if (selectedCat !== null && e.target.className === 'slot') {
            dropBlock(currentDay, parseInt(e.target.dataset.index));
        }
    });
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][currentDay];
    grid.appendChild(label);
    for (let i = 0; i < slotsPerDay; i++) {
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i;
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        dayDiv.appendChild(div);
    }
    grid.appendChild(dayDiv);
    updateGrid();
}

function updateGrid() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => slot.innerHTML = '');
    gridData[currentDay].forEach(block => {
        const slot = document.querySelector(`.slot[data-index="${block.slotIndex}"]`);
        if (slot) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            blockDiv.style.backgroundColor = block.color;
            blockDiv.innerHTML = `<span class="block-label">${block.name}<br>${block.mindset}</span>`;
            slot.appendChild(blockDiv);
        }
    });
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const dayIndex = parseInt(document.getElementById('day-select').value);
    const slotIndex = parseInt(e.target.dataset.index);
    dropBlock(dayIndex, slotIndex);
}

function dragStart(e) {
    const block = e.target.querySelector('.block-label');
    selectedCat = categories.findIndex(cat => cat.name === block.textContent.split('<br>')[0]);
    e.dataTransfer.setData('text/plain', '');
}

function toggleTimeDirection() {
    timeDirection = timeDirection === 'bottom' ? 'column' : 'column-reverse';
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection);
    resetGrid();
}

document.getElementById('toggle-time-direction').addEventListener('click', toggleTimeDirection);
document.getElementById('resolution').addEventListener('change', () => {
    resolution = parseInt(document.getElementById('resolution').value);
    resetGrid();
});
document.getElementById('day-select').addEventListener('change', () => {
    currentDay = parseInt(document.getElementById('day-select').value);
    resetGrid();
});
