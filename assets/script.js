let scene, camera, renderer, bioCell, outerShell;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

// ... keep your init() function exactly as it is ...

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0015;
    
    // 1. THE PULSE (The Biological Foundation)
    const pulse = 1 + Math.sin(time * 2) * 0.1; 
    
    // 2. THE INTERVENTION (Mouse Reaction)
    // This makes the cell subtly follow the user's presence
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    bioCell.rotation.x += 0.05 * (targetY - bioCell.rotation.x);
    bioCell.rotation.y += 0.05 * (targetX - bioCell.rotation.y);

    // 3. ANIMATE LAYERS
    bioCell.scale.set(pulse, pulse, pulse);
    
    // Outer Shell reacts to pulse in opposition (The "Breathing" effect)
    const shellPulse = 1.1 / pulse;
    outerShell.scale.set(shellPulse, shellPulse, shellPulse);
    
    outerShell.rotation.y -= 0.002;
    outerShell.rotation.z += 0.003;

    renderer.render(scene, camera);
}

// 4. NEW: ADD THE "PRESENCE" TRACKER
window.addEventListener('mousemove', (event) => {
    // Centers the mouse coordinates
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
});

// ... keep your resize listener ...
init();
