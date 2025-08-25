let resolution = 60;
let slotsPerDay = 24 * 60 / resolution;
let categories = [];
let selectedCat = null;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let dayTypes = {};
let undoStack = [];
let timeDirection = 'bottom'; // 'bottom' for 12AM at bottom, 'top' for 12AM at top
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mindsets = ['Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering', 'Peace, Groundedness'];

function initGrid() {
    const oldResolution = resolution;
    resolution = parseInt(document.getElementById('resolution').value) || 60; // Default to 60 if invalid
    const oldSlotsPerDay = slotsPerDay;
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Resolution changed from ${oldResolution} min to ${resolution} min, slotsPerDay: ${slotsPerDay}`);

    if (resolution < oldResolution && oldResolution > 0) {
        const resolutionRatio = oldResolution / resolution;
        gridData = gridData.map(day => {
            const newDay = [];
            day.forEach((block, index) => {
                for (let i = 0; i < resolutionRatio; i++) {
                    newDay.push({ ...block });
                }
            });
            return newDay.slice(0, slotsPerDay);
        });
    } else if (resolution > oldResolution) {
        gridData = gridData.map(day => {
            const newDay = [];
            for (let i = 0; i < day.length; i += resolution / oldResolution) {
                if (day[i]) newDay.push({ ...day[i] });
            }
            return newDay.slice(0, slotsPerDay);
        });
    } else {
        gridData = gridData.map(day => day.slice(0, slotsPerDay));
    }

    resetGrid();
    renderTimeMarkers();
    renderWeekView();
}

function renderTimeMarkers() {
    const markersDiv = document.getElementById('time-markers');
    if (markersDiv) markersDiv.innerHTML = '';
    const hoursToShow = [0, 6, 12, 18];
    const slotsPerHour = 60 / resolution;
    const totalSlots = 24 * slotsPerHour;
    const slotHeight = 70 / totalSlots;
    hoursToShow.forEach((hour) => {
        const slotIndex = timeDirection === 'bottom' ? (23 - hour) * slotsPerHour : hour * slotsPerHour;
        const yPosition = (slotIndex + 0.5) * slotHeight;
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
        marker.style.top = `${yPosition}vh`;
        markersDiv.appendChild(marker);
    });
}

function formatTime(slotIndex) {
    const totalMinutes = slotIndex * resolution;
    const startMinutes = totalMinutes % 1440;
    const endMinutes = (totalMinutes + resolution) % 1440;
    const hours = Math.floor(startMinutes / 60);
    const mins = startMinutes % 60;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const endPeriod = endHours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayEndHours = endHours % 12 === 0 ? 12 : endHours % 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}-${displayEndHours}:${endMins.toString().padStart(2, '0')} ${endPeriod}`;
}

function getAttributeForCategory(catName) {
    const attributes = {
        'Sleep': 'Peace, Groundedness',
        'Study': 'Painful Desire',
        'Work': 'Forced Suffering',
        'Exercise': 'Joyful Engagement',
        'Relax': 'Sweet Resistance'
    };
    return attributes[catName] || 'Peace, Groundedness';
}

function getHappinessWillingness(mindset) {
    const spectrum = {
        'Joyful Engagement': { happiness: 1.0, willingness: 1.0 },
        'Sweet Resistance': { happiness: 0.7, willingness: 0.3 },
        'Peace, Groundedness': { happiness: 0.8, willingness: 0.8 },
        'Painful Desire': { happiness: 0.3, willingness: 0.7 },
        'Forced Suffering': { happiness: 0.0, willingness: 0.0 }
    };
    return spectrum[mindset] || { happiness: 0.5, willingness: 0.5 };
}

