// Remove the initial declarations
// gridData = Array(7).fill().map(() => []); // Removed
// categories = []; // Removed
// mindsets = ['Peace, Groundedness', 'Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering']; // Removed
// resolution = 60; // Removed
// currentDay = 0; // Removed
// selectedCat = null; // Removed

function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        resetGrid();
    } else {
        alert('Please enter a unique category name!');
    }
}

function loadSchedule() {
    const fileInput = document.getElementById('schedule-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            gridData = data.gridData; // Assign, don’t declare
            categories = data.categories; // Assign, don’t declare
            resolution = data.resolution || 60; // Assign, don’t declare
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
            window.comparisonGridData = data.gridData; // Assign to global
            window.comparisonCategories = data.categories; // Assign to global
            window.comparisonResolution = data.resolution || 60; // Assign to global
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
