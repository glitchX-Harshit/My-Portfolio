const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const body = document.body;
const totalDuration = 3000; // 16 seconds (4s per text × 4)

// Wait for animation to complete
setTimeout(() => {
    // Fade out loading screen
    loadingScreen.style.opacity = '0';

    // After fade out completes
    setTimeout(() => {
        // Remove loading screen
        loadingScreen.style.display = 'none';

        // Enable scrolling
        body.classList.remove('loading');

        // Show main content with fade in
        mainContent.classList.add('visible');

        // Optional: Trigger any Three.js animations here
        // e.g., startThreeJsAnimation();

    }, 500); // Wait for fade out transition
}, totalDuration);