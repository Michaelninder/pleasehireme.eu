const doc = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('modal-overlay');
const btt = document.getElementById('back-to-top');

const applyTheme = (theme) => {
    theme === 'light' ? body.classList.add('light-mode') : body.classList.remove('light-mode');
    localStorage.setItem('hire-theme', theme);
};

if (localStorage.getItem('hire-theme') === 'light') applyTheme('light');

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    applyTheme(isLight ? 'dark' : 'light');
});

mobileToggle.onclick = () => {
    mobileMenu.classList.toggle('active');
    mobileToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
};

const manageModal = (id, action) => {
    const modal = document.getElementById(id);
    modal.style.display = action === 'open' ? 'block' : 'none';
    overlay.style.display = action === 'open' ? 'block' : 'none';
    body.style.overflow = action === 'open' ? 'hidden' : 'auto';
};

document.getElementById('open-privacy').onclick = () => manageModal('privacyPolicyModal', 'open');
document.getElementById('open-imprint').onclick = () => manageModal('imprintModal', 'open');
document.getElementById('close-privacy').onclick = () => manageModal('privacyPolicyModal', 'close');
document.getElementById('close-imprint').onclick = () => manageModal('imprintModal', 'close');

overlay.onclick = () => {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    overlay.style.display = 'none';
    body.style.overflow = 'auto';
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(section => scrollObserver.observe(section));

window.onscroll = () => {
    btt.style.display = window.scrollY > 800 ? 'block' : 'none';
};

btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.onclick = () => {
        mobileMenu.classList.remove('active');
        mobileToggle.textContent = '☰';
    };
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.click();
});