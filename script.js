const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

// Hero Slider: Automatically change every 5 seconds with smooth animation
const heroSlides = document.querySelectorAll('.hero-slide');
const pagerDots = document.querySelectorAll('.pager-dot');
let currentSlideIndex = 0;
let slideInterval = null;
const SLIDE_INTERVAL_MS = 5000; // 5 seconds

function goToSlide(index) {
  if (heroSlides.length === 0) return;

  // Wrap around seamlessly
  currentSlideIndex = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, idx) => {
    if (idx === currentSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  pagerDots.forEach((dot, idx) => {
    if (idx === currentSlideIndex) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.classList.remove('active');
      dot.removeAttribute('aria-current');
    }
  });
}

function nextSlide() {
  goToSlide(currentSlideIndex + 1);
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(nextSlide, SLIDE_INTERVAL_MS);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

// Click on pagination dots
pagerDots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    goToSlide(idx);
    startAutoSlide(); // Reset timer after manual click
  });
});

// Pause on hover or focus if desired, and start on load
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mouseenter', () => stopAutoSlide());
  heroSection.addEventListener('mouseleave', () => startAutoSlide());
}

if (heroSlides.length > 0) {
  startAutoSlide();
}

