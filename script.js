document.addEventListener('DOMContentLoaded', () => {

    // --- On-Scroll Animation Logic ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    // --- Skill Bar Animation Logic ---
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false; // Flag to ensure animation runs only once

    const animateSkillBars = () => {
        if (!skillsAnimated && elementInView(skillsSection)) {
            const skillLevels = document.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.width = level + '%';
            });
            skillsAnimated = true; // Set flag to true after animation
        }
    };
    
    // --- Event Listeners ---
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        animateSkillBars();
    });

    // Initial check on page load
    handleScrollAnimation();
    animateSkillBars();

});