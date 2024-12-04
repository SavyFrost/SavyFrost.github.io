// js/modules/animations.js
export const initAnimations = () => {
  // Intersection Observer for Animations
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeUp');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Animate elements
  const animateElements = document.querySelectorAll(
    '.card, .feature-card, .stat-card, .section-title, .hero-content'
  );
  
  animateElements.forEach((element) => {
    animateOnScroll.observe(element);
  });
};

// Parallax effect for hero section
export const initParallax = () => {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
};