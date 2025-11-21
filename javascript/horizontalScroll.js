gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {

    const container = document.querySelector('.horizontal-container');
    const wrapper = document.querySelector('.horizontal-wrapper');
    const sections = document.querySelectorAll('.horizontal-section');

    if (!container || !wrapper || sections.length === 0) {
        console.error('❌ Elements not found');
        return;
    }

    console.log('✅ Found', sections.length, 'sections');

    // Simple calculation
    const totalWidth = sections.length * window.innerWidth;

    gsap.to(wrapper, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            // markers: true, // Keep this to see what's happening
        }
    });

    console.log('✅ Horizontal scroll created');
});