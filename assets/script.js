let scene, camera, renderer, bioCell, outerShell;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const container = document.getElementById('canvas-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    // INNER CORE
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 
    });
    bioCell = new THREE.Mesh(coreGeo, coreMat);
    scene.add(bioCell);

    // OUTER DATA FIELD
    const shellGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0x00FF41, wireframe: true, transparent: true, opacity: 0.08 
    });
    outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);

    camera.position.z = 6;
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0015;
    const pulse = 1 + Math.sin(time * 2) * 0.1; 
    
    // BioCell reacts to pulse and subtle mouse movement
    bioCell.scale.set(pulse, pulse, pulse);
    bioCell.rotation.y += 0.004 + (mouseX * 0.0001);
    bioCell.rotation.x += (mouseY * 0.0001);

    // Outer shell counter-rotation
    outerShell.scale.set(1.1/pulse, 1.1/pulse, 1.1/pulse);
    outerShell.rotation.y -= 0.002;

    renderer.render(scene, camera);
}

// Track mouse for "Intervention" effect
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
