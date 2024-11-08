import React, { useState, useEffect, useRef } from 'react';
import './styles/grid.css'; // Import your CSS file
import {
  FaDollarSign,
  FaWallet,
  FaGear,
  FaEllipsisVertical,
  FaBitcoin,
  FaLock,
  FaMessage,
  FaClock,
  FaHeartPulse,
  FaRotate,
} from 'react-icons/fa';
import Header from './components/Header/Header';
import VideoContainer from './components/Video/VideoContainer';
import WagerSettings from './components/Main/WagerSettings/WagerSettings';
import DiceContainer from './components/Main/DiceContainer/DiceContainer';
import ScrollingBar from './components/Main/ScrollingBar/ScrollingBar';
import ConfirmedBet from './components/Main/ConfirmedBet/ConfirmedBet';
import Footer from './components/Footer/Footer';
import ChatBox from './components/ChatBox/ChatBox';
import { AgoraProvider } from './contexts/AgoraContext';

function App() {
  // State variables
  const [playerBalance, setPlayerBalance] = useState(1000.0);
  const [betAmount, setBetAmount] = useState(10);
  const [betState, setBetState] = useState(0);
  const [potValue, setPotValue] = useState(0);
  const [betsClosed, setBetsClosed] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [playerDiceValues, setPlayerDiceValues] = useState([1, 1, 1, 1]);
  const [lastBetDiceValues, setLastBetDiceValues] = useState([1, 1, 1, 1]);
  const [houseDiceValues, setHouseDiceValues] = useState([1, 1, 1, 1]);
  const [scrollingBets, setScrollingBets] = useState([]);
  const [alertText, setAlertText] = useState(
    <>
      <span>Place your bets now, round </span>
      <span style={{ color: '#ff4444' }}>starting</span>
    </>
  );
  const [isInfoBlockVisible, setIsInfoBlockVisible] = useState(true);

  // Refs
  const mainContentRef = useRef(null);

  // Constants
  const minBet = 10;
  const maxBet = 1000;
  const roundDuration = 20;
  const noMoreBetsDuration = 3;

  // Audio files
  const buttonClickSound = '/assets/audio/button-click.mp3';
  const diceClickSound = '/assets/audio/dice-click.mp3';
  const scrollWheelSound = '/assets/audio/scroll-wheel.mp3';
  const chingSound = '/assets/audio/ching.mp3';
  const winningSound = '/assets/audio/winning.mp3';
  const matchSound = '/assets/audio/bing.mp3';

  // Function to play sound
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play().catch((e) => {
      console.error('Sound playback failed:', e);
    });
  };

  // Adjust bet amount
  const handleAdjustButtonClick = (action) => {
    if (betState >= 2 || betsClosed) {
      playSound(buttonClickSound);
      return;
    }
    let newBetAmount = betAmount;
    if (action === 'half') {
      newBetAmount = Math.floor(betAmount / 2);
    } else if (action === 'double') {
      newBetAmount = betAmount * 2;
    } else if (action === 'max') {
      newBetAmount = playerBalance;
    }
    newBetAmount = Math.max(minBet, Math.min(newBetAmount, playerBalance, maxBet));
    setBetAmount(newBetAmount);
    playSound(buttonClickSound);
  };

  // Dice click handler
  const handleDiceClick = (index) => {
    if (betsClosed || betState === 2) {
      playSound(buttonClickSound);
      return;
    }
    const newDiceValues = [...playerDiceValues];
    newDiceValues[index] = (newDiceValues[index] % 6) + 1;
    setPlayerDiceValues(newDiceValues);
    playSound(diceClickSound);
  };

  // Start game round
  useEffect(() => {
    startGameRound();
  }, []);

  const startGameRound = () => {
    setBetsClosed(false);
    setBetPlaced(false);
    setBetState(0);
    resetDice();
    setAlertText(
      <>
        <span>Place your bets now, round </span>
        <span style={{ color: '#ff4444' }}>starting</span>
      </>
    );
    setPotValue(0);

    // More game logic here...
    // Implement the game logic as per your requirements
  };

  // Reset dice
  const resetDice = () => {
    if (betPlaced) {
      setPlayerDiceValues([...lastBetDiceValues]);
    } else {
      setPlayerDiceValues([1, 1, 1, 1]);
    }
  };

  // Get dice character
  const getDiceCharacter = (value) => {
    const diceChars = ['?', '?', '?', '?', '?', '?'];
    return diceChars[value - 1];
  };

  // Handle bet button click
  const handleBetButtonClick = () => {
    if (betsClosed) {
      playSound(buttonClickSound);
      return;
    }
    if (betState === 0) {
      setBetState(1);
      playSound(buttonClickSound);
    } else if (betState === 1) {
      if (betAmount > playerBalance) {
        alert('Insufficient balance!');
        playSound(buttonClickSound);
        return;
      }
      setPlayerBalance(playerBalance - betAmount);
      setBetState(2);
      setBetPlaced(true);
      setLastBetDiceValues([...playerDiceValues]);
      playSound(chingSound);
      // Add bet to scrolling bar
      addBetToScrollingBar('Player', betAmount, true);
    }
  };

  // Add bet to scrolling bar
  const addBetToScrollingBar = (username, amount, isPlayer = false) => {
    const newBet = { username, amount, isPlayer, id: Date.now() };
    setScrollingBets((prevBets) => [...prevBets, newBet]);
  };

  // Render component
  return (
    <AgoraProvider>
      <div className="container">
        {/* Header */}
        <Header />

        {/* Video Section */}
        <VideoContainer />

        {/* Main Content */}
        <main className="main" ref={mainContentRef}>
          <WagerSettings
            betAmount={betAmount}
            onAdjust={handleAdjustButtonClick}
          />
          <DiceContainer
            diceValues={playerDiceValues}
            onDiceClick={handleDiceClick}
            onReset={resetDice}
          />
          <ScrollingBar bets={scrollingBets} />
          <ConfirmedBet
            betAmount={betAmount}
            betState={betState}
            onBetClick={handleBetButtonClick}
            houseDice={houseDiceValues}
          />
          {/* Agora ChatBox */}
          <ChatBox />
        </main>

        {/* Footer */}
        <Footer onWalletToggle={() => setIsInfoBlockVisible(!isInfoBlockVisible)} />
      </div>
    </AgoraProvider>
  );
}

export default App;
