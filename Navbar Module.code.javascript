// js/modules/navbar.js
export const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  let lastScroll = 0;

  // Mobile menu toggle
  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Navbar scroll behavior
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolling
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};