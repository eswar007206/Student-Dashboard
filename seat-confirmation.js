// Get booking data from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const lectureId = parseInt(urlParams.get('lectureId')) || 1;
const seatId = urlParams.get('seatId') || 'A1';

// Mock Lecture Data (same as other pages)
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

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateBookingDetails();
    generateQRCode();
});

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Populate booking details
function populateBookingDetails() {
    // Set lecture name
    document.getElementById('lectureName').textContent = currentLecture.courseTitle;
    
    // Set program
    document.getElementById('program').textContent = currentLecture.program;
    
    // Set room number
    document.getElementById('roomNo').textContent = currentLecture.roomNo;
    
    // Set date and time
    const formattedDate = formatDate(currentLecture.date);
    document.getElementById('dateTime').textContent = `${formattedDate} at ${currentLecture.time}`;
    
    // Set seat number
    const [row, seat] = seatId.split('-');
    document.getElementById('seatNumber').textContent = `Row ${row}, Seat ${seat}`;
}

// Generate QR code
function generateQRCode() {
    const qrData = encodeURIComponent(`Seat:${seatId}|Lecture:${currentLecture.courseTitle}|Room:${currentLecture.roomNo}|Date:${currentLecture.date}|Time:${currentLecture.time}`);
    const qrSize = '250x250';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=${qrSize}&bgcolor=FFFFFF&color=1B3C53&margin=10`;
    
    const qrCodeImg = document.getElementById('qrCode');
    qrCodeImg.src = qrUrl;
    qrCodeImg.alt = `QR Code for ${seatId}`;
}

// Download QR code
function downloadQR() {
    const qrCodeImg = document.getElementById('qrCode');
    const qrSrc = qrCodeImg.src;
    
    // Create a temporary link to download the image
    const link = document.createElement('a');
    const [row, seat] = seatId.split('-');
    link.href = qrSrc;
    link.download = `booking-qr-${currentLecture.courseTitle.replace(/\s+/g, '-')}-Row${row}-Seat${seat}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    showDownloadFeedback();
}

// Show download feedback
function showDownloadFeedback() {
    const originalText = event.target.innerHTML;
    const button = event.target.closest('.action-btn');
    
    button.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Downloaded!
    `;
    
    button.style.background = 'var(--accent-green)';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

// Go back to dashboard
function goToDashboard() {
    window.location.href = '/index.html';
}

// Add print functionality
document.addEventListener('keydown', function(e) {
    // Press 'Ctrl+P' or 'Cmd+P' to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

// Add confetti effect on page load (optional fun feature)
function addConfetti() {
    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.8';
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0.8 },
                { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// Trigger confetti on page load
setTimeout(addConfetti, 500);

// Console welcome message
console.log('%c🎫 Booking Confirmed!', 'font-size: 20px; font-weight: bold; color: #10B981;');
console.log('%cYour seat has been successfully booked!', 'font-size: 14px; color: #6B5B4E;');
console.log('💡 Tip: Press Ctrl+P (or Cmd+P on Mac) to print your booking confirmation');
