document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Logic ---
    const themeToggle = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- On-Scroll Animation Logic ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // --- Skill Bar Animation Logic ---
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                const skillLevels = document.querySelectorAll('.skill-level');
                skillLevels.forEach(skill => {
                    const level = skill.getAttribute('data-level');
                    skill.style.width = level + '%';
                });
                skillsAnimated = true;
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // --- NEW: Hide Toggle on Scroll Down ---
    const toggleWrapper = document.querySelector('.theme-switch-wrapper');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            // Scrolling Down
            toggleWrapper.classList.add('hidden');
        } else {
            // Scrolling Up
            toggleWrapper.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

});
