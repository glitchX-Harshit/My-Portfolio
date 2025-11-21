gsap.registerPlugin(ScrollTrigger);

// Split description into words
function splitIntoWords(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word =>
        `<span class="word">${word} </span>`
    ).join('');
}

const description = document.querySelector('.description');
splitIntoWords(description);

// Main heading animation timeline
const headingTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top top',
        end: '70% top',
        scrub: 1,
        pin: '.sticky-wrapper',
    }
});

// Phase 1: Merge all three lines to center (0-50%)
headingTl
    .to('.heading-line.top', {
        top: '50%',
        y: '-50%',
        duration: 2,
        ease: 'power2.inOut'
    }, 0)
    .to('.heading-line.bottom', {
        bottom: 'auto',
        top: '50%',
        y: '-50%',
        duration: 2,
        ease: 'power2.inOut'
    }, 0)

    // Fade out top and bottom smoothly
    .to('.heading-line.top, .heading-line.bottom', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    }, 1)

    // Phase 2: Make middle text smaller
    .to('.heading-line.middle', {
        fontSize: '4vw',
        duration: 2,
        ease: 'power2.inOut'
    }, 2)

// Content fade in
gsap.to('.content-wrapper', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.content-wrapper',
        start: 'top 80%',
    }
});

// Description words color change

const words = document.querySelectorAll('.description .word');

gsap.to(words, {
    color: '#ffffff',
    stagger: 0.3,
    scrollTrigger: {
        trigger: '.description',
        start: 'top 80%',
        end: 'bottom 48%',
        scrub: 1,
        // markers: true
    }
});

// Skill cards animation
gsap.to('.skill-card', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
    }
});

// Tech stack animation
gsap.to('.tech-item', {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '.tech-stack',
        start: 'top 80%',
    }
});