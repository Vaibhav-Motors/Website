// --- Scroll Animations Observer ---
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Optional: unobserve after animating once
                        // observer.unobserve(entry.target); 
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));
        });

        // --- Header Scroll Effect ---
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // --- Mobile Menu Toggle ---
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navMenu.classList.contains('active') ? 'fa-times' : 'fa-bars';
            mobileMenuBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // --- Support Modal Logic ---
        const supportBtn = document.getElementById('supportBtn');
        const supportModal = document.getElementById('supportModal');
        const closeModal = document.getElementById('closeModal');
        
        supportBtn.addEventListener('click', () => {
            supportModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', () => {
            supportModal.classList.remove('active');
        });
        
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) {
                supportModal.classList.remove('active');
            }
        });