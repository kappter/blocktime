function saveSchedule() {
    const schedule = {
        version: "1.0",
        resolution: resolution,
        timeDirection: timeDirection,
        categories: categories,
        gridData: gridData,
        dayTypes: dayTypes
    };
    const blob = new Blob([JSON.stringify(schedule, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BlockTime_Schedule.json';
    a.click();
    URL.revokeObjectURL(url);
}

function loadSchedule(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) return alert('Please upload a .json file!');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!data.version || data.version !== "1.0") {
                throw new Error('Unsupported schedule version');
            }
            if (!data.categories || !Array.isArray(data.categories) ||
                !data.gridData || !Array.isArray(data.gridData) ||
                !data.dayTypes || typeof data.dayTypes !== 'object') {
                throw new Error('Invalid schedule format');
            }
            if (!data.categories.every(cat => cat.name && cat.color)) {
                throw new Error('Invalid category data');
            }
            if (data.gridData.length !== 7 || !data.gridData.every(day => Array.isArray(day))) {
                throw new Error('Invalid grid data');
            }
            if (!Object.values(data.dayTypes).every(day => Array.isArray(day))) {
                throw new Error('Invalid day types data');
            }
            const categoryNames = data.categories.map(cat => cat.name);
            const allValid = [
                ...data.gridData.flat(),
                ...Object.values(data.dayTypes).flat()
            ].every(block => block && block.name && categoryNames.includes(block.name) && (block.mindset === undefined || mindsets.includes(block.mindset)));
            if (!allValid) {
                throw new Error('Grid data or day types reference unknown categories or invalid mindsets');
            }
            if (data.resolution && ![15, 30, 60].includes(data.resolution)) {
                throw new Error('Invalid resolution value');
            }
            if (data.timeDirection && !['bottom', 'top'].includes(data.timeDirection)) {
                throw new Error('Invalid time direction value');
            }

            resolution = data.resolution || 60;
            timeDirection = data.timeDirection || 'bottom';
            document.getElementById('resolution').value = resolution;
            document.getElementById('toggle-time-direction').textContent = `Time Render: 12AM at ${timeDirection === 'bottom' ? 'Bottom' : 'Top'}`;
            categories = data.categories;
            gridData = data.gridData;
            dayTypes = data.dayTypes;
            undoStack = [];
            
            initGrid();
            renderCategories();
            renderLegend();
            renderDayTypes();
            resetGrid();
            updateTotals();
            alert('Schedule loaded successfully!');
        } catch (error) {
            console.error('Error loading schedule:', error);
            alert('Failed to load schedule. Please ensure the file is a valid BlockTime schedule JSON.');
        }
    };
    reader.readAsText(file);
}
