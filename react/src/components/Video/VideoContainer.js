import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import './VideoContainer.css';

const VideoContainer = () => {
  return (
    <div className="video-container">
      <div className="video">
        <iframe
          id="twitch-video"
          width="100%"
          height="100%"
          src="https://player.twitch.tv/?channel=livewager&parent=templedice.vercel.app"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Live Stream"
          style={{ backgroundColor: 'black' }}
        ></iframe>
      </div>
      <div className="game-pot">
        <span className="live">live</span>
        <div className="rightdiv">
          <span style={{ fontWeight: 600, marginRight: '25px', color: 'white' }}>
            POT: <span id="potValueDisplay" style={{ color: 'rgb(133, 216, 133)' }}><b>$ 1560.83</b></span>
          </span>
          <FaBitcoin style={{ fontSize: '38px', color: '#F7931A', transform: 'rotate(-15deg)' }} />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
