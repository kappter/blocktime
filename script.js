let resolution = 15;
let slotsPerDay = 24 * 60 / resolution;
let categories = [];
let selectedCat = null;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let dayTypes = {};
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function initGrid() {
    resolution = parseInt(document.getElementById('resolution').value);
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    resetGrid();
    renderTimeMarkers();
}

function renderTimeMarkers() {
    const markersDiv = document.getElementById('time-markers');
    markersDiv.innerHTML = '';
    const hoursToShow = [0, 6, 12, 18];
    const slotsPerHour = 60 / resolution;
    hoursToShow.forEach(hour => {
        const marker = document.createElement('div');
        marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
        marker.style.position = 'absolute';
        marker.style.bottom = `calc(${(hour * slotsPerHour * (80 / slotsPerDay))}vh - 6px)`;
        markersDiv.appendChild(marker);
    });
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
}

function updateTotals() {
    const counts = {};
    categories.forEach(cat => counts[cat.name] = 0);
    gridData.flat().forEach(cat => counts[cat.name]++);
    const hoursPerBlock = resolution / 60;
    const totalHours = gridData.reduce((sum, day) => sum + day.length, 0) * hoursPerBlock;

    const categoryTotals = document.getElementById('category-totals');
    categoryTotals.innerHTML = categories.map(cat => 
        `${cat.name}: ${(counts[cat.name] * hoursPerBlock).toFixed(1)} hours`
    ).join('<br>');

    const overallTotal = document.getElementById('overall-total');
    overallTotal.innerHTML = `<strong>Total: ${totalHours.toFixed(1)} hours</strong>`;
}

function resetGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
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
    grid.appendChild(dayDiv);
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = days[currentDay];
    grid.appendChild(label);
    gridData[currentDay].forEach((cat, index) => {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundColor = cat.color;
        const startMinutes = index * resolution;
        const endMinutes = (index + 1) * resolution;
        const labelDiv = document.createElement('div');
        labelDiv.className = 'block-label';
        labelDiv.textContent = `${cat.name}: ${formatTime(startMinutes)}-${formatTime(endMinutes)}`;
        block.appendChild(labelDiv);
        dayDiv.appendChild(block);
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
    catsDiv.innerHTML = '';
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
        catsDiv.appendChild(catDiv);
    });
}

function renderLegend() {
    const legendDiv = document.getElementById('legend');
    legendDiv.innerHTML = '<strong>Legend:</strong> ';
    categories.forEach(cat => {
        const span = document.createElement('span');
        span.style.backgroundColor = cat.color;
        span.style.padding = '4px 10px';
        span.style.margin = '0 5px';
        span.style.borderRadius = '4px';
        span.textContent = cat.name;
        legendDiv.appendChild(span);
    });
}

function copyDay() {
    const targetDay = parseInt(document.getElementById('copy-day-select').value);
    if (targetDay === currentDay) return alert('Cannot copy to the same day!');
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
    dayTypeSelect.innerHTML = '<option value="">Select Day Type</option>';
    Object.keys(dayTypes).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        dayTypeSelect.appendChild(option);
    });
}

function applyDayType() {
    const typeName = document.getElementById('day-type-select').value;
    if (!typeName) return alert('Select a day type!');
    gridData[currentDay] = [...dayTypes[typeName]];
    resetGrid();
    updateTotals();
    alert(`Applied day type "${typeName}" to ${days[currentDay]}`);
}

function dropBlock(dayIndex) {
    if (selectedCat === null) return alert('Select a category first!');
    if (gridData[dayIndex].length >= slotsPerDay) return alert('Day is full!');
    const cat = categories[selectedCat];
    gridData[dayIndex].push(cat);
    const dayDiv = document.querySelector('.day');
    const block = document.createElement('div');
    block.className = 'block';
    block.style.backgroundColor = cat.color;
    block.style.opacity = '0';
    const index = gridData[dayIndex].length - 1;
    const startMinutes = index * resolution;
    const endMinutes = (index + 1) * resolution;
    const labelDiv = document.createElement('div');
    labelDiv.className = 'block-label';
    labelDiv.textContent = `${cat.name}: ${formatTime(startMinutes)}-${formatTime(endMinutes)}`;
    block.appendChild(labelDiv);
    dayDiv.appendChild(block);
    setTimeout(() => block.style.opacity = '1', 10);
    updateTotals();
}

