function initTiltFooter() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
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
      invalidateOnRefresh: true,
      // markers: true, // Keep this to debug
    },
    y: -400,
    x: -100,
    rotation: -8,
    transformOrigin: 'center center',
    ease: 'none'
  });

  // Subtle parallax for footer content
  if (footerContent) {
    gsap.from(footerContent, {
      scrollTrigger: {
        trigger: stickyWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
      y: 100,
      opacity: 0.5,
      ease: 'none'
    });
  }

  console.log('✅ Footer initialized');

  // Refresh after footer is created
  ScrollTrigger.refresh();
}

// Wait for page load + additional delay
window.addEventListener('load', () => {
  setTimeout(initTiltFooter, 1000);
});

Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 0.5,
});

function magnetEffect(targetElement) {
  Shery.makeMagnet(targetElement /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
};

magnetEffect(".navBtn");
magnetEffect(".tech-item");
magnetEffect(".skill-content");
magnetEffect(".heading-line");
magnetEffect(".scroll-down-btn");
magnetEffect("#proposal-button");
magnetEffect(".sendMessage-btn")