function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        resetGrid();
        document.getElementById('add-block-btn').style.display = 'inline-block'; // Show Add Block button
    } else {
        alert('Please enter a unique category name!');
    }
}

function addBlockToFirstSlot() {
    const dayIndex = parseInt(document.getElementById('day-select').value);
    const firstSlot = 0; // Add to the first slot
    dropBlock(dayIndex, firstSlot); // Assumes dropBlock is in dayOperations.js
    document.getElementById('add-block-btn').style.display = 'none'; // Hide after use
}

function loadSchedule() {
    const fileInput = document.getElementById('schedule-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            gridData = data.gridData;
            categories = data.categories;
            resolution = data.resolution || 60;
            resetGrid();
            updateTotals();
            alert('Schedule loaded!');
        };
        reader.readAsText(file);
        console.log(`File selected: ${file.name}`);
    }
}

function loadComparison() {
    const fileInput = document.getElementById('comparison-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            window.comparisonGridData = data.gridData;
            window.comparisonCategories = data.categories;
            window.comparisonResolution = data.resolution || 60;
            alert('Comparison schedule loaded!');
        };
        reader.readAsText(file);
        console.log(`Comparison file selected: ${file.name}`);
    }
}

function saveSchedule() {
    const data = {
        version: "1.0",
        resolution: resolution,
        timeDirection: "top",
        categories: categories,
        gridData: gridData
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BlockTime_Schedule_${new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(/:/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function updateTotals() {
    // Placeholder for updating totals if needed elsewhere
    console.log('Totals updated');
}
