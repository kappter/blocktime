// Sample Schedules for Different Time Resolutions
// This file contains pre-built sample schedules to demonstrate the BlockTime application

const sampleSchedules = {
    // 60-minute resolution sample (24 slots per day)
    "60min": {
        resolution: 60,
        timeDirection: "bottom",
        categories: [
            { name: "Sleep", color: "#8b5cf6" },
            { name: "Work", color: "#3b82f6" },
            { name: "Exercise", color: "#22c55e" },
            { name: "Meals", color: "#f59e0b" },
            { name: "Commute", color: "#ef4444" },
            { name: "Leisure", color: "#ec4899" },
            { name: "Study", color: "#06b6d4" }
        ],
        gridData: [
            // Monday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", // 12AM-7AM
                "Exercise", // 7AM-8AM
                "Meals", // 8AM-9AM
                "Commute", // 9AM-10AM
                "Work", "Work", "Work", "Work", // 10AM-2PM
                "Meals", // 2PM-3PM
                "Work", "Work", "Work", // 3PM-6PM
                "Commute", // 6PM-7PM
                "Meals", // 7PM-8PM
                "Leisure", "Leisure", "Leisure", // 8PM-11PM
                "Sleep" // 11PM-12AM
            ],
            // Tuesday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Meals", "Commute",
                "Work", "Work", "Work", "Work", "Meals",
                "Work", "Work", "Work", "Commute", "Meals",
                "Study", "Study", "Leisure", "Sleep"
            ],
            // Wednesday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Meals", "Commute",
                "Work", "Work", "Work", "Work", "Meals",
                "Work", "Work", "Work", "Commute", "Meals",
                "Leisure", "Leisure", "Leisure", "Sleep"
            ],
            // Thursday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Meals", "Commute",
                "Work", "Work", "Work", "Work", "Meals",
                "Work", "Work", "Work", "Commute", "Meals",
                "Study", "Study", "Leisure", "Sleep"
            ],
            // Friday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Meals", "Commute",
                "Work", "Work", "Work", "Work", "Meals",
                "Work", "Work", "Work", "Commute", "Meals",
                "Leisure", "Leisure", "Leisure", "Sleep"
            ],
            // Saturday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", // 12AM-8AM
                "Meals", // 8AM-9AM
                "Exercise", "Exercise", // 9AM-11AM
                "Leisure", "Leisure", // 11AM-1PM
                "Meals", // 1PM-2PM
                "Leisure", "Leisure", "Leisure", "Leisure", // 2PM-6PM
                "Meals", // 6PM-7PM
                "Leisure", "Leisure", "Leisure", // 7PM-10PM
                "Sleep", "Sleep" // 10PM-12AM
            ],
            // Sunday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Meals", "Exercise", "Exercise",
                "Study", "Study", "Meals",
                "Study", "Study", "Leisure", "Leisure",
                "Meals", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ]
        ],
        dayTypes: {
            "Workday": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Meals", "Commute",
                "Work", "Work", "Work", "Work", "Meals",
                "Work", "Work", "Work", "Commute", "Meals",
                "Leisure", "Leisure", "Leisure", "Sleep"
            ],
            "Weekend": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Meals", "Exercise", "Exercise",
                "Leisure", "Leisure", "Meals",
                "Leisure", "Leisure", "Leisure", "Leisure",
                "Meals", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ]
        }
    },

    // 30-minute resolution sample (48 slots per day)
    "30min": {
        resolution: 30,
        timeDirection: "bottom",
        categories: [
            { name: "Sleep", color: "#8b5cf6" },
            { name: "Work", color: "#3b82f6" },
            { name: "Exercise", color: "#22c55e" },
            { name: "Meals", color: "#f59e0b" },
            { name: "Commute", color: "#ef4444" },
            { name: "Leisure", color: "#ec4899" },
            { name: "Study", color: "#06b6d4" },
            { name: "Break", color: "#84cc16" }
        ],
        gridData: [
            // Monday - more detailed 30-minute blocks
            [
                // 12AM-7AM (14 slots)
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                // 7AM-9AM (4 slots)
                "Exercise", "Exercise", "Meals", "Meals",
                // 9AM-12PM (6 slots)
                "Commute", "Work", "Work", "Work", "Work", "Work",
                // 12PM-1PM (2 slots)
                "Meals", "Break",
                // 1PM-6PM (10 slots)
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                // 6PM-8PM (4 slots)
                "Commute", "Meals", "Meals", "Break",
                // 8PM-11PM (6 slots)
                "Leisure", "Leisure", "Study", "Study", "Leisure", "Leisure",
                // 11PM-12AM (2 slots)
                "Sleep", "Sleep"
            ],
            // Tuesday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Exercise", "Meals", "Meals",
                "Commute", "Work", "Work", "Work", "Work", "Work",
                "Meals", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Meals", "Meals", "Break",
                "Study", "Study", "Study", "Study", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ],
            // Wednesday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Exercise", "Meals", "Meals",
                "Commute", "Work", "Work", "Work", "Work", "Work",
                "Meals", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Meals", "Meals", "Break",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ],
            // Thursday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Exercise", "Meals", "Meals",
                "Commute", "Work", "Work", "Work", "Work", "Work",
                "Meals", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Meals", "Meals", "Break",
                "Study", "Study", "Study", "Study", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ],
            // Friday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Exercise", "Meals", "Meals",
                "Commute", "Work", "Work", "Work", "Work", "Work",
                "Meals", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Meals", "Meals", "Break",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ],
            // Saturday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Meals", "Meals", "Exercise", "Exercise", "Exercise", "Exercise",
                "Leisure", "Leisure", "Leisure", "Leisure", "Meals", "Meals",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Meals", "Meals", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep", "Sleep", "Sleep"
            ],
            // Sunday
            [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Meals", "Meals", "Exercise", "Exercise", "Exercise", "Exercise",
                "Study", "Study", "Study", "Study", "Meals", "Meals",
                "Study", "Study", "Study", "Study", "Leisure", "Leisure", "Leisure", "Leisure",
                "Meals", "Meals", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep", "Sleep", "Sleep"
            ]
        ],
        dayTypes: {
            "Detailed Workday": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Exercise", "Exercise", "Meals", "Meals",
                "Commute", "Work", "Work", "Work", "Work", "Work",
                "Meals", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Meals", "Meals", "Break",
                "Leisure", "Leisure", "Study", "Study", "Leisure", "Leisure",
                "Sleep", "Sleep"
            ],
            "Relaxed Weekend": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", 
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Meals", "Meals", "Exercise", "Exercise", "Exercise", "Exercise",
                "Leisure", "Leisure", "Leisure", "Leisure", "Meals", "Meals",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Meals", "Meals", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Sleep", "Sleep", "Sleep", "Sleep"
            ]
        }
    },

    // 15-minute resolution sample (96 slots per day)
    "15min": {
        resolution: 15,
        timeDirection: "bottom",
        categories: [
            { name: "Sleep", color: "#8b5cf6" },
            { name: "Work", color: "#3b82f6" },
            { name: "Exercise", color: "#22c55e" },
            { name: "Meals", color: "#f59e0b" },
            { name: "Commute", color: "#ef4444" },
            { name: "Leisure", color: "#ec4899" },
            { name: "Study", color: "#06b6d4" },
            { name: "Break", color: "#84cc16" },
            { name: "Prep", color: "#f97316" },
            { name: "Email", color: "#a855f7" }
        ],
        gridData: [
            // Monday - very detailed 15-minute blocks
            [
                // 12AM-7AM (28 slots)
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep",
                // 7AM-9AM (8 slots)
                "Prep", "Exercise", "Exercise", "Exercise", "Exercise", "Prep", "Meals", "Meals",
                // 9AM-12PM (12 slots)
                "Commute", "Commute", "Email", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Break",
                // 12PM-1PM (4 slots)
                "Meals", "Meals", "Break", "Break",
                // 1PM-6PM (20 slots)
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                // 6PM-8PM (8 slots)
                "Commute", "Commute", "Prep", "Meals", "Meals", "Meals", "Break", "Break",
                // 8PM-11PM (12 slots)
                "Leisure", "Leisure", "Leisure", "Leisure", "Study", "Study", "Study", "Study",
                "Leisure", "Leisure", "Leisure", "Prep",
                // 11PM-12AM (4 slots)
                "Sleep", "Sleep", "Sleep", "Sleep"
            ],
            // Generate similar detailed schedules for other days...
            // For brevity, I'll create a simplified version for the remaining days
            [], [], [], [], [], [] // Will be filled by the initialization function
        ],
        dayTypes: {
            "Micro-managed Workday": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep",
                "Prep", "Exercise", "Exercise", "Exercise", "Exercise", "Prep", "Meals", "Meals",
                "Commute", "Commute", "Email", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Break",
                "Meals", "Meals", "Break", "Break",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work", "Work",
                "Commute", "Commute", "Prep", "Meals", "Meals", "Meals", "Break", "Break",
                "Leisure", "Leisure", "Leisure", "Leisure", "Study", "Study", "Study", "Study",
                "Leisure", "Leisure", "Leisure", "Prep",
                "Sleep", "Sleep", "Sleep", "Sleep"
            ],
            "Detailed Weekend": [
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep",
                "Prep", "Meals", "Meals", "Meals", "Exercise", "Exercise", "Exercise", "Exercise",
                "Exercise", "Exercise", "Prep", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Meals", "Meals", "Meals", "Break",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure",
                "Prep", "Meals", "Meals", "Meals", "Leisure", "Leisure", "Leisure", "Leisure",
                "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Prep",
                "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep"
            ]
        }
    }
};