function updateTotals() {
    const counts = {};
    const mindsetCounts = {};
    const happinessTotals = {};
    const willingnessTotals = {};
    categories.forEach(cat => {
        counts[cat.name] = 0;
        mindsetCounts[cat.name] = {};
        mindsets.forEach(m => mindsetCounts[cat.name][m] = 0);
        happinessTotals[cat.name] = 0;
        willingnessTotals[cat.name] = 0;
    });
    gridData.flat().forEach(block => {
        if (block && block.name && block.mindset) {
            counts[block.name]++;
            mindsetCounts[block.name][block.mindset]++;
            const { happiness, willingness } = getHappinessWillingness(block.mindset);
            happinessTotals[block.name] += happiness;
            willingnessTotals[block.name] += willingness;
        }
    });
    const hoursPerBlock = resolution / 60;
    const totalHours = gridData.reduce((sum, day) => sum + day.length, 0) * hoursPerBlock;

    const categoryTotals = document.getElementById('category-totals');
    if (categoryTotals) categoryTotals.innerHTML = categories.map(cat => 
        `${cat.name}: ${(counts[cat.name] * hoursPerBlock).toFixed(1)} hours`
    ).join('<br>');

    const attributeSummary = document.getElementById('attribute-summary');
    if (attributeSummary) attributeSummary.innerHTML = '<strong>Activity Attributes:</strong><br>' + categories.map(cat => {
        const totalBlocks = counts[cat.name] || 1; // Avoid division by zero
        const avgHappiness = (happinessTotals[cat.name] / totalBlocks).toFixed(2);
        const avgWillingness = (willingnessTotals[cat.name] / totalBlocks).toFixed(2);
        return `${cat.name}: Happiness ${avgHappiness}, Willingness ${avgWillingness} (${mindsetCounts[cat.name][getAttributeForCategory(cat.name)] * hoursPerBlock || 0} hours)<br>`;
    }).join('');

    const overallTotal = document.getElementById('overall-total');
    if (overallTotal) overallTotal.innerHTML = `<strong>Total: ${totalHours.toFixed(1)} hours</strong>`;
}

function resetGrid() {
    const grid = document.getElementById('grid');
    if (grid) grid.innerHTML = '';
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dropBlock(currentDay);
    });
    dayDiv.addEventListener('click', (e) => {
        e.preventDefault();
        dropBlock(currentDay);
    });
    if (grid) grid.appendChild(dayDiv);
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = days[currentDay];
    if (grid) grid.appendChild(label);

    const totalSlots = 24 * (60 / resolution);
    for (let i = 0; i < totalSlots; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';
        slotDiv.id = `slot-${i}`;
        dayDiv.appendChild(slotDiv);
    }

    const blocks = [...gridData[currentDay]];
    blocks.forEach((block, index) => {
        if (block && block.name && block.color) {
            const slotIndex = timeDirection === 'bottom' ? totalSlots - 1 - index : index;
            const slotDiv = document.getElementById(`slot-${slotIndex}`);
            if (slotDiv) {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'block';
                blockDiv.style.backgroundColor = block.color;
                const labelDiv = document.createElement('div');
                labelDiv.className = 'block-label';
                const timeIndex = index;
                labelDiv.textContent = `${block.name}: ${formatTime(timeIndex)} (${block.mindset})`;
                blockDiv.appendChild(labelDiv);
                slotDiv.appendChild(blockDiv);
            }
        }
    });
    updateTotals();
}

function addCategory() {
    const name = document.getElementById('catName').value.trim();
    const color = document.getElementById('catColor').value;
    if (name && !categories.find(c => c.name === name)) {
        categories.push({name, color});
        renderCategories();
        renderLegend();
        updateTotals();
    }
    document.getElementById('catName').value = '';
}

