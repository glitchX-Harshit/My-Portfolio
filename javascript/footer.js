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

  // Detect device type
  const getDeviceConfig = () => {
    const width = window.innerWidth;
    
    if (width <= 480) {
      return {
        type: 'small-mobile',
        yMove: -200,
        xMove: -50,
        rotation: -5,
        startTrigger: '30% top',
        endTrigger: '200% bottom',
        scrub: 1.5
      };
    } else if (width <= 768) {
      return {
        type: 'mobile',
        yMove: -250,
        xMove: -60,
        rotation: -6,
        startTrigger: '35% top',
        endTrigger: '220% bottom',
        scrub: 1.3
      };
    } else if (width <= 1024) {
      return {
        type: 'tablet',
        yMove: -300,
        xMove: -80,
        rotation: -7,
        startTrigger: '38% -5%',
        endTrigger: '230% bottom',
        scrub: 1.2
      };
    } else {
      return {
        type: 'desktop',
        yMove: -400,
        xMove: -100,
        rotation: -8,
        startTrigger: '40% -7%',
        endTrigger: '240% bottom',
        scrub: 1
      };
    }
  };

  const config = getDeviceConfig();

  // Main tilt and slide animation
  gsap.to(whiteSection, {
    scrollTrigger: {
      trigger: stickyWrapper,
      start: config.startTrigger,
      end: config.endTrigger,
      scrub: config.scrub,
      invalidateOnRefresh: true,
      // markers: true, // Uncomment to debug
    },
    y: config.yMove,
    x: config.xMove,
    rotation: config.rotation,
    transformOrigin: 'center center',
    ease: 'none',
    force3D: true
  });

  // Subtle parallax for footer content
  if (footerContent) {
    gsap.from(footerContent, {
      scrollTrigger: {
        trigger: stickyWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: config.scrub,
        invalidateOnRefresh: true,
      },
      y: config.type === 'small-mobile' ? 50 : 100,
      opacity: 0.5,
      ease: 'none'
    });
  }

  console.log('✅ Footer initialized for', config.type);

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();

  // Handle resize
  let resizeTimer;
  let lastWidth = window.innerWidth;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const newWidth = window.innerWidth;
      
      if (Math.abs(newWidth - lastWidth) > 50) {
        console.log('🔄 Reloading footer due to resize');
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === stickyWrapper) {
            trigger.kill();
          }
        });
        initTiltFooter();
      }
      
      lastWidth = newWidth;
    }, 300);
  });
}

// Wait for page load + additional delay
window.addEventListener('load', () => {
  setTimeout(initTiltFooter, 1000);
});

// Check if device is touch-enabled
function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

// Only initialize Shery mouse effects on non-touch devices
if (!isTouchDevice()) {
  // Check if Shery is loaded
  if (typeof Shery !== 'undefined') {
    Shery.mouseFollower({
      skew: true,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 0.5,
    });

    function magnetEffect(targetElement) {
      Shery.makeMagnet(targetElement, {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    }

    // Apply magnet effect only on desktop
    magnetEffect(".navBtn");
    magnetEffect(".tech-item");
    magnetEffect(".skill-content");
    magnetEffect(".heading-line");
    magnetEffect(".scroll-down-btn");
    magnetEffect("#proposal-button");
    magnetEffect(".sendMessage-btn");

    console.log('✅ Shery effects initialized for desktop');
  } else {
    console.warn('⚠️ Shery library not loaded');
  }
} else {
  console.log('📱 Touch device detected - Shery effects disabled');
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});