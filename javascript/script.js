
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

let lastScroll = 0;
const nav = document.querySelector("#navbar");
const div = document.querySelector("#myName");
let hasShown = false; // once shown, it won't hide again

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // if already shown once, keep it visible
    if (hasShown) {
        nav.style.top = "0";
        div.style.top = "0";
        return;
    }

    // scroll down → show navbar
    if (currentScroll > lastScroll) {
        nav.style.top = "0";
        div.style.top = "0";
        hasShown = true; // lock it
    }
    // scroll up → hide navbar (only before it's locked)
    else {
        nav.style.top = "-80px"; // adjust based on navbar height
        div.style.top = "-80px"; // adjust based on navbar height
    }

    lastScroll = currentScroll;
});
console.log("working...")


document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all elements that trigger the hover effect
    const hoverTargets = document.querySelectorAll('.hover-target');
    const popup = document.getElementById('cursor-image-popup');
    const popupImg = document.getElementById('popup-img');

    // 2. Event Listeners for each target
    hoverTargets.forEach(target => {

        // --- MOUSE ENTER (SHOW) ---
        target.addEventListener('mouseenter', () => {
            const imageUrl = target.getAttribute('data-image-url');
            if (imageUrl) {
                // Set the correct image source and show the pop-up
                popupImg.src = imageUrl;
                popup.classList.add('active-popup');
            }
        });

        // --- MOUSE LEAVE (HIDE) ---
        target.addEventListener('mouseleave', () => {
            // Hide the pop-up
            popup.classList.remove('active-popup');
            // Optional: Clear the source to save memory
            // popupImg.src = "";
        });

        // --- MOUSE MOVE (TRACK) ---
        target.addEventListener('mousemove', (e) => {
            popup.style.left = e.clientX + 'px';
            popup.style.top = e.clientY + 'px';
        });
    });
});

// animation part 

gsap.to("#navbar ul li", {
    opacity:0
})
gsap.from("#navbar ul li", {
    opacity:1,
    stagger: 1.3
})

// liquid effect
const text = document.querySelector("text");
const textLength = text.getComputedTextLength();

// Hide text initially
text.style.strokeDasharray = textLength;
text.style.strokeDashoffset = textLength;

// Animate stroke reveal
gsap.to(text, {
    strokeDashoffset: 0,
    duration: 3,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true // can add continuous liquid effect
});


function slider() {
    var sliderAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".banner",
            start: "50% 95%",
            end: "50% 65%",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true
        }
    })
    sliderAnimation.from(".banner", {
        opacity: 0,
        duration: 0.1,
        scale: 0
    })
    sliderAnimation.to(".banner", {
        opacity: 1,
        duration: 0.01,
        scale: 1,
        ease: "expoScale(0.5,7,none)"
    })
}

// Wait for page load + delay
window.addEventListener('load', () => {
    setTimeout(() => {
        slider();
        console.log('✅ Slider animation initialized');
    }, 1000);
});
