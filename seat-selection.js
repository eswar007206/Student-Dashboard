// Get lecture ID from URL
const urlParams = new URLSearchParams(window.location.search);
const lectureId = parseInt(urlParams.get('lectureId')) || 1;

// Mock Lecture Data (same as dashboard)
const mockLectures = [
    {
        id: 1,
        courseTitle: "Introduction to Python",
        program: "Engineering",
        date: "2025-10-10",
        time: "10:00 AM",
        roomNo: "BHM-333",
        teacher: "Dr. Gireesha",
        course: "Robotics",
        availableSeats: 45
    },
    {
        id: 2,
        courseTitle: "DSA with C++",
        program: "Engineering",
        date: "2025-10-11",
        time: "2:00 PM",
        roomNo: "BHM-332",
        teacher: "Prof. Shoba",
        course: "Information Technology",
        availableSeats: 30
    },
    {
        id: 3,
        courseTitle: "Biotechnology Basics",
        program: "Life Sciences",
        date: "2025-10-12",
        time: "11:30 AM",
        roomNo: "BHM-222",
        teacher: "Dr. Swathika",
        course: "Microbiology",
        availableSeats: 25
    },
    {
        id: 4,
        courseTitle: "Web Development Basics",
        program: "Engineering",
        date: "2025-10-13",
        time: "9:00 AM",
        roomNo: "BHM-332",
        teacher: "Prof. Eswar",
        course: "Computer Science",
        availableSeats: 40
    },
    {
        id: 5,
        courseTitle: "Hotel Management 101",
        program: "Hotel Management",
        date: "2025-10-14",
        time: "3:00 PM",
        roomNo: "BHM-201",
        teacher: "Dr. Rachel Green",
        course: "Hotel Management",
        availableSeats: 35
    },
    {
        id: 6,
        courseTitle: "Cloud Computing Essentials",
        program: "Engineering",
        date: "2025-10-15",
        time: "1:00 PM",
        roomNo: "BHM-305",
        teacher: "Prof. Buddesab",
        course: "Data Science",
        availableSeats: 28
    },
    {
        id: 7,
        courseTitle: "Bioinformatics Introduction",
        program: "Life Sciences",
        date: "2025-10-16",
        time: "10:30 AM",
        roomNo: "West Block-202",
        teacher: "Dr. Sarah",
        course: "Biotechnology",
        availableSeats: 20
    },
    {
        id: 8,
        courseTitle: "Hotel Management Basics",
        program: "Hotel Management",
        date: "2025-10-17",
        time: "2:30 PM",
        roomNo: "Crystal Block-150",
        teacher: "Prof. Robert Brown",
        course: "Hotel Management",
        availableSeats: 32
    }
];

// Find current lecture
const currentLecture = mockLectures.find(l => l.id === lectureId) || mockLectures[0];

// Classroom configuration
const ROWS = 6;
const SEATS_PER_ROW = 10;

// State management
let selectedSeat = null;
let bookedSeats = generateRandomBookedSeats();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderLectureInfo();
    renderClassroom();
});

