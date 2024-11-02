document.addEventListener('DOMContentLoaded', function() {
    // Audio files
    const buttonClickSound = new Audio('button-click.mp3');
    const diceClickSound = new Audio('dice-click.mp3');
    const scrollWheelSound = new Audio('scroll-wheel.mp3');
    const chingSound = new Audio('ching.mp3');
    const winningSound = new Audio('winning.mp3');
    const matchSound = new Audio('bing.mp3'); // New sound for matching dice

    // Function to play a sound with instant playback
    function playSound(audio) {
        // Clone the audio to allow overlapping plays
        const clonedAudio = audio.cloneNode();
        clonedAudio.currentTime = 0;
        clonedAudio.play().catch(e => {
            // Handle play promise rejection
            console.error('Sound playback failed:', e);
        });
    }

    // Scroller functionality for bet amount
    const wheel = document.querySelector('.wheel');
    const betAmountSpan = document.querySelector('.bet-amount');
    let betAmount = 10; // initial amount
    const minBet = 10;
    const maxBet = 100;
    let isDragging = false;
    let startY = 0;
    let previousBetAmount = betAmount; // Initialize previousBetAmount

    const mainContent = document.querySelector('.main');

    wheel.addEventListener('mousedown', function(event) {
        isDragging = true;
        startY = event.clientY;
        event.preventDefault();

        // Disable scrolling
        mainContent.style.overflowY = 'hidden';
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            let deltaY = startY - event.clientY;
            let change = Math.floor(deltaY / 10); // Adjust sensitivity
            if (change !== 0) {
                let newBetAmount = betAmount + change;
                newBetAmount = Math.max(minBet, Math.min(newBetAmount, maxBet));
                if (newBetAmount !== betAmount) {
                    betAmount = newBetAmount;
                    betAmountSpan.textContent = '$' + betAmount;
                    startY = event.clientY; // Reset startY to current position

                    if (betAmount > previousBetAmount) {
                        playSound(scrollWheelSound);
                    }

                    previousBetAmount = betAmount;
                }
            }
        }
    });

    document.addEventListener('mouseup', function(event) {
        isDragging = false;

        // Re-enable scrolling
        mainContent.style.overflowY = 'auto';
    });

    // Handle touch events for mobile devices
    wheel.addEventListener('touchstart', function(event) {
        isDragging = true;
        startY = event.touches[0].clientY;
        event.preventDefault();

        // Disable scrolling
        mainContent.style.overflowY = 'hidden';
    });

    document.addEventListener('touchmove', function(event) {
        if (isDragging) {
            let deltaY = startY - event.touches[0].clientY;
            let change = Math.floor(deltaY / 10); // Adjust sensitivity
            if (change !== 0) {
                let newBetAmount = betAmount + change;
                newBetAmount = Math.max(minBet, Math.min(newBetAmount, maxBet));
                if (newBetAmount !== betAmount) {
                    betAmount = newBetAmount;
                    betAmountSpan.textContent = '$' + betAmount;
                    startY = event.touches[0].clientY; // Reset startY to current position

                    if (betAmount > previousBetAmount) {
                        playSound(scrollWheelSound);
                    }

                    previousBetAmount = betAmount;
                }
            }
        }
    });

    document.addEventListener('touchend', function(event) {
        isDragging = false;

        // Re-enable scrolling
        mainContent.style.overflowY = 'auto';
    });

    // Adjust buttons functionality
    const adjustButtons = document.querySelectorAll('.adjust-button');
    adjustButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'half') {
                betAmount = Math.floor(betAmount / 2);
            } else if (action === 'double') {
                betAmount = betAmount * 2;
            } else if (action === 'max') {
                betAmount = maxBet;
            }
            betAmount = Math.max(minBet, Math.min(betAmount, maxBet)); // keep within bounds
            betAmountSpan.textContent = '$' + betAmount;

            // Update active class
            adjustButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            playSound(buttonClickSound);
        });
    });

    // Pot Value Increment
    let potValue = 2115.00;
    const potAmountSpan = document.querySelector('.price .amount span');
    const potValueDisplay = document.getElementById('potValueDisplay');

    function updatePotValue() {
        potValue += 100;
        potAmountSpan.textContent = potValue.toFixed(2);
        potValueDisplay.innerHTML = '<b>$ ' + potValue.toFixed(2) + '</b>';
    }

    setInterval(updatePotValue, 2000); // increases every 2 seconds

    // Bet Button States
    const betButton = document.querySelector('.bet-button');
    const confirmedBetMain = document.querySelector('.confirmedbet-main');
    const section1 = document.querySelector('.section1');
    let betState = 0; // initial state

    const clickableDiceContainer = document.querySelector('.dice-container:not(.disabled)');
    const alertTextElement = document.querySelector('.alert-text');

    betButton.addEventListener('click', function() {
        betState = (betState + 1) % 4; // Cycle through 0,1,2,3
        updateBetButton();
        updatePotValue(); // Refresh pot value each time button is clicked

        if (betState === 2) {
            playSound(chingSound); // Play ching sound when bet is confirmed
        } else {
            playSound(buttonClickSound);
        }
    });

    function updateBetButton() {
        betButton.classList.remove('state-0', 'state-1', 'state-2', 'state-3');
        betButton.classList.add('state-' + betState);

        // Reset confirmedBetMain border
        confirmedBetMain.classList.remove('blink-border', 'blink-border-red');

        // Reset section1 background
        section1.classList.remove('no-more-bets');

        const secondDiceContainer = document.querySelector('.dice-container.disabled');

        if (betState === 0) {
            betButton.querySelector('span').textContent = 'PLACE BET';
            // Enable dice container
            enableDiceContainer();
            // Reset alert text
            resetAlertText();
            // Hide the second dice container
            secondDiceContainer.style.display = 'none';
        } else if (betState === 1) {
            betButton.querySelector('span').textContent = 'CONFIRM BET';
            // Enable dice container
            enableDiceContainer();
            // Reset alert text
            resetAlertText();
            // Keep the second dice container hidden
            secondDiceContainer.style.display = 'none';
        } else if (betState === 2) {
            betButton.querySelector('span').textContent = 'BET CONFIRMED';
            confirmedBetMain.classList.add('blink-border');
            // Enable dice container
            enableDiceContainer();
            // Reset alert text
            resetAlertText();
            // Show the second dice container
            secondDiceContainer.style.display = 'flex';
        } else if (betState === 3) {
            betButton.querySelector('span').textContent = 'NO MORE BETS';
            confirmedBetMain.classList.add('blink-border-red');
            // Disable dice container
            disableDiceContainer();
            // Set alert text to "NO MORE BETS"
            setAlertText('NO MORE BETS');
            // Add red flashing background to section1
            section1.classList.add('no-more-bets');
            // Hide the second dice container
            secondDiceContainer.style.display = 'none';
        }
    }

    updateBetButton(); // Initialize the button state

    function disableDiceContainer() {
        clickableDiceContainer.classList.add('greyed-out');
        // Remove click event listeners from dice
        const diceElements = clickableDiceContainer.querySelectorAll('.dice');
        diceElements.forEach(dice => {
            dice.style.pointerEvents = 'none';
        });
    }

    function enableDiceContainer() {
        clickableDiceContainer.classList.remove('greyed-out');
        // Re-enable click event listeners
        const diceElements = clickableDiceContainer.querySelectorAll('.dice');
        diceElements.forEach(dice => {
            dice.style.pointerEvents = 'auto';
        });
    }

    function setAlertText(message) {
        alertTextElement.innerHTML = '<span style="font-weight: bold;">' + message + '</span>';
        // Add fade-in animation
        alertTextElement.classList.remove('fade-in');
        void alertTextElement.offsetWidth; // trigger reflow
        alertTextElement.classList.add('fade-in');
    }

    function resetAlertText() {
        // Do nothing; the alert text rotation will resume
    }

    // Dice click functionality
    const diceElements = document.querySelectorAll('.dice-container:not(.disabled) .dice');
    diceElements.forEach(dice => {
        dice.addEventListener('click', function() {
            let diceValue = parseInt(this.getAttribute('data-value')) || 1;
            diceValue = diceValue % 6 + 1; // Cycle from 1 to 6
            this.setAttribute('data-value', diceValue);
            this.textContent = getDiceCharacter(diceValue);
            playSound(diceClickSound);
        });
    });

    function getDiceCharacter(value) {
        const diceChars = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        return diceChars[value - 1];
    }

    // Refresh button functionality
    const refreshBtn = document.querySelector('.refresh-btn');
    const disabledDiceElements = document.querySelectorAll('.dice-container.disabled .dice');

    refreshBtn.addEventListener('click', function() {
        // Roll random dice for disabled dice container
        disabledDiceElements.forEach(dice => {
            let diceValue = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
            dice.setAttribute('data-value', diceValue);
            dice.textContent = getDiceCharacter(diceValue);
        });

        // Reset dice styles
        resetDiceStyles();

        // Compare dice values and highlight matches
        compareDice();

        playSound(buttonClickSound);
    });

    function compareDice() {
        const activeDice = document.querySelectorAll('.dice-container:not(.disabled) .dice');
        const disabledDice = document.querySelectorAll('.dice-container.disabled .dice');

        let allMatch = true;
        let matchesFound = 0;

        activeDice.forEach((activeDiceElement, index) => {
            const activeValue = parseInt(activeDiceElement.getAttribute('data-value'));
            const disabledValue = parseInt(disabledDice[index].getAttribute('data-value'));

            // Reset styles
            activeDiceElement.style.color = '';
            disabledDice[index].style.color = '';
            activeDiceElement.classList.remove('blink');
            disabledDice[index].classList.remove('blink');

            if (activeValue === disabledValue) {
                if (activeDiceElement.classList.contains('red-dice') && disabledDice[index].classList.contains('red-dice')) {
                    // If both are red dice and values match
                    activeDiceElement.classList.add('blink');
                    disabledDice[index].classList.add('blink');
                } else {
                    // Highlight matching pairs in green
                    activeDiceElement.style.color = 'rgb(133, 216, 133)';
                    disabledDice[index].style.color = 'rgb(133, 216, 133)';
                    // Play match sound for each matching pair
                    playSound(matchSound);
                    matchesFound++;
                }
            } else {
                allMatch = false;
            }
        });

        if (allMatch) {
            // All dice match, trigger special animation
            triggerSpecialDiceAnimation();
        }
    }

    // Special Dice Animation Function
    function triggerSpecialDiceAnimation() {
        const topDice = document.querySelectorAll('.dice-container:not(.disabled) .dice');
        const bottomDice = document.querySelectorAll('.dice-container.disabled .dice');

        // Reset any existing blink classes
        topDice.forEach(dice => {
            dice.classList.remove('blink');
        });
        bottomDice.forEach(dice => {
            dice.classList.remove('blink');
        });

        let totalDice = topDice.length;

        // For top dice: right to left
        const topDiceArray = Array.from(topDice).reverse();

        // For bottom dice: left to right
        const bottomDiceArray = Array.from(bottomDice);

        // Play winning sound
        playSound(winningSound);

        // Animate top dice
        topDiceArray.forEach((dice, index) => {
            setTimeout(() => {
                dice.classList.add('red-dice');
                if (index === totalDice - 1) {
                    // After all dice have turned red, trigger blinking
                    triggerBlinking();
                }
            }, index * 500); // Adjust the timing as needed
        });

        // Animate bottom dice
        bottomDiceArray.forEach((dice, index) => {
            setTimeout(() => {
                dice.classList.add('red-dice');
            }, index * 500);
        });

        function triggerBlinking() {
            topDice.forEach(dice => {
                dice.classList.add('blink');
            });
            bottomDice.forEach(dice => {
                dice.classList.add('blink');
            });

            // After blinking, reset dice after some time
            setTimeout(resetDiceAfterSpecialAnimation, 3000); // Adjust time as needed
        }
    }

    // Reset dice after special animation
    function resetDiceAfterSpecialAnimation() {
        const allDice = document.querySelectorAll('.dice-container .dice');
        allDice.forEach(dice => {
            dice.classList.remove('blink');
            // Restore red-dice class if it was originally there
            const isRedDice = dice.getAttribute('data-red') === 'true';
            if (isRedDice) {
                dice.classList.add('red-dice');
            } else {
                dice.classList.remove('red-dice');
            }
            dice.style.color = '';
        });
    }

    // Initialize dice data-red attribute
    const allDiceElements = document.querySelectorAll('.dice-container .dice');
    allDiceElements.forEach(dice => {
        if (dice.classList.contains('red-dice')) {
            dice.setAttribute('data-red', 'true');
        } else {
            dice.setAttribute('data-red', 'false');
        }
    });

    // Reset dice styles function
    function resetDiceStyles() {
        const allDice = document.querySelectorAll('.dice-container .dice');
        allDice.forEach(dice => {
            dice.classList.remove('blink');
            dice.style.color = '';
            // Keep the red-dice class as per original state
            const isRedDice = dice.getAttribute('data-red') === 'true';
            if (isRedDice) {
                dice.classList.add('red-dice');
            } else {
                dice.classList.remove('red-dice');
            }
        });
    }

    // Attach event listener to the gear icon button to trigger the special action
    document.getElementById('trigger-special-action').addEventListener('click', function() {
        triggerSpecialDiceAnimation();
        playSound(buttonClickSound);
    });

    // Scrolling bar animation
    const scrollingBar = document.querySelector('.scrolling-bar');
    function scrollBets() {
        scrollingBar.scrollLeft += 1;
        if (scrollingBar.scrollLeft >= scrollingBar.scrollWidth - scrollingBar.clientWidth) {
            scrollingBar.scrollLeft = 0;
        }
    }
    setInterval(scrollBets, 50); // Adjust speed as needed

    // Alert text rotation
    const alertMessages = [
        '<span>Place your bets now, round </span><span style="color: #ff4444;">starts soon</span>',
        '<span style="font-weight: bold;">Big win last round!</span>',
        '<span>New players </span><span style="color: #ff4444;">joining the game</span>',
        '<span style="color: #ff4444;">Hurry up!</span><span> Time is running out</span>',
        '<span>Jackpot is </span><span style="color: rgb(133, 216, 133);">growing!</span>'
    ];

    let alertIndex = 0;

    setInterval(function() {
        if (betState !== 3) {
            alertIndex = (alertIndex + 1) % alertMessages.length;
            alertTextElement.innerHTML = alertMessages[alertIndex];
            // Add animation class
            alertTextElement.classList.remove('fade-in');
            void alertTextElement.offsetWidth; // trigger reflow
            alertTextElement.classList.add('fade-in');
        }
    }, 5000); // change message every 5 seconds

    // Wallet toggle functionality
    const walletToggleButton = document.querySelector('.wallet-toggle');
    const infoBlockDiv = document.querySelector('.info-block');
    let isInfoBlockVisible = false;

    walletToggleButton.addEventListener('click', function() {
        isInfoBlockVisible = !isInfoBlockVisible;
        if (isInfoBlockVisible) {
            infoBlockDiv.style.display = 'flex'; // or 'block' if you prefer
        } else {
            infoBlockDiv.style.display = 'none';
        }
    });
});
