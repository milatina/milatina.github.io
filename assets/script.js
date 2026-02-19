// High-Speed Cursor
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX - 13 + 'px';
    outline.style.top = e.clientY - 13 + 'px';
});

// THE DUAL ORBIT GEOMETRY
let scene, camera, renderer, innerNucleus, outerShell;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 1. INNER NUCLEUS (White Wireframe)
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.3 });
    innerNucleus = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerNucleus);

    // 2. OUTER SHELL (Gold Wireframe)
    const outerGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0xbda06d, wireframe: true, transparent: true, opacity: 0.1 });
    outerShell = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerShell);

    camera.position.z = 6;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Opposing pulse for high-end look
    const pulseInner = 1 + Math.sin(time * 2) * 0.05;
    const pulseOuter = 1 + Math.cos(time * 2) * 0.05;

    innerNucleus.scale.set(pulseInner, pulseInner, pulseInner);
    innerNucleus.rotation.y += 0.005;

    outerShell.scale.set(pulseOuter, pulseOuter, pulseOuter);
    outerShell.rotation.y -= 0.002;
    outerShell.rotation.x += 0.002;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
