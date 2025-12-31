gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', function () {
    
    // Wait for horizontal scroll to finish setting up
    setTimeout(() => {
        
        const ribbonTop = document.querySelector('.ribbon-top');
        const ribbonBottom = document.querySelector('.ribbon-bottom');
        const textTop = document.querySelector('.text-top');
        const textBottom = document.querySelector('.text-bottom');
        const mainRibbon = document.querySelector('.mainRibbon');

        if (!ribbonTop || !ribbonBottom || !textTop || !textBottom || !mainRibbon) {
            console.warn('⚠️ Ribbon elements not found');
            return;
        }

        // Detect device type and viewport
        const getDeviceConfig = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isLandscape = width > height;
            
            if (width <= 480) {
                return {
                    type: 'small-mobile',
                    exitDistance: 250,
                    scaleAmount: 1.15,
                    scrub: 2,
                    startTrigger: 'top 70%',
                    endTrigger: 'bottom 50%'
                };
            } else if (width <= 768) {
                return {
                    type: 'mobile',
                    exitDistance: 300,
                    scaleAmount: 1.2,
                    scrub: 1.8,
                    startTrigger: 'top 65%',
                    endTrigger: 'bottom 55%'
                };
            } else if (width <= 1024) {
                return {
                    type: 'tablet',
                    exitDistance: 350,
                    scaleAmount: 1.3,
                    scrub: 1.5,
                    startTrigger: 'top 60%',
                    endTrigger: 'bottom 60%'
                };
            } else {
                return {
                    type: 'desktop',
                    exitDistance: 400,
                    scaleAmount: 1.38,
                    scrub: 1,
                    startTrigger: 'top 60%',
                    endTrigger: 'bottom 60%'
                };
            }
        };

        const config = getDeviceConfig();

        // Initial state with transform origin at center
        gsap.set([ribbonTop, ribbonBottom], {
            x: '-100%',
            opacity: 1,
            transformOrigin: 'center center'
        });

        gsap.set([textTop, textBottom], {
            x: '-100%',
            opacity: 0,
            transformOrigin: 'center center'
        });

        // Create timeline with responsive settings
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainRibbon,
                start: config.startTrigger,
                end: config.endTrigger,
                scrub: config.scrub,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                fastScrollEnd: true,
                // markers: true, // Uncomment to debug
                onUpdate: (self) => {
                    // Prevent janky behavior at edges
                    if (self.progress === 0 || self.progress === 1) {
                        self.refresh();
                    }
                }
            }
        });

        // Animation sequence with proper alignment
        tl.to([ribbonTop, ribbonBottom], {
            x: '0%',
            duration: 0.15,
            ease: 'power3.out',
            force3D: true
        })
        .to([textTop, textBottom], {
            x: '0%',
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
            force3D: true
        }, '+=0.05')
        .to({}, { duration: 0.15 })
        .to([ribbonTop, ribbonBottom, textTop, textBottom], {
            scale: config.scaleAmount,
            duration: 0.15,
            ease: 'power2.inOut',
            transformOrigin: 'center center',
            force3D: true
        })
        .to({}, { duration: 0.1 })
        .to([ribbonTop, textTop], {
            y: -config.exitDistance,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            force3D: true
        })
        .to([ribbonBottom, textBottom], {
            y: config.exitDistance,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            force3D: true
        }, '-=0.3');

        console.log('✅ Ribbon initialized for', config.type, '- Width:', window.innerWidth);
        
        // Initial refresh
        ScrollTrigger.refresh();
        
        // Handle orientation changes and window resize
        let resizeTimer;
        let lastWidth = window.innerWidth;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const newWidth = window.innerWidth;
                
                // Only reload if width changed significantly (not just address bar hide/show)
                if (Math.abs(newWidth - lastWidth) > 50) {
                    console.log('🔄 Reloading due to significant resize');
                    
                    // Kill all ScrollTriggers
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    
                    // Reload to reinitialize with correct dimensions
                    location.reload();
                } else {
                    // Just refresh ScrollTrigger for minor changes
                    ScrollTrigger.refresh();
                }
                
                lastWidth = newWidth;
            }, 300);
        });
        
        // Handle orientation change specifically
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                console.log('🔄 Orientation changed, refreshing...');
                ScrollTrigger.refresh();
            }, 500);
        });
        
    }, 1000);
    
});

// Prevent horizontal scroll overflow and ensure smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Force hardware acceleration
    const ribbonContainer = document.querySelector('.ribbon-container');
    if (ribbonContainer) {
        ribbonContainer.style.willChange = 'transform';
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});