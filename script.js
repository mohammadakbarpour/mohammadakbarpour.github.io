document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Logic ---
    const themeToggle = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on page load
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Listen for toggle switch changes
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
                // Optional: Stop observing after it becomes visible for performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        observer.observe(el);
    });


    // --- Skill Bar Animation Logic (triggered by Intersection Observer) ---
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
});
