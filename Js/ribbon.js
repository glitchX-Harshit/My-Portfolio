gsap.registerPlugin(ScrollTrigger);

const ribbonTop = document.querySelector('.ribbon-top');
const ribbonBottom = document.querySelector('.ribbon-bottom');
const textTop = document.querySelector('.text-top');
const textBottom = document.querySelector('.text-bottom');

// Initial state - ribbon comes from left, text hidden
gsap.set([ribbonTop, ribbonBottom], {
    x: '-100%',
    opacity: 1
});

gsap.set([textTop, textBottom], {
    x: '-100%',
    opacity: 0
});

// Create the animation timeline
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.mainRibbon',
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: 1,
        // markers: true
    }
});

// Ribbon entrance - slides in fast from left
tl.to([ribbonTop, ribbonBottom], {
    x: '0%',
    duration: 0.15,
    ease: 'power3.out'
})
    // Text comes from left after ribbon
    .to([textTop, textBottom], {
        x: '0%',
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
    }, '+=0.05')
    // Hold
    .to({}, { duration: 0.15 })
    // Zoom effect
    .to([ribbonTop, ribbonBottom, textTop, textBottom], {
        scale: 1.38,
        duration: 0.15,
        ease: 'power2.inOut'
    })
    // Small pause before split
    .to({}, { duration: 0.1 })
    // Split and separate - top goes up
    .to([ribbonTop, textTop], {
        y: -400,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
    })
    // Bottom goes down (at the same time)
    .to([ribbonBottom, textBottom], {
        y: 400,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
    }, '-=0.3');

// Hide scroll indicator
ScrollTrigger.create({
    trigger: '.mainRibbon',
    start: 'top top-=50',
    onEnter: () => {
        gsap.to('.scroll-indicator', {
            opacity: 0,
            duration: 0.3
        });
    },
    onLeaveBack: () => {
        gsap.to('.scroll-indicator', {
            opacity: 1,
            duration: 0.3
        });
    }
});