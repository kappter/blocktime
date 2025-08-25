let resolution = 60;
let slotsPerDay = 24 * 60 / resolution;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let timeDirection = 'bottom';
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function initGrid() {
    resolution = 60;
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Resolution set to ${resolution} min, slotsPerDay: ${slotsPerDay}`);
    gridData = gridData.map(day => day.slice(0, slotsPerDay));
    resetGrid();
    renderTimeMarkers();
    renderWeekView();
}

function renderTimeMarkers() {
    const markersDiv = document.getElementById('time-markers');
    if (markersDiv) markersDiv.innerHTML = '';
    const hoursToShow = [0, 6, 12, 18];
    const slotsPerHour = 60 / resolution;
    const totalSlots = 24 * slotsPerHour;
    const slotHeight = 70 / totalSlots;
    hoursToShow.forEach((hour) => {
        const slotIndex = timeDirection === 'bottom' ? (23 - hour) * slotsPerHour : hour * slotsPerHour;
        const yPosition = (slotIndex + 0.5) * slotHeight;
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.textContent = hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM');
        marker.style.top = `${yPosition}vh`;
        markersDiv.appendChild(marker);
    });
}

function formatTime(slotIndex) {
    const totalMinutes = slotIndex * resolution;
    const startMinutes = totalMinutes % 1440;
    const endMinutes = (totalMinutes + resolution) % 1440;
    const hours = Math.floor(startMinutes / 60);
    const mins = startMinutes % 60;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const endPeriod = endHours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayEndHours = endHours % 12 === 0 ? 12 : endHours % 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}-${displayEndHours}:${endMins.toString().padStart(2, '0')} ${endPeriod}`;
}

function resetGrid() {
    const grid = document.getElementById('grid');
    if (grid) grid.innerHTML = '';
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dropBlock(currentDay);
    }, { passive: true });
    dayDiv.addEventListener('click', (e) => {
        e.preventDefault();
        dropBlock(currentDay);
    }, { passive: true });
    if (grid) grid.appendChild(dayDiv);
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = days[currentDay];
    if (grid) grid.appendChild(label);

    const totalSlots = 24 * (60 / resolution);
    for (let i = 0; i < totalSlots; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';
        slotDiv.id = `slot-${i}`;
        dayDiv.appendChild(slotDiv);
    }

    const blocks = [...gridData[currentDay]];
    blocks.forEach((block, index) => {
        if (block && block.name && block.color) {
            const slotIndex = timeDirection === 'bottom' ? totalSlots - 1 - index : index;
            const slotDiv = document.getElementById(`slot-${slotIndex}`);
            if (slotDiv) {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'block';
                blockDiv.style.backgroundColor = block.color;
                const labelDiv = document.createElement('div');
                labelDiv.className = 'block-label';
                const timeIndex = index;
                labelDiv.textContent = `${block.name}: ${formatTime(timeIndex)} (${block.mindset})`;
                blockDiv.appendChild(labelDiv);
                slotDiv.appendChild(blockDiv);
            }
        }
    });
    updateTotals();
}

function renderWeekView() {
    const canvas = document.getElementById('weekChart');
    const ctx = canvas?.getContext('2d');
    if (canvas) {
        canvas.width = 1200;
        canvas.height = 300;
    }
    const dayWidth = (canvas?.width - 60) / 7 || 0;
    const blockHeight = canvas?.height / slotsPerDay || 0;
    const slotsPerHour = 60 / resolution;

    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ctx) {
        ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#333' : '#eee';
        for (let i = 0; i <= slotsPerDay; i++) {
            ctx.fillRect(60, i * blockHeight, canvas.width - 60, 1);
        }
    }

    if (ctx) {
        ctx.font = '10px Arial';
        ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#fff' : '#000';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const hoursToShow = [0, 6, 12, 18];
        hoursToShow.forEach((hour) => {
            const slotIndex = timeDirection === 'bottom' ? (23 - hour) * slotsPerHour : hour * slotsPerHour;
            const y = slotIndex * blockHeight + (blockHeight / 2);
            ctx.fillText(
                hour % 12 === 0 ? '12' + (hour < 12 ? 'AM' : 'PM') : (hour % 12) + (hour < 12 ? 'AM' : 'PM'),
                55,
                y
            );
        });
    }

    days.forEach((day, dayIndex) => {
        const x = 60 + dayIndex * dayWidth;
        if (ctx) {
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#444' : '#ddd';
            ctx.fillRect(x, 0, 1, canvas.height);
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#fff' : '#000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(day, x + dayWidth / 2, timeDirection === 'bottom' ? canvas.height - 10 : 15);
        }

        const blocks = [...gridData[dayIndex]];
        blocks.forEach((block, index) => {
            if (block && block.name && block.color) {
                const slotIndex = timeDirection === 'bottom' ? slotsPerDay - 1 - index : index;
                const y = slotIndex * blockHeight;
                if (ctx) {
                    ctx.fillStyle = block.color;
                    ctx.fillRect(x + 1, y, dayWidth - 2, blockHeight);

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.font = '8px Arial';
                    ctx.textAlign = 'left';
                    ctx.fillText(
                        `${block.name}: ${formatTime(index)} (${block.mindset})`,
                        x + 3,
                        y + blockHeight / 2
                    );
                }
            }
        });
    });
}

function toggleTimeDirection() {
    timeDirection = timeDirection === 'bottom' ? 'top' : 'bottom';
    document.getElementById('toggle-time-direction').textContent = `Time Render: 12AM at ${timeDirection === 'bottom' ? 'Bottom' : 'Top'}`;
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Toggled time direction to ${timeDirection}`);
    renderTimeMarkers();
    resetGrid();
    renderWeekView();
}
