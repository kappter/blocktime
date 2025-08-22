let resolution = 15;
let slotsPerDay = 24 * 60 / resolution;
let categories = [];
let selectedCat = null;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
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
    const hoursToShow = [0, 6, 12, 18]; // Simplified: 12AM, 6AM, 12PM, 6PM
    const slotsPerHour = 60 / resolution;
    hoursToShow.forEach(hour => {
        const marker = document.createElement('div');
        marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
        marker.style.position = 'absolute';
        marker.style.bottom = `calc(${(hour * slotsPerHour) * (80vh / var(--slots-per-day))} - 6px)`;
        markersDiv.appendChild(marker);
    });
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
    grid.appendChild(dayDiv);
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = days[currentDay];
    grid.appendChild(label);
    gridData[currentDay].forEach(cat => {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundColor = cat.color;
        dayDiv.appendChild(block);
    });
}

function addCategory() {
    const name = document.getElementById('catName').value.trim();
    const color = document.getElementById('catColor').value;
    if (name && !categories.find(c => c.name === name)) {
        categories.push({name, color});
        renderCategories();
        renderLegend();
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
    dayDiv.appendChild(block);
    setTimeout(() => block.style.opacity = '1', 10);
}

function generateReport() {
    const counts = {};
    categories.forEach(cat => counts[cat.name] = 0);
    gridData.flat().forEach(cat => counts[cat.name]++);
    const totalBlocks = gridData.reduce((sum, day) => sum + day.length, 0);
    const hoursPerBlock = resolution / 60;
    const totalHours = totalBlocks * hoursPerBlock;

    // Summary Text
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

    // Add title and name
    doc.setFontSize(16);
    doc.text('BlockTime Weekly Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Prepared by: ${studentName}`, 20, 30);

    // Add summary text
    doc.text(summaryText.split('\n').map(line => line.trim()), 20, 40, { maxWidth: 160 });

    // Add table
    doc.autoTable({
        startY: 60,
        head: [['Category', 'Hours', 'Percentage']],
        body: rows,
        theme: 'striped',
        styles: { fontSize: 10 },
    });

    // Add pie chart
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
});

// Load Chart.js and jsPDF
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.async = true;
document.head.appendChild(chartScript);

const pdfScript = document.createElement('script');
pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
pdfScript.async = true;
document.head.appendChild(pdfScript);

// Initialize
initGrid();