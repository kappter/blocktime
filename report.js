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

function downloadPDF() {
    // Redirect to printable report page
    const studentName = document.getElementById('studentName')?.value.trim() || 'Student';
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
    const maxHappinessCat = Object.keys(happinessTotals).reduce((a, b) => happinessTotals[a] / (counts[a] || 1) > happinessTotals[b] / (counts[b] || 1) ? a : b, categories[0]?.name || 'None');
    const maxPainCat = Object.keys(happinessTotals).reduce((a, b) => happinessTotals[a] / (counts[a] || 1) < happinessTotals[b] / (counts[b] || 1) ? a : b, categories[0]?.name || 'None');

    const reportData = {
        studentName,
        totalHours: totalHours.toFixed(1),
        maxHappinessCat,
        maxHappinessAvg: (happinessTotals[maxHappinessCat] / (counts[maxHappinessCat] || 1)).toFixed(2),
        maxPainCat,
        maxPainAvg: (happinessTotals[maxPainCat] / (counts[maxPainCat] || 1)).toFixed(2),
        categories: Object.keys(counts).map(name => ({
            name,
            hours: (counts[name] * hoursPerBlock).toFixed(2),
            pct: totalHours ? ((counts[name] * hoursPerBlock) / 168 * 100).toFixed(1) : 0,
            avgHappiness: (happinessTotals[name] / (counts[name] || 1)).toFixed(2),
            avgWillingness: (willingnessTotals[name] / (counts[name] || 1)).toFixed(2)
        }))
    };

    // Open printable report page
    const reportWindow = window.open('report.html', '_blank');
    if (reportWindow) {
        reportWindow.onload = () => {
            reportWindow.postMessage({ type: 'reportData', data: reportData }, '*');
        };
    } else {
        alert('Please allow popups to view the report.');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    renderWeekView();
}
