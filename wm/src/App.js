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
          <WordMastermind setWhereTo={setWhereTo}/>
        </header>
      }
    </div>
  );
}

export default App;
