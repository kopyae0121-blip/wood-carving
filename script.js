// Playful messages for "No" button
const messages = [
    "Are you sure? 🥺",
    "Really sure?? 💔",
    "Think again! 💭",
    "Pookie please... 🙏",
    "Just reconsider! 💝",
    "I will be sad... 😢",
    "Very very sad... 😭",
    "Pretty please? 🥹",
    "One more chance? 💕",
    "Say yes! ❤️"
];

let messageIndex = 0;
let musicStarted = false;

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 800);
}

// Start music
function startMusic() {
    if (!musicStarted) {
        const music = document.getElementById('bgMusic');
        music.volume = 0.3; // Set volume to 30%
        music.play().catch(e => console.log('Music autoplay blocked:', e));
        musicStarted = true;
    }
}

// Handle "No" button click
function handleNoClick() {
    startMusic();
    
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // Update button text with playful message
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Make "Yes" button grow
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    const newSize = currentSize * 1.15;
    yesButton.style.fontSize = `${newSize}px`;
    
    // Add shake animation to "No" button
    noButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
    
    // Vibrate if supported (mobile)
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Handle "Yes" button click
function handleYesClick() {
    startMusic();
    
    // Add celebration effect
    const yesButton = document.querySelector('.yes-button');
    yesButton.style.transform = 'scale(1.3)';
    yesButton.textContent = '💖 Yay! 💖';
    
    // Vibrate if supported (mobile)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // Redirect after animation
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 800);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    // Try to start music on any user interaction
    document.addEventListener('touchstart', startMusic, { once: true });
    document.addEventListener('click', startMusic, { once: true });
});

// Prevent accidental zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
