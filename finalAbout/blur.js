class BlurSpotlightModule {
    constructor(moduleId) {
        this.module = document.getElementById(moduleId);
        this.canvas = this.module.querySelector('#blurCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.blurOverlay = this.module.querySelector('#blurOverlay');

        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.prevX = 0;
        this.prevY = 0;

        this.baseRadius = 120;
        this.currentRadius = this.baseRadius;
        this.targetRadius = this.baseRadius;
        this.breathePhase = 0;
        this.time = 0;

        this.points = 32;
        this.wavePoints = [];
        this.particles = [];

        this.isActive = false;
        this.animationId = null;

        this.init();
    }

    init() {
        this.resize();
        this.initWavePoints();
        this.initParticles();
        this.setupEvents();
        this.animate();
    }

    resize() {
        const rect = this.module.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.moduleRect = rect;
    }

    initWavePoints() {
        for (let i = 0; i < this.points; i++) {
            this.wavePoints.push({
                angle: (Math.PI * 2 * i) / this.points,
                offset: 0,
                speed: 0.5 + Math.random() * 0.5
            });
        }
    }

    initParticles() {
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            this.particles.push({
                angle: angle,
                distance: 150 + Math.random() * 50,
                size: 3 + Math.random() * 4,
                speed: 0.5 + Math.random() * 0.5,
                opacity: 0.3 + Math.random() * 0.4
            });
        }
    }

    setupEvents() {
        this.module.addEventListener('mouseenter', () => {
            this.isActive = true;
        });

        this.module.addEventListener('mouseleave', () => {
            this.isActive = false;
        });

        this.module.addEventListener('mousemove', (e) => {
            const rect = this.module.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        window.addEventListener('resize', () => this.resize());
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01;

        if (this.isActive) {
            // Calculate speed
            const dx = this.mouseX - this.prevX;
            const dy = this.mouseY - this.prevY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Smooth following
            this.targetX += (this.mouseX - this.targetX) * 0.25;
            this.targetY += (this.mouseY - this.targetY) * 0.25;

            // Breathing effect
            this.breathePhase += 0.02;
            const breatheAmount = Math.sin(this.breathePhase) * 30;

            // Speed-based growth
            const speedBoost = Math.min(speed * 3, 150);
            this.targetRadius = this.baseRadius + breatheAmount + speedBoost;
            this.currentRadius += (this.targetRadius - this.currentRadius) * 0.1;

            // Calculate organic blob shape
            const blobPoints = [];

            for (let i = 0; i < this.points; i++) {
                const point = this.wavePoints[i];

                const wave1 = Math.sin(this.time * point.speed + point.angle * 3) * 8;
                const wave2 = Math.cos(this.time * point.speed * 1.3 + point.angle * 2) * 6;
                const wave3 = Math.sin(this.time * point.speed * 0.7 + point.angle * 4) * 4;

                point.offset = wave1 + wave2 + wave3;

                const radius = this.currentRadius + point.offset;
                const x = this.targetX + Math.cos(point.angle) * radius;
                const y = this.targetY + Math.sin(point.angle) * radius;

                blobPoints.push({ x, y });
            }

            // Draw particles with glow pulse
            this.particles.forEach(particle => {
                particle.angle += particle.speed * 0.01;
                const dist = particle.distance + Math.sin(this.time * particle.speed) * 20;
                const x = this.targetX + Math.cos(particle.angle) * dist;
                const y = this.targetY + Math.sin(particle.angle) * dist;

                const glowIntensity = 0.5 + Math.sin(this.breathePhase) * 0.3;
                const pulseOpacity = particle.opacity * glowIntensity;

                this.ctx.beginPath();
                this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
                this.ctx.shadowBlur = 15 + (glowIntensity * 20);
                this.ctx.shadowColor = `rgba(255, 255, 255, ${pulseOpacity * 0.8})`;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            });

            // Create SVG path for the organic shape
            let pathData = `M ${blobPoints[0].x} ${blobPoints[0].y}`;

            for (let i = 0; i < blobPoints.length; i++) {
                const current = blobPoints[i];
                const next = blobPoints[(i + 1) % blobPoints.length];
                const cpX = (current.x + next.x) / 2;
                const cpY = (current.y + next.y) / 2;
                pathData += ` Q ${current.x} ${current.y} ${cpX} ${cpY}`;
            }
            pathData += ' Z';

            // Create organic mask with liquid glass edge distortion
            const distortionAmount = 5 + Math.sin(this.breathePhase) * 3;
            const svgMask = `
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <filter id="liquidGlass">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="${Math.floor(this.time * 10)}">
                                        <animate attributeName="baseFrequency" 
                                            values="0.02 0.03;0.025 0.035;0.02 0.03" 
                                            dur="4s" 
                                            repeatCount="indefinite"/>
                                    </feTurbulence>
                                    <feDisplacementMap in="SourceGraphic" scale="${distortionAmount}" xChannelSelector="R" yChannelSelector="G"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                </filter>
                                <mask id="organicMask">
                                    <rect width="100%" height="100%" fill="white"/>
                                    <path d="${pathData}" fill="black" filter="url(#liquidGlass)"/>
                                </mask>
                            </defs>
                            <rect width="100%" height="100%" fill="black" mask="url(#organicMask)"/>
                        </svg>
                    `;

            this.blurOverlay.style.maskImage = `url('data:image/svg+xml;base64,${btoa(svgMask)}')`;
            this.blurOverlay.style.webkitMaskImage = `url('data:image/svg+xml;base64,${btoa(svgMask)}')`;

            this.prevX = this.mouseX;
            this.prevY = this.mouseY;
        } else {
            // When not active, keep breathing but hide particles
            this.breathePhase += 0.02;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        cancelAnimationFrame(this.animationId);
    }
}

// Initialize the blur module
const blurModule = new BlurSpotlightModule('blurModule');