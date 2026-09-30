// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });

    // 3. Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left');
    
    // Apply animation delays from style attributes
    animatedElements.forEach(el => {
        const delay = el.style.getPropertyValue('--delay');
        if (delay) {
            el.style.transitionDelay = delay;
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove class when out of view so it animates again when scrolling back
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Update Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
    
    // 5. Organization Filtering (Simple Demo)
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            // In a real app, this would filter the DOM elements.
            // For now, we'll just add a simple flash effect to simulate changing content
            const orgGrid = document.querySelector('.org-grid');
            orgGrid.style.opacity = '0.3';
            setTimeout(() => {
                orgGrid.style.opacity = '1';
            }, 300);
        });
    });

    // 6. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Check saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        }
        
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            
            if (currentTheme !== 'dark') {
                newTheme = 'dark';
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Toggle Icon
            if (newTheme === 'dark') {
                themeIcon.classList.remove('ri-moon-line');
                themeIcon.classList.add('ri-sun-line');
            } else {
                themeIcon.classList.remove('ri-sun-line');
                themeIcon.classList.add('ri-moon-line');
            }
        });
    }

});