function renderCategories() {
    const catsDiv = document.getElementById('categories');
    if (catsDiv) catsDiv.innerHTML = '';
    categories.forEach((cat, i) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category';
        catDiv.style.backgroundColor = cat.color;
        catDiv.textContent = cat.name;
        catDiv.addEventListener('touchstart', (e) => {
            e.preventDefault();
            selectedCat = i;
            document.querySelectorAll('.category').forEach(c => c.classList.remove('selected'));
            catDiv.classList.add('selected');
            console.log(`Selected category: ${cat.name}`);
        });
        catDiv.addEventListener('click', (e) => {
            e.preventDefault();
            selectedCat = i;
            document.querySelectorAll('.category').forEach(c => c.classList.remove('selected'));
            catDiv.classList.add('selected');
            console.log(`Selected category: ${cat.name}`);
        });
        if (catsDiv) catsDiv.appendChild(catDiv);
    });
}

function renderLegend() {
    const legendDiv = document.getElementById('legend');
    if (legendDiv) legendDiv.innerHTML = '<strong>Legend:</strong> ';
    categories.forEach(cat => {
        const span = document.createElement('span');
        span.style.backgroundColor = cat.color;
        span.style.padding = '4px 10px';
        span.style.margin = '0 5px';
        span.style.borderRadius = '4px';
        span.textContent = cat.name;
        if (legendDiv) legendDiv.appendChild(span);
    });
}

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

function dropBlock(dayIndex) {
    if (selectedCat === null) return alert('Select a category first!');
    if (gridData[dayIndex].length >= slotsPerDay) return alert('Day is full! Adjust resolution or reset.');
    pushUndoState();
    const cat = categories[selectedCat];
    const mindsetSelect = document.getElementById('mindset-select');
    const mindset = mindsetSelect.value;
    if (mindsets.includes(mindset)) {
        gridData[dayIndex].push({ ...cat, mindset });
        resetGrid();
    } else {
        alert('Invalid mindset selected! Defaulting to Peace, Groundedness.');
        gridData[dayIndex].push({ ...cat, mindset: 'Peace, Groundedness' });
        resetGrid();
    }
}

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

