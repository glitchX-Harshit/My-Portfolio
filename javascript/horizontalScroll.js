// Wait for GSAP to load
if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('❌ GSAP or ScrollTrigger not loaded for horizontal scroll');
} else {
    gsap.registerPlugin(ScrollTrigger);
    
    window.addEventListener('load', () => {
        setTimeout(initHorizontalScroll, 1000);
    });
}

function initHorizontalScroll() {
    console.log('➡️ Initializing horizontal scroll');
    
    const container = document.querySelector('.horizontal-container');
    const wrapper = document.querySelector('.horizontal-wrapper');
    const sections = document.querySelectorAll('.horizontal-section');

    // Validation
    if (!container || !wrapper || sections.length === 0) {
        console.error('❌ Horizontal scroll elements not found');
        return;
    }

    console.log('✅ Found', sections.length, 'horizontal sections');

    try {
        // Calculate total width
        const totalWidth = sections.length * window.innerWidth;
        
        // Detect device
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        const config = {
            scrub: isMobile ? 0.5 : isTablet ? 0.8 : 1,
            anticipatePin: isMobile ? 0 : 1,
        };

        // Create horizontal scroll animation
        gsap.to(wrapper, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${totalWidth}`,
                pin: true,
                scrub: config.scrub,
                anticipatePin: config.anticipatePin,
                invalidateOnRefresh: true,
                // markers: true, // Uncomment for debugging
            }
        });

        console.log('✅ Horizontal scroll created');
    } catch (error) {
        console.error('❌ Horizontal scroll error:', error);
    }
}

// Handle resize
let resizeTimer;
let lastWidth = window.innerWidth;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const newWidth = window.innerWidth;
        
        // Only reinitialize if width changed significantly
        if (Math.abs(newWidth - lastWidth) > 100) {
            console.log('🔄 Reinitializing horizontal scroll');
            
            // Kill existing ScrollTrigger
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === '.horizontal-container' || 
                    trigger.vars.trigger === document.querySelector('.horizontal-container')) {
                    trigger.kill();
                }
            });
            
            // Reinitialize
            setTimeout(initHorizontalScroll, 200);
        }
        
        lastWidth = newWidth;
    }, 300);
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        console.log('🔄 Orientation changed, refreshing horizontal scroll');
        
        // Kill and reinitialize
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === '.horizontal-container' || 
                trigger.vars.trigger === document.querySelector('.horizontal-container')) {
                trigger.kill();
            }
        });
        
        setTimeout(initHorizontalScroll, 500);
    }, 300);
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '.horizontal-container' || 
            trigger.vars.trigger === document.querySelector('.horizontal-container')) {
            trigger.kill();
        }
    });
});