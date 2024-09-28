document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-list a');
    const sections = document.querySelectorAll('section');

    // Function to remove 'active' class from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to add 'active' class to the clicked link
    function addActiveClass(link) {
        link.classList.add('active');
    }

    // Smooth scrolling to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            removeActiveClass();
            addActiveClass(link);
        });
    });

    // Highlight the current section on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60px offset for header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
