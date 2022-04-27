import mylogo from './my-logo.svg';
import './App.css';
import './options.css';
import './customKeyboard.css';
import './wm.css';
import { useState } from 'react';
import WordMastermind from './wm';

function App() {
  const [whereTo, setWhereTo] = useState('home');
  const [gameOptions, setGameOptions] = useState({
    set: false,
    secretWord: '',
    mode: 'easy',
    validOnly: true,
    theme: 2,
    wordLength: 5,
    showHeader: false,
    showGuesses: false
});
return (
    <div>
      {whereTo === 'home' ?
        <header className="App-header">
          <img src={mylogo} className="App-logo" alt="logo" />
          <div className='App-under-logo'>
            <p>Based on the 1970 Mastermind game with colored pegs.</p>
            <p>Additional options inspired by Wordle.</p>
            <button onClick={() => {setWhereTo('game');}}>Play !</button>
          </div>
        </header>
      :
        <header>
          <WordMastermind setWhereTo={setWhereTo} gameOptions={gameOptions} setGameOptions={setGameOptions}/>
        </header>
      }
    </div>
  );
}

export default App;
