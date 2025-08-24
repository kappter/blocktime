let resolution = 15;
let slotsPerDay = 24 * 60 / resolution;
let categories = [];
let selectedCat = null;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let dayTypes = {};
let undoStack = [];
let timeDirection = 'bottom'; // 'bottom' for 12AM at bottom, 'top' for 12AM at top
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mindsets = ['Contentment', 'Obligation', 'Energy', 'Neutral']; // Mindset options

function initGrid() {
    const oldResolution = resolution;
    resolution = parseInt(document.getElementById('resolution').value);
    const oldSlotsPerDay = slotsPerDay;
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Resolution changed from ${oldResolution} min to ${resolution} min, slotsPerDay: ${slotsPerDay}`);

    // Handle block splitting if resolution decreases
    if (resolution < oldResolution && oldResolution > 0) {
        const resolutionRatio = oldResolution / resolution;
        gridData = gridData.map(day => {
            const newDay = [];
            day.forEach((block, index) => {
                for (let i = 0; i < resolutionRatio; i++) {
                    newDay.push({ ...block });
                }
            });
            return newDay.slice(0, slotsPerDay); // Truncate to new slotsPerDay
        });
    } else if (resolution > oldResolution) {
        // Handle merging if resolution increases (simplify by keeping first block per old slot)
        gridData = gridData.map(day => {
            const newDay = [];
            for (let i = 0; i < day.length; i += oldResolution / resolution) {
                if (day[i]) newDay.push({ ...day[i] });
            }
            return newDay.slice(0, slotsPerDay); // Truncate to new slotsPerDay
        });
    } else {
        // Same resolution, just truncate
        gridData = gridData.map(day => day.slice(0, slotsPerDay));
    }

    undoStack = [];
    resetGrid();
    renderTimeMarkers();
    renderWeekView(); // Ensure week view updates with new scale
}

function renderTimeMarkers() {
    const markersDiv = document.getElementById('time-markers');
    if (markersDiv) markersDiv.innerHTML = '';
    const hoursToShow = [0, 6, 12, 18];
    const slotsPerHour = 60 / resolution;
    const totalSlots = 24 * slotsPerHour;
    const slotHeight = 70 / totalSlots; // Height per slot in vh, based on 70vh grid
    const orderedHours = timeDirection === 'bottom' ? hoursToShow : hoursToShow.slice().reverse();
    if (markersDiv) {
        orderedHours.forEach((hour) => {
            const slotIndex = hour * slotsPerHour;
            const yPosition = timeDirection === 'bottom'
                ? (totalSlots - 1 - slotIndex) * slotHeight
                : slotIndex * slotHeight;
            const marker = document.createElement('div');
            marker.className = 'time-marker';
            marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
            marker.style.top = `${yPosition}vh`;
            markersDiv.appendChild(marker);
        });
    }
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
}

function getAttributeForCategory(catName) {
    const attributes = {
        'Sleep': 'Joyful-Eager',
        'Study': 'Neutral-Reluctant',
        'Work': 'Neutral-Eager',
        'Exercise': 'Joyful-Willing',
        'Relax': 'Joyful-Reluctant'
    };
    return attributes[catName] || 'Neutral-Willing';
}

function updateTotals() {
    const counts = {};
    const mindsetCounts = {};
    categories.forEach(cat => {
        counts[cat.name] = 0;
        mindsetCounts[cat.name] = { 'Contentment': 0, 'Obligation': 0, 'Energy': 0, 'Neutral': 0 };
    });
    gridData.flat().forEach(block => {
        counts[block.name]++;
        mindsetCounts[block.name][block.mindset]++;
    });
    const hoursPerBlock = resolution / 60;
    const totalHours = gridData.reduce((sum, day) => sum + day.length, 0) * hoursPerBlock;

    const categoryTotals = document.getElementById('category-totals');
    if (categoryTotals) categoryTotals.innerHTML = categories.map(cat => 
        `${cat.name}: ${(counts[cat.name] * hoursPerBlock).toFixed(1)} hours`
    ).join('<br>');

    const attributeSummary = document.getElementById('attribute-summary');
    if (attributeSummary) attributeSummary.innerHTML = '<strong>Activity Attributes:</strong><br>' + categories.map(cat => {
        const attr = getAttributeForCategory(cat.name);
        return `${cat.name}: ${attr} (${(mindsetCounts[cat.name][attr] * hoursPerBlock).toFixed(1)} hours)<br>`;
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
    const blocks = [...gridData[currentDay]]; // Create a copy to avoid modifying original
    if (timeDirection === 'bottom') {
        blocks.reverse(); // Reverse for bottom-up rendering but maintain time slots
    }
    blocks.forEach((block, index) => {
        const timeIndex = timeDirection === 'bottom' ? (totalSlots - 1 - index) : index;
        const startMinutes = timeIndex * resolution;
        const endMinutes = (timeIndex + 1) * resolution;
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block';
        blockDiv.style.backgroundColor = block.color;
        const labelDiv = document.createElement('div');
        labelDiv.className = 'block-label';
        labelDiv.textContent = `${block.name}: ${formatTime(startMinutes)}-${formatTime(endMinutes)} (${block.mindset})`;
        blockDiv.appendChild(labelDiv);
        if (dayDiv) dayDiv.appendChild(blockDiv);
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
    if (gridData[dayIndex].length >= slotsPerDay) return alert('Day is full!');
    pushUndoState();
    const cat = categories[selectedCat];
    const mindsetSelect = document.getElementById('mindset-select');
    const mindset = mindsetSelect.value;
    if (mindsets.includes(mindset)) {
        gridData[dayIndex].push({ ...cat, mindset });
        resetGrid();
    } else {
        alert('Invalid mindset selected! Defaulting to Neutral.');
        gridData[dayIndex].push({ ...cat, mindset: 'Neutral' });
        resetGrid();
    }
}

function saveSchedule() {
    const schedule = {
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
            ].every(block => categoryNames.includes(block.name) && (block.mindset === undefined || mindsets.includes(block.mindset)));
            if (!allValid) {
                throw new Error('Grid data or day types reference unknown categories or invalid mindsets');
            }

            if (data.resolution && ![15, 30, 60].includes(data.resolution)) {
                throw new Error('Invalid resolution value');
            }

            if (data.timeDirection && !['bottom', 'top'].includes(data.timeDirection)) {
                throw new Error('Invalid time direction value');
            }

            resolution = data.resolution || 15;
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
    resetGrid(); // Re-render grid with locked positions
    renderWeekView(); // Update week view to match direction
}

function generateReport() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js failed to load. Please check your internet connection or CDN availability.');
        alert('Cannot generate report: Chart.js library failed to load. Please check your internet connection and try again.');
        return;
    }

    const counts = {};
    const mindsetCounts = {};
    categories.forEach(cat => {
        counts[cat.name] = 0;
        mindsetCounts[cat.name] = { 'Contentment': 0, 'Obligation': 0, 'Energy': 0, 'Neutral': 0 };
    });
    gridData.flat().forEach(block => {
        counts[block.name]++;
        mindsetCounts[block.name][block.mindset]++;
    });
    const hoursPerBlock = resolution / 60;
    const totalBlocks = gridData.reduce((sum, day) => sum + day.length, 0);
    const totalHours = totalBlocks * hoursPerBlock;

    const studentName = document.getElementById('studentName')?.value.trim() || 'Student';
    const maxCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, categories[0]?.name || 'None');
    const summaryText = document.getElementById('summaryText');
    if (summaryText) summaryText.innerHTML = `
        <p><strong>Great job, ${studentName}! 🎉</strong> You've planned <strong>${totalHours.toFixed(1)}</strong> hours of your week! 
        Your top activity is <strong>${maxCategory}</strong> with <strong>${(counts[maxCategory] * hoursPerBlock).toFixed(1)}</strong> hours. 
        Check your mindset distribution below!</p>
    `;

    const tableBody = document.querySelector('#summaryTable tbody');
    if (tableBody) tableBody.innerHTML = '';
    const pieData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.keys(counts).forEach(name => {
        const hours = counts[name] * hoursPerBlock;
        const pct = totalHours ? (hours / 168 * 100).toFixed(1) : 0;
        const row = `<tr><td>${name}</td><td>${hours.toFixed(2)}</td><td>${pct}%</td><td>${Object.entries(mindsetCounts[name]).map(([m, h]) => `${m}: ${(h * hoursPerBlock).toFixed(2)}h`).join(', ')}</td></tr>`;
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
    const blockHeight = canvas?.height / slotsPerDay || 0; // Scale height based on slotsPerDay
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
        const orderedHours = timeDirection === 'bottom' ? hoursToShow : hoursToShow.slice().reverse();
        orderedHours.forEach((hour, i) => {
            const slotIndex = Math.floor(hour * slotsPerHour);
            const y = timeDirection === 'bottom'
                ? canvas.height - (slotIndex * blockHeight)
                : slotIndex * blockHeight;
            ctx.fillText(
                hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM'),
                55,
                y + blockHeight / 2
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

        const blocks = [...gridData[dayIndex]]; // Copy to avoid modifying original
        if (timeDirection === 'bottom') {
            blocks.reverse(); // Reverse for rendering but maintain time slots
        }
        blocks.forEach((block, index) => {
            const timeIndex = timeDirection === 'bottom' ? (slotsPerDay - 1 - index) : index;
            const y = timeIndex * blockHeight; // Use blockHeight for consistent scaling
            if (ctx) {
                ctx.fillStyle = block.color;
                ctx.fillRect(x + 1, y, dayWidth - 2, blockHeight);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.font = '8px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(
                    `${block.name}: ${formatTime(timeIndex * resolution)}-${formatTime((timeIndex + 1) * resolution)} (${block.mindset})`,
                    x + 3,
                    y + blockHeight / 2
                );
            }
        });
    });
}

function downloadPDF() {
    if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
        console.error('jsPDF or jspdf-autotable failed to load. Please check your internet connection or CDN availability.');
        alert('Cannot download PDF: jsPDF library failed to load. Please check your internet connection and try again.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });
    const studentName = document.getElementById('studentName')?.value.trim() || 'Student';
    const summaryText = document.getElementById('summaryText')?.textContent || '';
    const tableBody = document.querySelector('#summaryTable tbody');
    const rows = tableBody ? Array.from(tableBody.children).map(row => Array.from(row.children).map(cell => cell.textContent)) : [];

    doc.setFontSize(16);
    doc.text('BlockTime Weekly Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Prepared by: ${studentName}`, 20, 30);
    if (summaryText) doc.text(summaryText.split('\n').map(line => line.trim()), 20, 40, { maxWidth: 260 });

    if (tableBody) {
        doc.autoTable({
            startY: 60,
            head: [['Category', 'Hours', 'Percentage', 'Mindset Distribution']],
            body: rows,
            theme: 'striped',
            styles: { fontSize: 10 },
            margin: { left: 20, right: 20 }
        });
    }

    const weekCanvas = document.getElementById('weekChart');
    const weekImgData = weekCanvas ? weekCanvas.toDataURL('image/png') : '';
    if (weekImgData) {
        doc.text('Weekly Schedule', 20, doc.autoTable?.previous.finalY + 10 || 60);
        doc.addImage(weekImgData, 'PNG', 20, doc.autoTable?.previous.finalY + 20 || 70, 260, 60);
    }

    const pieCanvas = document.getElementById('pieChart');
    const pieImgData = pieCanvas ? pieCanvas.toDataURL('image/png') : '';
    if (pieImgData) {
        doc.text('Weekly Time Allocation', 20, doc.autoTable?.previous.finalY + 90 || 130);
        doc.addImage(pieImgData, 'PNG', 20, doc.autoTable?.previous.finalY + 100 || 140, 100, 100);
    }

    doc.save(`BlockTime_Report_${studentName || 'Student'}.pdf`);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    renderWeekView();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('day-select').addEventListener('change', () => {
        currentDay = parseInt(document.getElementById('day-select').value);
        resetGrid();
    });

    document.getElementById('loadSchedule').addEventListener('change', loadSchedule);

    document.getElementById('resolution').addEventListener('change', () => {
        console.log('Resolution dropdown changed');
        initGrid();
    });

    document.getElementById('toggle-time-direction').addEventListener('click', toggleTimeDirection);
});

window.addEventListener('load', () => {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded. Check CDN: https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js');
    }
    if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
        console.error('jsPDF not loaded. Check CDNs: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js and https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
    }
    initGrid();
});