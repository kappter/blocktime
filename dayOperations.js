function copyDay() {
    const targetDay = parseInt(document.getElementById('copy-day-select').value);
    if (targetDay === currentDay) return alert('Cannot copy to the same day!');
    pushUndoState();
    gridData[targetDay] = [...gridData[currentDay]];
    if (currentDay === targetDay) resetGrid();
    updateTotals();
    alert(`Copied ${days[currentDay]} to ${days[targetDay]}`);
}

function saveDayType() {
    const typeName = document.getElementById('dayTypeName').value.trim();
    if (!typeName) return alert('Enter a day type name!');
    if (dayTypes[typeName]) return alert('Day type already exists!');
    dayTypes[typeName] = [...gridData[currentDay]];
    renderDayTypes();
    document.getElementById('dayTypeName').value = '';
    alert(`Saved ${days[currentDay]} as day type "${typeName}"`);
}

function renderDayTypes() {
    const dayTypeSelect = document.getElementById('day-type-select');
    if (dayTypeSelect) dayTypeSelect.innerHTML = '<option value="">Select Day Type</option>';
    Object.keys(dayTypes).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (dayTypeSelect) dayTypeSelect.appendChild(option);
    });
}

function applyDayType() {
    const typeName = document.getElementById('day-type-select').value;
    if (!typeName) return alert('Select a day type!');
    pushUndoState();
    gridData[currentDay] = [...dayTypes[typeName]];
    resetGrid();
    updateTotals();
    alert(`Applied day type "${typeName}" to ${days[currentDay]}`);
}

function pushUndoState() {
    if (undoStack.length >= 10) undoStack.shift();
    undoStack.push(JSON.parse(JSON.stringify(gridData)));
}

function undoAction() {
    if (undoStack.length === 0) return alert('Nothing to undo!');
    gridData = JSON.parse(JSON.stringify(undoStack.pop()));
    resetGrid();
    updateTotals();
    alert('Last action undone');
}

function dropBlock(dayIndex, slotIndex) {
    if (selectedCat === null) {
        alert('Please select a category from the "Add Category" section before adding a block.');
        return;
    }
    if (gridData[dayIndex].length >= slotsPerDay) {
        alert('Day is full! Adjust resolution or reset.');
        return;
    }
    pushUndoState();
    const cat = categories[selectedCat];
    const mindsetSelect = document.getElementById('mindset-select');
    const selectedMindset = mindsetSelect.value;

    const existingBlockIndex = gridData[dayIndex].findIndex(block => block.slotIndex === slotIndex);
    if (existingBlockIndex !== -1) {
        const existingCatName = gridData[dayIndex][existingBlockIndex].name;
        if (existingCatName === cat.name) {
            alert('Cannot replace a block with the same category!');
            return;
        }
        gridData[dayIndex][existingBlockIndex] = { ...cat, mindset: selectedMindset || cat.mindset, slotIndex };
    } else {
        const mindset = cat.mindset || selectedMindset || 'Peace, Groundedness';
        if (mindsets.includes(mindset)) {
            gridData[dayIndex].push({ ...cat, mindset, slotIndex });
        } else {
            alert('Invalid mindset selected! Defaulting to Peace, Groundedness.');
            gridData[dayIndex].push({ ...cat, mindset: 'Peace, Groundedness', slotIndex });
        }
    }
    resetGrid();
}

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let dayTypes = {};
let undoStack = [];
