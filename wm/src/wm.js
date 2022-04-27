import Options from "./options";
import Game from './game';

const WordMastermind = ({setWhereTo, gameOptions, setGameOptions}) => {
    return (
        <div>
            Word Mastermind
            <button onClick={() => {setWhereTo('home');}}>Home</button>
            {gameOptions.set ?
                <Game gameOptions={gameOptions} setGameOptions={setGameOptions}/>
            :
                <Options gameOptions={gameOptions} setGameOptions={setGameOptions}/>
            }
        </div>
    );
}

export default WordMastermind;