import { useState } from 'react';
import Options from "./options";
import Game from './game';

const WordMastermind = ({setWhereTo}) => {
    const [gameOptions, setGameOptions] = useState({set:false});
    return (
        <div>
            Word Mastermind
            <button onClick={() => {setWhereTo('home');}}>Home</button>
            {gameOptions.set ?
                <Game gameOptions={gameOptions} setGameOptions={setGameOptions}/>
            :
                <Options setGameOptions={setGameOptions}/>
            }
        </div>
    );
}

export default WordMastermind;