// Generate random booked seats
function generateRandomBookedSeats() {
    const booked = new Set();
    const bookedCount = currentLecture.totalSeats - currentLecture.availableSeats;
    
    while (booked.size < bookedCount) {
        const row = Math.floor(Math.random() * ROWS) + 1;
        const seat = Math.floor(Math.random() * SEATS_PER_ROW) + 1;
        booked.add(`${row}-${seat}`);
    }
    
    return booked;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Render lecture information
function renderLectureInfo() {
    const lectureInfoDiv = document.getElementById('lectureInfo');
    
    const infoHTML = `
        <div class="info-header">
            <div class="info-title-section">
                <h2>${currentLecture.courseTitle}</h2>
                <span class="program-badge">${currentLecture.program}</span>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${formatDate(currentLecture.date)} • ${currentLecture.time}</span>
            </div>
            
            <div class="info-item">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Room ${currentLecture.roomNo}</span>
            </div>
            
            <div class="info-item">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>${currentLecture.teacher}</span>
            </div>
            
            <div class="info-item">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>${currentLecture.availableSeats} Seats Available</span>
            </div>
        </div>
    `;
    
    lectureInfoDiv.innerHTML = infoHTML;
}

// Render classroom layout
function renderClassroom() {
    const seatsContainer = document.getElementById('seatsContainer');
    
    let classroomHTML = '';
    
    for (let row = 1; row <= ROWS; row++) {
        let rowHTML = `
            <div class="row">
                <div class="row-label">Row ${row}</div>
                <div class="row-seats">
        `;
        
        for (let seat = 1; seat <= SEATS_PER_ROW; seat++) {
            const seatId = `${row}-${seat}`;
            const isBooked = bookedSeats.has(seatId);
            const seatClass = isBooked ? 'booked' : 'available';
            const seatLabel = isBooked ? '❌' : '✓';
            
            rowHTML += `
                <button 
                    class="seat ${seatClass}" 
                    data-seat="${seatId}"
                    onclick="handleSeatClick('${seatId}')"
                    ${isBooked ? 'disabled' : ''}
                    aria-label="Seat ${seatId}"
                >
                    ${seat}
                </button>
            `;
        }
        
        rowHTML += `
                </div>
            </div>
        `;
        
        classroomHTML += rowHTML;
    }
    
    seatsContainer.innerHTML = classroomHTML;
}

// Handle seat selection
function handleSeatClick(seatId) {
    // If clicking the same seat, deselect it
    if (selectedSeat === seatId) {
        deselectSeat();
        return;
    }
    
    // Deselect previous seat if any
    if (selectedSeat) {
        const prevSeatBtn = document.querySelector(`[data-seat="${selectedSeat}"]`);
        if (prevSeatBtn) {
            prevSeatBtn.classList.remove('selected');
        }
    }
    
    // Select new seat
    selectedSeat = seatId;
    const seatBtn = document.querySelector(`[data-seat="${seatId}"]`);
    seatBtn.classList.add('selected');
    
    // Show booking summary
    showBookingSummary();
}

// Deselect seat
function deselectSeat() {
    if (selectedSeat) {
        const seatBtn = document.querySelector(`[data-seat="${selectedSeat}"]`);
        if (seatBtn) {
            seatBtn.classList.remove('selected');
        }
        selectedSeat = null;
        hideBookingSummary();
    }
}

// Show booking summary
function showBookingSummary() {
    const summary = document.getElementById('bookingSummary');
    const seatInfo = document.getElementById('selectedSeatInfo');
    
    const [row, seat] = selectedSeat.split('-');
    seatInfo.textContent = `Row ${row}, Seat ${seat}`;
    
    summary.style.display = 'block';
}

// Hide booking summary
function hideBookingSummary() {
    const summary = document.getElementById('bookingSummary');
    summary.style.display = 'none';
}

// Cancel selection
function cancelSelection() {
    deselectSeat();
}

// Confirm booking
function confirmBooking() {
    if (!selectedSeat) return;
    
    // Redirect to confirmation page with booking data
    window.location.href = "seat-confirmation.html?lectureId=" + lectureId + "&seatId=" + selectedSeat;
}

// Close modal and go back to dashboard
function closeModal() {
    window.location.href = 'index.html';
}

// Go back to dashboard
function goBack() {
    window.location.href = 'index.html';
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out... Goodbye! 👋');
        // In a real application, you would clear session and redirect
        // window.location.href = '/login';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to cancel selection
    if (e.key === 'Escape' && selectedSeat) {
        cancelSelection();
    }
    
    // Press 'Enter' to confirm booking
    if (e.key === 'Enter' && selectedSeat) {
        confirmBooking();
    }
});

// Console welcome message
console.log('%c🎟️ Seat Selection Page', 'font-size: 20px; font-weight: bold; color: #1B3C53;');
console.log('%cSelect your preferred seat for the lecture!', 'font-size: 14px; color: #6B5B4E;');
console.log('💡 Tip: Press "Escape" to cancel selection, "Enter" to confirm');


