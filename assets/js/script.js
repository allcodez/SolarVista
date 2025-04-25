'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = (elem) => elem.classList.toggle("active");

/**
 * Check if the current screen width is mobile
 */
const isMobile = () => window.matchMedia("(max-width: 991px)").matches;

/**
 * Initialize on DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const body = document.body;

  const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
  const dropdown = dropdownToggle?.closest('.dropdown'); // Use optional chaining
  const buttons = document.querySelectorAll("#explore-btn, #new-explore-btn, #service-btn");

  // Function to handle button behavior
  const handleExploreClick = (e) => {
    e.preventDefault();

    if (isMobile()) {
      // On mobile, toggle navbar and open dropdown with a delay
      if (!navToggleBtn.classList.contains("active")) {
        elemToggleFunc(navToggleBtn);
        elemToggleFunc(navbar);
        elemToggleFunc(body);
      }

      if (dropdown && !dropdown.classList.contains("active")) {
        setTimeout(() => dropdown.classList.add("active")); // 800ms delay
      }
    } else {
      // On desktop, open the dropdown directly
      if (dropdown) dropdown.classList.add("active");
    }
  };

  // Add event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", handleExploreClick);
  });

  // Close the dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (
      dropdown &&
      !dropdown.contains(e.target) &&
      ![...buttons].includes(e.target) &&
      e.target !== dropdownToggle
    ) {
      dropdown.classList.remove("active");
      body.classList.remove("active");
    }
  });

  // Reset state on window resize
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      dropdown?.classList.remove("active");
      body.classList.remove("active");
      navToggleBtn.classList.remove("active");
      navbar.classList.remove("active");
    }
  });

  // Navbar toggle button for mobile
  navToggleBtn?.addEventListener("click", function () {
    if (isMobile()) {
      elemToggleFunc(navToggleBtn);
      elemToggleFunc(navbar);
      elemToggleFunc(body);

    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const benefitsWrapper = document.querySelector('.benefits-wrapper');
  const cards = document.querySelectorAll('.benefit-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.dots-container');

  let currentIndex = 0;
  let startX, moveX;
  let isMobile = window.innerWidth <= 768;

  // Create dots for navigation
  function createDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === currentIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Update active dot
  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (isMobile) {
      currentIndex = index;
      const slideWidth = cards[0].offsetWidth;
      benefitsWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
    }
  }

  // Next slide
  function nextSlide() {
    if (isMobile) {
      currentIndex = (currentIndex + 1) % cards.length;
      goToSlide(currentIndex);
    }
  }

  // Previous slide
  function prevSlide() {
    if (isMobile) {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      goToSlide(currentIndex);
    }
  }

  // Handle touch events for mobile swipe
  function handleTouchStart(e) {
    if (isMobile) {
      startX = e.touches[0].clientX;
    }
  }

  function handleTouchMove(e) {
    if (isMobile && startX) {
      moveX = e.touches[0].clientX;
      const diff = startX - moveX;

      // Prevent default only when swiping horizontally
      if (Math.abs(diff) > 5) {
        e.preventDefault();
      }
    }
  }

  function handleTouchEnd() {
    if (isMobile && startX && moveX) {
      const diff = startX - moveX;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }

      startX = null;
      moveX = null;
    }
  }

  // Initialize slider for mobile
  function initSlider() {
    isMobile = window.innerWidth <= 768;

    if (isMobile) {
      createDots();
      goToSlide(currentIndex);

      // Add event listeners for buttons
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);

      // Add touch events for swiping
      benefitsWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
      benefitsWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
      benefitsWrapper.addEventListener('touchend', handleTouchEnd);

      // Auto slide every 5 seconds
      setInterval(nextSlide, 5000);
    } else {
      // Reset transform for desktop view
      benefitsWrapper.style.transform = 'translateX(0)';

      // Remove event listeners for mobile
      prevBtn.removeEventListener('click', prevSlide);
      nextBtn.removeEventListener('click', nextSlide);
      benefitsWrapper.removeEventListener('touchstart', handleTouchStart);
      benefitsWrapper.removeEventListener('touchmove', handleTouchMove);
      benefitsWrapper.removeEventListener('touchend', handleTouchEnd);
    }
  }

  // Initialize on load
  initSlider();

  // Reinitialize on window resize
  window.addEventListener('resize', function () {
    initSlider();
  });
});


