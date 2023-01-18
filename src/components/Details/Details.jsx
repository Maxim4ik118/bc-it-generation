import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

const Details = () => {
  const [time, setTime] = useState(0);
  const [pressedKey, setPressedKey] = useState('');
  const intervalRef = useRef();

  const handleKeyDown = event => {
    setPressedKey(event.key);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalRef.current);
    };
  }, []);

  // JSX markup -> Virtual DOM -> reder of real DOM
  return (
    <div>
      <h2>Read the details :: {time}</h2>
      <h3>You have just pressed "{pressedKey}" key</h3>
      {/* <h4>Current theme is {theme}</h4>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Click to change theme
      </button> */}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo delectus
        vero quis nihil debitis ratione, nostrum, maxime perferendis earum nulla
        odit minus soluta? A alias aspernatur nobis tempore, sequi, neque at hic
        asperiores praesentium non quis explicabo maiores odit nostrum!
      </p>
    </div>
  );
};

export default Details;
