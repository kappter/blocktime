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
           
