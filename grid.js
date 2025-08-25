let resolution = 60;
let slotsPerDay = 24 * 60 / resolution;
let gridData = Array(7).fill().map(() => []);
let currentDay = 0;
let timeDirection = 'bottom';
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Add a tooltip element for hover feedback
const tooltip = document.createElement('div');
tooltip.id = 'slot-tooltip';
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '3px';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '1000';
document.body.appendChild(tooltip);

function initGrid() {
    resolution = 60; // Default resolution, can be changed via dropdown
    slotsPerDay = 24 * 60 / resolution;
    document.documentElement.style.setProperty('--slots-per-day', slotsPerDay);
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Resolution set to ${resolution} min, slotsPerDay: ${slotsPerDay}`);
    gridData = gridData.map(day => day.slice(0, slotsPerDay));
    resetGrid();
    renderWeekView();
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
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period} - ${displayEndHours}:${endMins.toString().padStart(2, '0')} ${endPeriod}`;
}

function resetGrid() {
    const grid = document.getElementById('grid');
    if (!grid) {
        console.error('Grid div not found');
        return;
    }
    grid.innerHTML = '';
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    grid.appendChild(dayDiv);
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = days[currentDay];
    grid.appendChild(label);

    const totalSlots = 24 * (60 / resolution);
    for (let i = 0; i < totalSlots; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';
        slotDiv.id = `slot-${i}`;
        slotDiv.addEventListener('click', () => dropBlock(currentDay, i), { passive: true });
        slotDiv.addEventListener('mouseover', (e) => {
            const rect = slotDiv.getBoundingClientRect();
            tooltip.textContent = formatTime(i);
            tooltip.style.left = `${rect.left + window.scrollX + 5}px`;
            tooltip.style.top = `${rect.top + window.scrollY - 20}px`; // Above cursor
            tooltip.style.display = 'block';
            slotDiv.classList.add('hover-highlight');
        });
        slotDiv.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
            slotDiv.classList.remove('hover-highlight');
        });
        dayDiv.appendChild(slotDiv);
    }

    const blocks = gridData[currentDay];
    blocks.forEach((block, index) => {
        if (block && block.name && block.color && block.slotIndex !== undefined) {
            const slotDiv = document.getElementById(`slot-${block.slotIndex}`);
            if (slotDiv) {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'block';
                blockDiv.style.backgroundColor = block.color;
                const labelDiv = document.createElement('div');
                labelDiv.className = 'block-label';
                labelDiv.textContent = `${block.name}: ${formatTime(block.slotIndex)} (${block.mindset})`;
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
        const hoursToShow = [0, 6, 12, 18]; // Optional: Remove if no markers desired in week view
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

        const blocks = gridData[dayIndex];
        blocks.forEach((block, index) => {
            if (block && block.name && block.color && block.slotIndex !== undefined) {
                const slotIndex = block.slotIndex;
                const y = slotIndex * blockHeight;
                if (ctx) {
                    ctx.fillStyle = block.color;
                    ctx.fillRect(x + 1, y, dayWidth - 2, blockHeight);

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.font = '8px Arial';
                    ctx.textAlign = 'left';
                    ctx.fillText(
                        `${block.name}: ${formatTime(slotIndex)} (${block.mindset})`,
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
    const toggleButton = document.getElementById('toggle-time-direction');
    if (toggleButton) toggleButton.textContent = `Time Render: 12AM at ${timeDirection === 'bottom' ? 'Bottom' : 'Top'}`;
    document.documentElement.style.setProperty('--day-flex-direction', timeDirection === 'bottom' ? 'column-reverse' : 'column');
    console.log(`Toggled time direction to ${timeDirection}`);
    resetGrid();
    renderWeekView();
}
