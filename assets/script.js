// Minimal Ring Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
});

// Three.js Breathing Geometry
let scene, camera, renderer, bioCell;
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.3 });
    bioCell = new THREE.Mesh(geo, mat);
    scene.add(bioCell);
    camera.position.z = 5;
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    const pulse = 1 + Math.sin(Date.now() * 0.0015) * 0.08;
    bioCell.scale.set(pulse, pulse, pulse);
    bioCell.rotation.y += 0.003;
    renderer.render(scene, camera);
}
init();
