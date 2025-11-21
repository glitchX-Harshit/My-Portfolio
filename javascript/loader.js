// ADJUST THIS VALUE TO CHANGE TOTAL DURATION
const LOADING_DURATION = 6.85; // seconds (change this to 3, 4, 5, etc.)
// ============================================

const counterElement = document.getElementById('counter');
const loaderWrapper = document.getElementById('loader-wrapper');
const blocks = document.querySelectorAll('.block');

// Create GSAP timeline
const tl = gsap.timeline({
    onComplete: () => {
        // After counter reaches 100, trigger block exit animation
        gsap.to('.loader-counter', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });

        gsap.to(blocks, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.08,
            onComplete: () => {
                loaderWrapper.style.display = 'none';
            }
        });
    }
});

// Counter object for animation
const counter = { value: 0 };

// Calculate timing percentages
const total = LOADING_DURATION;
const t1 = total * 0.30;  // 0-25
const p1 = total * 0.08;  // pause
const t2 = total * 0.30;  // 25-70
const p2 = total * 0.10;  // pause at 70
const t3 = total * 0.12;  // 70-95
const p3 = total * 0.05;  // pause
const t4 = total * 0.05;  // 95-100

// GSAP Timeline for counter
tl.to(counter, {
    value: 25,
    duration: t1,
    ease: 'power1.inOut',
    onUpdate: () => {
        counterElement.textContent = Math.floor(counter.value);
    }
})
    .to({}, { duration: p1 }) // pause
    .to(counter, {
        value: 70,
        duration: t2,
        ease: 'power1.inOut',
        onUpdate: () => {
            counterElement.textContent = Math.floor(counter.value);
        }
    })
    .to({}, { duration: p2 }) // pause at 70%
    .to(counter, {
        value: 95,
        duration: t3,
        ease: 'power1.inOut',
        onUpdate: () => {
            counterElement.textContent = Math.floor(counter.value);
        }
    })
    .to({}, { duration: p3 }) // pause
    .to(counter, {
        value: 100,
        duration: t4,
        ease: 'power2.in',
        onUpdate: () => {
            counterElement.textContent = Math.floor(counter.value);
        }
    });

// Start animation on page load
window.addEventListener('load', () => {
    tl.play();
});