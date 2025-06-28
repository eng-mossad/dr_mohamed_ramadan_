// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-card');
        this.totalSlides = this.slides.length;
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.init();
    }
    
    init() {
        this.showSlide(0);
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-play
        setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
}

// Initialize testimonials slider
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `
السلام عليكم د/ محمد رمضان

الاسم: ${name}
رقم الهاتف: ${phone}
${email ? `البريد الإلكتروني: ${email}` : ''}
المادة: ${getSubjectName(subject)}
${message ? `الرسالة: ${message}` : ''}

أتطلع للتواصل معكم.
        `.trim();
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/201004233446?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! سيتم توجيهك إلى واتساب.', 'success');
        
        // Reset form
        this.reset();
    });
}

function getSubjectName(subject) {
    const subjects = {
        'accounting': 'المحاسبة المالية',
        'math': 'الرياضيات',
        'management': 'إدارة الأعمال',
        'english': 'اللغة الإنجليزية',
        'french': 'اللغة الفرنسية',
        'geography': 'الجغرافيا',
        'general': 'استفسار عام'
    };
    return subjects[subject] || 'غير محدد';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .feature, .contact-card, .about-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Add fadeInUp animation
const fadeInUpStyles = document.createElement('style');
fadeInUpStyles.textContent = `
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
`;
document.head.appendChild(fadeInUpStyles);

// Floating elements animation
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${Math.random() * 10 + 10}s ease-in-out infinite;
            pointer-events: none;
        `;
        hero.appendChild(element);
    }
}

// Add floating animation
const floatingStyles = document.createElement('style');
floatingStyles.textContent = `
    @keyframes floatRandom {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(-20px, 20px) rotate(180deg);
        }
        75% {
            transform: translate(20px, 20px) rotate(270deg);
        }
    }
`;
document.head.appendChild(floatingStyles);

// Initialize floating elements
document.addEventListener('DOMContentLoaded', createFloatingElements);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Course cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Social media links tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.classList[1]; // facebook, youtube, etc.
        console.log(`Clicked on ${platform} link`);
        // Here you could add analytics tracking
    });
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});


// Advanced Interactive Features

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Loading Animation
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    document.body.appendChild(spinner);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            spinner.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(spinner);
            }, 300);
        }, 1000);
    });
}

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            
            x += particle.vx;
            y += particle.vy;
            
            if (x < 0 || x > 100) particle.vx *= -1;
            if (y < 0 || y > 100) particle.vy *= -1;
            
            particle.style.left = Math.max(0, Math.min(100, x)) + '%';
            particle.style.top = Math.max(0, Math.min(100, y)) + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.start();
    }
    
    start() {
        this.element.innerHTML = '';
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Image Lightbox
class ImageLightbox {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.hero-img, .about-img').forEach(img => {
            img.addEventListener('click', (e) => this.openLightbox(e.target));
        });
    }
    
    openLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 10);
        
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
}

// Smooth Reveal Animation
class SmoothReveal {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.section-title, .section-subtitle, .course-card, .feature, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });
    }
    
    revealElement(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// Interactive Background
class InteractiveBackground {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.container.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x -= dx * 0.01;
                particle.y -= dy * 0.01;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Form Validation with Animation
class AnimatedFormValidation {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('focus', () => this.clearFieldError(field));
        });
    }
    
    validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            this.showFieldError(field);
        } else {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    showFieldError(field) {
        field.style.borderColor = '#e74c3c';
        field.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
    
    showFieldSuccess(field) {
        field.style.borderColor = '#27ae60';
    }
    
    clearFieldError(field) {
        field.style.borderColor = '#e0e0e0';
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        this.form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.submitForm();
        }
    }
    
    submitForm() {
        // Original form submission logic here
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const whatsappMessage = `
السلام عليكم د/ محمد رمضان

الاسم: ${name}
رقم الهاتف: ${phone}
${email ? `البريد الإلكتروني: ${email}` : ''}
المادة: ${getSubjectName(subject)}
${message ? `الرسالة: ${message}` : ''}

أتطلع للتواصل معكم.
        `.trim();
        
        const whatsappUrl = `https://wa.me/201004233446?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        showNotification('تم إرسال رسالتك بنجاح! سيتم توجيهك إلى واتساب.', 'success');
        this.form.reset();
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll progress indicator
    createScrollProgress();
    
    // Show loading spinner
    showLoadingSpinner();
    
    // Initialize particle system for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new ParticleSystem(heroSection);
        new InteractiveBackground(heroSection);
    }
    
    // Initialize typewriter effect for hero title
    const heroTitle = document.querySelector('.title-sub');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.classList.add('typewriter');
        new TypewriterEffect(heroTitle, originalText, 100);
    }
    
    // Initialize image lightbox
    new ImageLightbox();
    
    // Initialize smooth reveal animations
    new SmoothReveal();
    
    // Initialize animated form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new AnimatedFormValidation(contactForm);
    }
    
    // Add gradient text effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('gradient-text');
    });
    
    // Add interactive hover effects
    document.querySelectorAll('.course-card, .contact-card, .feature').forEach(card => {
        card.classList.add('interactive-element');
    });
    
    // Add pulse effect to important buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('pulse');
    });
    
    // Add glow effect to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.classList.add('glow-on-hover');
    });
});

// Advanced Mouse Tracking
class MouseTracker {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }
    
    init() {
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #667eea;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
        `;
        
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX - 15 + 'px';
                this.cursorFollower.style.top = e.clientY - 15 + 'px';
            }, 100);
        });
        
        document.querySelectorAll('a, button, .course-card, .social-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize mouse tracker on desktop only
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', () => {
        new MouseTracker();
    });
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

