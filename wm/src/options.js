import { useState } from 'react';
import { pickRandomWord } from './wordfunctions';

const Options = ({setGameOptions}) => {
    const lenAllowedArray = [3,4,5,6,7,8,9];
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('easy');
    const [wordLength, setWordLength] = useState(5);
    const [showHeader, setShowHeader] = useState(true); // whether to show "Word Mastermind" and link in clipboard capture
    const [showGuesses, setShowGuesses] = useState(true); // whether to show guesses in clipboard capture
    const [validOnly, setValidOnly] = useState(true); // whether guesses must be valid words
    const [theme, setTheme] = useState(2); // Array index for themes
    const themes = [
        {c:"😎",i:"🤨",w:"😒"},
        {c:"🟩",i:"🟨",w:"⬜"},
        {c:"✅",i:"🔁",w:"❌"}
    ];
    async function handleStartPuzzle() {
        setLoading(true);
        let randomword = await pickRandomWord(wordLength);
        let newGameOptions = {
            set: true,
            secretWord: randomword.toUpperCase(),
            mode: mode,
            validOnly: validOnly,
            ciw: themes[theme],
            wordLength: wordLength,
            showHeader: showHeader
        };
        setGameOptions(newGameOptions);
    }
    return ( <div className="optionsDiv">
        <div className='checkboxes'>
            <div className={validOnly ? "optionsCheckbox On" : "optionsCheckbox"}
                data-toggle="tooltip" title="Whether guess must be valid words"
                onClick={() => {setValidOnly(!validOnly);}}
            >
                <label>Guesses must be valid words</label>
            </div>
            <div className={mode === 'easy' ? "optionsCheckbox On" : "optionsCheckbox"}
                data-toggle="tooltip" title="Color coding shows which letters are correct or in the wrong place. Otherwise show counts only."
                onClick={() => {setMode(mode === 'easy' ? 'hard' : 'easy');}}
            >
                <label>Color code the guess letters</label>
            </div>
            <div className={showHeader ? "optionsCheckbox On" : "optionsCheckbox"}
                onClick={() => {setShowHeader(!showHeader);}}
            >
                <label>Title and link in clipboard</label>
            </div>
            <div className={showGuesses ? "optionsCheckbox On" : "optionsCheckbox"}
                onClick={() => {setShowGuesses(!showGuesses);}}
            >
                <label>Guess words in clipboard</label>
            </div>
        </div>
        <div className='emojiDiv'>
            <p>Emoji Theme</p>
            <div className={theme === 0 ? 'optionsRadio On' : 'optionsRadio'} onClick={() => {setTheme(0);}}>
                <label>{themes[0].c}{themes[0].i}{themes[0].w}</label>
            </div>
            <div className={theme === 1 ? 'optionsRadio On' : 'optionsRadio'} onClick={() => {setTheme(1);}}>
                <label>{themes[1].c}{themes[1].i}{themes[1].w}</label>
            </div>
            <div className={theme === 2 ? 'optionsRadio On' : 'optionsRadio'} onClick={() => {setTheme(2);}}>
                <label>{themes[2].c}{themes[2].i}{themes[2].w}</label>
            </div>
        </div>
        <div className='lenDiv'>
            <p className='AlignCenter'>Word Length</p>
            {lenAllowedArray.map((n) => (
                <span className={n === wordLength ? 'lenSelected' : 'lenUnselected'}
                    key={`chooseLenMin${n}`}
                    onClick={() => { setWordLength(n); } }
                >{n}
                </span>
            ))}
        </div>
        {loading?
        <p>Puzzle maker in progress, please wait...</p>
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