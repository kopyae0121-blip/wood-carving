// Confetti Animation
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pieces = [];
        this.numberOfPieces = 150;
        this.colors = ['#ff6b9d', '#c44569', '#ffc048', '#00d2ff', '#a8e6cf', '#ff8b94', '#ffaaa5', '#ffd3b6'];
        
        this.resize();
        this.createPieces();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createPieces() {
        for (let i = 0; i < this.numberOfPieces; i++) {
            this.pieces.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 3 + 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                swing: Math.random() * 2 - 1,
                swingSpeed: Math.random() * 0.05,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.pieces.forEach(piece => {
            // Update position
            piece.y += piece.speed;
            piece.x += Math.sin(piece.y * piece.swingSpeed) * piece.swing;
            piece.rotation += piece.rotationSpeed;
            
            // Reset if off screen
            if (piece.y > this.canvas.height) {
                piece.y = -20;
                piece.x = Math.random() * this.canvas.width;
            }
            
            // Draw piece
            this.ctx.save();
            this.ctx.translate(piece.x, piece.y);
            this.ctx.rotate((piece.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = piece.opacity;
            this.ctx.fillStyle = piece.color;
            this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize confetti when page loads
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti');
    new Confetti(canvas);
    
    // Start celebration music
    const music = document.getElementById('celebrationMusic');
    music.volume = 0.3;
    music.play().catch(e => console.log('Music autoplay blocked:', e));
    
    // Vibrate if supported (mobile)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    // Add extra sparkle animation
    createSparkles();
});

// Create sparkle effects around the container
function createSparkles() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleFloat 2s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px white;
            z-index: 5;
        `;
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }, 300);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent accidental zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
              
