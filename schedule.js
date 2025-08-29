function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    console.log('Adding category:', { name, color, mindset }); // Debug
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        resetGrid(); // Refresh grid with new category
        console.log('Categories after add:', categories); // Debug
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
            gridData = data.gridData || Array(7).fill().map(() => Array(24).fill(null));
            categories = data.categories || [];
            currentDay = data.currentDay || 0;
            resetGrid();
            updateTotals();
            alert('Schedule loaded!');
            console.log('Loaded categories:', categories); // Debug
        };
        reader.readAsText(file);
    }
}

function loadComparison() {
    const fileInput = document.getElementById('comparison-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            window.comparisonGridData = data.gridData || Array(7).fill().map(() => Array(24).fill(null));
            window.comparisonCategories = data.categories || [];
            window.comparisonResolution = data.resolution || 60;
            alert('Comparison schedule loaded!');
        };
        reader.readAsText(file);
    }
}

function saveSchedule() {
    const data = {
        version: "1.0",
        resolution: resolution,
        timeDirection: timeDirection,
        categories: categories,
        gridData: gridData,
        currentDay: currentDay
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BlockTime_Schedule_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function generateComparison() {
    if (!window.comparisonGridData || !window.comparisonCategories) {
        alert('Please load a comparison schedule first!');
        return;
    }
    alert('Comparison feature coming soon!');
}

function updateTotals() {
    console.log('Totals updated');
}
