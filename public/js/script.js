AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

const menuIcon = document.getElementById('menuIcon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const mainContent = document.querySelector('.main-content');

let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (window.innerWidth <= 768) {
        navbar.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
        
        if (isMobileMenuOpen) {
            menuIcon.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
            
            let backdrop = document.querySelector('.mobile-menu-backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'mobile-menu-backdrop';
                document.body.appendChild(backdrop);
            }
            backdrop.classList.add('active');
        } else {
            menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
            
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.classList.remove('active');
            }
        }
    }
}

if (menuIcon) {
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

document.addEventListener('click', (e) => {
    if (isMobileMenuOpen && !e.target.closest('.navbar')) {
        closeMobileMenu();
    }
});

document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
    link.addEventListener('click', () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
});

function closeMobileMenu() {
    isMobileMenuOpen = false;
    navbar.classList.remove('active');
    navLinks.classList.remove('active');
    menuIcon.classList.remove('active');
    menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
    
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navButtons = document.querySelectorAll('.nav-button');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navButtons.forEach(button => {
        button.classList.remove('active');
        const onclick = button.getAttribute('onclick');
        if (onclick && onclick.includes(currentSection)) {
            button.classList.add('active');
        }
    });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            scrollTimeout = null;
        }, 100);
    }
});

function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 1000);
        }
    }
    type();
}

function showToast(message, type = 'success') {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function copyEmail() {
    const email = 'lordsamueltech@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        showToast('Failed to copy email', 'error');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const emailButtons = document.querySelectorAll('[onclick="copyEmail()"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', copyEmail);
    });

    const subtitleElement = document.getElementById('typewriter-text');
    if (subtitleElement) {
        const texts = [
            "Back-End & A Pathly Front-End Developer",
            "Node.js Specialist", 
            "API Developer",
            "Problem Solver"
        ];
        let textIndex = 0;

        function typeNextText() {
            typeWriter(subtitleElement, texts[textIndex], 80, () => {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(() => typeNextText(), 2000);
            });
        }
        typeNextText();
    }

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    const buttons = document.querySelectorAll('.btn, .project-link, .nav-button, .nav-contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'A' && this.getAttribute('href') !== '#' && !this.getAttribute('href').startsWith('#')) {
                return;
            }

            if (this.getAttribute('href') === '#' || this.tagName === 'BUTTON') {
                e.preventDefault();
            }

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    updateActiveNav();

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.innerWidth <= 768) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 25, 47, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(10, 25, 47, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        }
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(-10px)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
});

document.addEventListener('touchstart', function() {}, {passive: true});

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.btnText = this.form.querySelector('.btn-text');
        this.loadingSpinner = this.form.querySelector('.loading-spinner');
        this.messageStatus = document.getElementById('messageStatus');
        
        this.API_URL = 'https://rebix-mailer.vercel.app/api/feedback';
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            waNum: formData.get('waNum'),
            message: formData.get('message')
        };
        
        if (!this.validateForm(data)) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Error:', error);
            this.showMessage(error.message || 'Something went wrong. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm(data) {
        if (!data.name.trim()) {
            this.showMessage('Please enter your name.', 'error');
            return false;
        }
        
        if (!data.email.trim()) {
            this.showMessage('Please enter your email address.', 'error');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!data.message.trim()) {
            this.showMessage('Please enter your message.', 'error');
            return false;
        }
        
        if (data.waNum && !this.isValidPhone(data.waNum)) {
            this.showMessage('Please enter a valid phone number.', 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    setLoading(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.btnText.style.display = 'none';
            this.loadingSpinner.style.display = 'block';
        } else {
            this.submitBtn.disabled = false;
            this.btnText.style.display = 'block';
            this.loadingSpinner.style.display = 'none';
        }
    }
    
    showMessage(message, type) {
        this.messageStatus.textContent = message;
        this.messageStatus.className = `message-status ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                this.messageStatus.style.display = 'none';
            }, 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contactForm')) {
        new ContactForm();
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
