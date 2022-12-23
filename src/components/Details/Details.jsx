import React, { useState } from 'react';
import { useEffect } from 'react';

const Details = () => {
  // const [time, setTime] = useState(0);
  const [pressedKey, setPressedKey] = useState("");
  // state = {
  //   time: 0,
  //   pressedKeyName: '',
  // };

  // intervalId = null;

  const handleKeyDown = event => {
    setPressedKey(event.key);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // componentWillUnmount
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // componentDidMount

  return (
    <div>
      <h2>Read the details :: </h2>
      <h3>You have just pressed "{pressedKey}" key</h3>   
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
