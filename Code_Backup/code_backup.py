it's all perfect now:

Let's have one more button state that says NO MORE BETS - The button will turn red and flash NO MORE BETS and just like the BET CONFIMED flashes with a green outline, lets do the same for no more bets but this time with red outline. 

When the no more bets button is active I want the dice container to GREY OUT and you won't be able to click or change the values of the dice in this container <div class="dice-container">
                    <span class="dice" data-value="1" data-red="false" style="">⚀</span>
                    <span class="dice" data-value="5" data-red="false" style="color: rgb(133, 216, 133);">⚄</span>
                    <span class="dice" data-value="4" data-red="false" style="color: rgb(133, 216, 133);">⚃</span>
                    <span class="dice red-dice" data-value="6" data-red="true">⚅</span>
                </div>

I also want an ALERT to appear in text that says NO MORE BETS <div class="alert-text fade-in"><span style="font-weight: bold;">Big win last round!</span></div>

Here is the current working code, please adjust it and deliver only the full working code:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Landing Page UI</title>
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="header">
            <div class="header-logo">
                <img src="./images/Asset 2.png" alt="LiveWager Logo" class="logo">
                <div class="logo-text">
                    <span>Live</span>
                    <span class="bold">wager</span>
                    <span class="dot">.</span>
                    <span class="bold">io</span>
                </div>
            </div>
            <div class="header-icons">
                <i class="fa-solid fa-dollar-sign" style="color: rgb(133, 216, 133);"></i>
                <span>0.0000000</span>
                <i class="fa-brands fa-bitcoin" style="font-size: 30px; color: #F7931A; transform: rotate(-15deg);"></i>
                <i class="fa-solid fa-wallet"></i>
            </div>
        </header>

        <!-- Game Preview Section -->
        <section class="game-preview">
            <div class="video">
                <!-- YouTube Video Embed -->
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/JqcidR5c038" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <div class="game-pot">
                <span class="live">live</span>
                <div class="rightdiv">
                    <span style="font-weight: 600; margin-right: 25px; color: white;"> POT: <span id="potValueDisplay" style="color: rgb(133, 216, 133);"><b>$ 1560.8329</b></span> </span>
                    <i class="fa-brands fa-bitcoin" style="font-size: 38px; color: #F7931A; transform: rotate(-15deg); "></i>
                </div>
            </div>
        </section>

        <!-- Wager Settings Section -->
        <section class="wager-settings">
            <!-- Alert Text -->
            <div class="section1">
                <div class="alert-text">
                    <span>Place your bets now, round </span>
                    <span style="color: #ff4444;">starts soon</span>
                </div>
                <div id="trigger-special-action" style="min-width: 30px; cursor: pointer;">
                    <i class="fa-solid fa-gear" style="margin-right: 5px;"></i>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>

            <div class="balance-info">
                <div class="info-block">
                    <div class="info-first">
                        <p style="font-weight: 600;">BET Amount:</p>
                        <span class="bet-amount" style="color: rgb(133, 216, 133); font-weight: 600; font-size: 40px;">
                            $10
                        </span>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span class="amount">0.00023</span>
                            <i class="fa-brands fa-bitcoin" style="font-size: 30px; color: #F7931A; transform: rotate(-15deg); margin-left: 5px;"></i>
                        </div>
                    </div>
                    <div class="info-second">
                        <span class="adjust-button" data-action="half">1/2</span>
                        <span class="adjust-button" data-action="double">2X</span>
                        <span class="adjust-button active" data-action="max">MAX</span>
                    </div>
                    <!-- Scroller -->
                    <div class="wheel">
                        <img src="./images/scroll_wheel.png" alt="Scroller" />
                    </div>
                </div>

                <div class="info-block2">
                    <img src="./images/image.png" alt="">
                </div>
            </div>

            <div class="dice-main">
                <div class="dice-container">
                    <span class="dice" data-value="1">⚀</span>
                    <span class="dice" data-value="4">⚃</span>
                    <span class="dice" data-value="3">⚂</span>
                    <span class="dice red-dice" data-value="6">⚅</span>
                </div>
                <div class="dice-container disabled">
                    <span class="dice" data-value="5">⚄</span>
                    <span class="dice" data-value="6">⚅</span>
                    <span class="dice" data-value="1">⚀</span>
                    <span class="dice red-dice" data-value="6">⚅</span>
                </div>
                <button class="refresh-btn">
                    <i class="fa-solid fa-rotate" style="font-size: 20px;"></i>
                </button>
            </div>

            <!-- Scrolling Bar with Fake Bets -->
            <div class="scrolling-bar">
                <div class="bet">
                    <strong>JKyle</strong> bet <span>$55</span>
                    <span class="dice">⚀</span>
                    <span class="dice">⚁</span>
                    <span class="dice">⚂</span>
                    <span class="dice red-dice">⚁</span>
                </div>
                <div class="bet">
                    <strong>Arius88</strong> bet <span>$10</span>
                    <span class="dice">⚀</span>
                    <span class="dice">⚁</span>
                    <span class="dice">⚂</span>
                    <span class="dice red-dice">⚁</span>
                </div>
                <!-- Additional Fake Bets -->
                <div class="bet">
                    <strong>LuckyStar</strong> bet <span>$75</span>
                    <span class="dice">⚄</span>
                    <span class="dice">⚂</span>
                    <span class="dice">⚁</span>
                    <span class="dice red-dice">⚃</span>
                </div>
                <div class="bet">
                    <strong>GamblerX</strong> bet <span>$20</span>
                    <span class="dice">⚂</span>
                    <span class="dice">⚅</span>
                    <span class="dice">⚀</span>
                    <span class="dice red-dice">⚄</span>
                </div>
                <!-- Add more bets as needed -->
            </div>

            <div class="confirmedbet-main">
                <div class="price">
                    <p class="amount">$ <span>100</span></p>
                    <p class="label">Total Pot Value</p>
                </div>
                <div class="button bet-button state-0">
                    <span>PLACE BET</span>
                    <i class="fa-solid fa-lock"></i>
                </div>
            </div>

            <!-- Footer Section -->
            <footer class="footer">
                <span class="items active">
                    <img src="./images/Asset 2.png" alt="LiveWager Logo" style="height: 16px; width: 26px;">
                </span>
                <span class="items">
                    <i class="fa-regular fa-message"></i>
                </span>
                <span class="items">
                    <i class="fa-regular fa-clock"></i>
                </span>
                <span class="items">
                    <i class="fa-solid fa-wallet"></i>
                </span>
                <div class="items">
                    <i class="fa-solid fa-heart-pulse"></i>
                </div>
                <span class="items">
                    <i class="fa-solid fa-gear"></i>
                </span>
            </footer>
        </section>
    </div>

    <!-- JavaScript -->
    <script>
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

            wheel.addEventListener('mousedown', function(event) {
                isDragging = true;
                startY = event.clientY;
                event.preventDefault();
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
                            playSound(scrollWheelSound);
                        }
                    }
                }
            });

            document.addEventListener('mouseup', function(event) {
                isDragging = false;
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
            let betState = 0; // initial state

            betButton.addEventListener('click', function() {
                betState = (betState + 1) % 3; // Cycle through 0,1,2
                updateBetButton();
                updatePotValue(); // Refresh pot value each time button is clicked

                if (betState === 2) {
                    playSound(chingSound); // Play ching sound when bet is confirmed
                } else {
                    playSound(buttonClickSound);
                }
            });

            function updateBetButton() {
                betButton.classList.remove('state-0', 'state-1', 'state-2');
                betButton.classList.add('state-' + betState);

                // Reset confirmedBetMain border
                confirmedBetMain.classList.remove('blink-border');

                if (betState === 0) {
                    betButton.querySelector('span').textContent = 'PLACE BET';
                } else if (betState === 1) {
                    betButton.querySelector('span').textContent = 'CONFIRM BET';
                } else if (betState === 2) {
                    betButton.querySelector('span').textContent = 'BET CONFIRMED';
                    confirmedBetMain.classList.add('blink-border');
                }
            }

            updateBetButton(); // Initialize the button state

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
            const alertTextElement = document.querySelector('.alert-text');

            setInterval(function() {
                alertIndex = (alertIndex + 1) % alertMessages.length;
                alertTextElement.innerHTML = alertMessages[alertIndex];
                // Add animation class
                alertTextElement.classList.remove('fade-in');
                void alertTextElement.offsetWidth; // trigger reflow
                alertTextElement.classList.add('fade-in');
            }, 5000); // change message every 5 seconds

        });
    </script>
