// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            return;
        }

        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        console.log('Form submitted with data:', data);
        
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for elements
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .project-card, .course-card, .update-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

observeElements();

// Log page load for debugging
console.log('Website loaded successfully!');
