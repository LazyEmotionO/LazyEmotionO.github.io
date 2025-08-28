// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling
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

// Hero statistics counter animation
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

animateCounter();

// Project image slider
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const images = card.querySelectorAll('.project-image');
    const indicators = card.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Auto-rotate images
    function rotateImages() {
        if (images.length > 1) {
            images[currentIndex].classList.remove('active');
            indicators[currentIndex]?.classList.remove('active');
            
            currentIndex = (currentIndex + 1) % images.length;
            
            images[currentIndex].classList.add('active');
            indicators[currentIndex]?.classList.add('active');
        }
    }

    // Auto-rotate every 3 seconds
    let interval = setInterval(rotateImages, 3000);

    // Manual navigation with indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            clearInterval(interval);
            
            images[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            images[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
            
            // Restart auto-rotate after manual selection
            interval = setInterval(rotateImages, 3000);
        });
    });

    // Pause rotation on hover
    card.addEventListener('mouseenter', () => clearInterval(interval));
    card.addEventListener('mouseleave', () => {
        interval = setInterval(rotateImages, 3000);
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
}

animateSkillBars();

// Scroll to top button
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form removed - GitHub Pages doesn't support backend

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeElements = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form-wrapper');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    fadeInObserver.observe(element);
});

// Project card click to open first image
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Check if clicking on overlay or "查看圖片" text
        if (e.target.classList.contains('project-overlay') || e.target.classList.contains('view-details')) {
            const projectImages = this.querySelectorAll('.project-image');
            if (projectImages.length > 0) {
                const imageUrls = Array.from(projectImages).map(image => image.src);
                const projectTitle = this.querySelector('.project-title').textContent;
                const caption = `${projectTitle} - 圖片 1/${imageUrls.length}`;
                openModal(projectImages[0].src, caption, imageUrls, 0);
            }
        }
    });
});

// Dynamic typing effect for hero title
function typeWriter() {
    const texts = ['專業軟體開發', '創新解決方案', '高品質服務'];
    const titleMain = document.querySelector('.title-main');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            titleMain.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            titleMain.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Uncomment to enable typing effect
    // type();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    if (heroParticles) {
        heroParticles.style.transform = `translate(${-scrolled * 0.1}px, ${-scrolled * 0.1}px)`;
    }
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance optimization - Throttle scroll events
let ticking = false;

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

function updateOnScroll() {
    ticking = false;
    // All scroll-based updates go here
    updateActiveLink();
}

window.addEventListener('scroll', requestTick, { passive: true });

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentProjectImages = [];
let currentImageIndex = 0;

// Function to open modal with specific image
function openModal(imageSrc, caption, projectImages, index) {
    modal.classList.add('show');
    modalImg.src = imageSrc;
    modalCaption.textContent = caption || '';
    currentProjectImages = projectImages || [imageSrc];
    currentImageIndex = index || 0;
    
    // Show/hide navigation buttons
    updateModalNavigation();
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Update navigation buttons visibility
function updateModalNavigation() {
    if (currentProjectImages.length > 1) {
        modalPrev.style.display = 'flex';
        modalNext.style.display = 'flex';
    } else {
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
    }
}

// Navigate to previous image
function showPreviousImage() {
    if (currentProjectImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        modalImg.src = currentProjectImages[currentImageIndex];
        updateModalCaption();
    }
}

// Navigate to next image
function showNextImage() {
    if (currentProjectImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        modalImg.src = currentProjectImages[currentImageIndex];
        updateModalCaption();
    }
}

// Update caption based on current image
function updateModalCaption() {
    const projectCard = document.querySelector('.project-card:hover') || document.querySelector('.project-card');
    if (projectCard) {
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        modalCaption.textContent = `${projectTitle} - 圖片 ${currentImageIndex + 1}/${currentProjectImages.length}`;
    }
}

// Add click event to all project images
document.querySelectorAll('.project-image').forEach((img, index) => {
    img.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent project card click event
        
        const projectCard = img.closest('.project-card');
        const allProjectImages = projectCard.querySelectorAll('.project-image');
        const imageUrls = Array.from(allProjectImages).map(image => image.src);
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        
        // Find the index of clicked image
        let clickedIndex = 0;
        allProjectImages.forEach((projectImg, idx) => {
            if (projectImg === img) {
                clickedIndex = idx;
            }
        });
        
        const caption = `${projectTitle} - 圖片 ${clickedIndex + 1}/${imageUrls.length}`;
        openModal(img.src, caption, imageUrls, clickedIndex);
    });
});

// Modal close events
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Modal navigation events
modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPreviousImage();
});

modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});