const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('modal-overlay');
const btt = document.getElementById('back-to-top');

const toggleTheme = () => {
    body.classList.toggle('light-mode');
    const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', mode);
};

if (localStorage.getItem('portfolio-theme') === 'light') {
    body.classList.add('light-mode');
}

themeToggle.onclick = toggleTheme;

mobileToggle.onclick = () => {
    mobileMenu.classList.toggle('active');
    mobileToggle.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
};

window.onclick = (e) => {
    if (e.target === overlay) closeAllModals();
};

const openModal = (id) => {
    document.getElementById(id).classList.add('active');
    overlay.style.display = 'block';
    body.style.overflow = 'hidden';
};

const closeAllModals = () => {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    overlay.style.display = 'none';
    body.style.overflow = 'auto';
};

document.getElementById('open-privacy').onclick = () => openModal('privacyPolicyModal');
document.getElementById('open-imprint').onclick = () => openModal('imprintModal');
document.getElementById('close-privacy').onclick = closeAllModals;
document.getElementById('close-imprint').onclick = closeAllModals;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.onscroll = () => {
    if (window.scrollY > 500) {
        btt.style.display = 'block';
    } else {
        btt.style.display = 'none';
    }
};

btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.onclick = () => {
        mobileMenu.classList.remove('active');
        mobileToggle.innerHTML = '☰';
    };
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
});

console.log('Portfolio initialized.');