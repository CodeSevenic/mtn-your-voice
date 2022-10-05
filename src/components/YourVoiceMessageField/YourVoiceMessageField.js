import React, { useState } from 'react';
import { AttentionIcon, CloseIcon, CorrectIcon } from '../svg/SvgIcons';
import Spinner from '../../assets/cupertino_activity_indicator_selective.gif';
import { invalidWords } from '../../invalidWords';
import './YourVoiceMessageField.css';

const YourVoiceMessageField = () => {
  const [charCount, setCharCount] = useState(30);
  // const [curCharNo, setCurrCharNo] = useState(0);
  const [fieldEmpty, setFieldEmpty] = useState(false);
  const [word, setWord] = useState('');
  const [invalid, setInValid] = useState(false);
  const [longMsg, setLongMsg] = useState(false);
  const [charLeft] = useState(30);

  const [closeDone, setCloseDone] = useState(false);

  const [submit, setSubmit] = useState(false);

  // Handle state when user types
  const handleCharCount = (e) => {
    let input = e.target.value;
    setCharCount(charLeft - input.length);
    // setCurrCharNo(input.length);
    setWord(e.target.value);
    if (charCount >= 0) {
      setLongMsg(false);
      setFieldEmpty(false);
    }
    // if bad word detected stop submit and flag
    if (!checkInvalidWords(badWords, word?.toLowerCase()?.split(' '))) {
      setInValid(false);
    } else {
      setInValid(true);
    }
  };

  // LowerCase and Trim all the words the array
  const badWords = [];
  invalidWords.map((word) => {
    badWords.push(word.toLowerCase().trim());
  });

  // strictly check that contains 1 and only one match
  const checkInvalidWords = (conditions, string) => {
    return conditions.some((el) => string.includes(el));
  };

  // console.log(checkInvalidWords(badWords, word?.toLowerCase()?.split(' ')));

  // Handles submit,
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if bad word detected stop submit and return
    if (!checkInvalidWords(badWords, word?.toLowerCase()?.split(' '))) {
      setInValid(false);
    } else {
      setInValid(true);
      return;
    }

    // Handles too long message flag
    if (charCount < 0) {
      setLongMsg(true);
      return;
    } else {
      setLongMsg(false);
    }

    // Only submit if some words are available
    if (word.length > 0) {
      setSubmit(true);
    } else {
      setFieldEmpty(true);
      return;
    }

    // Wrapping with timeOut function to mimic API request
    // setTimeout(() => {
    //   setSubmit(true);

    // Handles word validation logic before submit to server
    if (!checkInvalidWords(badWords, word?.toLowerCase()?.split(' '))) {
      // ------------------------
      try {
        const res = await fetch(
          'https://us-central1-mtn-your-voice-web-servi-d07aa.cloudfunctions.net/api/messages',
          {
            method: 'POST',
            body: JSON.stringify({
              message: word,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        ).then((res) => {
          // console.log(res);
          console.log('Words Accept');
          setSubmit(false);
          setCloseDone(true);
          setWord('');
          setCharCount(30);
        });

        // console.log('RESPONSE: ', res);
      } catch (error) {
        console.log(error);
      }

      // ------------------------

      // ------------------------
    } else {
      console.log('Words Rejected');
      setSubmit(false);
      setCloseDone(false);
    }
    // }, 2000);
  };

  return (
    <div className="msg-container">
      <CloseIcon />
      {closeDone && (
        <div className="success-window">
          <div onClick={() => setCloseDone(false)} className="close-done">
            <CloseIcon />
          </div>
          <p>Look for your voice in the night sky.</p>
          <div onClick={() => setCloseDone(false)} className="success-mark">
            <CorrectIcon /> <p>Done</p>
          </div>
        </div>
      )}
      <div className="input-data">
        <textarea
          onChange={(e) => handleCharCount(e)}
          type="text"
          rows={`${charCount < 0 ? '2' : '1'}`}
          placeholder="Add your voice"
          style={{ color: `${charCount >= 0 ? '#000000' : '#FF0000'}` }}
          value={word}
        />
        <div className="msg-flags">
          <p
            style={{
              display: `${longMsg && charCount < 0 ? 'block' : 'none'}`,
              color: '#FF0000',
            }}
            className="long-msg"
          >
            Message too long
          </p>{' '}
          <p
            style={{
              display: `${!longMsg && fieldEmpty ? 'block' : 'none'}`,
              color: '#FF0000',
            }}
            className="empty-msg"
          >
            Please enter a message above
          </p>{' '}
          <p
            style={{
              display: `${invalid ? 'block' : 'none'}`,
              color: '#FF0000',
            }}
            className="empty-msg"
          >
            Oops, that word is not allowed
          </p>{' '}
          <p
            style={{ color: `${charCount >= 0 ? '#249847' : '#FF0000'}` }}
            className="character-count"
          >
            {charCount} characters
          </p>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className={`${submit ? 'submitting' : ''}`}
        >
          {submit && (
            <div className="load-spinner">
              <img src={Spinner} alt="Load Spinner" />
            </div>
          )}
          <a href="#" className={`${submit ? 'submitting' : ''}`}>
            Submit
          </a>
        </button>
        <p className="warning-msg">
          <AttentionIcon /> Your message will be public
        </p>
      </div>
    </div>
  );
};

export default YourVoiceMessageField;
