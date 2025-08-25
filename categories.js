let categories = [];
let selectedCat = null;
const mindsets = ['Joyful Engagement', 'Sweet Resistance', 'Painful Desire', 'Forced Suffering', 'Peace, Groundedness'];

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
        const totalBlocks = counts[cat.name] || 1;
        const avgHappiness = (happinessTotals[cat.name] / totalBlocks).toFixed(2);
        const avgWillingness = (willingnessTotals[cat.name] / totalBlocks).toFixed(2);
        return `${cat.name}: Happiness ${avgHappiness}, Willingness ${avgWillingness} (${mindsetCounts[cat.name][getAttributeForCategory(cat.name)] * hoursPerBlock || 0} hours)<br>`;
    }).join('');

    const overallTotal = document.getElementById('overall-total');
    if (overallTotal) overallTotal.innerHTML = `<strong>Total: ${totalHours.toFixed(1)} hours</strong>`;
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
        }, { passive: true });
        catDiv.addEventListener('click', (e) => {
            e.preventDefault();
            selectedCat = i;
            document.querySelectorAll('.category').forEach(c => c.classList.remove('selected'));
            catDiv.classList.add('selected');
            console.log(`Selected category: ${cat.name}`);
        }, { passive: true });
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