// Function to initialize 15-minute schedule with repeated patterns
function initializeFifteenMinuteSchedule() {
    const baseDay = sampleSchedules["15min"].gridData[0]; // Monday pattern
    
    // Create variations for other days
    const variations = [
        baseDay, // Monday (already defined)
        baseDay.slice(), // Tuesday (copy of Monday)
        baseDay.slice(), // Wednesday
        baseDay.slice(), // Thursday
        baseDay.slice(), // Friday
        // Saturday - more leisure focused
        [
            ...Array(32).fill("Sleep"), // 12AM-8AM
            "Prep", "Meals", "Meals", "Meals", // 8AM-9AM
            "Exercise", "Exercise", "Exercise", "Exercise", "Exercise", "Exercise", "Prep", "Break", // 9AM-11AM
            "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", // 11AM-1PM
            "Meals", "Meals", "Meals", "Break", // 1PM-2PM
            ...Array(16).fill("Leisure"), // 2PM-6PM
            "Prep", "Meals", "Meals", "Meals", "Break", "Break", "Break", "Break", // 6PM-8PM
            ...Array(12).fill("Leisure"), // 8PM-11PM
            ...Array(4).fill("Sleep") // 11PM-12AM
        ],
        // Sunday - study and leisure mix
        [
            ...Array(32).fill("Sleep"), // 12AM-8AM
            "Prep", "Meals", "Meals", "Meals", // 8AM-9AM
            "Exercise", "Exercise", "Exercise", "Exercise", "Exercise", "Exercise", "Prep", "Break", // 9AM-11AM
            "Study", "Study", "Study", "Study", "Study", "Study", "Study", "Study", // 11AM-1PM
            "Meals", "Meals", "Meals", "Break", // 1PM-2PM
            "Study", "Study", "Study", "Study", "Study", "Study", "Study", "Study", // 2PM-4PM
            "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", "Leisure", // 4PM-6PM
            "Prep", "Meals", "Meals", "Meals", "Break", "Break", "Break", "Break", // 6PM-8PM
            ...Array(12).fill("Leisure"), // 8PM-11PM
            ...Array(4).fill("Sleep") // 11PM-12AM
        ]
    ];
    
    sampleSchedules["15min"].gridData = variations;
}

