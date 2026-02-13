// Randomly Popping Hearts
function createFallingDino() {
    const dinoContainer = document.getElementById('falling-dinos');
    const heart = document.createElement('div');
    heart.className = 'falling-dino';
    
    // Create img element for heart.gif
    const heartImg = document.createElement('img');
    heartImg.src = 'img/heart.gif';
    heart.appendChild(heartImg);
    
    // Random position within screen bounds (with margins)
    const randomLeft = Math.random() * 85 + 5; // 5% to 90% of screen width
    const randomTop = Math.random() * 75 + 10; // 10% to 85% of screen height
    
    heart.style.left = randomLeft + '%';
    heart.style.top = randomTop + '%';
    
    // Random size variation (4x bigger)
    const size = Math.random() * 120 + 120; // 120px to 240px
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    dinoContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Create hearts continuously
setInterval(createFallingDino, 600);

// Create initial batch
for (let i = 0; i < 5; i++) {
    setTimeout(createFallingDino, i * 200);
}

// Confetti Function
function createConfetti() {
    const colors = ['#FF69B4', '#BA55D3', '#9370DB', '#DDA0DD', '#DA70D6', '#8A2BE2', '#9400D3', '#FFB6C1'];
    const confettiCount = 150; // Number of confetti pieces
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 10); // Stagger confetti creation
    }
}

// Create hearts in popup
function createPopupHearts() {
    const popupHearts = document.getElementById('popupHearts');
    popupHearts.innerHTML = ''; // Clear previous hearts
    
    const positions = [
        { left: '10%', top: '15%', delay: '0s' },
        { left: '85%', top: '20%', delay: '0.3s' },
        { left: '15%', top: '70%', delay: '0.6s' },
        { left: '80%', top: '75%', delay: '0.9s' },
        { left: '5%', top: '45%', delay: '1.2s' },
        { left: '90%', top: '50%', delay: '1.5s' },
    ];
    
    positions.forEach(pos => {
        const heart = document.createElement('div');
        heart.className = 'popup-heart';
        const heartImg = document.createElement('img');
        heartImg.src = 'img/heart.gif';
        heart.appendChild(heartImg);
        heart.style.left = pos.left;
        heart.style.top = pos.top;
        heart.style.animationDelay = pos.delay;
        popupHearts.appendChild(heart);
    });
}

// Audio Setup
const backgroundMusic = document.getElementById('backgroundMusic');
let musicStarted = false;
let musicStopped = false; // Flag to prevent music restart

// Set volume to maximum
backgroundMusic.volume = 1.0;

// Force unmute and play
backgroundMusic.muted = false;

// Function to start music
function startMusic() {
    if (!musicStarted && !musicStopped) {
        // Reset and force play
        backgroundMusic.load();
        backgroundMusic.muted = false;
        backgroundMusic.volume = 1.0;
        
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicStarted = true;
                console.log('Music started playing!');
            }).catch(error => {
                console.log('Music play failed:', error);
                // Immediate retry
                setTimeout(() => {
                    backgroundMusic.play().catch(e => console.log('Retry failed:', e));
                }, 50);
            });
        }
    }
}

// Immediate play attempts
startMusic();

// Try again after tiny delays
setTimeout(startMusic, 10);
setTimeout(startMusic, 50);
setTimeout(startMusic, 100);
setTimeout(startMusic, 300);

// Standard event listeners
document.addEventListener('DOMContentLoaded', startMusic);
window.addEventListener('load', startMusic);

// Fallback: Start music on ANY user interaction
const startOnInteraction = () => {
    startMusic();
};

document.addEventListener('click', startOnInteraction, { once: true });
document.addEventListener('touchstart', startOnInteraction, { once: true });
document.addEventListener('keydown', startOnInteraction, { once: true });

// Button Interaction Logic
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const dinoImage = document.getElementById('dinoImage');
const dinoEmoji = document.getElementById('dinoEmoji');

let noClickCount = 0;
const maxClicks = 5;
let currentScale = 1;

// Dino crying images
const dinoCryImages = [
    'img/dinocry.gif',
    'img/dinocry2.gif',
    'img/dinocry3.gif',
    'img/dinocry4.gif',
    'img/dinocry5.gif'
];

// Get all audio elements
const music2 = document.getElementById('music2');
const music3 = document.getElementById('music3');
const music4 = document.getElementById('music4');
const music5 = document.getElementById('music5');

// Yes Button Click
yesBtn.addEventListener('click', () => {
    // Stop the background music completely and permanently
    musicStopped = true;
    try {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic.muted = true;
        backgroundMusic.removeAttribute('loop');
        backgroundMusic.src = ''; // Clear the source
    } catch (e) {
        console.log('Error stopping music:', e);
    }
    
    // Create confetti everywhere!
    createConfetti();
    
    // Create hearts in popup
    createPopupHearts();
    
    // Change dino to yesdino.gif
    dinoEmoji.style.display = 'none';
    dinoImage.style.display = 'block';
    dinoImage.src = 'img/yesdino.gif';
    
    // Play music2 and music3
    music2.currentTime = 0;
    music2.play().catch(e => console.log('music2 play failed:', e));
    
    music3.currentTime = 0;
    music3.play().catch(e => console.log('music3 play failed:', e));
    
    document.body.classList.add('popup-active');
    overlay.classList.add('show');
    popup.classList.add('show');

    // Popup will stay open until user clicks on overlay
});

// No Button Click
noBtn.addEventListener('click', () => {
    noClickCount++;

    if (noClickCount === maxClicks) {
        // Play music4 ONLY on the 5th click
        music4.currentTime = 0;
        music4.play().catch(e => console.log('music4 play failed:', e));
        
        // Change to 5th crying dino
        dinoEmoji.style.display = 'none';
        dinoImage.style.display = 'block';
        dinoImage.src = dinoCryImages[4];
        
        // Hide the No button on the 5th click
        noBtn.classList.add('hidden');
        yesBtn.style.transform = `scale(${currentScale})`;
    } else if (noClickCount < maxClicks) {
        // Play music5 ONLY for clicks 1-4
        music5.currentTime = 0;
        music5.play().catch(e => console.log('music5 play failed:', e));
        
        // Change dino image based on click count (0-indexed)
        dinoEmoji.style.display = 'none';
        dinoImage.style.display = 'block';
        dinoImage.src = dinoCryImages[noClickCount - 1];
        
        // Grow the Yes button
        currentScale += 0.3;
        yesBtn.style.transform = `scale(${currentScale})`;
    }
});

// Click on overlay to close popup
overlay.addEventListener('click', () => {
    popup.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('popup-active');
});