</body>
</html>

____________________________________________________________________________

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #1c1c1e;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-transform: uppercase;
}

.container {
  width: 100%;
  max-width: 1000px;
  background-color: #171519;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo img {
  height: 30px;
  width: 40px;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 1.2rem;
}

.logo-text .bold {
  font-weight: 700;
}

.logo-text .dot {
  font-size: 1.5rem;
  color: red;
  animation: blink-dot 1s infinite;
}

@keyframes blink-dot {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.header-icons {
  border: 1px solid grey;
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-icons .icon {
  font-size: 1.2em;
  margin-left: 5px;
}

/* Game Preview */
.game-preview {
  position: relative;
}

.video {
  height: 300px;
}

.video iframe {
  width: 100%;
  height: 100%;
}

.game-pot {
  position: absolute;
  bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.game-pot .live {
  background-color: red;
  padding: 5px 10px;
  border-radius: 8px;
}

.rightdiv {
  display: flex;
  align-items: center;
  background-color: #2c2c2e; /* Darker grey */
  opacity: 0.9;
  padding: 10px 15px;
  border-radius: 15px;
  position: relative;
}

.rightdiv i {
  position: absolute;
  right: 0;
}

/* Section1 */
.section1 {
  background-color: #131215; /* Match other containers */
  display: flex;
  align-items: center;
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  justify-content: space-between;
}

.section1.no-more-bets {
  background-color: #ff4444; /* Red background */
  animation: blink-section 1s infinite;
}

@keyframes blink-section {
  0%, 100% { background-color: #ff4444; }
  50% { background-color: #990000; }
}

.alert-text {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
}

.alert-text.fade-in {
  animation: fadeInDown 1s;
}

@keyframes fadeInDown {
  from {
      opacity: 0;
      transform: translateY(-20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.balance-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  gap: 10px;
}

@media (max-width: 600px) {
  .balance-info {
    flex-direction: column;
  }
}

.info-block {
  background-color: #131215;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-first {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-second {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.info-second span {
  background-color: #2c2c2e;
  padding: 10px 6px;
  border-radius: 6px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.info-second .active {
  background-color: rgb(133, 216, 133);
}

.info-block p {
  font-size: 20px;
}

.amount {
  font-size: 35px;
  font-weight: 600;
}

.wheel {
  width: 50px;
  height: 150px;
  border-radius: 5px;
  box-shadow: inset 0 0 10px #000;
  cursor: pointer;
  overflow: hidden;
}

.wheel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-block2 {
  background-color: #131215;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.info-block2 img {
  border-radius: 100%;
  width: 80%;
}

.dice-main {
  position: relative;
}

.dice-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  background-color: #131215;
  border-radius: 10px;
  padding: 0px 15px;
  padding-bottom: 5px;
}

.dice-container .dice {
  font-size: 120px;
  font-weight: bold;
  cursor: pointer;
}

.dice-container.disabled .dice {
  cursor: default;
}

.dice-container .red-dice {
  color: red;
}

.refresh-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.scrolling-bar {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  background-color: #131215;
  border-radius: 35px;
  padding: 10px 20px;
  margin-top: 10px;
}

.scrolling-bar .bet {
  display: inline-flex;
  align-items: center;
  margin-right: 40px;
}

.scrolling-bar .bet span {
  color: rgb(133, 216, 133);
  font-weight: bold;
  margin-left: 5px;
}

.scrolling-bar .dice {
  color: white !important;
  font-size: 30px;
}

.scrolling-bar .dice.red-dice {
  color: red !important;
}

.confirmedbet-main {
  background-color: #131215;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding: 10px 10px;
  border-radius: 10px;
  border: 2px solid rgb(89, 104, 89); /* Initial border color */
}

.confirmedbet-main.blink-border {
  animation: blink-border 1s infinite;
}

@keyframes blink-border {
  0%, 100% { border-color: rgb(89, 104, 89); }
  50% { border-color: rgb(133, 216, 133); }
}

.confirmedbet-main .price {
  text-align: center;
  width: 50%;
}

.confirmedbet-main .price .amount {
  color: rgb(133, 216, 133);
  font-size: 20px;
}

.confirmedbet-main .price .amount span {
  font-size: 45px;
}

.confirmedbet-main .price .label {
  font-size: 14px;
}

.confirmedbet-main .button {
  width: 50%;
  padding: 15px 15px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
}

/* Bet Button States */
.bet-button.state-0 {
  background-color: #1a1a1a;
  color: white;
  animation: flashing 1s infinite;
}

.bet-button.state-1 {
  background-color: #1a1a1a;
  color: white;
  animation: flashing 1s infinite;
}

.bet-button.state-2 {
  background-color: rgb(133, 216, 133); /* Use consistent green color */
  color: white;
  animation: flashing 1s infinite;
}

.bet-button.state-3 {
  background-color: #ff4444; /* Red background for NO MORE BETS */
  color: white;
  animation: flashing 1s infinite;
}

@keyframes flashing {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 600px) {
  .confirmedbet-main {
    flex-direction: column;
    gap: 10px;
  }

  .confirmedbet-main .price {
    width: 100%;
  }

  .confirmedbet-main .button {
    width: 100%;
  }
}

.confirmedbet-main .button i {
  margin-left: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 20px;
}

.footer .items {
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 60px;
  width: 60px;
}

@media (max-width: 600px) {
  .footer .items {
    height: 40px;
    width: 40px;
  }
}

.footer .items.active {
  border: 1px solid white;
}

/* Responsive Styles */
@media (min-width: 600px) {
  .container {
    max-width: 600px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 600px;
  }
}
