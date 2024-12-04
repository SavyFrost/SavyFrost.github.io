// Smooth Scroll Implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for Animations
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeUp');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.card, .feature-card, .stat-card').forEach((element) => {
  animateOnScroll.observe(element);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
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

// Copy Address Function with Modern Toast
function copyAddress() {
  const address = '0x45f87973fd2837309422d044a58159a2bf7b0dfb';
  navigator.clipboard.writeText(address).then(() => {
    showToast('Address copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy address', 'error');
  });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-fadeUp`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.getElementById('toast-container').appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Dynamic Stats Counter
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize Stats Animation
document.querySelectorAll('.stat-value').forEach(stat => {
  const finalValue = parseInt(stat.getAttribute('data-value'));
  animateValue(stat, 0, finalValue, 2000);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
