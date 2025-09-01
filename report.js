// Global variables accessible from other scripts
window.gridData = window.gridData || Array(7).fill().map(() => Array(24 * 2).fill(null));
window.categories = window.categories || [];
window.resolution = window.resolution || 60;

function generateReport() {
    const summaryText = document.getElementById('summaryText');
    const summaryTable = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
    const pieChartActivity = document.getElementById('pieChartActivity').getContext('2d');
    const pieChartMindset = document.getElementById('pieChartMindset').getContext('2d');
    summaryTable.innerHTML = '';
    summaryText.innerHTML = 'Weekly Schedule Summary';

    // Calculate total hours and category/mindset data across all days
    let totalHours = 0;
    const categoryData = {};
    const mindsetData = {};
    for (let day = 0; day < 7; day++) {
        gridData[day].filter(block => block).forEach(block => {
            const duration = resolution / 60; // Convert minutes to hours
            totalHours += duration;
            categoryData[block.name] = (categoryData[block.name] || 0) + duration;
            mindsetData[block.mindset] = (mindsetData[block.mindset] || 0) + duration;
        });
    }

    // Populate table with activity totals
    Object.entries(categoryData).forEach(([name, hours]) => {
        const percentage = ((hours / totalHours) * 100).toFixed(1);
        const row = summaryTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = hours.toFixed(1);
        row.insertCell(2).textContent = percentage + '%';
        // Find the most common mindset for this activity
        const activityMindsets = gridData.flat().filter(b => b && b.name === name).map(b => b.mindset);
        const mindsetCount = activityMindsets.reduce((acc, mindset) => {
            acc[mindset] = (acc[mindset] || 0) + 1;
            return acc;
        }, {});
        const mostCommonMindset = Object.keys(mindsetCount).reduce((a, b) => mindsetCount[a] > mindsetCount[b] ? a : b, '');
        row.insertCell(3).textContent = mostCommonMindset || 'N/A';
    });

    // Activity Pie Chart
    new Chart(pieChartActivity, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: window.categories.map(c => c.color || '#000000')
            }]
        },
        options: { title: { display: true, text: 'Weekly Hours by Activity' } }
    });

    // Mindset Pie Chart
    new Chart(pieChartMindset, {
        type: 'pie',
        data: {
            labels: Object.keys(mindsetData),
            datasets: [{
                data: Object.values(mindsetData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: { title: { display: true, text: 'Weekly Hours by State of Mind' } }
    });

    document.getElementById('report').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Weekly Schedule Summary', 10, 10);
    doc.autoTable({ html: '#summaryTable' });
    doc.addPage();
    doc.text('Activity Hours', 10, 10);
    const activityCanvas = document.getElementById('pieChartActivity');
    doc.addImage(activityCanvas.toDataURL('image/png'), 'PNG', 10, 20, 180, 180);
    doc.addPage();
    doc.text('State of Mind Hours', 10, 10);
    const mindsetCanvas = document.getElementById('pieChartMindset');
    doc.addImage(mindsetCanvas.toDataURL('image/png'), 'PNG', 10, 20, 180, 180);
    doc.save('schedule_report.pdf');
}

// Ensure report generation on page load if data exists (optional)
document.addEventListener('DOMContentLoaded', () => {
    if (gridData.some(day => day.some(block => block))) {
        generateReport();
    }
});
