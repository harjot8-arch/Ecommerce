// Smooth scroll for all anchor links (with offset for fixed navbar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const offset = navbar ? navbar.offsetHeight + 20 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Animate product cards on scroll into view
const cards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'scale(1) rotateY(0deg)';
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'scale(0.85) rotateY(20deg)';
  observer.observe(card);
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typing effect for .jh title
const jhTitle = document.querySelector('.jh');
if (jhTitle) {
  const text = jhTitle.textContent;
  jhTitle.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      jhTitle.textContent += text[i];
      i++;
      setTimeout(type, 70);
    }
  }
  setTimeout(type, 800);
}

// Add ripple effect to nav links and product cards only (not contact details)
document.querySelectorAll('.nav-links a, .product-card').forEach(el => {
  el.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Tooltip for contact details (not pressable, just info on hover)
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const info = this.querySelector('a') ? this.querySelector('a').textContent : this.textContent.trim();
    const tooltip = document.createElement('div');
    tooltip.className = 'contact-tooltip';
    tooltip.textContent = info;
    document.body.appendChild(tooltip);
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - 38 + 'px';
    this._tooltip = tooltip;
  });
  item.addEventListener('mouseleave', function() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  });
});

function downloadList(type) {
  let data = '';
  if (type === 'rotor') {
    data = [
      'High-Performance Rotor',
      'Custom Rotor',
      'Armature Rotor',
      'Rotor Cooling Fan',
      'Rotor Ball Bearing'
    ].join('\n');
  } else if (type === 'stator') {
    data = [
      'Durable Stator',
      'Field Coil Stator',
      'Alternator Stator',
      'Starter Motor Stator',
      'Stator Brush Holder'
    ].join('\n');
  }
  const blob = new Blob([data], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = type + '_list.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}