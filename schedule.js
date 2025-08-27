function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        updateCategorySelect();
    } else {
        alert('Please enter a unique category name!');
    }
}

function updateCategorySelect() {
    const select = document.getElementById('category-select');
    select.innerHTML = '<option value="-1">Select Category to Place</option>';
    categories.forEach((cat, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cat.name;
        select.appendChild(option);
    });
    document.getElementById('place-block-btn').disabled = true;
}

function selectCategory(index) {
    selectedCat = parseInt(index);
    document.getElementById('place-block-btn').disabled = index === -1;
}

function placeBlock() {
    if (selectedCat === null || selectedCat < 0 || selectedCat >= categories.length) {
        alert('Please select a valid category!');
        return;
    }
    const dayIndex = parseInt(document.getElementById('day-select').value);
    const firstSlot = 0; // Place in the first available slot
    dropBlock(dayIndex, firstSlot);
    selectedCat = null; // Reset selection
    document.getElementById('place-block-btn').disabled = true;
    updateCategorySelect(); // Refresh to reflect changes
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
            updateCategorySelect(); // Update select after loading
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
    console.log('Totals updated');
}
