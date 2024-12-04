// js/main.js
import { initAnimations, initParallax } from './modules/animations.js';
import { initNavbar } from './modules/navbar.js';
import { initStats, updateLiveStats } from './modules/stats.js';
import { copyToClipboard, showToast, formatNumber, debounce } from './modules/utils.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  initNavbar();
  initAnimations();
  initParallax();
  initStats();
  updateLiveStats();

  // Initialize copy buttons
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-copy');
      copyToClipboard(textToCopy);
    });
  });

  // Initialize lazy loading for images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoadScript = document.createElement('script');
    lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.body.appendChild(lazyLoadScript);
    lazyLoadScript.onload = () => {
      const observer = lozad();
      observer.observe();
    };
  }

  // Handle theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', 
        document.body.classList.contains('dark-mode') ? 'dark' : 'light'
      );
    });
  }

  // Initialize smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';

  // Handle window resize events (debounced)
  window.addEventListener('resize', debounce(() => {
    // Update any responsive elements
    document.documentElement.style.setProperty(
      '--vh', 
      `${window.innerHeight * 0.01}px`
    );
  }, 250));
});

// Handle loading state
window.addEventListener('load', () => {
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
});