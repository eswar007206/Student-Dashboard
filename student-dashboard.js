// Mock Lecture Data
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

// State management
let allLectures = [...mockLectures];
let filteredLectures = [...mockLectures];
let currentFilter = 'all';
let searchTerm = '';

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderLectures();
    addStaggeredAnimation();
});

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Create lecture card HTML
function createLectureCard(lecture, index) {
    return `
        <div class="lecture-card" style="animation-delay: ${index * 0.1}s">
            <div class="card-content">
                <div class="card-header">
                    <h3 class="course-title">${lecture.courseTitle}</h3>
                    <span class="program-badge">${lecture.program}</span>
                </div>
                
                <div class="card-details">
                    <div class="detail-item">
                        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${formatDate(lecture.date)} • ${lecture.time}</span>
                    </div>
                    
                    <div class="detail-item">
                        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Room ${lecture.roomNo}</span>
                    </div>
                    
                    <div class="detail-item">
                        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>${lecture.teacher}</span>
                    </div>

                    <div class="detail-item">
                        <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>${lecture.course}</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <p class="seats-info">
                        Available Seats: <span class="seats-count">${lecture.availableSeats}</span>
                    </p>
                </div>
                
                <button class="view-seats-btn" onclick="handleViewSeats(${lecture.id}, '${lecture.courseTitle}')">
                    View Seats
                </button>
            </div>
        </div>
    `;
}

// Render lectures to the DOM
function renderLectures() {
    const lecturesGrid = document.getElementById('lecturesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredLectures.length === 0) {
        lecturesGrid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        lecturesGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        const lecturesHTML = filteredLectures.map((lecture, index) => 
            createLectureCard(lecture, index)
        ).join('');
        
        lecturesGrid.innerHTML = lecturesHTML;
    }
}

// Handle search
function handleSearch(value) {
    searchTerm = value.toLowerCase().trim();
    applyFilters();
}

// Handle filter by program
function handleFilter(filterType) {
    currentFilter = filterType;
    
    // Update active chip
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        if (chip.dataset.filter === filterType) {
            chip.classList.add('chip-active');
        } else {
            chip.classList.remove('chip-active');
        }
    });
    
    applyFilters();
}

// Apply both search and filter
function applyFilters() {
    filteredLectures = allLectures.filter(lecture => {
        // Apply program filter
        const matchesFilter = currentFilter === 'all' || lecture.program === currentFilter;
        
        // Apply search filter
        const matchesSearch = searchTerm === '' || 
            lecture.courseTitle.toLowerCase().includes(searchTerm) ||
            lecture.program.toLowerCase().includes(searchTerm) ||
            lecture.teacher.toLowerCase().includes(searchTerm);
        
        return matchesFilter && matchesSearch;
    });
    
    renderLectures();
    addStaggeredAnimation();
}

// Handle view seats button click
function handleViewSeats(lectureId, courseTitle) {
    // Redirect to seat selection page with lecture ID
    window.location.href = `/seat-selection.html?lectureId=${lectureId}`;
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out... Goodbye! 👋');
        // In a real application, you would clear session and redirect
        // window.location.href = '/login';
    }
}

// Add staggered animation to cards
function addStaggeredAnimation() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.lecture-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 100);
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== document.getElementById('searchInput')) {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Press 'Escape' to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (document.activeElement === searchInput) {
            searchInput.value = '';
            handleSearch('');
            searchInput.blur();
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console welcome message
console.log('%c🎓 Student Dashboard', 'font-size: 20px; font-weight: bold; color: #1B3C53;');
console.log('%cWelcome to the Student Lecture Booking Portal!', 'font-size: 14px; color: #6B5B4E;');
console.log('💡 Tip: Press "/" to quickly focus the search bar');


