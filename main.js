// Modern Portfolio JavaScript - Multi-Page Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('.theme-icon');
        
        if (!themeToggle || !themeIcon) return;

        // Check for saved theme preference or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update icon based on current theme
        updateThemeIcon(themeIcon, currentTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(themeIcon, newTheme);
        });
    }

    function updateThemeIcon(icon, theme) {
        icon.name = theme === 'dark' ? 'sunny-outline' : 'moon-outline';
    }

    // Floating Action Button
    function initFAB() {
        const fab = document.getElementById('fab-contact');
        if (!fab) return;

        fab.addEventListener('click', function() {
            // Scroll to contact section or open contact modal
            const contactSection = document.querySelector('.contact-content, .contact-cta');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Redirect to contact page if not on current page
                window.location.href = 'contact.html';
            }
        });
    }

    // Scroll Progress Indicator
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Particles.js Configuration
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#3b82f6' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
                },
                retina_detect: true
            });
        }
    }

    // Enhanced Typing Animation
    function initTypingAnimation() {
        const roleElement = document.querySelector('.role-text');
        if (!roleElement) return;

        const roles = JSON.parse(roleElement.getAttribute('data-roles') || '["Full-Stack Developer"]');
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function typeRole() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before next role
            }

            setTimeout(typeRole, typeSpeed);
        }

        typeRole();
    }

    // Enhanced Counter Animation
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat h4, .counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    
                    animateCounter(counter, 0, target, suffix, 2000);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * easeOutCubic(progress));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Enhanced Floating Icons Interaction
    function initFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(1.5) rotate(360deg)';
                this.style.filter = 'drop-shadow(0 0 20px var(--primary-blue))';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.filter = '';
                }, 600);
            });

            // Add hover sound effect (visual feedback)
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });

            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Smooth scroll for scroll indicator
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.quick-about, .about-content, .skills-content, .projects-grid');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Skills animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width;
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Project filtering
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact form functionality
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:narnavarammanideep@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Email Opened!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // FAQ functionality
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-category, .contact-item, .achievement-card, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    // Typing animation for hero title
    function initTypingAnimation() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        const highlightedText = text.replace('Manideep Narnavaram', '<span class="highlight">Manideep Narnavaram</span>');
        
        titleElement.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                if (text.substring(i, i + 20) === 'Manideep Narnavaram') {
                    titleElement.innerHTML += '<span class="highlight">Manideep Narnavaram</span>';
                    i += 20;
        } else {
                    titleElement.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        if (floatingIcons.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 0.1;
                icon.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize all functionality
    function init() {
        // Core functionality
        animateSkills();
        initProjectFilter();
        initContactForm();
        initFAQ();
        initScrollAnimations();
        initSmoothScrolling();
        
        // New enhanced features
        initThemeToggle();
        initFAB();
        initScrollProgress();
        initParticles();
        initTypingAnimation();
        initCounterAnimation();
        initFloatingIcons();
        initScrollIndicator();
        initParallaxEffect();
    }

    // Run initialization
    init();

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
});

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Handle page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to page content
    const pageContent = document.querySelector('main, section');
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pageContent.style.transition = 'all 0.6s ease';
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }, 100);
    }
});