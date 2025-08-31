// Assume report.js exists and contains generateReport and downloadPDF functions
function generateReport() {
    const summaryText = document.getElementById('summaryText');
    const summaryTable = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
    const pieChartActivity = document.getElementById('pieChartActivity').getContext('2d');
    const pieChartMindset = document.getElementById('pieChartMindset').getContext('2d');
    summaryTable.innerHTML = '';
    summaryText.innerHTML = 'Weekly Schedule Summary';

    // Calculate total hours and category data
    let totalHours = 0;
    const categoryData = {};
    const mindsetData = {};
    for (let day = 0; day < 7; day++) {
        gridData[day].forEach(block => {
            if (block) {
                const duration = resolution / 60; // Convert minutes to hours
                totalHours += duration;
                categoryData[block.name] = (categoryData[block.name] || 0) + duration;
                mindsetData[block.mindset] = (mindsetData[block.mindset] || 0) + duration;
            }
        });
    }

    // Populate table
    Object.entries(categoryData).forEach(([name, hours]) => {
        const percentage = ((hours / totalHours) * 100).toFixed(1);
        const row = summaryTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = hours.toFixed(1);
        row.insertCell(2).textContent = percentage + '%';
        row.insertCell(3).textContent = Object.entries(mindsetData).find(([m, h]) => h === hours)[0] || '';
    });

    // Activity Pie Chart
    new Chart(pieChartActivity, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: window.categories.map(c => c.color)
            }]
        },
        options: { title: { display: true, text: 'Percentage of Time by Activity' } }
    });

    // Mindset Pie Chart
    new Chart(pieChartMindset, {
        type: 'pie',
        data: {
            labels: Object.keys(mindsetData),
            datasets: [{
                data: Object.values(mindsetData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Colors for mindsets
            }]
        },
        options: { title: { display: true, text: 'Percentage of Time by Mindset' } }
    });

    document.getElementById('report').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Weekly Schedule Summary', 10, 10);
    doc.autoTable({ html: '#summaryTable' });
    doc.addPage();
    doc.text('Activity Percentage', 10, 10);
    // Add chart images (simplified, requires Chart.js to render to canvas first)
    const activityCanvas = document.getElementById('pieChartActivity');
    const mindsetCanvas = document.getElementById('pieChartMindset');
    doc.addImage(activityCanvas.toDataURL('image/png'), 'PNG', 10, 20, 180, 180);
    doc.addPage();
    doc.text('Mindset Percentage', 10, 10);
    doc.addImage(mindsetCanvas.toDataURL('image/png'), 'PNG', 10, 20, 180, 180);
    doc.save('schedule_report.pdf');
}
