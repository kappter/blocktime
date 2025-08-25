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
    if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
        console.error('jsPDF or jspdf-autotable failed to load. Please check your internet connection or CDN availability.');
        alert('Cannot download PDF: jsPDF library failed to load. Please check your internet connection and try again.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    // Ensure charts are rendered before export
    const weekCanvas = document.getElementById('weekChart');
    const pieCanvas = document.getElementById('pieChart');
    if (!weekCanvas || !pieCanvas) {
        console.error('Canvas elements not found for PDF export.');
        alert('Error generating PDF: Canvas elements are missing. Please generate the report first.');
        return;
    }

    // Collect data
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
    const summaryText = document.getElementById('summaryText')?.textContent || '';
    const tableBody = document.querySelector('#summaryTable tbody');
    const rows = tableBody ? Array.from(tableBody.children).map(row => Array.from(row.children).map(cell => cell.textContent)) : [];

    // Add title and student name
    doc.setFontSize(16);
    doc.text('BlockTime Weekly Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Prepared by: ${studentName}`, 20, 30);

    // Add summary text
    if (summaryText) {
        doc.text(summaryText.split('\n').map(line => line.trim()), 20, 40, { maxWidth: 260 });
    }

    // Add table data
    if (tableBody) {
        doc.autoTable({
            startY: summaryText ? 60 : 40,
            head: [['Category', 'Hours', 'Percentage', 'Happiness/Willingness']],
            body: rows,
            theme: 'striped',
            styles: { fontSize: 10 },
            margin: { left: 20, right: 20 }
        });
    }

    // Add week view chart with error handling
    const weekImgData = weekCanvas.toDataURL('image/png');
    if (weekImgData) {
        doc.text('Weekly Schedule', 20, doc.autoTable?.previous.finalY + 10 || 100);
        doc.addImage(weekImgData, 'PNG', 20, doc.autoTable?.previous.finalY + 20 || 110, 260, 60);
    } else {
        console.warn('Week chart image data is invalid, skipping.');
    }

    // Generate and add happiness/willingness pie chart with error handling
    const happinessData = { labels: [], datasets: [{ data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }] };
    Object.keys(happinessTotals).forEach(name => {
        const totalBlocks = counts[name] || 1;
        const avgHappiness = (happinessTotals[name] / totalBlocks).toFixed(2);
        happinessData.labels.push(`${name} (Happiness: ${avgHappiness})`);
        happinessData.datasets[0].data.push(avgHappiness * 100); // Scale to percentage
    });

    const happinessCanvas = document.createElement('canvas');
    happinessCanvas.width = 400;
    happinessCanvas.height = 400;
    const happinessCtx = happinessCanvas.getContext('2d');
    new Chart(happinessCtx, {
        type: 'pie',
        data: happinessData,
        options: { 
            responsive: true,
            plugins: { 
                legend: { position: 'top' },
                title: { display: true, text: 'Happiness/Willingness Breakdown (%)' }
            }
        }
    });
    const happinessImgData = happinessCanvas.toDataURL('image/png');
    if (happinessImgData) {
        doc.text('Happiness/Willingness Breakdown', 20, doc.autoTable?.previous.finalY + 90 || 170);
        doc.addImage(happinessImgData, 'PNG', 20, doc.autoTable?.previous.finalY + 100 || 180, 260, 60);
    } else {
        console.warn('Happiness chart image data is invalid, skipping.');
    }

    // Save the PDF
    doc.save(`BlockTime_Report_${studentName}_${new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(/:/g, '-')}.pdf`);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    renderWeekView();
}
