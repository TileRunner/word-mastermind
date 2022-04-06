// import logo from './logo.svg';
import mylogo from './my-logo.svg';
import './App.css';
import './options.css';
import './customKeyboard.css';
import './wm.css';
import { useState } from 'react';
import WordMastermind from './wm';

function App() {
  const [whereTo, setWhereTo] = useState('home');
  return (
    <div className="App">
      {whereTo === 'home' ?
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={mylogo} className="App-logo" alt="logo" />
          <p>Word Mastermind, based on the 1970 Mastermind game with colored pegs.</p>
          <p>Additional options inspired by Wordle.</p>
          <button onClick={() => {setWhereTo('game');}}>Play !</button>
        </header>
      :
        <header>
          <WordMastermind setWhereTo={setWhereTo}/>
        </header>
      }
    </div>
  );
}

export default App;
