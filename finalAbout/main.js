// ===== CONFIGURATION =====
const MODEL_PATH = 'robot.glb'; // Change this to your model path

let scene, camera, renderer, model, mixer, controls;
let isHoveringModel = false;
let clock = new THREE.Clock();
let shadowPlane;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // Camera
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 10);
    camera.lookAt(0, 1, 0);

    // Renderer
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting - minimal and clean
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 5, 5);
    dir.castShadow = true;
    scene.add(dir);

    const p1 = new THREE.PointLight(0x667eea, 1.2, 50);
    p1.position.set(-5, 2, 4);
    scene.add(p1);

    const p2 = new THREE.PointLight(0x764ba2, 0.8, 50);
    p2.position.set(5, -2, -4);
    scene.add(p2);

    // Shadow plane - subtle
    // const shadowGeometry = new THREE.PlaneGeometry(20, 20);
    // const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    // shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
    // shadowPlane.rotation.x = -Math.PI / 2;
    // shadowPlane.position.y = 0;
    // shadowPlane.receiveShadow = true;
    // scene.add(shadowPlane);

    // OrbitControls (disabled by default)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enabled = false;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI * 2;

    // Events
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseout', () => {
        isHoveringModel = false;
        controls.enabled = false;
        renderer.domElement.style.cursor = 'default';
    });

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    // Load model
    loadModel();

    // Observe text blocks
    observeTextBlocks();

    animate();
}

function loadModel() {
    const loader = new THREE.GLTFLoader();

    loader.load(
        MODEL_PATH,
        (gltf) => {
            model = gltf.scene;

            // Enable shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            model.position.set(0, -4, 0);
            model.scale.set(2, 2, 2);
            scene.add(model);


            // Play animation
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }

            model.traverse((n) => {
                if (n.isMesh) {
                    n.castShadow = true;
                    n.receiveShadow = true;
                }
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('Error loading model:', error);
        }
    );
}


function onMouseMove(event) {
    if (!model) return;

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {
        isHoveringModel = true;
        controls.enabled = true;
        renderer.domElement.style.cursor = 'grab';
    } else {
        isHoveringModel = false;
        controls.enabled = false;
        renderer.domElement.style.cursor = 'default';
    }
}

function onScroll() {
    if (!model) return;

    const scrollPercent = window.scrollY / (document.body.offsetHeight - window.innerHeight);

    // Scale model from 1 to 2.5 (reduced max scale to prevent cutoff)
    const scale = 2 + scrollPercent * 2.80;
    model.scale.set(scale, scale, scale);

    // Scale shadow
    const shadowScale = 1 + scrollPercent * 1.5;
    shadowPlane.scale.set(shadowScale, shadowScale, 1);
}

function observeTextBlocks() {
    const options = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    if (controls.enabled) {
        controls.update();
    }

    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();