function saveSchedule() {
    const schedule = {
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
            
            // Validate schedule data
            if (!data.categories || !Array.isArray(data.categories) ||
                !data.gridData || !Array.isArray(data.gridData) ||
                !data.dayTypes || typeof data.dayTypes !== 'object') {
                throw new Error('Invalid schedule format');
            }

            // Validate categories
            if (!data.categories.every(cat => cat.name && cat.color)) {
                throw new Error('Invalid category data');
            }

            // Validate gridData
            if (data.gridData.length !== 7 || !data.gridData.every(day => Array.isArray(day))) {
                throw new Error('Invalid grid data');
            }

            // Validate dayTypes
            if (!Object.values(data.dayTypes).every(day => Array.isArray(day))) {
                throw new Error('Invalid day types data');
            }

            // Verify all gridData and dayTypes entries reference valid categories
            const categoryNames = data.categories.map(cat => cat.name);
            const allValid = [
                ...data.gridData.flat(),
                ...Object.values(data.dayTypes).flat()
            ].every(block => categoryNames.includes(block.name));
            if (!allValid) {
                throw new Error('Grid data or day types reference unknown categories');
            }

            // Apply loaded data
            categories = data.categories;
            gridData = data.gridData;
            dayTypes = data.dayTypes;
            
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

function generateReport() {
    const counts = {};
    categories.forEach(cat => counts[cat.name] = 0);
    gridData.flat().forEach(cat => counts[cat.name]++);
    const totalBlocks = gridData.reduce((sum, day) => sum + day.length, 0);
    const hoursPerBlock = resolution / 60;
    const totalHours = totalBlocks * hoursPerBlock;

    const studentName = document.getElementById('studentName').value.trim() || 'Student';
    const maxCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, categories[0]?.name || 'None');
    const summaryText = document.getElementById('summaryText');
    summaryText.innerHTML = `
        <p><strong>Great job, ${studentName}! 🎉</strong> You've planned <strong>${totalHours.toFixed(1)}</strong> hours of your week! 
        Your top activity is <strong>${maxCategory}</strong> with <strong>${(counts[maxCategory] * hoursPerBlock).toFixed(1)}</strong> hours. 
        Keep balancing your time to crush it! 🚀</p>
    `;

    const tableBody = document.querySelector('#summaryTable tbody');
    tableBody.innerHTML = '';
    const pieData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.keys(counts).forEach(name => {
        const hours = counts[name] * hoursPerBlock;
        const pct = totalHours ? (hours / 168 * 100).toFixed(1) : 0;
        const row = `<tr><td>${name}</td><td>${hours}</td><td>${pct}%</td></tr>`;
        tableBody.innerHTML += row;
        pieData.labels.push(name);
        pieData.datasets[0].data.push(hours);
        pieData.datasets[0].backgroundColor.push(categories.find(c => c.name === name).color);
    });

    document.getElementById('report').style.display = 'block';

    const ctx = document.getElementById('pieChart').getContext('2d');
    if (window.myPieChart) window.myPieChart.destroy();
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: { 
            responsive: true, 
            plugins: { 
                legend: { position: 'top' }, 
                title: { display: true, text: 'Weekly Time Allocation (Hours)' } 
            } 
        }
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const studentName = document.getElementById('studentName').value.trim() || 'Student';
    const summaryText = document.getElementById('summaryText').textContent;
    const tableBody = document.querySelector('#summaryTable tbody');
    const rows = Array.from(tableBody.children).map(row => Array.from(row.children).map(cell => cell.textContent));

    doc.setFontSize(16);
    doc.text('BlockTime Weekly Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Prepared by: ${studentName}`, 20, 30);
    doc.text(summaryText.split('\n').map(line => line.trim()), 20, 40, { maxWidth: 160 });

    doc.autoTable({
        startY: 60,
        head: [['Category', 'Hours', 'Percentage']],
        body: rows,
        theme: 'striped',
        styles: { fontSize: 10 },
    });

    const canvas = document.getElementById('pieChart');
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, doc.autoTable.previous.finalY + 10, 80, 80);

    doc.save(`BlockTime_Report_${studentName || 'Student'}.pdf`);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('day-select').addEventListener('change', () => {
    currentDay = parseInt(document.getElementById('day-select').value);
    resetGrid();
});

document.getElementById('menu-toggle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    document.getElementById('menu').classList.toggle('show');
    console.log('Menu toggled (touchstart)');
});
document.getElementById('menu-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('menu').classList.toggle('show');
    console.log('Menu toggled (click)');
});

document.getElementById('loadSchedule').addEventListener('change', loadSchedule);

const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.async = true;
document.head.appendChild(chartScript);

const pdfScript = document.createElement('script');
pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
pdfScript.async = true;
document.head.appendChild(pdfScript);

initGrid();