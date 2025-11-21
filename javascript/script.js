// lenis smooth scrolling effect loop
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Wrap everything in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    
    let lastScroll = 0;
    const nav = document.querySelector("#navbar");
    const div = document.querySelector("#myName");
    let hasShown = false;

    // Add null check
    if (nav && div) {
        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;

            if (hasShown) {
                nav.style.top = "0";
                div.style.top = "0";
                return;
            }

            if (currentScroll > lastScroll) {
                nav.style.top = "0";
                div.style.top = "0";
                hasShown = true;
            } else {
                nav.style.top = "-80px";
                div.style.top = "-80px";
            }

            lastScroll = currentScroll;
        });
    } else {
        console.error('Navbar or myName element not found');
    }

    console.log("working...")

    // Hover effect
    const hoverTargets = document.querySelectorAll('.hover-target');
    const popup = document.getElementById('cursor-image-popup');
    const popupImg = document.getElementById('popup-img');

    if (popup && popupImg) {
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
    }

    // GSAP animations
    const navItems = document.querySelectorAll("#navbar ul li");
    if (navItems.length > 0) {
        gsap.to("#navbar ul li", {
            opacity: 0
        });
        gsap.from("#navbar ul li", {
            opacity: 1,
            stagger: 1.3
        });
    }

    // Liquid effect - ADD NULL CHECK HERE
    const text = document.querySelector("text");
    if (text) {
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
    } else {
        console.error('SVG text element not found');
    }

    // Slider function
    function slider() {
        const banner = document.querySelector(".banner");
        if (!banner) {
            console.error('Banner element not found');
            return;
        }

        var sliderAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".banner",
                start: "50% 95%",
                end: "50% 65%",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });
        
        sliderAnimation.from(".banner", {
            opacity: 0,
            duration: 0.1,
            scale: 0
        });
        
        sliderAnimation.to(".banner", {
            opacity: 1,
            duration: 0.01,
            scale: 1,
            ease: "expoScale(0.5,7,none)"
        });
    }

    // Initialize slider after delay
    setTimeout(() => {
        slider();
        console.log('✅ Slider animation initialized');
    }, 1000);
});