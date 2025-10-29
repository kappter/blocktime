// Global variables
        let currentDate = new Date(); // Today's date
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

        // Lifestyle templates with proper time allocation
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
                    // Hours 0-7: Sleep (8 hours)
                    0: 'sleep', 1: 'sleep', 2: 'sleep', 3: 'sleep', 4: 'sleep', 5: 'sleep', 6: 'sleep', 7: 'sleep',
                    // Hours 8-11: Recovery/Prep (4 hours)
                    8: 'recovery', 9: 'recovery', 10: 'recovery', 11: 'recovery',
                    // Hours 12-14: Meals (3 hours)
                    12: 'meals', 13: 'meals', 14: 'meals',
                    // Hours 15-18: Training (4 hours)
                    15: 'training', 16: 'training', 17: 'training', 18: 'training',
                    // Hours 19-20: Recovery (2 hours)
                    19: 'recovery', 20: 'recovery',
                    // Hours 21-22: Media/Personal (2 hours)
                    21: 'media', 22: 'therapy',
                    // Hour 23: Recovery
                    23: 'recovery'
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
                    dayData[time] = category;
                }
            });
            
            if (Object.keys(dayData).length > 0) {
                scheduleData[dateKey] = dayData;
            } else {
                delete scheduleData[dateKey];
            }
        }

        function loadCurrentDay() {
            const dateKey = formatDateKey(currentDate);
            const dayData = scheduleData[dateKey] || {};
            
            // Clear current time slots
            const timeSlots = document.querySelectorAll('.time-slot');
            timeSlots.forEach(slot => {
                const time = slot.dataset.time;
                slot.className = 'time-slot';
                slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">Available</div>`;
                delete slot.dataset.category;
            });
            
            // Load saved data
            Object.keys(dayData).forEach(time => {
                const category = dayData[time];
                const slot = document.querySelector(`[data-time="${time}"]`);
                if (slot) {
                    const categoryObj = categories.find(c => c.id === category);
                    if (categoryObj) {
                        slot.className = `time-slot occupied ${category}`;
                        slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">${categoryObj.name}</div>`;
                        slot.dataset.category = category;
                    }
                }
            });
            
            updateSummary();
        }

        // Resolution change
        function changeResolution() {
            const newResolution = parseInt(document.getElementById('resolution').value);
            if (newResolution !== resolution) {
                saveCurrentDay();
                resolution = newResolution;
                generateTimeGrid();
                loadCurrentDay();
            }
        }

        // Generate time grid based on resolution
        function generateTimeGrid() {
            const timeGrid = document.getElementById('timeGrid');
            timeGrid.innerHTML = '';
            
            const slotsPerHour = 60 / resolution;
            
            // Create wrapper for multi-column layout
            const wrapper = document.createElement('div');
            wrapper.className = 'time-grid-wrapper';
            
            // Define time periods (3 columns)
            const periods = [
                { name: '🌙 Night/Early Morning (12AM-7:59AM)', start: 0, end: 8 },
                { name: '☀️ Daytime (8AM-3:59PM)', start: 8, end: 16 },
                { name: '🌆 Evening/Night (4PM-11:59PM)', start: 16, end: 24 }
            ];
            
            // Create each column
            periods.forEach(period => {
                const column = document.createElement('div');
                column.className = 'time-column';
                
                // Column header
                const header = document.createElement('div');
                header.className = 'time-column-header';
                header.textContent = period.name;
                column.appendChild(header);
                
                // Generate time slots for this period
                for (let hour = period.start; hour < period.end; hour++) {
                    for (let slot = 0; slot < slotsPerHour; slot++) {
                        const minute = slot * resolution;
                        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                        
                        // Combined time slot (shows time + status/category)
                        const timeSlot = document.createElement('div');
                        timeSlot.className = 'time-slot';
                        timeSlot.innerHTML = `<div class="time-label">${timeString}</div><div class="slot-content">Available</div>`;
                        timeSlot.dataset.time = timeString;
                        timeSlot.onclick = () => assignCategory(timeSlot);
                        timeSlot.onmouseenter = () => previewCategory(timeSlot);
                        timeSlot.onmouseleave = () => clearPreview(timeSlot);
                        column.appendChild(timeSlot);
                    }
                }
                
                wrapper.appendChild(column);
            });
            
            timeGrid.appendChild(wrapper);
        }

        // Category management
        function renderCategories() {
            const categoriesContainer = document.getElementById('categories');
            categoriesContainer.innerHTML = '';
            
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = `category ${category.id}`;
                categoryElement.style.backgroundColor = category.color;
                categoryElement.onclick = () => selectCategory(category.id);
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = category.name;
                categoryElement.appendChild(nameSpan);
                
                // Add delete button for custom categories (not default ones)
                if (!['sleep', 'work', 'exercise', 'meals', 'commute', 'leisure', 'study', 'family'].includes(category.id)) {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.textContent = '×';
                    deleteBtn.onclick = (e) => {
                        e.stopPropagation();
                        deleteCategory(category.id);
                    };
                    categoryElement.appendChild(deleteBtn);
                }
                
                categoriesContainer.appendChild(categoryElement);
            });
        }

        function selectCategory(categoryId) {
            selectedCategory = categoryId;
            
            // Update visual selection
            document.querySelectorAll('.category').forEach(cat => {
                cat.classList.remove('selected');
            });
            
            const selectedElement = document.querySelector(`.category.${categoryId}`);
            if (selectedElement) {
                selectedElement.classList.add('selected');
            }
        }

        function addCategory() {
            const nameInput = document.getElementById('categoryName');
            const colorInput = document.getElementById('categoryColor');
            const name = nameInput.value.trim();
            const color = colorInput.value;
            
            if (!name) {
                alert('Please enter a category name');
                return;
            }
            
            // Check for duplicates
            if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
                alert('Category already exists');
                return;
            }
            
            const id = name.toLowerCase().replace(/\s+/g, '');
            categories.push({ name, color, id });
            
            // Add CSS for the new category
            const style = document.createElement('style');
            style.textContent = `
                .category.${id} { background: ${color} !important; color: white; }
                .time-slot.${id} { background: ${color} !important; }
            `;
            document.head.appendChild(style);
            
            renderCategories();
            nameInput.value = '';
            colorInput.value = '#c4a484';
        }

        function deleteCategory(categoryId) {
            if (confirm('Are you sure you want to delete this category?')) {
                categories = categories.filter(cat => cat.id !== categoryId);
                
                // Remove from time slots
                document.querySelectorAll(`.time-slot.${categoryId}`).forEach(slot => {
                    slot.className = 'time-slot';
                    slot.textContent = 'Available';
                    delete slot.dataset.category;
                });
                
                renderCategories();
                updateSummary();
            }
        }

        // Time slot interaction
        function assignCategory(slot) {
            if (!selectedCategory) {
                alert('Please select a category first');
                return;
            }
            
            const categoryObj = categories.find(c => c.id === selectedCategory);
            if (!categoryObj) return;
            
            const time = slot.dataset.time;
            slot.className = `time-slot occupied ${selectedCategory}`;
            slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">${categoryObj.name}</div>`;
            slot.dataset.category = selectedCategory;
            
            updateSummary();
        }

        function previewCategory(slot) {
            if (!selectedCategory || slot.classList.contains('occupied')) return;
            
            const categoryObj = categories.find(c => c.id === selectedCategory);
            if (!categoryObj) return;
            
            const time = slot.dataset.time;
            slot.classList.add('preview');
            const slotContent = slot.querySelector('.slot-content');
            if (slotContent) slotContent.textContent = categoryObj.name;
        }

        function clearPreview(slot) {
            if (slot.classList.contains('preview')) {
                slot.classList.remove('preview');
                if (!slot.classList.contains('occupied')) {
                    const slotContent = slot.querySelector('.slot-content');
                    if (slotContent) slotContent.textContent = 'Available';
                }
            }
        }

        // Template loading with proper resolution support
        function loadTemplate() {
            const templateSelect = document.getElementById('templateSelect');
            const templateId = templateSelect.value;
            
            if (!templateId) {
                alert('Please select a template');
                return;
            }
            
            const template = lifestyleTemplates[templateId];
            if (!template) return;
            
            // Update categories
            categories = [...template.categories];
            
            // Add CSS for template categories
            template.categories.forEach(category => {
                const existingStyle = document.querySelector(`style[data-category="${category.id}"]`);
                if (!existingStyle) {
                    const style = document.createElement('style');
                    style.setAttribute('data-category', category.id);
                    style.textContent = `
                        .category.${category.id} { background: ${category.color} !important; color: white; }
                        .time-slot.${category.id} { background: ${category.color} !important; }
                    `;
                    document.head.appendChild(style);
                }
            });
            
            renderCategories();
            
            // Clear current schedule
            document.querySelectorAll('.time-slot').forEach(slot => {
                const time = slot.dataset.time;
                slot.className = 'time-slot';
                slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">Available</div>`;
                delete slot.dataset.category;
            });
            
            // Apply template schedule based on current resolution
            const slotsPerHour = 60 / resolution;
            
            Object.keys(template.schedule).forEach(hour => {
                const hourNum = parseInt(hour);
                const categoryId = template.schedule[hour];
                const categoryObj = template.categories.find(c => c.id === categoryId);
                
                if (categoryObj) {
                    // Fill all slots for this hour based on resolution
                    for (let slot = 0; slot < slotsPerHour; slot++) {
                        const minute = slot * resolution;
                        const timeString = `${hourNum.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                        const timeSlot = document.querySelector(`[data-time="${timeString}"]`);
                        
                        if (timeSlot) {
                            timeSlot.className = `time-slot occupied ${categoryId}`;
                            timeSlot.innerHTML = `<div class="time-label">${timeString}</div><div class="slot-content">${categoryObj.name}</div>`;
                            timeSlot.dataset.category = categoryId;
                        }
                    }
                }
            });
            
            // Save the template to current day
            saveCurrentDay();
            updateSummary();
            alert(`${template.name} template loaded successfully for ${formatDateDisplay(currentDate)}!`);
        }

        // Week view
        function updateWeekView() {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                
                const dayElement = document.getElementById(`weekDay${i}`);
                if (dayElement) {
                    dayElement.textContent = day.getDate();
                    
                    const weekDayElement = dayElement.parentElement;
                    weekDayElement.classList.remove('today', 'has-data');
                    
                    // Mark today
                    if (day.toDateString() === currentDate.toDateString()) {
                        weekDayElement.classList.add('today');
                    }
                    
                    // Mark days with data
                    const dateKey = formatDateKey(day);
                    if (scheduleData[dateKey] && Object.keys(scheduleData[dateKey]).length > 0) {
                        weekDayElement.classList.add('has-data');
                    }
                }
            }
        }

        function toggleWeekDay(dayIndex) {
            const dayElement = document.querySelector(`[data-day="${dayIndex}"]`);
            if (selectedWeekDays.includes(dayIndex)) {
                selectedWeekDays = selectedWeekDays.filter(d => d !== dayIndex);
                dayElement.classList.remove('selected');
            } else {
                selectedWeekDays.push(dayIndex);
                dayElement.classList.add('selected');
            }
        }

        function applyToWeekDays() {
            if (selectedWeekDays.length === 0) {
                alert('Please select days to apply the current schedule to');
                return;
            }
            
            const currentDayData = {};
            document.querySelectorAll('.time-slot.occupied').forEach(slot => {
                const time = slot.dataset.time;
                const category = slot.dataset.category;
                if (time && category) {
                    currentDayData[time] = category;
                }
            });
            
            if (Object.keys(currentDayData).length === 0) {
                alert('No schedule data to apply');
                return;
            }
            
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            
            selectedWeekDays.forEach(dayIndex => {
                const targetDate = new Date(startOfWeek);
                targetDate.setDate(startOfWeek.getDate() + dayIndex);
                const dateKey = formatDateKey(targetDate);
                scheduleData[dateKey] = { ...currentDayData };
            });
            
            // Clear selections
            selectedWeekDays = [];
            document.querySelectorAll('.week-day.selected').forEach(day => {
                day.classList.remove('selected');
            });
            
            updateWeekView();
            updateTotals();
            alert('Schedule applied to selected days!');
        }

        // Calendar
        function generateCalendar() {
            const calendarGrid = document.querySelector('.calendar-grid');
            const headerDays = calendarGrid.querySelectorAll('.calendar-header-day');
            
            // Remove existing day elements
            const existingDays = calendarGrid.querySelectorAll('.calendar-day');
            existingDays.forEach(day => day.remove());
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Update month display
            document.getElementById('calendarMonth').textContent = 
                new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = date.getDate();
                dayElement.onclick = () => toggleMonthDay(date);
                
                // Mark today
                if (date.toDateString() === currentDate.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Mark days with data
                const dateKey = formatDateKey(date);
                if (scheduleData[dateKey] && Object.keys(scheduleData[dateKey]).length > 0) {
                    dayElement.classList.add('has-data');
                }
                
                // Dim days from other months
                if (date.getMonth() !== month) {
                    dayElement.style.opacity = '0.3';
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
            updateTotals();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
            updateTotals();
        }

        function toggleMonthDay(date) {
            const dateKey = formatDateKey(date);
            const dayElement = event.target;
            
            if (selectedMonthDays.includes(dateKey)) {
                selectedMonthDays = selectedMonthDays.filter(d => d !== dateKey);
                dayElement.classList.remove('selected');
            } else {
                selectedMonthDays.push(dateKey);
                dayElement.classList.add('selected');
            }
        }

        function applyToMonthDays() {
            if (selectedMonthDays.length === 0) {
                alert('Please select days to apply the current schedule to');
                return;
            }
            
            const currentDayData = {};
            document.querySelectorAll('.time-slot.occupied').forEach(slot => {
                const time = slot.dataset.time;
                const category = slot.dataset.category;
                if (time && category) {
                    currentDayData[time] = category;
                }
            });
            
            if (Object.keys(currentDayData).length === 0) {
                alert('No schedule data to apply');
                return;
            }
            
            selectedMonthDays.forEach(dateKey => {
                scheduleData[dateKey] = { ...currentDayData };
            });
            
            // Clear selections
            selectedMonthDays = [];
            document.querySelectorAll('.calendar-day.selected').forEach(day => {
                day.classList.remove('selected');
            });
            
            generateCalendar();
            updateTotals();
            alert('Schedule applied to selected days!');
        }

        // Summary and totals
        function updateSummary() {
            const summaryContent = document.getElementById('summaryContent');
            const occupiedSlots = document.querySelectorAll('.time-slot.occupied');
            
            if (occupiedSlots.length === 0) {
                summaryContent.innerHTML = `
                    <p>No activities planned yet</p>
                    <p>Start by selecting a category and clicking time slots, or load a lifestyle template!</p>
                `;
                return;
            }
            
            const categoryTotals = {};
            occupiedSlots.forEach(slot => {
                const category = slot.dataset.category;
                const categoryObj = categories.find(c => c.id === category);
                if (categoryObj) {
                    const categoryName = categoryObj.name;
                    categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + (resolution / 60);
                }
            });
            
            let summaryHTML = '';
            Object.keys(categoryTotals).forEach(categoryName => {
                const hours = categoryTotals[categoryName];
                summaryHTML += `
                    <div class="summary-item">
                        <span class="total-category">${categoryName}</span>
                        <span class="total-hours">${hours.toFixed(1)} hours</span>
                    </div>
                `;
            });
            
            summaryContent.innerHTML = summaryHTML;
        }

        function updateTotals() {
            updateWeekTotals();
            updateMonthTotals();
        }

        function updateWeekTotals() {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            
            const weekTotals = {};
            
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                const dateKey = formatDateKey(day);
                const dayData = scheduleData[dateKey] || {};
                
                Object.values(dayData).forEach(categoryId => {
                    const categoryObj = categories.find(c => c.id === categoryId);
                    if (categoryObj) {
                        const categoryName = categoryObj.name;
                        weekTotals[categoryName] = (weekTotals[categoryName] || 0) + (resolution / 60);
                    }
                });
            }
            
            const weekTotalsElement = document.getElementById('weekTotals');
            if (Object.keys(weekTotals).length === 0) {
                weekTotalsElement.innerHTML = '<div class="total-item">No activities this week</div>';
            } else {
                let totalsHTML = '';
                Object.keys(weekTotals).forEach(categoryName => {
                    const hours = weekTotals[categoryName];
                    totalsHTML += `
                        <div class="total-item">
                            <span class="total-category">${categoryName}</span>
                            <span class="total-hours">${hours.toFixed(1)}h</span>
                        </div>
                    `;
                });
                weekTotalsElement.innerHTML = totalsHTML;
            }
        }

        function updateMonthTotals() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthTotals = {};
            
            Object.keys(scheduleData).forEach(dateKey => {
                const date = new Date(dateKey);
                if (date.getFullYear() === year && date.getMonth() === month) {
                    const dayData = scheduleData[dateKey];
                    Object.values(dayData).forEach(categoryId => {
                        const categoryObj = categories.find(c => c.id === categoryId);
                        if (categoryObj) {
                            const categoryName = categoryObj.name;
                            monthTotals[categoryName] = (monthTotals[categoryName] || 0) + (resolution / 60);
                        }
                    });
                }
            });
            
            const monthTotalsElement = document.getElementById('monthTotals');
            if (Object.keys(monthTotals).length === 0) {
                monthTotalsElement.innerHTML = '<div class="total-item">No activities this month</div>';
            } else {
                let totalsHTML = '';
                Object.keys(monthTotals).forEach(categoryName => {
                    const hours = monthTotals[categoryName];
                    totalsHTML += `
                        <div class="total-item">
                            <span class="total-category">${categoryName}</span>
                            <span class="total-hours">${hours.toFixed(1)}h</span>
                        </div>
                    `;
                });
                monthTotalsElement.innerHTML = totalsHTML;
            }
        }

        // Reset functions
        function resetDay() {
            if (confirm(`Are you sure you want to clear all activities for ${formatDateDisplay(currentDate)}?`)) {
                // Clear visual slots
                document.querySelectorAll('.time-slot').forEach(slot => {
                    const time = slot.dataset.time;
                    slot.className = 'time-slot';
                    slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">Available</div>`;
                    delete slot.dataset.category;
                });
                
                // Remove from storage
                const dateKey = formatDateKey(currentDate);
                delete scheduleData[dateKey];
                localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
                
                updateSummary();
                updateWeekView();
                alert('Day cleared successfully!');
            }
        }
        
        function resetAllData() {
            if (confirm('⚠️ WARNING: This will delete ALL your schedule data from the entire calendar. This cannot be undone!\n\nAre you absolutely sure?')) {
                if (confirm('Final confirmation: Delete ALL schedule data?')) {
                    // Clear all data
                    scheduleData = {};
                    localStorage.removeItem('scheduleData');
                    
                    // Clear visual slots
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        const time = slot.dataset.time;
                        slot.className = 'time-slot';
                        slot.innerHTML = `<div class="time-label">${time}</div><div class="slot-content">Available</div>`;
                        delete slot.dataset.category;
                    });
                    
                    updateSummary();
                    updateWeekView();
                    alert('All data has been cleared!');
                }
            }
        }

        // Export/Import functions
        function exportDay() {
            const dateKey = formatDateKey(currentDate);
            const dayData = scheduleData[dateKey] || {};
            
            const exportData = {
                date: dateKey,
                resolution: resolution,
                categories: categories,
                schedule: dayData
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `daily-schedule-${dateKey}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function importDay() {
            document.getElementById('importFile').click();
        }

        function handleImport() {
            const file = document.getElementById('importFile').files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    if (importData.schedule) {
                        // Single day import
                        const dateKey = importData.date || formatDateKey(currentDate);
                        scheduleData[dateKey] = importData.schedule;
                        
                        if (importData.categories) {
                            categories = importData.categories;
                            renderCategories();
                        }
                        
                        if (importData.resolution) {
                            resolution = importData.resolution;
                            document.getElementById('resolution').value = resolution;
                            generateTimeGrid();
                        }
                        
                        loadCurrentDay();
                        updateTotals();
                        alert('Day schedule imported successfully!');
                    } else if (importData.scheduleData) {
                        // Full calendar import
                        scheduleData = importData.scheduleData;
                        
                        if (importData.categories) {
                            categories = importData.categories;
                            renderCategories();
                        }
                        
                        loadCurrentDay();
                        updateWeekView();
                        generateCalendar();
                        updateTotals();
                        alert('Full calendar imported successfully!');
                    }
                } catch (error) {
                    alert('Error importing file: ' + error.message);
                }
            };
            reader.readAsText(file);
        }

        function exportFullCalendar() {
            const exportData = {
                scheduleData: scheduleData,
                categories: categories,
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `full-calendar-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function importCalendar() {
            document.getElementById('importFile').click();
        }

        // Calendar integration
        function exportICS() {
            let icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Daily Time Blocker//Ultimate Pro//EN',
                'CALSCALE:GREGORIAN'
            ];
            
            // Process each day
            Object.keys(scheduleData).forEach(dateKey => {
                const dayData = scheduleData[dateKey];
                const date = new Date(dateKey);
                
                // Sort times chronologically
                const sortedTimes = Object.keys(dayData).sort((a, b) => {
                    const [aH, aM] = a.split(':').map(Number);
                    const [bH, bM] = b.split(':').map(Number);
                    return (aH * 60 + aM) - (bH * 60 + bM);
                });
                
                // Merge consecutive blocks of same activity
                let mergedEvents = [];
                let currentEvent = null;
                
                sortedTimes.forEach(time => {
                    const categoryId = dayData[time];
                    const categoryObj = categories.find(c => c.id === categoryId);
                    
                    if (!categoryObj) return;
                    
                    const [hours, minutes] = time.split(':').map(Number);
                    const timeInMinutes = hours * 60 + minutes;
                    
                    if (!currentEvent || currentEvent.categoryId !== categoryId || 
                        timeInMinutes !== currentEvent.endMinutes) {
                        // Start new event
                        if (currentEvent) {
                            mergedEvents.push(currentEvent);
                        }
                        currentEvent = {
                            categoryId: categoryId,
                            categoryName: categoryObj.name,
                            startMinutes: timeInMinutes,
                            endMinutes: timeInMinutes + resolution
                        };
                    } else {
                        // Extend current event
                        currentEvent.endMinutes = timeInMinutes + resolution;
                    }
                });
                
                // Add last event
                if (currentEvent) {
                    mergedEvents.push(currentEvent);
                }
                
                // Create ICS events from merged blocks
                mergedEvents.forEach(event => {
                    const startTime = new Date(date);
                    startTime.setHours(Math.floor(event.startMinutes / 60), event.startMinutes % 60, 0, 0);
                    
                    const endTime = new Date(date);
                    endTime.setHours(Math.floor(event.endMinutes / 60), event.endMinutes % 60, 0, 0);
                    
                    const formatDateTime = (dt) => {
                        return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                    };
                    
                    icsContent.push(
                        'BEGIN:VEVENT',
                        `DTSTART:${formatDateTime(startTime)}`,
                        `DTEND:${formatDateTime(endTime)}`,
                        `SUMMARY:${event.categoryName}`,
                        `UID:${dateKey}-${event.startMinutes}-${event.categoryId}@dailytimeblocker.com`,
                        'END:VEVENT'
                    );
                });
            });
            
            icsContent.push('END:VCALENDAR');
            
            const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `schedule-${new Date().toISOString().split('T')[0]}.ics`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function exportGoogleCalendar() {
            exportICS();
            alert('ICS file downloaded! Import it into Google Calendar by going to Settings > Import & Export > Import.');
        }

        function exportOutlook() {
            exportICS();
            alert('ICS file downloaded! Import it into Outlook by going to File > Open & Export > Import/Export.');
        }

        // Reports and comparison
        function showReports() {
            const modal = document.getElementById('reportsModal');
            const content = document.getElementById('reportsContent');
            
            // Generate reports content
            content.innerHTML = `
                <div style="margin-bottom: 30px;">
                    <h3>📊 Time Allocation Analysis</h3>
                    <canvas id="reportsChart" width="400" height="200"></canvas>
                </div>
                <div>
                    <h3>📈 Weekly Summary</h3>
                    <div id="weeklyReportData"></div>
                </div>
            `;
            
            modal.classList.add('show');
            
            // Generate chart
            setTimeout(() => {
                generateReportsChart();
                generateWeeklyReport();
            }, 100);
        }

        function generateReportsChart() {
            const ctx = document.getElementById('reportsChart').getContext('2d');
            
            // Calculate current week totals
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            
            const weekTotals = {};
            
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                const dateKey = formatDateKey(day);
                const dayData = scheduleData[dateKey] || {};
                
                Object.values(dayData).forEach(categoryId => {
                    const categoryObj = categories.find(c => c.id === categoryId);
                    if (categoryObj) {
                        const categoryName = categoryObj.name;
                        weekTotals[categoryName] = (weekTotals[categoryName] || 0) + (resolution / 60);
                    }
                });
            }
            
            const labels = Object.keys(weekTotals);
            const data = Object.values(weekTotals);
            const colors = labels.map(label => {
                const category = categories.find(c => c.name === label);
                return category ? category.color : '#c4a484';
            });
            
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        title: {
                            display: true,
                            text: 'Weekly Time Distribution'
                        }
                    }
                }
            });
        }

        function generateWeeklyReport() {
            const reportData = document.getElementById('weeklyReportData');
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            
            let reportHTML = '<table style="width: 100%; border-collapse: collapse;">';
            reportHTML += '<tr><th style="border: 1px solid var(--border); padding: 8px;">Day</th><th style="border: 1px solid var(--border); padding: 8px;">Total Hours</th><th style="border: 1px solid var(--border); padding: 8px;">Top Activity</th></tr>';
            
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                const dateKey = formatDateKey(day);
                const dayData = scheduleData[dateKey] || {};
                
                const dayTotals = {};
                Object.values(dayData).forEach(categoryId => {
                    const categoryObj = categories.find(c => c.id === categoryId);
                    if (categoryObj) {
                        const categoryName = categoryObj.name;
                        dayTotals[categoryName] = (dayTotals[categoryName] || 0) + (resolution / 60);
                    }
                });
                
                const totalHours = Object.values(dayTotals).reduce((sum, hours) => sum + hours, 0);
                const topActivity = Object.keys(dayTotals).reduce((a, b) => dayTotals[a] > dayTotals[b] ? a : b, 'None');
                
                reportHTML += `<tr>
                    <td style="border: 1px solid var(--border); padding: 8px;">${day.toLocaleDateString('en-US', { weekday: 'long' })}</td>
                    <td style="border: 1px solid var(--border); padding: 8px;">${totalHours.toFixed(1)}</td>
                    <td style="border: 1px solid var(--border); padding: 8px;">${topActivity}</td>
                </tr>`;
            }
            
            reportHTML += '</table>';
            reportData.innerHTML = reportHTML;
        }

        function showComparison() {
            const modal = document.getElementById('comparisonModal');
            modal.classList.add('show');
        }

        function generateComparison() {
            const comparison1 = document.getElementById('comparison1').value;
            const comparison2 = document.getElementById('comparison2').value;
            const resultsDiv = document.getElementById('comparisonResults');
            
            if (comparison1 === comparison2) {
                alert('Please select two different schedules to compare');
                return;
            }
            
            // Get data for both schedules
            const data1 = getScheduleData(comparison1);
            const data2 = getScheduleData(comparison2);
            
            // Generate comparison
            let comparisonHTML = `
                <div style="margin-bottom: 30px;">
                    <h3>📊 Schedule Comparison: ${getScheduleName(comparison1)} vs ${getScheduleName(comparison2)}</h3>
                    <canvas id="comparisonChart" width="400" height="200"></canvas>
                </div>
                <div>
                    <h3>📈 Detailed Comparison</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th style="border: 1px solid var(--border); padding: 8px;">Category</th>
                            <th style="border: 1px solid var(--border); padding: 8px;">${getScheduleName(comparison1)}</th>
                            <th style="border: 1px solid var(--border); padding: 8px;">${getScheduleName(comparison2)}</th>
                            <th style="border: 1px solid var(--border); padding: 8px;">Difference</th>
                        </tr>
            `;
            
            const allCategories = new Set([...Object.keys(data1), ...Object.keys(data2)]);
            
            allCategories.forEach(category => {
                const hours1 = data1[category] || 0;
                const hours2 = data2[category] || 0;
                const difference = hours1 - hours2;
                const diffText = difference > 0 ? `+${difference.toFixed(1)}h` : `${difference.toFixed(1)}h`;
                
                comparisonHTML += `<tr>
                    <td style="border: 1px solid var(--border); padding: 8px;">${category}</td>
                    <td style="border: 1px solid var(--border); padding: 8px;">${hours1.toFixed(1)}h</td>
                    <td style="border: 1px solid var(--border); padding: 8px;">${hours2.toFixed(1)}h</td>
                    <td style="border: 1px solid var(--border); padding: 8px; color: ${difference > 0 ? 'green' : difference < 0 ? 'red' : 'inherit'}">${diffText}</td>
                </tr>`;
            });
            
            comparisonHTML += '</table></div>';
            resultsDiv.innerHTML = comparisonHTML;
            
            // Generate comparison chart
            setTimeout(() => {
                generateComparisonChart(data1, data2, getScheduleName(comparison1), getScheduleName(comparison2));
            }, 100);
        }

        function getScheduleData(scheduleId) {
            if (scheduleId === 'current') {
                // Get current day data
                const dateKey = formatDateKey(currentDate);
                const dayData = scheduleData[dateKey] || {};
                const totals = {};
                
                Object.values(dayData).forEach(categoryId => {
                    const categoryObj = categories.find(c => c.id === categoryId);
                    if (categoryObj) {
                        const categoryName = categoryObj.name;
                        totals[categoryName] = (totals[categoryName] || 0) + (resolution / 60);
                    }
                });
                
                return totals;
            } else {
                // Get template data
                const template = lifestyleTemplates[scheduleId];
                if (!template) return {};
                
                const totals = {};
                Object.values(template.schedule).forEach(categoryId => {
                    const categoryObj = template.categories.find(c => c.id === categoryId);
                    if (categoryObj) {
                        const categoryName = categoryObj.name;
                        totals[categoryName] = (totals[categoryName] || 0) + 1; // 1 hour per slot
                    }
                });
                
                return totals;
            }
        }

        function getScheduleName(scheduleId) {
            if (scheduleId === 'current') return 'Current Schedule';
            const template = lifestyleTemplates[scheduleId];
            return template ? template.name : scheduleId;
        }

        function generateComparisonChart(data1, data2, name1, name2) {
            const ctx = document.getElementById('comparisonChart').getContext('2d');
            
            const allCategories = new Set([...Object.keys(data1), ...Object.keys(data2)]);
            const labels = Array.from(allCategories);
            const dataset1 = labels.map(cat => data1[cat] || 0);
            const dataset2 = labels.map(cat => data2[cat] || 0);
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: name1,
                            data: dataset1,
                            backgroundColor: 'rgba(196, 164, 132, 0.7)',
                            borderColor: 'rgba(196, 164, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: name2,
                            data: dataset2,
                            backgroundColor: 'rgba(122, 155, 118, 0.7)',
                            borderColor: 'rgba(122, 155, 118, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Time Allocation Comparison'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        }
                    }
                }
            });
        }


        function showHowToUse() {
            const modal = document.getElementById('howToUseModal');
            modal.classList.add('show');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }

        // Initialize the application when the page loads
        document.addEventListener('DOMContentLoaded', init);