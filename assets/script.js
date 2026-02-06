// 1. GLOBAL VARIABLES
let scene, camera, renderer, bioCell, outerShell;

// 2. INITIALIZATION FUNCTION
function init() {
    console.log("System: Initializing Bio-Core...");

    // Create Scene
    scene = new THREE.Scene();

    // Setup Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Inject into the HTML container
    const container = document.getElementById('canvas-container');
    if (container) {
        container.appendChild(renderer.domElement);
    } else {
        console.error("Error: 'canvas-container' not found in HTML.");
        return;
    }

    // 3. CREATE THE BIO-GEOMETRY
    // Inner "Nucleus"
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
    });
    bioCell = new THREE.Mesh(coreGeo, coreMat);
    scene.add(bioCell);

    // Outer "Data Field" (Green)
    const shellGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0x00FF41, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.1 
    });
    outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);

    // Start Animation Loop
    animate();
}

// 4. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0015;
    
    // The "Pulse" logic
    const pulse = 1 + Math.sin(time * 2) * 0.1; 
    
    if (bioCell && outerShell) {
        // Pulse the scales
        bioCell.scale.set(pulse, pulse, pulse);
        outerShell.scale.set(1.1 / pulse, 1.1 / pulse, 1.1 / pulse);

        // Slow organic rotations
        bioCell.rotation.y += 0.003;
        outerShell.rotation.y -= 0.002;
        outerShell.rotation.z += 0.002;
    }

    renderer.render(scene, camera);
}

// 5. WINDOW RESIZE HANDLING
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// 6. SAFETY START
// This ensures the script waits until the library is fully ready
window.onload = () => {
    if (typeof THREE !== 'undefined') {
        init();
    } else {
        console.error("System Error: Three.js library failed to load.");
    }
};
