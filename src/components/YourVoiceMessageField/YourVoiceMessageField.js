import React from 'react';
import './YourVoiceMessageField.css';

const YourVoiceMessageField = () => {
  return (
    <div className="msg-container">
      <div className="input-data">
        <input type="text" placeholder="Add your voice" />
        <label htmlFor=""></label>
      </div>
    </div>
  );
};

export default YourVoiceMessageField;
