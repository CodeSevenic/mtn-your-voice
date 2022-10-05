import React, { useState } from 'react';
import { AttentionIcon, CloseIcon } from '../svg/SvgIcons';
import './YourVoiceMessageField.css';

const YourVoiceMessageField = () => {
  const [charCount, setCharCount] = useState(30);
  const [charLeft] = useState(30);

  const handleCharCount = (e) => {
    let input = e.target.value;
    setCharCount(charLeft - input.length);
  };

  return (
    <div className="msg-container">
      <CloseIcon />
      <div className="input-data">
        <textarea
          onChange={(e) => handleCharCount(e)}
          type="text"
          rows={`${charCount < 0 ? '2' : '1'}`}
          placeholder="Add your voice"
          style={{ color: `${charCount >= 0 ? '#000000' : '#FF0000'}` }}
        />
        <p
          style={{ color: `${charCount >= 0 ? '#249847' : '#FF0000'}` }}
          className="character-count"
        >
          {charCount} characters
        </p>
        <button>
          <a href="">Submit</a>
        </button>
        <p className="warning-msg">
          <AttentionIcon /> Your message will be public
        </p>
      </div>
    </div>
  );
};

export default YourVoiceMessageField;
