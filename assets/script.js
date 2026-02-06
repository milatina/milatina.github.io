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

    // THE NUCLEUS (Gold/Feminine)
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xbda06d, wireframe: true, transparent: true, opacity: 0.4 
    });
    bioCell = new THREE.Mesh(coreGeo, coreMat);
    scene.add(bioCell);

    // THE SHELL (Navy/Masculine)
    const shellGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0x0a192f, wireframe: true, transparent: true, opacity: 0.15 
    });
    outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);

    camera.position.z = 6;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0015;
    const pulse = 1 + Math.sin(time * 2) * 0.08; 
    
    bioCell.scale.set(pulse, pulse, pulse);
    bioCell.rotation.y += 0.004 + (mouseX * 0.00005);
    
    outerShell.scale.set(1.1/pulse, 1.1/pulse, 1.1/pulse);
    outerShell.rotation.y -= 0.002;

    renderer.render(scene, camera);
}

// Interactivity & Parallax
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
});

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const botLayer = document.getElementById('botanical-layer');
    if(botLayer) {
        botLayer.style.transform = `translateY(${scroll * 0.4}px)`;
    }
});

init();
