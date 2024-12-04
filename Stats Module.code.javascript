// js/modules/stats.js
export const initStats = () => {
  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start)
        .toLocaleString('en-US', {
          maximumFractionDigits: 2
        });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Initialize stats when they come into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValue = entry.target;
        const finalValue = parseFloat(statValue.getAttribute('data-value'));
        animateValue(statValue, 0, finalValue, 2000);
        statsObserver.unobserve(statValue);
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('.stat-value').forEach(stat => {
    statsObserver.observe(stat);
  });
};

export const updateLiveStats = () => {
  // Simulated live price updates
  setInterval(() => {
    const priceElement = document.querySelector('.live-price');
    if (priceElement) {
      const currentPrice = parseFloat(priceElement.getAttribute('data-price'));
      const change = (Math.random() - 0.5) * 0.01;
      const newPrice = currentPrice * (1 + change);
      priceElement.textContent = `$${newPrice.toFixed(4)}`;
      priceElement.classList.add(change > 0 ? 'price-up' : 'price-down');
      setTimeout(() => {
        priceElement.classList.remove('price-up', 'price-down');
      }, 1000);
    }
  }, 5000);
};