// Initialize the 15-minute schedule
initializeFifteenMinuteSchedule();

// Function to load a sample schedule
function loadSampleSchedule(resolution) {
    const schedule = sampleSchedules[resolution + "min"];
    if (!schedule) {
        console.error("Sample schedule not found for resolution:", resolution);
        return false;
    }
    
    try {
        // Set resolution
        window.resolution = schedule.resolution;
        document.getElementById('slotDuration').value = schedule.resolution;
        
        // Set time direction
        window.timeDirection = schedule.timeDirection;
        
        // Clear existing categories
        window.categories = [];
        document.getElementById('categories').innerHTML = '';
        
        // Load categories
        schedule.categories.forEach(cat => {
            window.categories.push(cat.name);
            const categorySpan = document.createElement('span');
            categorySpan.className = 'category';
            categorySpan.textContent = cat.name;
            categorySpan.style.backgroundColor = cat.color;
            categorySpan.addEventListener('click', function() {
                document.querySelectorAll('.category').forEach(c => c.classList.remove('selected'));
                categorySpan.classList.add('selected');
                window.selectedCat = cat.name;
            });
            document.getElementById('categories').appendChild(categorySpan);
        });
        
        // Load grid data
        window.gridData = schedule.gridData.map(day => day.slice());
        
        // Load day types
        window.dayTypes = { ...schedule.dayTypes };
        
        // Reinitialize grid
        if (typeof initGrid === 'function') {
            initGrid();
        } else if (typeof resetGrid === 'function') {
            resetGrid();
        }
        
        console.log(`Loaded ${resolution}-minute sample schedule`);
        return true;
    } catch (error) {
        console.error("Error loading sample schedule:", error);
        return false;
    }
}

// Function to clear all schedule data
function clearSchedule() {
    try {
        // Clear grid data
        window.gridData = Array(7).fill().map(() => []);
        
        // Clear day types
        window.dayTypes = {};
        
        // Clear undo stack
        if (window.undoStack) {
            window.undoStack = [];
        }
        
        // Reset selected category
        window.selectedCat = null;
        document.querySelectorAll('.category').forEach(cat => cat.classList.remove('selected'));
        
        // Reinitialize grid
        if (typeof initGrid === 'function') {
            initGrid();
        } else if (typeof resetGrid === 'function') {
            resetGrid();
        }
        
        // Clear totals
        const totalsDiv = document.getElementById('totals');
        if (totalsDiv) {
            totalsDiv.innerHTML = '';
        }
        
        console.log("Schedule cleared");
        return true;
    } catch (error) {
        console.error("Error clearing schedule:", error);
        return false;
    }
}

// Make functions globally available
window.loadSampleSchedule = loadSampleSchedule;
window.clearSchedule = clearSchedule;
window.sampleSchedules = sampleSchedules;
