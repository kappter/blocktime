// Global variables
let currentDate = new Date(2025, 9, 14); // October 14, 2025
let selectedCategory = null;
let resolution = 60; // minutes
let scheduleData = {}; // Store all schedule data by date
let selectedWeekDays = [];
let selectedMonthDays = [];
let categories = [
    { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
    { name: 'Work', color: '#6b8b9a', id: 'work' },
    { name: 'Exercise', color: '#7a9b76', id: 'exercise' },
    { name: 'Meals', color: '#d4a574', id: 'meals' },
    { name: 'Commute', color: '#9a8b7d', id: 'commute' },
    { name: 'Leisure', color: '#b8956f', id: 'leisure' },
    { name: 'Study', color: '#7d8b9a', id: 'study' },
    { name: 'Family', color: '#9b7a8b', id: 'family' }
];

// Lifestyle templates
const lifestyleTemplates = {
    athlete: {
        name: "Professional Athlete",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Training', color: '#5a8a9a', id: 'training' },
            { name: 'Recovery', color: '#8a9b7a', id: 'recovery' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Therapy', color: '#9a7a6b', id: 'therapy' },
            { name: 'Media', color: '#b87a9b', id: 'media' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
            8: 'recovery', 9: 'recovery', 10: 'recovery', 11: 'recovery',
            12: 'meals', 13: 'meals', 14: 'meals',
            15: 'training', 16: 'training', 17: 'training', 18: 'training',
            19: 'recovery', 20: 'recovery',
            21: 'media', 22: 'therapy', 23: 'recovery'
        }
    },
    musician: {
        name: "Professional Musician",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Practice', color: '#7d8b9a', id: 'practice' },
            { name: 'Performance', color: '#b87a9b', id: 'performance' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Business', color: '#6b8b9a', id: 'business' },
            { name: 'Leisure', color: '#b8956f', id: 'leisure' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
            8: 'meals', 9: 'business', 10: 'business', 11: 'practice',
            12: 'meals', 13: 'practice', 14: 'practice', 15: 'practice',
            16: 'practice', 17: 'meals', 18: 'performance', 19: 'performance',
            20: 'performance', 21: 'performance', 22: 'leisure', 23: 'leisure'
        }
    },
    college: {
        name: "College Student",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Classes', color: '#7d8b9a', id: 'classes' },
            { name: 'Study', color: '#6b8b9a', id: 'study' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Social', color: '#b8956f', id: 'social' },
            { name: 'Exercise', color: '#7a9b76', id: 'exercise' },
            { name: 'Work', color: '#9a8b7d', id: 'work' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
            8: 'meals', 9: 'classes', 10: 'classes', 11: 'classes',
            12: 'meals', 13: 'study', 14: 'study', 15: 'work',
            16: 'work', 17: 'exercise', 18: 'meals', 19: 'study',
            20: 'study', 21: 'social', 22: 'social', 23: 'social'
        }
    },
    highschool: {
        name: "High School Student",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'School', color: '#7d8b9a', id: 'school' },
            { name: 'Homework', color: '#6b8b9a', id: 'homework' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Activities', color: '#7a9b76', id: 'activities' },
            { name: 'Family', color: '#9b7a8b', id: 'family' },
            { name: 'Free Time', color: '#b8956f', id: 'freetime' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep',
            7: 'meals', 8: 'school', 9: 'school', 10: 'school', 11: 'school',
            12: 'meals', 13: 'school', 14: 'school', 15: 'activities',
            16: 'activities', 17: 'homework', 18: 'meals', 19: 'homework',
            20: 'family', 21: 'freetime', 22: 'freetime', 23: 'sleep'
        }
    },
    middleschool: {
        name: "Middle School Student",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'School', color: '#7d8b9a', id: 'school' },
            { name: 'Homework', color: '#6b8b9a', id: 'homework' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Play', color: '#7a9b76', id: 'play' },
            { name: 'Family', color: '#9b7a8b', id: 'family' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
            8: 'meals', 9: 'school', 10: 'school', 11: 'school',
            12: 'meals', 13: 'school', 14: 'school', 15: 'play',
            16: 'play', 17: 'homework', 18: 'meals', 19: 'family',
            20: 'family', 21: 'play', 22: 'sleep', 23: 'sleep'
        }
    },
    workingdad: {
        name: "Working Dad",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Work', color: '#6b8b9a', id: 'work' },
            { name: 'Commute', color: '#9a8b7d', id: 'commute' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Family', color: '#9b7a8b', id: 'family' },
            { name: 'Exercise', color: '#7a9b76', id: 'exercise' },
            { name: 'Personal', color: '#b8956f', id: 'personal' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep',
            6: 'exercise', 7: 'meals', 8: 'commute', 9: 'work', 10: 'work', 11: 'work',
            12: 'meals', 13: 'work', 14: 'work', 15: 'work', 16: 'work', 17: 'commute',
            18: 'meals', 19: 'family', 20: 'family', 21: 'family', 22: 'personal', 23: 'sleep'
        }
    },
    workingmom: {
        name: "Working Mom",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Work', color: '#6b8b9a', id: 'work' },
            { name: 'Commute', color: '#9a8b7d', id: 'commute' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Family', color: '#9b7a8b', id: 'family' },
            { name: 'Household', color: '#8a9b7a', id: 'household' },
            { name: 'Personal', color: '#b8956f', id: 'personal' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep',
            6: 'household', 7: 'meals', 8: 'commute', 9: 'work', 10: 'work', 11: 'work',
            12: 'meals', 13: 'work', 14: 'work', 15: 'work', 16: 'work', 17: 'commute',
            18: 'meals', 19: 'family', 20: 'family', 21: 'household', 22: 'personal', 23: 'sleep'
        }
    },
    stayathome: {
        name: "Stay-at-Home Parent",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Childcare', color: '#9b7a8b', id: 'childcare' },
            { name: 'Household', color: '#8a9b7a', id: 'household' },
            { name: 'Meals', color: '#d4a574', id: 'meals' },
            { name: 'Exercise', color: '#7a9b76', id: 'exercise' },
            { name: 'Personal', color: '#b8956f', id: 'personal' },
            { name: 'Errands', color: '#9a8b7d', id: 'errands' }
        ],
        schedule: {
            0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep',
            6: 'personal', 7: 'meals', 8: 'childcare', 9: 'household', 10: 'errands', 11: 'household',
            12: 'meals', 13: 'childcare', 14: 'childcare', 15: 'childcare', 16: 'exercise', 17: 'household',
            18: 'meals', 19: 'childcare', 20: 'childcare', 21: 'personal', 22: 'personal', 23: 'sleep'
        }
    },
    rockstar: {
        name: "Rock Star",
        categories: [
            { name: 'Sleep', color: '#8b7d6b', id: 'sleep' },
            { name: 'Performance', color: '#b87a9b', id: 'performance' },
            { name: 'Recording', color: '#7d8b9a', id: 'recording' },
            { name: 'Rehearsal', color: '#6b8b9a', id: 'rehearsal' },
            { name: 'Travel', color: '#9a8b7d', id: 'travel' },
            { name: 'Interviews', color: '#8a9b7a', id: 'interviews' },
            { name: 'Party', color: '#b8956f', id: 'party' }
        ],
        schedule: {
            0: 'party', 1: 'party', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
            8: 'sleep', 9: 'sleep', 10: 'interviews', 11: 'recording',
            12: 'recording', 13: 'recording', 14: 'rehearsal', 15: 'rehearsal',
            16: 'travel', 17: 'travel', 18: 'performance', 19: 'performance',
            20: 'performance', 21: 'performance', 22: 'party', 23: 'party'
        }
    }
};

// Initialize the application
function init() {
    updateDateDisplay();
    generateTimeGrid();
    renderCategories();
    generateCalendar();
    updateWeekView();
    updateTotals();
    
    // Set up date picker
    const datePicker = document.getElementById('datePicker');
    datePicker.value = formatDateForInput(currentDate);
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const button = document.querySelector('.theme-toggle');
    
    if (body.hasAttribute('data-theme')) {
        body.removeAttribute('data-theme');
        button.textContent = '☀️ Light';
    } else {
        body.setAttribute('data-theme', 'dark');
        button.textContent = '🌙 Dark';
    }
}

// Date navigation
function previousDay() {
    saveCurrentDay();
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
    loadCurrentDay();
    updateWeekView();
    updateTotals();
}

function nextDay() {
    saveCurrentDay();
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
    loadCurrentDay();
    updateWeekView();
    updateTotals();
}

function goToDate() {
    const datePicker = document.getElementById('datePicker');
    const newDate = new Date(datePicker.value);
    if (!isNaN(newDate.getTime())) {
        saveCurrentDay();
        currentDate = newDate;
        updateDateDisplay();
        loadCurrentDay();
        updateWeekView();
        updateTotals();
    }
}

function updateDateDisplay() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('datePicker').value = formatDateForInput(currentDate);
    
    // Update summary title
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('summaryTitle').textContent = `${dayName}'s Summary`;
    
    // Update schedule status
    const dateKey = formatDateKey(currentDate);
    const hasData = scheduleData[dateKey] && Object.keys(scheduleData[dateKey]).length > 0;
    const statusElement = document.getElementById('scheduleStatus');
    
    if (hasData) {
        statusElement.textContent = '✅ Schedule data available';
        statusElement.className = 'schedule-status schedule-available';
    } else {
        statusElement.textContent = 'No schedule data for this day';
        statusElement.className = 'schedule-status schedule-empty';
    }
}

function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

// Save and load day data
function saveCurrentDay() {
    const dateKey = formatDateKey(currentDate);
    const dayData = {};
    
    // Save time slots
    const timeSlots = document.querySelectorAll('.time-slot.occupied');
    timeSlots.forEach(slot => {
        const time = slot.dataset.time;
        const category = slot.dataset.category;
        if (time && category) {
            dayData[time]
