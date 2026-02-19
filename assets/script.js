let scene, camera, renderer, bioCell, outerShell;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const container = document.getElementById('canvas-container');
    if (container) { container.appendChild(renderer.domElement); }

    // THE NUCLEUS (Inner Breathing Shell)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, wireframe: true, transparent: true, opacity: 0.25 
    });
    bioCell = new THREE.Mesh(coreGeo, coreMat);
    scene.add(bioCell);

    // THE OUTER PULSE
    const shellGeo = new THREE.SphereGeometry(2.8, 16, 16);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, wireframe: true, transparent: true, opacity: 0.05 
    });
    outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);

    camera.position.z = 6;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Smooth Breathing Pulse
    const pulse = 1 + Math.sin(time * 1.5) * 0.1; 
    
    bioCell.scale.set(pulse, pulse, pulse);
    bioCell.rotation.y += 0.002;
    bioCell.rotation.x += 0.001;
    
    outerShell.scale.set(1.2/pulse, 1.2/pulse, 1.2/pulse);
    outerShell.rotation.y -= 0.001;

    renderer.render(scene, camera);
}

// Global Interactions
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
