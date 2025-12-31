// Wait for GSAP and ScrollTrigger to load
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize after page load
    window.addEventListener('load', () => {
        setTimeout(initAboutAnimations, 500);
    });
} else {
    console.error('❌ GSAP or ScrollTrigger not loaded');
}

function initAboutAnimations() {
    console.log('🎨 Initializing about animations');
    
    // Check if elements exist
    const aboutSection = document.querySelector('.about-section');
    const description = document.querySelector('.description');
    const stickyWrapper = document.querySelector('.sticky-wrapper');
    
    if (!aboutSection || !description || !stickyWrapper) {
        console.warn('⚠️ About section elements not found');
        return;
    }
    
    try {
        // Split description into words
        splitIntoWords(description);
        
        // Animate heading
        animateHeading();
        
        // Animate content
        animateContent();
        
        // Animate description words
        animateDescriptionWords();
        
        // Animate skill cards
        animateSkillCards();
        
        // Animate tech stack
        animateTechStack();
        
        console.log('✅ About animations initialized');
    } catch (error) {
        console.error('❌ About animation error:', error);
    }
}

// Split text into words
function splitIntoWords(element) {
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word =>
        `<span class="word">${word} </span>`
    ).join('');
}

// Animate heading
function animateHeading() {
    const headingTop = document.querySelector('.heading-line.top');
    const headingMiddle = document.querySelector('.heading-line.middle');
    const headingBottom = document.querySelector('.heading-line.bottom');
    
    if (!headingTop || !headingMiddle || !headingBottom) {
        console.warn('⚠️ Heading elements not found');
        return;
    }
    
    // Get responsive config
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const config = {
        startTrigger: isMobile ? 'top top' : 'top top',
        endTrigger: isMobile ? '60% top' : '70% top',
        scrub: isMobile ? 0.5 : 1,
        finalFontSize: isMobile ? '6vw' : isTablet ? '5vw' : '4vw'
    };
    
    const headingTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: config.startTrigger,
            end: config.endTrigger,
            scrub: config.scrub,
            pin: '.sticky-wrapper',
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });

    // Phase 1: Merge to center
    headingTl
        .to(headingTop, {
            top: '50%',
            y: '-50%',
            duration: 2,
            ease: 'power2.inOut'
        }, 0)
        .to(headingBottom, {
            bottom: 'auto',
            top: '50%',
            y: '-50%',
            duration: 2,
            ease: 'power2.inOut'
        }, 0)
        // Fade out
        .to([headingTop, headingBottom], {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        }, 1)
        // Phase 2: Scale down
        .to(headingMiddle, {
            fontSize: config.finalFontSize,
            duration: 2,
            ease: 'power2.inOut'
        }, 2);
}

// Animate content wrapper
function animateContent() {
    const contentWrapper = document.querySelector('.content-wrapper');
    
    if (!contentWrapper) return;
    
    gsap.to(contentWrapper, {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: contentWrapper,
            start: 'top 80%',
            invalidateOnRefresh: true,
        }
    });
}

// Animate description words
function animateDescriptionWords() {
    const words = document.querySelectorAll('.description .word');
    
    if (words.length === 0) return;
    
    const isMobile = window.innerWidth < 768;
    
    gsap.to(words, {
        color: '#ffffff',
        stagger: isMobile ? 0.15 : 0.3,
        scrollTrigger: {
            trigger: '.description',
            start: 'top 80%',
            end: isMobile ? 'bottom 60%' : 'bottom 48%',
            scrub: 1,
            invalidateOnRefresh: true,
        }
    });
}

// Animate skill cards
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length === 0) return;
    
    const isMobile = window.innerWidth < 768;
    
    gsap.to(skillCards, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.08 : 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            invalidateOnRefresh: true,
        }
    });
}

// Animate tech stack items
function animateTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    if (techItems.length === 0) return;
    
    const isMobile = window.innerWidth < 768;
    
    gsap.to(techItems, {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.3 : 0.5,
        stagger: isMobile ? 0.03 : 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.tech-stack',
            start: 'top 80%',
            invalidateOnRefresh: true,
        }
    });
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
            console.log('🔄 Reinitializing about animations');
            
            // Kill all ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === '.about-section' || 
                    trigger.vars.trigger === '.content-wrapper' ||
                    trigger.vars.trigger === '.description' ||
                    trigger.vars.trigger === '.skills-grid' ||
                    trigger.vars.trigger === '.tech-stack') {
                    trigger.kill();
                }
            });
            
            // Reinitialize
            initAboutAnimations();
        }
        
        lastWidth = newWidth;
    }, 500);
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        console.log('🔄 Orientation changed, refreshing animations');
        ScrollTrigger.refresh();
    }, 500);
});