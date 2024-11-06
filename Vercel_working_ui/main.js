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
    const amountDisplay = document.querySelector('.confirmedbet-main .price .amount span'); // Update the amount displayed in the bet confirmation
    let betAmount = 10; // initial amount
    const minBet = 10;
    const maxBet = 1000;
    let isDragging = false;
    let startY = 0;
    let previousBetAmount = betAmount; // Initialize previousBetAmount

    const mainContent = document.querySelector('.main');

    // Player Balance
    let playerBalance = 1000.00; // Starting balance

    function updateBalanceDisplay() {
        const balanceSpan = document.querySelector('.header-icons .balance-display');
        balanceSpan.textContent = playerBalance.toFixed(2);
    }
    updateBalanceDisplay(); // Initialize balance display

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
                betAmount = playerBalance; // Adjust to player's balance
            }
            betAmount = Math.max(minBet, Math.min(betAmount, playerBalance, maxBet)); // keep within bounds
            betAmountSpan.textContent = '$' + betAmount;
            amountDisplay.textContent = betAmount; // Update displayed amount

            // Update active class
            adjustButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            playSound(buttonClickSound);
        });
    });

    // Scroll wheel functionality
    // Handle mouse events for the wheel
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
                newBetAmount = Math.max(minBet, Math.min(newBetAmount, maxBet, playerBalance));
                if (newBetAmount !== betAmount) {
                    betAmount = newBetAmount;
                    betAmountSpan.textContent = '$' + betAmount;
                    amountDisplay.textContent = betAmount; // Update displayed amount
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
                newBetAmount = Math.max(minBet, Math.min(newBetAmount, maxBet, playerBalance));
                if (newBetAmount !== betAmount) {
                    betAmount = newBetAmount;
                    betAmountSpan.textContent = '$' + betAmount;
                    amountDisplay.textContent = betAmount; // Update displayed amount
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

    // Pot Value Increment
    let potValue = 2115.00;
    const potValueDisplay = document.getElementById('potValueDisplay');

    function updatePotValue(amount) {
        amount = amount || 0;
        potValue += amount;
        potValueDisplay.innerHTML = '<b>$ ' + potValue.toFixed(2) + '</b>';
    }

    setInterval(function() {
        updatePotValue(100); // increases every 2 seconds
    }, 2000);

    // Bet Button States
    const betButton = document.querySelector('.bet-button');
    const confirmedBetMain = document.querySelector('.confirmedbet-main');
    const section1 = document.querySelector('.section1');
    let betState = 0; // initial state

    const clickableDiceContainer = document.querySelector('.dice-container');
    const alertTextElement = document.querySelector('.alert-text');

    // Variables for game timing
    let roundDuration = 15; // seconds
    let noMoreBetsDuration = 5; // seconds before the end of the round
    let roundTimer;

    let betsClosed = false; // Indicates whether bets are closed for this round
    let betPlaced = false; // Indicates whether the player has placed and confirmed a bet in this round

    // Dice Values
    let playerDiceValues = [1, 1, 1, 1]; // Player's current selected dice values
    let lastBetDiceValues = [1, 1, 1, 1]; // The dice values the player used in their last bet

    function startGameRound() {
        betsClosed = false;
        betPlaced = false;
        betState = 0; // Reset to PLACE BET state
        updateBetButton();
        resetDice(); // Reset dice as per the logic
        setAlertText('Place your bets now, round starting');

        // Start the timer
        let timeLeft = roundDuration;

        roundTimer = setInterval(function() {
            timeLeft--;
            if (timeLeft === noMoreBetsDuration) {
                // Close bets
                betsClosed = true;
                betState = 3; // NO MORE BETS
                updateBetButton();
                disableDiceContainer();
                setAlertText('NO MORE BETS');
            }
            if (timeLeft <= 0) {
                clearInterval(roundTimer);
                // Roll the house dice and determine outcome
                betState = 4; // DICE ROLLING
                updateBetButton();
                rollHouseDice();
                determineOutcome();
                // Start a new round after a short delay
                setTimeout(startGameRound, 5000); // Wait 5 seconds before starting a new round
            }
        }, 1000); // Update every second
    }

    // Start the first game round
    startGameRound();

    betButton.addEventListener('click', function() {
        if (betsClosed) {
            playSound(buttonClickSound);
            return;
        }
        if (betState === 0) {
            // PLACE BET
            betState = 1; // Move to CONFIRM BET
            updateBetButton();
            playSound(buttonClickSound);
        } else if (betState === 1) {
            // CONFIRM BET
            if (betAmount > playerBalance) {
                alert('Insufficient balance!');
                playSound(buttonClickSound);
                return;
            }
            playerBalance -= betAmount;
            updateBalanceDisplay();
            betState = 2; // BET CONFIRMED
            betPlaced = true;
            lastBetDiceValues = [...playerDiceValues]; // Store the dice values used in the bet
            updateBetButton();
            playSound(chingSound); // Play sound for bet confirmed
            updatePotValue(betAmount); // Add player's bet to the pot
        }
    });

    function updateBetButton() {
        betButton.classList.remove('state-0', 'state-1', 'state-2', 'state-3', 'state-4', 'state-5');
        betButton.classList.add('state-' + betState);

        // Remove any existing dice display
        const diceDisplay = betButton.querySelector('.dice-display');
        if (diceDisplay) {
            diceDisplay.remove();
        }

        // Reset confirmedBetMain border
        confirmedBetMain.classList.remove('blink-border', 'blink-border-red');

        // Reset section1 background
        section1.classList.remove('no-more-bets');

        // Show the lock icon unless it's state 5
        if (betState !== 5) {
            betButton.querySelector('i').style.display = ''; // Restore default display
        }

        // Update button text based on state
        if (betState === 0) {
            betButton.querySelector('span').textContent = 'PLACE BET';
            // Enable dice container
            enableDiceContainer();
            // Reset alert text
            resetAlertText();
        } else if (betState === 1) {
            betButton.querySelector('span').textContent = 'CONFIRM BET';
            // Enable dice container
            enableDiceContainer();
            // Reset alert text
            resetAlertText();
        } else if (betState === 2) {
            betButton.querySelector('span').textContent = 'BET CONFIRMED';
            confirmedBetMain.classList.add('blink-border');
            // Disable dice container to prevent changes
            disableDiceContainer();
            // Reset alert text
            resetAlertText();
        } else if (betState === 3) {
            betButton.querySelector('span').textContent = 'NO MORE BETS';
            confirmedBetMain.classList.add('blink-border-red');
            // Disable dice container
            disableDiceContainer();
            // Set alert text to "NO MORE BETS"
            setAlertText('NO MORE BETS');
            // Add red flashing background to section1
            section1.classList.add('no-more-bets');
        } else if (betState === 4) {
            betButton.querySelector('span').textContent = 'DICE ROLLING';
            confirmedBetMain.classList.add('blink-border');
            disableDiceContainer();
        } else if (betState === 5) {
            // RESULTS
            betButton.querySelector('span').textContent = ''; // Clear the button text
            betButton.querySelector('i').style.display = 'none'; // Hide the lock icon
            displayHouseDiceOnButton(); // Display house dice on the button
            confirmedBetMain.classList.remove('blink-border', 'blink-border-red');
            disableDiceContainer();
        }
    }

    function displayHouseDiceOnButton() {
        const existingDiceDisplay = betButton.querySelector('.dice-display');
        if (existingDiceDisplay) {
            existingDiceDisplay.remove();
        }
        const diceDisplay = document.createElement('div');
        diceDisplay.classList.add('dice-display');
        betButton.appendChild(diceDisplay);

        // Display the dice one by one
        let diceIndex = 0;
        function showNextDice() {
            if (diceIndex < houseDiceValues.length) {
                const diceValue = houseDiceValues[diceIndex];
                const diceChar = getDiceCharacter(diceValue);

                const diceSpan = document.createElement('span');
                diceSpan.classList.add('dice');
                diceSpan.textContent = diceChar;

                // Check for matches with player's dice
                if (betPlaced && playerDiceValues[diceIndex] === diceValue) {
                    diceSpan.classList.add('matching-dice'); // Add class for flashing animation
                }

                diceDisplay.appendChild(diceSpan);

                diceIndex++;
                setTimeout(showNextDice, 500); // Adjust delay as needed
            }
        }
        showNextDice();
    }

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

    function setAlertText(message, color, animate) {
        color = color || '#ffffff';
        animate = animate || false;
        alertTextElement.innerHTML = '<span style="font-weight: bold; color: ' + color + ';">' + message + '</span>';
        if (animate) {
            // Add flashing animation
            alertTextElement.classList.add('flash');
        } else {
            alertTextElement.classList.remove('flash');
        }
        // Add fade-in animation
        alertTextElement.classList.remove('fade-in');
        void alertTextElement.offsetWidth; // trigger reflow
        alertTextElement.classList.add('fade-in');
    }

    function resetAlertText() {
        alertTextElement.classList.remove('flash');
    }

    // Dice click functionality
    const diceElements = document.querySelectorAll('.dice-container .dice');
    diceElements.forEach((dice, index) => {
        dice.addEventListener('click', function() {
            if (betsClosed || betState === 2) {
                playSound(buttonClickSound);
                return;
            }
            let diceValue = parseInt(this.getAttribute('data-value')) || 1;
            diceValue = diceValue % 6 + 1; // Cycle from 1 to 6
            this.setAttribute('data-value', diceValue);
            this.textContent = getDiceCharacter(diceValue);
            playerDiceValues[index] = diceValue; // Update player's selected dice values
            playSound(diceClickSound);
        });
    });

    function getDiceCharacter(value) {
        const diceChars = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        return diceChars[value - 1];
    }

    // Reset dice to initial state
    function resetDice() {
        const diceElements = document.querySelectorAll('.dice-container .dice');

        if (betPlaced) {
            // If the player placed a bet, reset dice to last bet dice values
            diceElements.forEach((dice, index) => {
                dice.setAttribute('data-value', lastBetDiceValues[index]);
                dice.textContent = getDiceCharacter(lastBetDiceValues[index]);
                dice.classList.remove('blink', 'winning-dice');
                dice.style.color = '';
                // Keep the red-dice class as per original state
                const isRedDice = dice.getAttribute('data-red') === 'true';
                if (isRedDice) {
                    dice.classList.add('red-dice');
                } else {
                    dice.classList.remove('red-dice');
                }
            });
            // Update playerDiceValues to match lastBetDiceValues
            playerDiceValues = [...lastBetDiceValues];
        } else {
            // If the player didn't place a bet, leave dice as they are
            // Just remove any animations and styles
            diceElements.forEach((dice, index) => {
                dice.classList.remove('blink', 'winning-dice');
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
    }

    // House dice managed internally
    let houseDiceValues = [1, 1, 1, 1]; // Initialize with dummy values

    function rollHouseDice() {
        houseDiceValues = houseDiceValues.map(() => Math.floor(Math.random() * 6) + 1);
        console.log('House dice rolled:', houseDiceValues);
    }

    function determineOutcome() {
        if (!betPlaced) {
            setAlertText('No bet placed this round.');
            betState = 5; // RESULTS
            updateBetButton();
            return;
        }
        const playerDice = document.querySelectorAll('.dice-container .dice');

        let matches = 0;

        playerDice.forEach((diceElement, index) => {
            const playerValue = parseInt(diceElement.getAttribute('data-value'));
            const houseValue = houseDiceValues[index];

            if (playerValue === houseValue) {
                matches++;
                // Highlight matching dice
                diceElement.classList.add('blink');
                // Set matching dice color to green
                diceElement.style.color = 'rgb(133, 216, 133)';
                // Play match sound
                playSound(matchSound);
            }
        });

        let winnings = 0;
        if (matches === 4) {
            winnings = betAmount * 10; // Jackpot
        } else if (matches === 3) {
            winnings = betAmount * 5;
        } else if (matches === 2) {
            winnings = betAmount * 2;
        } else if (matches === 1) {
            winnings = betAmount * 0.5; // Small win
        }

        if (winnings > 0) {
            playerBalance += winnings;
            updateBalanceDisplay();
            setAlertText('You WON $' + winnings.toFixed(2) + '!', 'rgb(133, 216, 133)', true);
            playSound(winningSound);
            triggerWinningAnimation();
            animateBalanceChange();
        } else {
            setAlertText('You LOST. Better luck next time!', '#ff4444', true);
            playSound(buttonClickSound);
        }

        betState = 5; // RESULTS
        updateBetButton();

        // Generate fake bets and winners
        generateFakeBets();

        // Reset bet state and dice after some time
        setTimeout(function() {
            resetGame();
        }, 5000); // Wait 5 seconds before resetting
    }

    function resetGame() {
        // Reset dice styles
        resetDice();

        betState = 0;
        updateBetButton();
        enableDiceContainer();
        resetAlertText();

        // Remove the dice display from the bet button
        const diceDisplay = betButton.querySelector('.dice-display');
        if (diceDisplay) {
            diceDisplay.remove();
        }

        // Show the lock icon again
        betButton.querySelector('i').style.display = ''; // Restore default display
    }

    function triggerWinningAnimation() {
        const winningDice = document.querySelectorAll('.dice-container .dice.blink');
        winningDice.forEach(dice => {
            dice.classList.add('winning-dice');
        });
    }

    // Animate balance increase
    function animateBalanceChange() {
        const balanceSpan = document.querySelector('.header-icons .balance-display');
        balanceSpan.classList.add('balance-increase');
        setTimeout(() => {
            balanceSpan.classList.remove('balance-increase');
        }, 2000); // Duration of the animation
    }

    // Generate fake bets and winners
    function generateFakeBets() {
        const scrollingBar = document.querySelector('.scrolling-bar');
        scrollingBar.innerHTML = ''; // Clear existing bets

        const fakePlayers = ['Player1', 'LuckyStar', 'GamblerX', 'HighRoller', 'FortuneFever', 'DiceMaster', 'RollerCoaster', 'BetKing', 'JackpotJoe', 'QueenOfLuck'];
        for (let i = 0; i < 10; i++) {
            const betAmount = Math.floor(Math.random() * 100) + 10;
            const diceValues = [1, 2, 3, 4].map(() => getDiceCharacter(Math.floor(Math.random() * 6) + 1));
            const betDiv = document.createElement('div');
            betDiv.classList.add('bet');
            betDiv.innerHTML = `<strong>${fakePlayers[i]}</strong> bet <span>$${betAmount}</span> ${diceValues.join(' ')}`;
            scrollingBar.appendChild(betDiv);
        }
    }

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
        '<span>Place your bets now, round </span><span style="color: #ff4444;">starting</span>',
        '<span style="font-weight: bold;">Big win last round!</span>',
        '<span>New players </span><span style="color: #ff4444;">joining the game</span>',
        '<span style="color: #ff4444;">Hurry up!</span><span> Time is running out</span>',
        '<span>Jackpot is </span><span style="color: rgb(133, 216, 133);">growing!</span>'
    ];

    let alertIndex = 0;

    setInterval(function() {
        if (betState !== 3 && betState < 4) {
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
