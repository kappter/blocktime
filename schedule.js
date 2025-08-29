function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    console.log('Adding category:', { name, color, mindset }); // Debug
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        resetGrid();
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
            alert('Schedule loaded!');
            console.log('Loaded categories:', categories); // Debug
        };
        reader.readAsText(file);
    }
}

function saveSchedule() {
    const data = {
        version: "1.0",
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

// Placeholder functions for restored modules
function copyDay() { console.log('Copy Day not implemented yet'); }
function saveDayType() { console.log('Save Day Type not implemented yet'); }
function previewDayType() { console.log('Preview Day Type not implemented yet'); }
function applyDayTypeToSelected() { console.log('Apply Day Type not implemented yet'); }
function undoAction() { console.log('Undo not implemented yet'); }
function loadComparison() { console.log('Load Comparison not implemented yet'); }
function generateComparison() { console.log('Generate Comparison not implemented yet'); }
function generateReport() { console.log('Generate Report not implemented yet'); }
function downloadPDF() { console.log('Download PDF not implemented yet'); }
function toggleTheme() { console.log('Toggle Theme not implemented yet'); }
