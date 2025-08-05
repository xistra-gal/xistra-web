// fuck particle.js, i did my own particle engine
const MAX_RANDOM_NUMBER = 50;

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
        this.container.appendChild(canvas);
        return canvas;
    }

    init() {
        this.resize();
        this.particles = [];

        // create particles
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000 + Math.floor(Math.random() * MAX_RANDOM_NUMBER));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    bindEvents() {

        window.addEventListener('resize', () => {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }

            // regenerate the entire engine
            setTimeout(() => {
                this.init();
                this.animate();
            }, 100);
        });

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        this.ctx.fill();
    }

    drawConnection(p1, p2, distance, maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.3;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    update() {
        this.particles.forEach(particle => {
            // forward movement
            particle.x += particle.vx;
            particle.y += particle.vy;

            // bounce if touches screen limit
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // maintain inside the canvas
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // repulsion effect - careful with the png photo, does not work there
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.02;
                particle.vy -= (dy / distance) * force * 0.02;
            }

            // friccion
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw the graph
        const maxDistance = 120;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.drawConnection(this.particles[i], this.particles[j], distance, maxDistance);
                }
            }
        }

        // draw particles
        this.particles.forEach(particle => this.drawParticle(particle));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// init when dom ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles-js');
});