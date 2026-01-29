document.getElementById("year").textContent = new Date().getFullYear();
const sigil = document.querySelector('.cursor-sigil');

document.addEventListener('mousemove', (e) => {
    // Moves the sigil to your mouse position
    sigil.style.transform = `translate3d(${e.clientX - 40}px, ${e.clientY - 40}px, 0) rotate(${window.scrollY / 5}deg)`;
});
