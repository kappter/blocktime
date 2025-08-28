let dayTypes = {};
let undoStack = [];

function copyDay() {
    const targetDay = parseInt(document.getElementById('copy-day-select').value);
    if (targetDay === currentDay) return alert('Cannot copy to the same day!');
    pushUndoState();
    gridData[targetDay] = [...gridData[currentDay]];
    resetGrid();
    updateTotals();
    alert(`Copied ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][currentDay]} to ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][targetDay]}`);
}

function saveDayType() {
    const typeName = document.getElementById('dayTypeName').value.trim();
    if (!typeName) return alert('Please enter a name for your day plan!');
    if (dayTypes[typeName]) return alert('This day plan name already exists!');
    dayTypes[typeName] = [...gridData[currentDay]];
    renderDayTypes();
    previewDayType();
    document.getElementById('dayTypeName').value = '';
    alert(`Saved "${typeName}" as a day plan!`);
}

function renderDayTypes() {
    const select = document.getElementById('day-type-select');
    select.innerHTML = '<option value="">Select Day Plan</option>';
    Object.keys(dayTypes).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
}

function previewDayType() {
    const typeName = document.getElementById('day-type-select').value;
    const preview = document.getElementById('day-type-preview');
    if (typeName && dayTypes[typeName]) {
        preview.innerHTML = `<strong>Preview: ${typeName}</strong><br>${dayTypes[typeName].map(b => `${b.name} (${b.mindset})`).join(', ')}`;
    } else {
        preview.innerHTML = 'Select a day plan to preview.';
    }
}

function applyDayTypeToSelected() {
    const typeName = document.getElementById('day-type-select').value;
    if (!typeName || !dayTypes[typeName]) return alert('Please select a valid day plan!');
    const checkboxes = document.querySelectorAll('#day-checkboxes input[type="checkbox"]:checked');
    if (checkboxes.length === 0) return alert('Please select at least one day!');
    checkboxes.forEach(cb => {
        const dayIndex = parseInt(cb.value);
        pushUndoState();
        gridData[dayIndex] = [...dayTypes[typeName]];
    });
    resetGrid();
    updateTotals();
    alert(`Applied "${typeName}" to ${Array.from(checkboxes).map(cb => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][cb.value]).join(', ')}!`);
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

function initDayCheckboxes() {
    const checkboxes = document.getElementById('day-checkboxes');
    checkboxes.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        const label = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = i;
        label.appendChild(cb);
        label.appendChild(document.createTextNode(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]));
        checkboxes.appendChild(label);
    }
}

document.addEventListener('DOMContentLoaded', initDayCheckboxes);
