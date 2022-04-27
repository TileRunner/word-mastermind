import { useState } from 'react';
import { pickRandomWord } from './wordfunctions';
import { themes } from './themes';

const Options = ({gameOptions, setGameOptions}) => {
    const lenAllowedArray = [3,4,5,6,7,8,9];
    const [loading, setLoading] = useState(false);
    async function handleStartPuzzle() {
        setLoading(true);
        let randomword = await pickRandomWord(gameOptions.wordLength);
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.set = true;
        newGameOptions.secretWord = randomword.toUpperCase();
        setGameOptions(newGameOptions);
    }
    function toggleValidOnly() {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.validOnly = !gameOptions.validOnly;
        setGameOptions(newGameOptions);
    }
    function changeMode(newmode) {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.mode = newmode;
        setGameOptions(newGameOptions);
    }
    function toggleShowHeader() {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.showHeader = !gameOptions.showHeader;
        setGameOptions(newGameOptions);
    }
    function toggleShowGuesses() {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.showGuesses = !gameOptions.showGuesses;
        setGameOptions(newGameOptions);
    }
    function changeTheme(newtheme) {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.theme = newtheme;
        setGameOptions(newGameOptions);
    }
    function setWordLength(newlength) {
        let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
        newGameOptions.wordLength = newlength;
        setGameOptions(newGameOptions);
    }
    return ( <div className="optionsDiv">
        <div className='checkboxes'>
            <div className={gameOptions.validOnly ? "optionsCheckbox On" : "optionsCheckbox"}
                data-toggle="tooltip" title="Whether guess must be valid words"
                onClick={() => {toggleValidOnly();}}
            >
                <label>Guesses must be valid words</label>
            </div>
            <div className={gameOptions.mode === 'easy' ? "optionsCheckbox On" : "optionsCheckbox"}
                data-toggle="tooltip" title="Color coding shows which letters are correct or in the wrong place. Otherwise show counts only."
                onClick={() => {changeMode(gameOptions.mode === 'easy' ? 'hard' : 'easy');}}
            >
                <label>Color code the guess letters</label>
            </div>
            <div className={gameOptions.showHeader ? "optionsCheckbox On" : "optionsCheckbox"}
                onClick={() => {toggleShowHeader();}}
            >
                <label>Title and link in clipboard</label>
            </div>
            <div className={gameOptions.showGuesses ? "optionsCheckbox On" : "optionsCheckbox"}
                onClick={() => {toggleShowGuesses();}}
            >
                <label>Guess words in clipboard</label>
            </div>
        </div>
        <div className='emojiDiv'>
            <p>Emoji Theme</p>
            {themes.map((t,i) => (
                <div className={gameOptions.theme === i ? 'optionsRadio On' : 'optionsRadio'}
                    onClick={() => {changeTheme(i);}}>
                    <label>{t.c}{t.i}{t.w}</label>
                </div>
            ))}
        </div>
        <div className='lenDiv'>
            <p className='AlignCenter'>Word Length</p>
            {lenAllowedArray.map((n) => (
                <span className={n === gameOptions.wordLength ? 'lenSelected' : 'lenUnselected'}
                    key={`chooseLenMin${n}`}
                    onClick={() => { setWordLength(n); } }
                >{n}
                </span>
            ))}
        </div>
        {loading?
        <p>Waking up the puzzle maker, hang on...</p>
        :
        <div className="startPuzzleDiv">
            <button key="startPuzzle" onClick={() => { handleStartPuzzle(); } }>
                Start Puzzle
            </button>
        </div>
        }
        </div>);
}

export default Options;