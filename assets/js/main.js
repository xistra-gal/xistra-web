const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// --- Cursor Personalizado ---
if (!isMobile) {
    const cursor = document.getElementById('custom-cursor');
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efectos de hover para elementos clicables
    document.querySelectorAll('a, .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(0, 247, 255, 0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = '#00f7ff';
        });
    });
}

// --- Animación de partículas interactivas ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
}

window.addEventListener('resize', () => {
     resizeCanvas();
     init();
});

resizeCanvas();

let particlesArray;
const particleColor = 'rgba(0, 168, 168, 0.5)';

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        // Movimiento normal
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // Interacción con el ratón
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (mouse.x != null && distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance; 
            const moveX = forceDirectionX * force * 7; // Aumentamos la fuerza de repulsión
            const moveY = forceDirectionY * force * 7;

            this.x -= moveX;
            this.y -= moveY;
        } else {
            this.x += this.directionX;
            this.y += this.directionY;
        }
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1.5;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                         + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(0, 168, 168, ${opacityValue * 0.1})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// --- Animación de escritura ---
const text = "Somos una startup gallega que busca disrumpir en el campo de los sistemas de inteligencia artificial multiagente.";
const headlineElement = document.getElementById('headline');
const contentBelow = document.getElementById('content-after-headline');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        headlineElement.innerHTML = text.substring(0, i + 1) + '<span style="border-right: .15em solid #00a8a8; animation: blink-caret .75s step-end infinite;"></span>';
        i++;
        setTimeout(typeWriter, 30); // Velocidad de escritura
    } else {
        headlineElement.innerHTML = text;
        setTimeout(() => {
            contentBelow.classList.add('is-visible');
        }, 500);
    }
}

// Inicia las animaciones
init();
animate();
typeWriter();
