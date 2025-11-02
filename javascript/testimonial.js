const testimonials = [

    // testimonial data configuration
    
    { name: "Ananya", avatar: "AN", text: "exceptional service everyone should try", image: 'images/testimonal/girl4.jpg' },
    { name: "Kabir", avatar: "KB", text: "the experience was amazing truly satisfied", image: 'images/testimonal/men1.jpg' },
    { name: "Ishita", avatar: "IS", text: "wonderful experience smooth and hassle free", image: 'images/testimonal/girl5.jpg' },
    { name: "Aarav", avatar: "AA", text: "A wonderful experience smooth and hassle", image: 'images/testimonal/men2.jpg' },
    { name: "Sneha", avatar: "SN", text: "amazing attention to detail really appreciated it", image: 'images/testimonal/girl1.jpg' },
    { name: "Vikram", avatar: "VK", text: "great experience the effort and dedication impressive", image: 'images/testimonal/men2.jpg' },
    { name: "Pavel", avatar: "PR", text: "truly happy with work very attentive helpful", image: 'images/testimonal/girl1.jpg' },
    { name: "Arjun", avatar: "AJ", text: "highly impressed service was outstanding recommended", image: 'images/testimonal/men4.jpg' },
    { name: "Diya", avatar: "DY", text: "the service was outstanding highly recommended", image: 'images/testimonal/girl2.jpg' },
    { name: "Rohan", avatar: "RH", text: "exceptional quality loved every moment of it", image: 'images/testimonal/men3.jpg' },
    { name: "Meera", avatar: "MR", text: "the service was outstanding highly recommended", image: 'images/testimonal/girl3.jpg' }
];

const container = document.getElementById('testimonialContainer');
const cards = [];

// Create cards
testimonials.forEach((testimonial, index) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
                <div class="card-photo" style="background-image: url('${testimonial.image}'); background-size: cover; background-position: center; "></div>
                <div class="card-content">
                    <div class="card-name">${testimonial.name}</div>
                    <div class="card-text">${testimonial.text}</div>
                </div>
            `;

    container.appendChild(card);

    setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const x = Math.random() * (containerRect.width - cardRect.width);
        const y = Math.random() * (containerRect.height - cardRect.height);
        const rotation = (Math.random() - 0.5) * 40;

        cards.push({
            element: card,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            rotation: rotation,
            angularVelocity: 0,
            width: cardRect.width,
            height: cardRect.height,
            zIndex: 10 + index,
            mass: 1
        });

        gsap.set(card, {
            x: x,
            y: y,
            rotation: rotation,
            zIndex: 10 + index
        });
    }, 10);
});

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let isMouseInside = false;

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isMouseInside = true;
});

container.addEventListener('mouseleave', () => {
    isMouseInside = false;
});

// Check collision between two cards - allow 30% overlap
function checkCollision(card1, card2) {
    const dx = card2.x - card1.x;
    const dy = card2.y - card1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = Math.max(card1.width, card1.height) * 0.7;

    return distance < minDistance;
}

// Resolve collision
function resolveCollision(card1, card2) {
    const dx = card2.x - card1.x;
    const dy = card2.y - card1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    const nx = dx / distance;
    const ny = dy / distance;

    const dvx = card2.vx - card1.vx;
    const dvy = card2.vy - card1.vy;
    const dotProduct = dvx * nx + dvy * ny;

    if (dotProduct > 0) return;

    const impulse = 0.8 * dotProduct / (card1.mass + card2.mass);

    card1.vx += impulse * card2.mass * nx;
    card1.vy += impulse * card2.mass * ny;
    card2.vx -= impulse * card1.mass * nx;
    card2.vy -= impulse * card1.mass * ny;

    const overlap = (Math.max(card1.width, card1.height) * 0.7) - distance;
    const separationX = (overlap / 2) * nx;
    const separationY = (overlap / 2) * ny;

    card1.x -= separationX;
    card1.y -= separationY;
    card2.x += separationX;
    card2.y += separationY;

    const impactStrength = Math.abs(dotProduct) / 10;
    card1.angularVelocity += (Math.random() - 0.5) * impactStrength * 0.3;
    card2.angularVelocity += (Math.random() - 0.5) * impactStrength * 0.3;
}

// Animation loop
function animate() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    cards.forEach((card, i) => {
        if (isMouseInside) {
            const cardCenterX = card.x + card.width / 2;
            const cardCenterY = card.y + card.height / 2;
            const dx = cardCenterX - mouseX;
            const dy = cardCenterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const repulsionRadius = 150;

            if (distance < repulsionRadius && distance > 0) {
                const force = (1 - distance / repulsionRadius) * 5;
                card.vx += (dx / distance) * force;
                card.vy += (dy / distance) * force;
                const rotationForce = (1 - distance / repulsionRadius) * 0.8;
                card.angularVelocity += (Math.random() - 0.5) * rotationForce;
            }
        }

        for (let j = i + 1; j < cards.length; j++) {
            if (checkCollision(card, cards[j])) {
                resolveCollision(card, cards[j]);
            }
        }

        card.vx *= 0.92;
        card.vy *= 0.92;
        card.angularVelocity *= 0.88;

        const maxRotationSpeed = 2;
        if (Math.abs(card.angularVelocity) > maxRotationSpeed) {
            card.angularVelocity = Math.sign(card.angularVelocity) * maxRotationSpeed;
        }

        card.x += card.vx;
        card.y += card.vy;
        card.rotation += card.angularVelocity;

        const wallRepelDistance = 50;
        const bounce = 0.6;
        const hardBoundary = 10;

        if (card.x < wallRepelDistance) {
            const repelForce = (wallRepelDistance - card.x) * 0.05;
            card.vx += repelForce;
        }
        if (card.x < hardBoundary) {
            card.x = hardBoundary;
            card.vx = Math.abs(card.vx) * bounce;
            card.angularVelocity += (Math.random() - 0.5) * 0.5;
        }

        if (card.x + card.width > containerWidth - wallRepelDistance) {
            const repelForce = (card.x + card.width - (containerWidth - wallRepelDistance)) * 0.05;
            card.vx -= repelForce;
        }
        if (card.x + card.width > containerWidth - hardBoundary) {
            card.x = containerWidth - card.width - hardBoundary;
            card.vx = -Math.abs(card.vx) * bounce;
            card.angularVelocity += (Math.random() - 0.5) * 0.5;
        }

        if (card.y < wallRepelDistance) {
            const repelForce = (wallRepelDistance - card.y) * 0.05;
            card.vy += repelForce;
        }
        if (card.y < hardBoundary) {
            card.y = hardBoundary;
            card.vy = Math.abs(card.vy) * bounce;
            card.angularVelocity += (Math.random() - 0.5) * 0.5;
        }

        if (card.y + card.height > containerHeight - wallRepelDistance) {
            const repelForce = (card.y + card.height - (containerHeight - wallRepelDistance)) * 0.05;
            card.vy -= repelForce;
        }
        if (card.y + card.height > containerHeight - hardBoundary) {
            card.y = containerHeight - card.height - hardBoundary;
            card.vy = -Math.abs(card.vy) * bounce;
            card.angularVelocity += (Math.random() - 0.5) * 0.5;
        }

        card.element.style.transform = `translate(${card.x}px, ${card.y}px) rotate(${card.rotation}deg)`;
    });

    requestAnimationFrame(animate);
}

setTimeout(() => {
    animate();
}, 100);