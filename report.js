function generateReport() {
    const counts = {};
    categories.forEach(cat => counts[cat.name] = 0);
    gridData.flat().forEach(block => counts[block.name]++);
    const hoursPerBlock = resolution / 60;
    const totalHours = gridData.reduce((sum, day) => sum + day.length, 0) * hoursPerBlock;

    const summaryText = document.getElementById('summaryText');
    summaryText.innerHTML = `<p>Great job! You've planned ${totalHours.toFixed(1)} hours. Check your categories below!</p>`;

    const tableBody = document.querySelector('#summaryTable tbody');
    tableBody.innerHTML = '';
    Object.keys(counts).forEach(name => {
        const hours = counts[name] * hoursPerBlock;
        const pct = totalHours ? (hours / totalHours * 100).toFixed(1) : 0;
        tableBody.innerHTML += `<tr><td>${name}</td><td>${hours.toFixed(2)}</td><td>${pct}%</td><td>${mindsets.map(m => `${m}: ${gridData.flat().filter(b => b.name === name && b.mindset === m).length * hoursPerBlock}hrs`).join(', ')}</td></tr>`;
    });

    const reportDiv = document.getElementById('report');
    reportDiv.style.display = 'block';

    const ctx = document.getElementById('pieChart').getContext('2d');
    if (window.myPieChart) window.myPieChart.destroy();
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(counts),
            datasets: [{
                data: Object.values(counts).map(c => c * hoursPerBlock),
                backgroundColor: categories.map(c => c.color)
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Weekly Summary', 10, 10);
    const tableData = [];
    const counts = {};
    categories.forEach(cat => counts[cat.name] = 0);
    gridData.flat().forEach(block => counts[block.name]++);
    const hoursPerBlock = resolution / 60;
    Object.keys(counts).forEach(name => {
        const hours = counts[name] * hoursPerBlock;
        const pct = (hours / (168) * 100).toFixed(1);
        tableData.push([name, hours.toFixed(2), `${pct}%`, mindsets.map(m => `${m}: ${gridData.flat().filter(b => b.name === name && b.mindset === m).length * hoursPerBlock}hrs`).join(', ')]);
    });
    doc.autoTable({
        head: [['Category', 'Hours', 'Percentage', 'Happiness/Willingness']],
        body: tableData
    });
    doc.save('BlockTime_Report.pdf');
}
