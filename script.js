// Animated raining hearts
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const heartCount = 50; // Many hearts

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        sway: Math.random() * 0.02 + 0.01 // For gentle swaying
    };
}

for (let i = 0; i < heartCount; i++) {
    hearts.push(createHeart());
}

function drawHeart(x, y, size, opacity) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y - size / 4, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y - size / 4, x, y, x, y + size / 4);
    ctx.fillStyle = `rgba(255, 111, 97, ${opacity})`;
    ctx.fill();
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.y += heart.speed;
        heart.x += Math.sin(heart.y * heart.sway) * 2; // Gentle swaying side-to-side
        if (heart.y > canvas.height + heart.size) {
            heart.y = -heart.size;
            heart.x = Math.random() * canvas.width;
        }
        drawHeart(heart.x, heart.y, heart.size, heart.opacity);
    });
    requestAnimationFrame(animateHearts);
}

animateHearts();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
