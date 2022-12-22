import React from 'react';

class Details extends React.Component {
  state = {
    time: 0,
    pressedKeyName: '',
  };

  intervalId = null;

  handleKeyDown = event => {
    this.setState(() => ({ pressedKeyName: event.key }));
  };

  componentDidMount() {
    // Метод спрацьовує лише при появі компонента в розмітці
    /*
        1. При запитах на сервер
        2. При встановленні setInterval|setTimeout
        3. При встановленні глобальних слухачів подій (addEventListener)
    */
    window.addEventListener('keydown', this.handleKeyDown);

    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    // Метод спрацьовує перед тим, як компонент буде повністю видалений з розмітки
    /*
        1. При відміні запитів на сервер
        2. Для видалення setInterval|setTimeout, використовуючи функції
            clearInterval|clearTimeout
        3. При видаленні слухачів подій (removeEventListener)
    */
    clearInterval(this.intervalId);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div>
        <h2>Read the details :: {this.state.time}</h2>
        <h3>You have just pressed "{this.state.pressedKeyName}" key</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo delectus
          vero quis nihil debitis ratione, nostrum, maxime perferendis earum
          nulla odit minus soluta? A alias aspernatur nobis tempore, sequi,
          neque at hic asperiores praesentium non quis explicabo maiores odit
          nostrum!
        </p>
      </div>
    );
  }
}

export default Details;
