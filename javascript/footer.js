function initTiltFooter() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Please include GSAP libraries before initializing tilt footer.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const whiteSection = document.getElementById('tiltWhiteSection');
  const stickyWrapper = document.querySelector('.tilt-footer-module .tilt-sticky-wrapper');
  const footerContent = document.querySelector('.tilt-footer-module .tilt-footer-content');

  if (!whiteSection || !stickyWrapper) {
    console.warn('Tilt footer elements not found');
    return;
  }

  // Main tilt and slide animation
  gsap.to(whiteSection, {
    scrollTrigger: {
      trigger: stickyWrapper,
      start: '40% -7%',
      end: '240% bottom',
      scrub: 1,
      // markers: true // Uncomment for debugging
    },
    y: -400,
    x: -100,
    rotation: -8,
    transformOrigin: 'center center',
    ease: 'none'
  });

  // Optional: Subtle parallax for footer content
  if (footerContent) {
    gsap.from(footerContent, {
      scrollTrigger: {
        trigger: stickyWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      },
      y: 100,
      opacity: 0.5,
      ease: 'none'
    });
  }

  console.log('✅ Tilt footer initialized successfully');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTiltFooter);
} else {
  initTiltFooter();
}