document.addEventListener('DOMContentLoaded', function() {
    // Get all card wrappers
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    const nameCard1 = document.getElementById('name-card-1');

    // Add event listeners to each card wrapper (starting from the second one)
    for (let i = 1; i < cardWrappers.length; i++) {
        const currentCard = cardWrappers[i];
        const previousCard = cardWrappers[i-1];

        // Current card's image
        const imageCard = currentCard.querySelector('.image-card');

        // Add hover event to image cards
        imageCard.addEventListener('mouseenter', function() {
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
    teamContainer.addEventListener('mouseleave', function() {
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