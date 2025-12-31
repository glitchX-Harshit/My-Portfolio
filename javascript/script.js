// Check if Lenis is available
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    console.log('✅ Lenis smooth scrolling initialized');
} else {
    console.warn('⚠️ Lenis library not loaded');
}

// Wrap everything in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Script initialized');
    
    // Navbar scroll behavior
    initNavbar();
    
    // Hover effects
    initHoverEffects();
    
    // GSAP animations
    initGSAPAnimations();
    
    // Slider animation
    setTimeout(() => {
        initSlider();
    }, 1000);
    
    // Add resize handler
    handleResponsiveResize();
});

// Navbar initialization
function initNavbar() {
    let lastScroll = 0;
    const nav = document.querySelector("#navbar");
    const div = document.querySelector("#myName");
    let hasShown = false;

    if (!nav || !div) {
        console.warn('⚠️ Navbar elements not found');
        return;
    }

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (hasShown) {
            nav.style.top = "0";
            div.style.top = "0";
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.top = "0";
            div.style.top = "0";
            hasShown = true;
        } else if (currentScroll < lastScroll) {
            nav.style.top = "-101px";
            div.style.top = "-101px";
        }

        lastScroll = currentScroll;
    });
    
    console.log('✅ Navbar initialized');
}

// Hover effects initialization
function initHoverEffects() {
    const hoverTargets = document.querySelectorAll('.hover-target');
    const popup = document.getElementById('cursor-image-popup');
    const popupImg = document.getElementById('popup-img');

    if (!popup || !popupImg) {
        console.warn('⚠️ Popup elements not found');
        return;
    }

    // Only enable on non-touch devices
    if (!('ontouchstart' in window)) {
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                const imageUrl = target.getAttribute('data-image-url');
                if (imageUrl) {
                    popupImg.src = imageUrl;
                    popup.classList.add('active-popup');
                }
            });

            target.addEventListener('mouseleave', () => {
                popup.classList.remove('active-popup');
            });

            target.addEventListener('mousemove', (e) => {
                popup.style.left = e.clientX + 'px';
                popup.style.top = e.clientY + 'px';
            });
        });
        
        console.log('✅ Hover effects initialized');
    } else {
        console.log('📱 Touch device - hover effects disabled');
    }
}

// GSAP animations initialization
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('⚠️ GSAP not loaded');
        return;
    }

    // Navbar items animation
    const navItems = document.querySelectorAll("#navbar ul li");
    if (navItems.length > 0) {
        gsap.to("#navbar ul li", {
            opacity: 0
        });
        gsap.from("#navbar ul li", {
            opacity: 1,
            stagger: 1.3,
            delay: 0.5
        });
    }

    // Liquid text effect
    const text = document.querySelector("text");
    if (text) {
        try {
            const textLength = text.getComputedTextLength();
            
            text.style.strokeDasharray = textLength;
            text.style.strokeDashoffset = textLength;

            gsap.to(text, {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });
            
            console.log('✅ Text animation initialized');
        } catch (error) {
            console.warn('⚠️ Text animation error:', error);
        }
    }
}

// Slider initialization
function initSlider() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('⚠️ GSAP or ScrollTrigger not loaded');
        return;
    }

    const banner = document.querySelector(".banner");
    if (!banner) {
        console.warn('⚠️ Banner element not found');
        return;
    }

    try {
        const sliderAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".banner",
                start: "50% 95%",
                end: "50% 65%",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });
        
        sliderAnimation
            .from(".banner", {
                opacity: 0,
                duration: 0.1,
                scale: 0
            })
            .to(".banner", {
                opacity: 1,
                duration: 0.01,
                scale: 1,
                ease: "power2.inOut"
            });
        
        console.log('✅ Slider animation initialized');
    } catch (error) {
        console.error('❌ Slider animation error:', error);
    }
}

// Handle responsive resize
function handleResponsiveResize() {
    let resizeTimer;
    let lastWidth = window.innerWidth;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const newWidth = window.innerWidth;
            
            // Only refresh if width changed significantly
            if (Math.abs(newWidth - lastWidth) > 100) {
                console.log('🔄 Significant resize detected');
                
                // Refresh ScrollTrigger if available
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }
            
            lastWidth = newWidth;
        }, 300);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            console.log('🔄 Orientation changed');
            
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 500);
    });
}

// Safe scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = window.innerWidth < 768 ? 60 : 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.message);
});

console.log('✅ All scripts loaded successfully');