let gridData = Array(7).fill().map(() => []);
let categories = [];
let mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering'];
let resolution = 60;
let currentDay = 0;
let selectedCat = null;

function resetGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const slotsPerDay = Math.floor(24 * 60 / resolution);
    for (let i = 0; i < slotsPerDay; i++) {
        const div = document.createElement('div');
        div.className = 'slot';
        div.dataset.index = i;
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        grid.appendChild(div);
    }
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
            blockDiv.draggable = true;
            blockDiv.innerHTML = `<span class="block-text">${block.name}<br>${block.mindset}</span>`;
            blockDiv.addEventListener('dragstart', dragStart);
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
    const block = e.target.querySelector('.block-text');
    selectedCat = categories.findIndex(cat => cat.name === block.textContent.split('<br>')[0]);
    e.dataTransfer.setData('text/plain', '');
}

let slotsPerDay = Math.floor(24 * 60 / resolution);
