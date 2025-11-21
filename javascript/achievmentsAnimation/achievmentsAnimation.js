import { awards } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

    const awardsListContainer = document.querySelector(".awards-list");
    const awardsList = document.querySelector(".awards-list");

    const POSITIONS = {
        BOTTOM: 0,
        MIDDLE: -80,
        TOP: -160,
    };

    let lastMousePosition = { x: 0, y: 0 };
    let activeAward = null;
    let ticking = false;

    // Create award elements
    awards.forEach((award) => {
        const awardElement = document.createElement("div");
        awardElement.className = "award";

        awardElement.innerHTML = `
            <div class="award-wrapper">
                <div class="award-name">
                    <h1>${award.name}</h1>
                    <h1>${award.type}</h1>
                </div>
                <div class="award-project">
                    <h1>${award.project}</h1>
                    <h1>${award.label}</h1>
                </div>
                <div class="award-name">
                    <h1>${award.name}</h1>
                    <h1>${award.type}</h1>
                </div>
            </div>
        `;
        awardsListContainer.appendChild(awardElement);
    });

    const awardsElements = document.querySelectorAll(".award");

    // Initialize all wrappers to TOP position
    awardsElements.forEach((award) => {
        const wrapper = award.querySelector(".award-wrapper");
        gsap.set(wrapper, { y: POSITIONS.TOP });
    });

    const updateAwards = () => {
        if (activeAward) {
            const rect = activeAward.getBoundingClientRect();
            const isStillOver =
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if (!isStillOver) {
                const wrapper = activeAward.querySelector(".award-wrapper");
                const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                    duration: 0.4,
                    ease: "power2.out",
                });
                activeAward = null;
            }
        }

        awardsElements.forEach((award) => {
            if (award === activeAward) return;

            const rect = award.getBoundingClientRect();
            const isMouseOver =
                lastMousePosition.x >= rect.left &&
                lastMousePosition.x <= rect.right &&
                lastMousePosition.y >= rect.top &&
                lastMousePosition.y <= rect.bottom;

            if (isMouseOver) {
                const wrapper = award.querySelector(".award-wrapper");

                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                });
                activeAward = award;
            }
        });

        ticking = false;
    };

    document.addEventListener("mousemove", (e) => {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;

        if (!ticking) {
            requestAnimationFrame(updateAwards);
            ticking = true;
        }
    });

    // Connect Lenis scroll to GSAP ScrollTrigger (if you want to add more animations)
    lenis.on('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateAwards);
            ticking = true;
        }
    });

    // Individual award interactions
    awardsElements.forEach((award) => {
        const wrapper = award.querySelector(".award-wrapper");
        let currentPosition = POSITIONS.TOP;

        award.addEventListener("mouseenter", (e) => {
            activeAward = award;
            const rect = award.getBoundingClientRect();
            const enterFromTop = e.clientY < rect.top + rect.height / 2;

            if (enterFromTop || currentPosition === POSITIONS.TOP) {
                currentPosition = POSITIONS.MIDDLE;

                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }
        });

        award.addEventListener("mouseleave", (e) => {
            if (activeAward === award) {
                activeAward = null;
            }
            
            const rect = award.getBoundingClientRect();
            const leavingFromTop = e.clientY < rect.top + rect.height / 2;

            currentPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;

            gsap.to(wrapper, {
                y: currentPosition,
                duration: 0.4,
                ease: "power2.out",
            });
        });
    });
});