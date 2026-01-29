let scene, camera, renderer, bioCell, outerShell;

function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // 2. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Injecting the canvas into our specific container
    const container = document.getElementById('canvas-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    // 3. Create Inner Core (The Bio-Pulse)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.12 
    });
    bioCell = new THREE.Mesh(coreGeo, coreMat);
    scene.add(bioCell);

    // 4. Create Outer Shell (The Data-Field)
    const shellGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0x00FF41, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.08 
    });
    outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);

    camera.position.z = 6;
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Calculate time-based pulse (Approx 60-70 BPM)
    const time = Date.now() * 0.0015;
    const pulse = 1 + Math.sin(time * 2) * 0.1; 
    
    // Animate Inner Core
    bioCell.scale.set(pulse, pulse, pulse);
    bioCell.rotation.y += 0.004;

    // Animate Outer Shell in opposite direction
    outerShell.scale.set(1.1/pulse, 1.1/pulse, 1.1/pulse);
    outerShell.rotation.y -= 0.002;
    outerShell.rotation.z += 0.003;

    renderer.render(scene, camera);
}

// Ensure the site stays responsive on mobile/desktop resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the engine
init();
