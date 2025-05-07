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
  const marqueeTrack = document.getElementById('marquee-track');
  const marqueeContainer = document.getElementById('marquee-container');
  const pausePlayButton = document.getElementById('pause-play');
  const slowerButton = document.getElementById('slower');
  const fasterButton = document.getElementById('faster');
  const reverseButton = document.getElementById('reverse');

  // Clone the items for seamless looping
  const originalItems = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = originalItems + originalItems;

  // Variables to control animation
  let isPaused = false;
  let speed = 20; // Default speed in seconds
  let direction = 1; // 1 for forward, -1 for reverse

  // Function to update the animation
  function updateAnimation() {
    // Remove existing animation
    marqueeTrack.style.animation = 'none';

    // Force reflow
    void marqueeTrack.offsetWidth;

    // Set new animation with current speed and direction
    const directionName = direction === 1 ? 'marquee' : 'marquee-reverse';
    marqueeTrack.style.animation = `${directionName} ${speed}s linear infinite`;

    // Update animation play state
    marqueeTrack.style.animationPlayState = isPaused ? 'paused' : 'running';
  }

  // Add reverse keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
      @keyframes marquee-reverse {
          0% {
              transform: translateX(-50%);
          }
          100% {
              transform: translateX(0);
          }
      }
  `;
  document.head.appendChild(styleSheet);

  // Event listeners for controls
  pausePlayButton.addEventListener('click', function () {
    isPaused = !isPaused;
    marqueeTrack.style.animationPlayState = isPaused ? 'paused' : 'running';
    pausePlayButton.textContent = isPaused ? 'Play' : 'Pause';
  });

  slowerButton.addEventListener('click', function () {
    speed = Math.min(speed * 1.5, 60); // Increase duration (slower)
    updateAnimation();
  });

  fasterButton.addEventListener('click', function () {
    speed = Math.max(speed * 0.7, 5); // Decrease duration (faster)
    updateAnimation();
  });

  reverseButton.addEventListener('click', function () {
    direction *= -1; // Toggle direction
    updateAnimation();
  });

  // Pause on hover (in addition to CSS)
  marqueeContainer.addEventListener('mouseenter', function () {
    if (!isPaused) {
      marqueeTrack.style.animationPlayState = 'paused';
    }
  });

  marqueeContainer.addEventListener('mouseleave', function () {
    if (!isPaused) {
      marqueeTrack.style.animationPlayState = 'running';
    }
  });

  // Handle visibility change (pause when tab is not visible)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && !isPaused) {
      marqueeTrack.style.animationPlayState = 'paused';
    } else if (!document.hidden && !isPaused) {
      marqueeTrack.style.animationPlayState = 'running';
    }
  });

  // Initialize animation
  updateAnimation();
});



document.addEventListener('DOMContentLoaded', function () {
  // Get all card wrappers
  const cardWrappers = document.querySelectorAll('.card-wrapper');
  const nameCard1 = document.getElementById('name-card-1');

  // Add event listeners to each card wrapper (starting from the second one)
  for (let i = 1; i < cardWrappers.length; i++) {
    const currentCard = cardWrappers[i];
    const previousCard = cardWrappers[i - 1];

    // Current card's image
    const imageCard = currentCard.querySelector('.image-card');

    // Add hover event to image cards
    imageCard.addEventListener('mouseenter', function () {
      // Reset all cards first
      resetAllCards();

      // Move ALL previous image cards to the left
      for (let j = 0; j < i; j++) {
        const prevImageCard = cardWrappers[j].querySelector('.image-card');
        if (prevImageCard) {
          prevImageCard.classList.add('move-left');
        }
      }

      // Get the name from the current card
      const currentName = currentCard.querySelector('.name').textContent;

      // Show the name of the current card in the previous card's position
      const previousNameCard = previousCard.querySelector('.name-card');
      previousNameCard.querySelector('.name').textContent = currentName;
      previousNameCard.classList.remove('hidden');
      previousNameCard.classList.add('show-name');

      // If the previous card is the first card wrapper, hide the first name card
      if (i === 1) {
        nameCard1.style.opacity = '1';
      }
    });
  }

  // Add a mouseleave event to the container to reset all cards
  const teamContainer = document.querySelector('.team-container');
  teamContainer.addEventListener('mouseleave', function () {
    resetAllCards();
  });

  // Store original names for reset
  const originalNames = [];
  document.querySelectorAll('.card-wrapper .name').forEach(nameElement => {
    originalNames.push(nameElement.textContent);
  });

  // Function to reset all cards to their original positions
  function resetAllCards() {
    // Reset all image cards
    const allImageCards = document.querySelectorAll('.image-card');
    allImageCards.forEach(card => {
      card.classList.remove('move-left');
    });

    // Hide all name cards
    const allNameCards = document.querySelectorAll('.card-wrapper .name-card');
    allNameCards.forEach((card, index) => {
      card.classList.add('hidden');
      card.classList.remove('show-name');
      // Reset to original name
      if (originalNames[index]) {
        card.querySelector('.name').textContent = originalNames[index];
      }
    });

    // Show the first name card
    nameCard1.style.opacity = '1';
  }
});