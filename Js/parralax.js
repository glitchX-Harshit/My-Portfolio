gsap.registerPlugin(ScrollTrigger);

        // Hide scroll indicator after first scroll
        let scrolled = false;
        window.addEventListener('scroll', () => {
            if (!scrolled) {
                gsap.to('.scroll-indicator', { opacity: 0, duration: 0.5 });
                scrolled = true;
            }
        });

        // Page 2 slides over Page 1
        gsap.timeline({
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: 'top top',
                end: '20% top',
                scrub: 1,
            }
        })
        .fromTo('#page2', 
            { yPercent: 100 }, 
            { yPercent: 0 }
        );

        // Page 3 slides over Page 2
        gsap.timeline({
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '20% top',
                end: '40% top',
                scrub: 1,
            }
        })
        .fromTo('#page3', 
            { yPercent: 100 }, 
            { yPercent: 0 }
        );

        // Page 4 slides over Page 3
        gsap.timeline({
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '40% top',
                end: '60% top',
                scrub: 1,
            }
        })
        .fromTo('#page4', 
            { yPercent: 100 }, 
            { yPercent: 0 }
        );

        // Page 5 slides over Page 4
        gsap.timeline({
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '60% top',
                end: '80% top',
                scrub: 1,
            }
        })
        .fromTo('#page5', 
            { yPercent: 100 }, 
            { yPercent: 0 }
        );

        // Parallax animations for Page 1 elements
        gsap.to('#page1 .shape1', {
            x: -100,
            y: -100,
            scale: 1.5,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: 'top top',
                end: '20% top',
                scrub: 1
            }
        });

        gsap.to('#page1 .shape2', {
            x: 100,
            y: 100,
            scale: 1.5,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: 'top top',
                end: '20% top',
                scrub: 1
            }
        });

        gsap.to('#page1 .content', {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: 'top top',
                end: '20% top',
                scrub: 1
            }
        });

        // Parallax animations for Page 2 elements
        gsap.to('#page2 .grid', {
            scale: 1.5,
            opacity: 0,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '20% top',
                end: '40% top',
                scrub: 1
            }
        });

        gsap.to('#page2 .content', {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '20% top',
                end: '40% top',
                scrub: 1
            }
        });

        // Parallax animations for Page 3 elements
        gsap.to('#page3 .box1', {
            x: -200,
            y: -200,
            rotation: 180,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '40% top',
                end: '60% top',
                scrub: 1
            }
        });

        gsap.to('#page3 .box2', {
            x: 200,
            y: 200,
            rotation: -180,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '40% top',
                end: '60% top',
                scrub: 1
            }
        });

        gsap.to('#page3 .box3', {
            x: -150,
            y: 150,
            rotation: 90,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '40% top',
                end: '60% top',
                scrub: 1
            }
        });

        gsap.to('#page3 .content', {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '40% top',
                end: '60% top',
                scrub: 1
            }
        });

        // Parallax animations for Page 4 elements
        gsap.to('#page4 .wave', {
            y: -300,
            scaleY: 2,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '60% top',
                end: '80% top',
                scrub: 1
            }
        });

        gsap.to('#page4 .content', {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '60% top',
                end: '80% top',
                scrub: 1
            }
        });

        // Parallax animations for Page 5 elements
        gsap.to('#page5 .circle1', {
            scale: 2,
            opacity: 0,
            rotation: 360,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '80% top',
                end: '100% top',
                scrub: 1
            }
        });

        gsap.to('#page5 .circle2', {
            scale: 2,
            opacity: 0,
            rotation: -360,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '80% top',
                end: '100% top',
                scrub: 1
            }
        });

        gsap.to('#page5 .circle3', {
            scale: 2,
            opacity: 0,
            rotation: 180,
            scrollTrigger: {
                trigger: '.parralaxContainer',
                start: '80% top',
                end: '100% top',
                scrub: 1
            }
        });