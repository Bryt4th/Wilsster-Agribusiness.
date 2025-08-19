document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded, initializing scripts...");

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-times');
            icon.classList.toggle('fa-bars');
        });

        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.toggle('fa-times');
                    icon.classList.toggle('fa-bars');
                }
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.style.boxShadow = window.scrollY > 100 ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none';
        }
    });

    // Custom Cursor (Desktop Only)
    const initCustomCursor = () => {
        if (window.innerWidth > 768) {
            console.log("Initializing custom cursor for desktop");
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            const cursorFollower = document.createElement('div');
            cursorFollower.className = 'custom-cursor-follower';
            document.body.appendChild(cursorFollower);

            // Move cursor
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            });

            // Click effect
            document.addEventListener('click', () => {
                cursor.classList.add('active');
                setTimeout(() => cursor.classList.remove('active'), 300);
            });

            // Hover effects for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"], input[type="submit"], input[type="button"]');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (element.classList.contains('btn')) {
                        cursor.classList.add('hover-button');
                        cursorFollower.classList.add('hover-button');
                    } else {
                        cursor.classList.add('hover-link');
                        cursorFollower.classList.add('hover-link');
                    }
                });
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover-link', 'hover-button');
                    cursorFollower.classList.remove('hover-link', 'hover-button');
                });
            });

            // Responsive behavior
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 768) {
                    document.body.style.cursor = 'auto';
                    cursor.style.display = 'none';
                    cursorFollower.style.display = 'none';
                } else {
                    document.body.style.cursor = 'none';
                    cursor.style.display = 'block';
                    cursorFollower.style.display = 'block';
                }
            });
        }
    };

    initCustomCursor();

    // Auto-rotating Slideshow
    const initSlideshow = () => {
        const slideshow = document.querySelector('.slideshow-hero');
        if (!slideshow) return;

        console.log("Initializing slideshow...");
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slideshow-hero .slide');
        const dots = document.querySelectorAll('.slideshow-hero .dot');

        if (slides.length === 0) {
            console.warn("No slides found for slideshow");
            return;
        }

        function showSlide(index) {
            console.log(`Showing slide ${index}`);
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-advance every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        console.log(`Slideshow interval set to rotate every 5 seconds`);

        // Pause on hover
        slideshow.addEventListener('mouseenter', () => {
            console.log("Pausing slideshow on hover");
            clearInterval(slideInterval);
        });

        slideshow.addEventListener('mouseleave', () => {
            console.log("Resuming slideshow");
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot clicked, navigating to slide ${index}`);
                currentSlide = index;
                showSlide(currentSlide);
                // Reset timer when manually changing slides
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // Initialize first slide
        showSlide(0);
    };

    initSlideshow();

    // Testimonial Slider
    const initTestimonialSlider = () => {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (!testimonialSlider) return;

        console.log("Initializing testimonial slider...");
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;

        let currentTestimonial = 0;
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
            dotsContainer.appendChild(dot);
        });
        
        testimonialSlider.appendChild(dotsContainer);
        
        function showTestimonial(index) {
            console.log(`Showing testimonial ${index}`);
            testimonials.forEach((testimonial, i) => {
                testimonial.style.opacity = i === index ? '1' : '0';
                testimonial.style.position = i === index ? 'relative' : 'absolute';
            });
            
            // Update dots
            document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    };

    initTestimonialSlider();

    // Scroll Animations
    const animateOnScroll = () => {
        console.log("Setting up scroll animations...");
        const elements = document.querySelectorAll('.service-card, .project-card, .team-card, .impact-card, .partnership-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();

    // Contact Form Validation
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        console.log("Initializing contact form...");
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check for existing values
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Simple validation
            inputs.forEach(input => {
                if (input.required && input.value === '') {
                    input.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            });
            
            if (isValid) {
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you for your message! We will get back to you soon.</p>
                    `;
                    contactForm.parentElement.insertBefore(successMsg, contactForm.nextSibling);
                    contactForm.reset();
                    
                    // Reset form inputs
                    inputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                } catch (error) {
                    console.error('Form submission failed:', error);
                    alert('An error occurred. Please try again later.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    };

    initContactForm();
});

// Parallax Effect
const initParallax = () => {
    console.log("Initializing parallax effects...");
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length === 0) return;

    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrollPosition = window.pageYOffset;
            const sectionTop = rect.top + scrollPosition;
            const sectionHeight = rect.height;
            
            // Only apply effect when section is in view
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const bgPos = (scrollPosition - sectionTop) * 0.5;
                section.style.backgroundPositionY = `${bgPos}px`;
            }
        });
    });
};

// Initialize parallax when DOM is fully loaded
if (document.readyState === 'complete') {
    initParallax();
} else {
    window.addEventListener('load', initParallax);
}