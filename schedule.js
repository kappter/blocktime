function addCategory() {
    const name = document.getElementById('cat-name').value.trim();
    const color = document.getElementById('cat-color').value;
    const mindset = document.getElementById('mindset-select').value;
    console.log('Adding category:', { name, color, mindset }); // Debug
    if (name && !categories.some(cat => cat.name === name)) {
        categories.push({ name, color, mindset });
        document.getElementById('cat-name').value = '';
        resetGrid();
        console.log('Categories after add:', categories); // Debug
    } else {
        alert('Please enter a unique category name!');
    }
}
