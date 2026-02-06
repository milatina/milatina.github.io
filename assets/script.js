// Inside your init() function, update the materials:

// THE NUCLEUS (Gold Wireframe)
const coreMat = new THREE.MeshBasicMaterial({ 
    color: 0xbda06d, // Gold
    wireframe: true, 
    transparent: true, 
    opacity: 0.3 
});

// THE SHELL (Navy Outlines)
const shellMat = new THREE.MeshBasicMaterial({ 
    color: 0x0a192f, // Navy
    wireframe: true, 
    transparent: true, 
    opacity: 0.1 
});

// ADD PARALLAX TO THE BACKGROUND LAYER
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    document.getElementById('botanical-layer').style.transform = `translateY(${scroll * 0.3}px)`;
});
