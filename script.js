// Hero Slideshow with performance optimizations
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds
    let slideTimer = null;
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-advance slides with requestAnimationFrame for better performance
    function startSlideshow() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Pause slideshow when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (slideTimer) {
                clearInterval(slideTimer);
                slideTimer = null;
            }
        } else {
            if (!slideTimer) {
                startSlideshow();
            }
        }
    });
    
    // Start slideshow
    startSlideshow();
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Make first section visible immediately
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    initSlideshow();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            mainNav.classList.toggle('active');
            
            // Update aria-expanded attribute
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Contact Form Handling with Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        function validateName(name) {
            return name.trim().length >= 2;
        }
        
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function validatePhone(phone) {
            if (!phone) return true; // Phone is optional
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
        }
        
        function validateMessage(message) {
            return message.trim().length >= 10;
        }
        
        function showError(inputId, message) {
            const errorElement = document.getElementById(inputId + 'Error');
            const input = document.getElementById(inputId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            if (input) {
                input.classList.add('error');
            }
        }
        
        function clearError(inputId) {
            const errorElement = document.getElementById(inputId + 'Error');
            const input = document.getElementById(inputId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            if (input) {
                input.classList.remove('error');
            }
        }
        
        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                if (!validateName(this.value)) {
                    showError('name', 'Please enter your full name');
                } else {
                    clearError('name');
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (!validateEmail(this.value)) {
                    showError('email', 'Please enter a valid email address');
                } else {
                    clearError('email');
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !validatePhone(this.value)) {
                    showError('phone', 'Please enter a valid phone number');
                } else {
                    clearError('phone');
                }
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                if (!validateMessage(this.value)) {
                    showError('message', 'Please enter a message (at least 10 characters)');
                } else {
                    clearError('message');
                }
            });
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            ['name', 'email', 'phone', 'message'].forEach(id => clearError(id));
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Validate all fields
            let isValid = true;
            
            if (!validateName(name)) {
                showError('name', 'Please enter your full name');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (phone && !validatePhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            if (!validateMessage(message)) {
                showError('message', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.setAttribute('aria-busy', 'true');
            
            // Send form data to API with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone || '',
                    message: message
                }),
                signal: controller.signal
            })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Show success message
                const formMessage = document.getElementById('formMessage');
                if (formMessage) {
                    formMessage.textContent = data.message || 'Thanks for reaching out! We\'ll get back to you soon.';
                    formMessage.classList.add('success');
                    formMessage.setAttribute('role', 'status');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Clear all errors
                    ['name', 'email', 'phone', 'message'].forEach(id => clearError(id));
                    
                    // Scroll to message for better UX
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide message after 5 seconds
                    setTimeout(function() {
                        formMessage.classList.remove('success');
                        formMessage.textContent = '';
                    }, 5000);
                }
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Error:', error);
                const formMessage = document.getElementById('formMessage');
                if (formMessage) {
                    if (error.name === 'AbortError') {
                        formMessage.textContent = 'Request timed out. Please check your connection and try again, or call us directly at (919) 908-7298.';
                    } else {
                        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or call us directly at (919) 908-7298.';
                    }
                    formMessage.classList.add('error');
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.color = '#721c24';
                    formMessage.style.border = '1px solid #f5c6cb';
                    formMessage.setAttribute('role', 'alert');
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            })
            .finally(() => {
                // Restore button state
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.setAttribute('aria-busy', 'false');
                submitButton.textContent = originalButtonText;
            });
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Image loading animation with error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                // Add error class for styling if needed
                this.classList.add('error');
                console.warn('Image failed to load:', this.src);
            });
        }
    });
    
    // Lazy load images using Intersection Observer (if not already using native lazy loading)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scroll enhancement for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
