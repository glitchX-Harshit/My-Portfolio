gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', function () {
    
    // Wait for horizontal scroll to finish setting up
    setTimeout(() => {
        
        const ribbonTop = document.querySelector('.ribbon-top');
        const ribbonBottom = document.querySelector('.ribbon-bottom');
        const textTop = document.querySelector('.text-top');
        const textBottom = document.querySelector('.text-bottom');

        if (!ribbonTop || !ribbonBottom || !textTop || !textBottom) {
            console.warn('⚠️ Ribbon elements not found');
            return;
        }

        // Initial state
        gsap.set([ribbonTop, ribbonBottom], {
            x: '-100%',
            opacity: 1
        });

        gsap.set([textTop, textBottom], {
            x: '-100%',
            opacity: 0
        });

        // Create timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.mainRibbon',
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true, // Keep this to debug
            }
        });

        tl.to([ribbonTop, ribbonBottom], {
            x: '0%',
            duration: 0.15,
            ease: 'power3.out'
        })
        .to([textTop, textBottom], {
            x: '0%',
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out'
        }, '+=0.05')
        .to({}, { duration: 0.15 })
        .to([ribbonTop, ribbonBottom, textTop, textBottom], {
            scale: 1.38,
            duration: 0.15,
            ease: 'power2.inOut'
        })
        .to({}, { duration: 0.1 })
        .to([ribbonTop, textTop], {
            y: -400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        })
        .to([ribbonBottom, textBottom], {
            y: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        }, '-=0.3');

        console.log('✅ Ribbon initialized');
        
        // Refresh after ribbon is created
        ScrollTrigger.refresh();
        
    }, 1000); // Wait 1 second after page load
    
});