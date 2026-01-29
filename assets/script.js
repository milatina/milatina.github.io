let scene, camera, renderer, core, shell;
let currentLang = 'en';

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bio-canvas'), 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry 1: The Inner "Nucleus"
    const coreGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.2 
    });
    core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    // Geometry 2: The "Biological Shield"
    const shellGeom = new THREE.SphereGeometry(2.5, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({ 
        color: 0x00FF41, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
    });
    shell = new THREE.Mesh(shellGeom, shellMat);
    scene.add(shell);

    camera.position.z = 6;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    
    // Simulating a 60 BPM pulse
    const pulse = 1 + Math.sin(time * 2) * 0.05;
    
    core.scale.set(pulse, pulse, pulse);
    shell.scale.set(1/pulse, 1/pulse, 1/pulse);
    
    core.rotation.y += 0.005;
    shell.rotation.y -= 0.002;
    shell.rotation.z += 0.002;

    renderer.render(scene, camera);
}

// Language Toggle Logic
document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = currentLang === 'en' ? 'block' : 'none');
    document.querySelectorAll('.lang-fr').forEach(el => el.style.display = currentLang === 'fr' ? 'block' : 'none');
});

// Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initializing with a slight delay for the "loader" effect
window.onload = () => {
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.getElementById('loader').style.opacity = '0';
        init();
    }, 1000);
};
