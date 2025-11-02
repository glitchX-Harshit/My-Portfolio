
// lenis smooth scrolling effect loop
const lenis = new Lenis();

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


container.addEventListener('mouseleave', () => {
    textWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
});

container.addEventListener('mouseleave', () => {
    // Reset to original position smoothly
    textWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
});



// var mainPage = document.querySelector('#main')
// var cursor = document.querySelector('#cursor')

// mainPage.addEventListener("mousemove", function (dets) {
//     gsap.to(cursor, {
//         x: dets.x,
//         y: dets.y
//     })
// })

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.scroll-to-home, .scroll-to-aboutme, .scroll-to-services');

    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // ❌ Prevent default anchor jump

            let targetDiv;

            if (button.classList.contains('scroll-to-home')) {
                targetDiv = document.querySelector('#home');

            } else if (button.classList.contains('scroll-to-aboutme')) {
                targetDiv = document.querySelector('#aboutme');

            } else if (button.classList.contains('scroll-to-services')) {
                targetDiv = document.querySelector('#services');
            }

            if (targetDiv) {
                targetDiv.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});



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

function miniAboutAnimation(val) {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: val,
            start: "50% 99%",
            end: "50% 20%",
            scrub: true,
            // markers: true,
            stagger: 1
        }
    })

    tl.from(val, {
        y: 100,
        opacity: 0,
        duration: 2.5,
        delay: 0.3,
        stagger: 1,
    })

    tl.to(".miniAbout", {
        y: -100,
        opacity: 0,
        duration: 2.5,
        delay: 0.8,
        stagger: 1,
    })
}
miniAboutAnimation(".miniAbout")
miniAboutAnimation(".about-me-paragraph")


function aboutMe() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".aboutme_heading",
            start: "50% 100%",
            end: "50% 5%",
            scrub: true
        }
    })

    tl2.from(".aboutme_heading", {
        x: -150,
        scale: 1.1,
        opacity: 0,
        duration: 2
    })

    const splitText = document.querySelector('.btn-split .text-wrapper');
    const text = splitText.dataset.text;
    splitText.innerHTML = '';

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        splitText.appendChild(span);
    });

    gsap.to(".btn-split .char", {
        scrollTrigger: {
            trigger: ".btn-split",
            start: "top 93%",
            end: "top 79%",
            scrub: 1,
        },
        opacity: 1,
        y: 0,
        rotation: 0,
        stagger: 0.05,
        ease: "back.out(2)"
    });
}
aboutMe();

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
slider()
