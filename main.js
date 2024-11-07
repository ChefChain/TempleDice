document.addEventListener('DOMContentLoaded', function() {
    // Audio files
    const buttonClickSound = new Audio('/assets/audio/button-click.mp3');
    const diceClickSound = new Audio('/assets/audio/dice-click.mp3');
    const scrollWheelSound = new Audio('/assets/audio/scroll-wheel.mp3');
    const chingSound = new Audio('/assets/audio/ching.mp3');
    const winningSound = new Audio('/assets/audio/winning.mp3');
    const matchSound = new Audio('/assets/audio/bing.mp3'); // New sound for matching dice

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
    const betAmountSpan = document.querySelectorAll('.bet-amount');
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
            // **Prevent bet adjustments after confirmation or bets closed**
            if (betState >= 2 || betsClosed) {
                playSound(buttonClickSound);
                return; // Do not allow adjustments
            }

            const action = this.getAttribute('data-action');
            if (action === 'half') {
                betAmount = Math.floor(betAmount / 2);
            } else if (action === 'double') {
                betAmount = betAmount * 2;
            } else if (action === 'max') {
                betAmount = playerBalance; // Adjust to player's balance
            }
            betAmount = Math.max(minBet, Math.min(betAmount, playerBalance, maxBet)); // keep within bounds
            betAmountSpan.forEach(span => span.textContent = betAmount);
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
        // **Prevent bet adjustments after confirmation or bets closed**
        if (betState >= 2 || betsClosed) return;

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
                    betAmountSpan.forEach(span => span.textContent = betAmount);
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
        // **Prevent bet adjustments after confirmation or bets closed**
        if (betState >= 2 || betsClosed) return;

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
                    betAmountSpan.forEach(span => span.textContent = betAmount);
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
    let potValue = 0;
    const potValueDisplay = document.getElementById('potValueDisplay');

    function updatePotValue() {
        potValueDisplay.innerHTML = '<b>$ ' + potValue.toFixed(2) + '</b>';
    }

    // Bet Button States
    const betButton = document.querySelector('.bet-button');
    const confirmedBetMain = document.querySelector('.confirmedbet-main');
    const section1 = document.querySelector('.section1');
    let betState = 0; // initial state

    const clickableDiceContainer = document.querySelector('.dice-container');
    const alertTextElement = document.querySelector('.alert-text');

    // Variables for game timing
    let roundDuration = 20; // seconds (Adjusted from 15 to 20)
    let noMoreBetsDuration = 3; // seconds before the end of the round (Adjusted from 5 to 3)
    let roundTimer;

    let betsClosed = false; // Indicates whether bets are closed for this round
    let betPlaced = false; // Indicates whether the player has placed and confirmed a bet in this round

    // Dice Values
    let playerDiceValues = [1, 1, 1, 1]; // Player's current selected dice values
    let lastBetDiceValues = [1, 1, 1, 1]; // The dice values the player used in their last bet

    // Reference to player's bet entry in scrolling bar
    let playerBetEntry = null;

    // Unique identifier for bets
    let betIdCounter = 0;

    // Function to add a bet to the scrolling bar
    function addBetToScrollingBar(username, amount, isPlayer = false) {
        const scrollingBar = document.querySelector('.scrolling-bar');
        const betDiv = document.createElement('div');
        betDiv.classList.add('bet'); // Changed from 'bet-entry' to 'bet'
        betDiv.setAttribute('data-username', username);
        betDiv.setAttribute('data-bet-id', betIdCounter++);

        if (isPlayer) {
            betDiv.classList.add('player-bet'); // For highlighting
            betDiv.innerHTML = `<strong>${username}</strong> bet <span>$${amount}</span>`;
            playerBetEntry = betDiv; // Store reference for later update
        } else {
            betDiv.innerHTML = `<strong>${username}</strong> bet <span>$${amount}</span>`;
        }
        scrollingBar.appendChild(betDiv);

        // Ensure smooth scrolling to the new bet
        betDiv.scrollIntoView({ behavior: 'smooth', inline: 'end' });

        // Limit the number of bets displayed to prevent overflow (e.g., max 20 bets)
        const maxBets = 20;
        const currentBets = scrollingBar.querySelectorAll('.bet');
        if (currentBets.length > maxBets) {
            scrollingBar.removeChild(currentBets[0]);
        }

        return betDiv;
    }

    // Function to update the player's bet entry with outcome
    function updatePlayerBetOutcome(outcome) {
        if (playerBetEntry) {
            const outcomeSpan = document.createElement('span');
            outcomeSpan.classList.add('outcome');
            outcomeSpan.textContent = ' - ' + outcome;
            playerBetEntry.appendChild(outcomeSpan);
            // Add a class to style the outcome
            if (outcome.startsWith('Won')) {
                playerBetEntry.classList.add('bet-won');
            } else if (outcome.startsWith('Lost')) {
                playerBetEntry.classList.add('bet-lost');
            }
            playerBetEntry = null; // Reset the reference
        }
    }

    // Function to highlight AI winners
    function highlightAIWinners(winners) {
        const scrollingBar = document.querySelector('.scrolling-bar');
        winners.forEach(winner => {
            const betDivs = scrollingBar.querySelectorAll('.bet[data-username="' + winner.name + '"]');
            betDivs.forEach(betDiv => {
                // Avoid re-adding outcome if already present
                if (!betDiv.querySelector('.outcome')) {
                    const outcomeSpan = document.createElement('span');
                    outcomeSpan.classList.add('outcome');
                    outcomeSpan.textContent = ' - Won!';
                    betDiv.appendChild(outcomeSpan);
                    betDiv.classList.add('bet-won');
                }
            });
        });
    }

    // Function to simulate AI players placing bets during betting period
    let aiBetInterval = null;
    function startAIBets() {
        const fakePlayers = ['Player1', 'LuckyStar', 'GamblerX', 'HighRoller', 'FortuneFever', 'DiceMaster', 'RollerCoaster', 'BetKing', 'JackpotJoe', 'QueenOfLuck'];
        aiBetInterval = setInterval(() => {
            // Randomly select an AI player
            const randomPlayer = fakePlayers[Math.floor(Math.random() * fakePlayers.length)];
            // Random bet amount between minBet and maxBet
            const aiBetAmount = Math.floor(Math.random() * (maxBet - minBet + 1)) + minBet;
            addBetToScrollingBar(randomPlayer, aiBetAmount, false);
        }, 2000); // AI places a bet every 2 seconds
    }

    function stopAIBets() {
        if (aiBetInterval) {
            clearInterval(aiBetInterval);
            aiBetInterval = null;
        }
    }

    function startGameRound() {
        betsClosed = false;
        betPlaced = false;
        betState = 0; // Reset to PLACE BET state
        updateBetButton();
        resetDice(); // Reset dice as per the logic
        setAlertText('Place your bets now, round starting');

        // Reset pot value
        potValue = 0;
        updatePotValue();

        // Generate target pot value between $400 and $1000
        let targetPotValue = Math.floor(Math.random() * 601) + 400; // Random between 400 and 1000

        // Betting period duration
        let bettingPeriodDuration = roundDuration - noMoreBetsDuration; // 20 -3 =17 seconds

        // Calculate pot increment per second
        let potIncrement = targetPotValue / bettingPeriodDuration;

        // Start AI betting simulation
        startAIBets();

        // Start the timer
        let timeLeft = roundDuration;

        roundTimer = setInterval(function() {
            timeLeft--;

            if (timeLeft > noMoreBetsDuration) {
                // Betting period
                potValue += potIncrement;
                if (potValue > targetPotValue) {
                    potValue = targetPotValue;
                }
                updatePotValue();
            }

            if (timeLeft === noMoreBetsDuration) {
                // Close bets
                betsClosed = true;
                betState = 3; // NO MORE BETS
                updateBetButton();
                disableDiceContainer();
                setAlertText('NO MORE BETS');
                stopAIBets(); // Stop AI betting simulation
            }
            if (timeLeft <= 0) {
                clearInterval(roundTimer);
                // Ensure potValue reaches targetPotValue
                potValue = targetPotValue;
                updatePotValue();

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

            // Add player's bet to scrolling bar
            addBetToScrollingBar('Jhordan604', betAmount, true);
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
            const lockIcon = betButton.querySelector('i');
            if (lockIcon) lockIcon.style.display = ''; // Restore default display
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
            const lockIcon = betButton.querySelector('i');
            if (lockIcon) lockIcon.style.display = 'none'; // Hide the lock icon
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
                // For black dice (indices 0-2), matches can be in any order
                // For red die (index 3), match must be by position
                if (betPlaced) {
                    if (diceIndex < 3) { // Black dice
                        if (playerDiceValues.slice(0,3).includes(diceValue)) {
                            diceSpan.classList.add('matching-dice'); // Add class for flashing animation
                        }
                    } else { // Red die
                        if (playerDiceValues[diceIndex] === diceValue) {
                            diceSpan.classList.add('matching-dice'); // Add class for flashing animation
                        }
                    }
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
    function setupDiceClickHandlers() {
        const diceElements = document.querySelectorAll('.dice-container .dice');
        diceElements.forEach((dice, index) => {
            // Remove existing event listeners to prevent multiple bindings
            const newDice = dice.cloneNode(true);
            dice.parentNode.replaceChild(newDice, dice);

            newDice.addEventListener('click', function() {
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
    }

    // Initialize dice click handlers
    setupDiceClickHandlers();

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
                dice.classList.remove('blink', 'winning-dice', 'matching-dice', 'bet-won', 'bet-lost');
                dice.style.color = '';
            });
            // Update playerDiceValues to match lastBetDiceValues
            playerDiceValues = [...lastBetDiceValues];
        } else {
            // If the player didn't place a bet, leave dice as they are
            // Just remove any animations and styles
            diceElements.forEach((dice, index) => {
                dice.classList.remove('blink', 'winning-dice', 'matching-dice', 'bet-won', 'bet-lost');
                dice.style.color = '';
            });
        }

        // Re-attach click handlers
        setupDiceClickHandlers();
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

        // Separate player and house dice into black and red
        const playerBlack = playerDiceValues.slice(0,3);
        const playerRed = playerDiceValues[3];

        const houseBlack = [...houseDiceValues.slice(0,3)]; // Copy to manipulate
        const houseRed = houseDiceValues[3];

        let matches = 0;

        // Count black dice matches (order doesn't matter)
        let blackMatches = 0;
        let matchedHouseBlackIndices = []; // To avoid double-counting

        playerBlack.forEach((pValue, pIndex) => {
            const houseMatchIndex = houseBlack.findIndex((hValue, hIndex) => hValue === pValue && !matchedHouseBlackIndices.includes(hIndex));
            if (houseMatchIndex !== -1) {
                blackMatches++;
                matchedHouseBlackIndices.push(houseMatchIndex);
                // Highlight player's black die as matched
                const diceElement = clickableDiceContainer.querySelectorAll('.dice')[pIndex];
                diceElement.classList.add('blink');
                diceElement.style.color = 'rgb(133, 216, 133)';
                playSound(matchSound);
            }
        });

        matches += blackMatches;

        // Check red die match (must match by position)
        if (playerRed === houseRed) {
            matches++;
            // Highlight red die as matched
            const redDiceElement = clickableDiceContainer.querySelectorAll('.dice')[3];
            redDiceElement.classList.add('blink');
            redDiceElement.style.color = 'rgb(133, 216, 133)';
            playSound(matchSound);
        }

        // Generate fake players and their matches
        let fakePlayers = ['Player1', 'LuckyStar', 'GamblerX', 'HighRoller', 'FortuneFever', 'DiceMaster', 'RollerCoaster', 'BetKing', 'JackpotJoe', 'QueenOfLuck'];

        let fakePlayerMatches = []; // Array to store matches of fake players

        for (let i = 0; i < fakePlayers.length; i++) {
            let fakePlayerDiceValues = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 6) + 1);

            // Separate fake player's dice into black and red
            const fakePlayerBlack = fakePlayerDiceValues.slice(0,3);
            const fakePlayerRed = fakePlayerDiceValues[3];

            let fakePlayerBlackMatches = 0;
            let matchedHouseFakeBlackIndices = [];

            fakePlayerBlack.forEach((fpValue, fpIndex) => {
                const houseMatchIndex = houseBlack.findIndex((hValue, hIndex) => hValue === fpValue && !matchedHouseFakeBlackIndices.includes(hIndex));
                if (houseMatchIndex !== -1) {
                    fakePlayerBlackMatches++;
                    matchedHouseFakeBlackIndices.push(houseMatchIndex);
                }
            });

            let fakePlayerMatchesCount = fakePlayerBlackMatches;

            // Check red die match
            if (fakePlayerRed === houseRed) {
                fakePlayerMatchesCount++;
            }

            fakePlayerMatches.push({
                name: fakePlayers[i],
                matches: fakePlayerMatchesCount
            });
        }

        // Add player's matches to the list
        fakePlayerMatches.push({
            name: 'Jhordan604',
            matches: matches
        });

        // Determine the highest number of matches
        let maxMatches = Math.max(...fakePlayerMatches.map(fp => fp.matches));

        // Find all winners
        let winners = fakePlayerMatches.filter(fp => fp.matches === maxMatches);

        // Identify big winners (e.g., matches >= 3)
        let bigWinners = winners.filter(fp => fp.matches >= 3);

        let playerWon = winners.some(w => w.name === 'Jhordan604');

        if (playerWon) {
            // Player wins a share of the pot
            let winnings = potValue / winners.length;
            playerBalance += winnings;
            updateBalanceDisplay();
            setAlertText('You WON $' + winnings.toFixed(2) + '!', 'rgb(133, 216, 133)', true);
            playSound(winningSound);
            triggerWinningAnimation();
            animateBalanceChange();

            // Update player's bet entry with outcome
            updatePlayerBetOutcome('Won $' + winnings.toFixed(2));
        } else {
            setAlertText('You LOST. Better luck next time!', '#ff4444', true);
            playSound(buttonClickSound);

            // Update player's bet entry with outcome
            updatePlayerBetOutcome('Lost');
        }

        // Highlight big winners (both AI and player)
        if (bigWinners.length > 0) {
            highlightAIWinners(bigWinners);
        }

        betState = 5; // RESULTS
        updateBetButton();

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
        const lockIcon = betButton.querySelector('i');
        if (lockIcon) lockIcon.style.display = ''; // Restore default display

        // Optional: Remove outcome highlights after resetting
        const scrollingBar = document.querySelector('.scrolling-bar');
        const outcomeSpans = scrollingBar.querySelectorAll('.outcome');
        outcomeSpans.forEach(span => span.remove());

        // Optional: Remove winning classes to reset styles
        const winningBets = scrollingBar.querySelectorAll('.bet-won, .bet-lost, .big-winner');
        winningBets.forEach(bet => {
            bet.classList.remove('bet-won', 'bet-lost', 'big-winner');
        });
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

    // Removed the existing scrolling animation
    // Instead, rely on smooth scrolling when new bets are added

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

    walletToggleButton && walletToggleButton.addEventListener('click', function() {
        isInfoBlockVisible = !isInfoBlockVisible;
        if (isInfoBlockVisible) {
            infoBlockDiv.style.display = 'flex'; // or 'block' if you prefer
        } else {
            infoBlockDiv.style.display = 'none';
        }
    });

    // Function to highlight big winners (if needed for non-top matches)
    // Not implemented here as it's already covered by highlightAIWinners
});
