import React from 'react';
import './YourVoiceMessageField.css';

const YourVoiceMessageField = () => {
  return (
    <div className="msg-container">
      <div className="input-data">
        <textarea type="text" placeholder="Add your voice" />
        <p style={{ color: '#249847' }} className="character-count">
          characters
        </p>
        <button>
          <a href="">Submit</a>
        </button>
      </div>
    </div>
  );
};

export default YourVoiceMessageField;
