function generateReport() {
    const summaryText = document.getElementById('summaryText');
    const summaryTable = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
    const pieChart = document.getElementById('pieChart').getContext('2d');
    summaryTable.innerHTML = '';
    summaryText.textContent = 'Report Summary';

    // Ensure categories and gridData are accessible
    if (!window.categories || !window.gridData) {
        alert('Categories or grid data not available!');
        return;
    }

    const categoryTotals = {};
    gridData.forEach(day => {
        day.forEach((block, index) => {
            if (block && block.name) {
                categoryTotals[block.name] = (categoryTotals[block.name] || 0) + 1;
            }
        });
    });

    let totalHours = 0;
    Object.values(categoryTotals).forEach(count => totalHours += count);

    categories.forEach(cat => {
        const hours = categoryTotals[cat.name] || 0;
        const percentage = totalHours ? (hours / totalHours * 100).toFixed(1) : 0;
        const row = summaryTable.insertRow();
        row.insertCell(0).textContent = cat.name;
        row.insertCell(1).textContent = hours;
        row.insertCell(2).textContent = `${percentage}%`;
        row.insertCell(3).textContent = cat.mindset;
    });

    // Placeholder for chart (requires Chart.js setup)
    if (window.myPieChart) window.myPieChart.destroy();
    window.myPieChart = new Chart(pieChart, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: categories.map(c => c.color)
            }]
        }
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('BlockTime Schedule Report', 10, 10);
    doc.save('BlockTime_Report.pdf');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
