const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

themeToggle.onclick = () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
};

if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');

mobileToggle.onclick = () => mobileMenu.classList.toggle('active');

function setupModal(openBtn, modalId, closeBtn) {
    document.getElementById(openBtn).onclick = () => document.getElementById(modalId).classList.add('active');
    document.getElementById(closeBtn).onclick = () => document.getElementById(modalId).classList.remove('active');
}

setupModal('open-privacy', 'privacyPolicyModal', 'close-privacy');
setupModal('open-imprint', 'imprintModal', 'close-imprint');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = () => mobileMenu.classList.remove('active');
});