function toggleTimeDirection() {
    timeDirection = timeDirection === 'bottom' ? 'top' : 'bottom';
    document.getElementById('toggle-time-direction').textContent = `Time Render: 12AM at ${timeDirection === 'bottom' ? 'Bottom' : 'Top'}`;
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Toggled time direction to ${timeDirection}`);
    renderTimeMarkers();
    resetGrid();
    renderWeekView();
}

function generateReport() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js failed to load. Please check your internet connection or CDN availability.');
        alert('Cannot generate report: Chart.js library failed to load. Please check your internet connection and try again.');
        return;
    }

    const counts = {};
    const mindsetCounts = {};
    const happinessTotals = {};
    const willingnessTotals = {};
    categories.forEach(cat => {
        counts[cat.name] = 0;
        mindsetCounts[cat.name] = {};
        mindsets.forEach(m => mindsetCounts[cat.name][m] = 0);
        happinessTotals[cat.name] = 0;
        willingnessTotals[cat.name] = 0;
    });
    gridData.flat().forEach(block => {
        if (block && block.name && block.mindset) {
            counts[block.name]++;
            mindsetCounts[block.name][block.mindset]++;
            const { happiness, willingness } = getHappinessWillingness(block.mindset);
            happinessTotals[block.name] += happiness;
            willingnessTotals[block.name] += willingness;
        }
    });
    const hoursPerBlock = resolution / 60;
    const totalBlocks = gridData.reduce((sum, day) => sum + day.length, 0);
    const totalHours = totalBlocks * hoursPerBlock;

    const studentName = document.getElementById('studentName')?.value.trim() || 'Student';
    const maxHappinessCat = Object.keys(happinessTotals).reduce((a, b) => happinessTotals[a] / (counts[a] || 1) > happinessTotals[b] / (counts[b] || 1) ? a : b, categories[0]?.name || 'None');
    const maxPainCat = Object.keys(happinessTotals).reduce((a, b) => happinessTotals[a] / (counts[a] || 1) < happinessTotals[b] / (counts[b] || 1) ? a : b, categories[0]?.name || 'None');
    const summaryText = document.getElementById('summaryText');
    if (summaryText) summaryText.innerHTML = `
        <p><strong>Great job, ${studentName}! 🎉</strong> You've planned <strong>${totalHours.toFixed(1)}</strong> hours of your week! 
        Your happiest activity is <strong>${maxHappinessCat}</strong> with an average happiness of ${(happinessTotals[maxHappinessCat] / (counts[maxHappinessCat] || 1)).toFixed(2)}. 
        However, <strong>${maxPainCat}</strong> (average happiness ${(happinessTotals[maxPainCat] / (counts[maxPainCat] || 1)).toFixed(2)}) might be worth rethinking—consider reducing painful or resistant tasks for a happier routine!</p>
    `;

    const tableBody = document.querySelector('#summaryTable tbody');
    if (tableBody) tableBody.innerHTML = '';
    const pieData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.keys(counts).forEach(name => {
        const totalBlocks = counts[name] || 1;
        const hours = counts[name] * hoursPerBlock;
        const pct = totalHours ? (hours / 168 * 100).toFixed(1) : 0;
        const avgHappiness = (happinessTotals[name] / totalBlocks).toFixed(2);
        const avgWillingness = (willingnessTotals[name] / totalBlocks).toFixed(2);
        const row = `<tr><td>${name}</td><td>${hours.toFixed(2)}</td><td>${pct}%</td><td>Happiness: ${avgHappiness}, Willingness: ${avgWillingness}</td></tr>`;
        if (tableBody) tableBody.innerHTML += row;
        pieData.labels.push(name);
        pieData.datasets[0].data.push(hours);
        pieData.datasets[0].backgroundColor.push(categories.find(c => c.name === name).color);
    });

    const reportDiv = document.getElementById('report');
    if (reportDiv) reportDiv.style.display = 'block';

    renderWeekView();

    const ctx = document.getElementById('pieChart')?.getContext('2d');
    if (ctx && window.myPieChart) window.myPieChart.destroy();
    if (ctx) window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: { 
            responsive: true, 
            plugins: { 
                legend: { position: 'top' }, 
                title: { display: true, text: `Weekly Time Allocation (Hours, ${resolution}-min slots)` } 
            } 
        }
    });
}

function renderWeekView() {
    const canvas = document.getElementById('weekChart');
    const ctx = canvas?.getContext('2d');
    if (canvas) {
        canvas.width = 1200;
        canvas.height = 300;
    }
    const dayWidth = (canvas?.width - 60) / 7 || 0;
    const blockHeight = canvas?.height / slotsPerDay || 0;
    const slotsPerHour = 60 / resolution;

    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ctx) {
        ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#333' : '#eee';
        for (let i = 0; i <= slotsPerDay; i++) {
            ctx.fillRect(60, i * blockHeight, canvas.width - 60, 1);
        }
    }

    if (ctx) {
        ctx.font = '10px Arial';
        ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#fff' : '#000';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const hoursToShow = [0, 6, 12, 18];
        hoursToShow.forEach((hour) => {
            const slotIndex = timeDirection === 'bottom' ? (23 - hour) * slotsPerHour : hour * slotsPerHour;
            const y = slotIndex * blockHeight + (blockHeight / 2);
            ctx.fillText(
                hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM'),
                55,
                y
            );
        });
    }

    days.forEach((day, dayIndex) => {
        const x = 60 + dayIndex * dayWidth;
        if (ctx) {
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#444' : '#ddd';
            ctx.fillRect(x, 0, 1, canvas.height);
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#fff' : '#000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(day, x + dayWidth / 2, timeDirection === 'bottom' ? canvas.height - 10 : 15);
        }

        const blocks = [...gridData[dayIndex]];
        blocks.forEach((block, index) => {
            if (block && block.name && block.color) {
                const slotIndex = timeDirection === 'bottom' ? slotsPerDay - 1 - index : index;
                const y = slotIndex * blockHeight;
                if (ctx) {
                    ctx.fillStyle = block.color;
                    ctx.fillRect(x + 1, y, dayWidth - 2, blockHeight);

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';