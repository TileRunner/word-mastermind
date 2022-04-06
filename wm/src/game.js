import React, { useState } from 'react';
// import { isMobile } from 'react-device-detect'
import ShowCustomKeyboard from './showCustomKeyboard';
import { isWordValid } from './wordfunctions';

const Game = ({gameOptions, setGameOptions}) => {
    const isMobile = false;
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [solved, setSolved] = useState(false);
    const [showInitialInfo, setShowInitialInfo] = useState(false); // set info, easy mode info
    const divUnderKeyboard = showDivUnderKeyboard();
    const displayGuesses = showGuessesTable();
    const promptForGuess = showGuessPrompt();
    const promptForPlayAgain = showPlayAgainPrompt();

    function handleInputLetter(letter) {
        handleUpdatedGuess(guess + letter);
    }
    function handleDeleteLetter() {
        if (guess.length > 0) {
            setGuess(guess.substring(0,guess.length-1));
        }
    }
    function showDivUnderKeyboard() {
        return gameOptions.mode === 'hard' && <div className="wmWordUnderKeyboard">&nbsp;{guess}&nbsp;</div>;
    }
    async function handleUpdatedGuess(guessword) {
        if (guessword.length === gameOptions.secretWord.length) {
            if (gameOptions.validOnly) {
                let isvalid = await isWordValid(guessword);
                if (!isvalid) {
                    alert(`Sorry, ${guessword} is not in my word list.`);
                    return;
                }
            }
            setGuesses([guessword, ...guesses]);
            setGuess('');
            if (guessword === gameOptions.secretWord)
            {
                setSolved(true);
            }
        } else {
            setGuess(guessword);
        }
    }
    function copyToClipboard() {
        let copyText = gameOptions.showHeader ? "Word Mastermind\nhttps://tilerunner.herokuapp.com/\n" : "";
        copyText = `${copyText}${guesses.length} guesses\n`;
        for (let g = guesses.length - 1; g > -1; g--) {
            const guessWord = guesses[g];
            if (gameOptions.showGuesses) {
                copyText = `${copyText}${guessWord}:\n`;
            }
            for (let l = 0; l < guessWord.length; l++) {
                const letterResult = calcLetterResult(guessWord, l); // C, I, or W
                if (letterResult === 'C') {
                    copyText = copyText + gameOptions.ciw.c;
                } else if (letterResult === 'I') {
                    copyText = copyText + gameOptions.ciw.i;
                } else {
                    copyText = copyText + gameOptions.ciw.w;
                }
            }
            copyText = copyText + "\n";
        }
        navigator.clipboard.writeText(copyText);
        alert(`Clipboard updated`);
    }
    const InitialInfo = <div className="Outertable">
        <div className="trParagraph AlignLeft">
            <p>Guesses this word: {guesses.length}</p>
            {gameOptions.mode === 'easy' && <><p><span className="wmEasyModeLetter wmCorrectLetterCorrectPosition">C</span>orrect position</p>
                <p><span className="wmEasyModeLetter wmCorrectLetterWrongPosition">I</span>ncorrect position</p>
                <p><span className="wmEasyModeLetter wmWrongLetter">W</span>rong letter</p>
            </>}
        </div>
    </div>;
    const MainInfo = <div className="Outertable">
        <div className="trParagraph">
            <h3>{solved ? `Secret Word: ${gameOptions.secretWord}` 
            : `Guess the ${gameOptions.wordLength} letter word:`}</h3>
            {solved ? promptForPlayAgain : promptForGuess}
        </div>
        {displayGuesses}
    </div>;
    const BrowserLayout = <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
                <div className="row">
                    <div className="col">{InitialInfo}</div>
                    <div className="col">{MainInfo}</div>
                </div>
            </div>
        </div>
    </div>;
    const MobileLayout = <div>
        <div>
            <button className="trButton" onClick={() => { setShowInitialInfo(!showInitialInfo); } }>
                {showInitialInfo ? "Hide Info" : "Show Info"}
            </button>
            {showInitialInfo && InitialInfo}
        </div>
        {MainInfo}
    </div>;
    return (
        <div className="trBackground">
        {isMobile ? MobileLayout : BrowserLayout}
        </div>
    );

    function showPlayAgainPrompt() {
        return <div className="trParagraph">
            <h4 className="tmCongrats">👏🏽 Solved in {guesses.length} moves! 👏🏽</h4>
            <button className="trButton"
            onClick={function () {
                setGameOptions({set: false});
            } }
            >
                Play Again
            </button>
            <button className="trButton" onClick={() => {copyToClipboard();}}>
                Clipboard
            </button>
            </div>;
    }

    function showGuessPrompt() {
        return (
        isMobile ?
            <ShowCustomKeyboard
                inputWord={guess}
                handleInputLetter={handleInputLetter}
                handleDeleteLetter={handleDeleteLetter}
                divUnderKeyboard={divUnderKeyboard}
            ></ShowCustomKeyboard>        
        :
            <div className="form-group trParagraph">
                {guesses.length === 0 ?
                    <label>First guess:</label>
                    :
                    <label>Next guess:</label>
                }
                <input className="form-control"
                    name="guess"
                    value={guess}
                    autoComplete="new-password"
                    onChange={(e) => {
                        const guessword = e.target.value.toUpperCase().replace( /\W/g , '');
                        handleUpdatedGuess(guessword);
                } } />
            </div>
        );
    }

    function showGuessesTable() {
        return <div>{gameOptions.mode === 'hard' ?
        <table className="trTable">
            <thead>
                <tr>
                    <th>Guess</th>
                    <th>Correct Letter</th>
                    <th>Correct Position</th>
                </tr>
            </thead>
            <tbody>
                {guesses.map((g,i) => (
                    <tr key={`mode0guess${i}`}>
                        <td>{g}</td>
                        <td className="AlignCenter">{calcCorrectLetterCount(g)}</td>
                        <td className="AlignCenter">{calcCorrectPositionCount(g)}</td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        :
        <table className="trTable">
            <tbody>
                {!solved && guess && <tr key='easymodeguessletters'>
                    {guess.split("").map((l,i) => (
                        <td key={`guessletter${i}`} className={`wmEasyModeLetter ${cssEasyModeLetterSize()}`}>{l}</td>
                    ))}
                </tr>}
                {guesses.map((g,i) => (
                    <tr key={`mode1guess${i}`}>
                        {g.split('').map((l,j) => (
                            <td key={`mode1guess${i}letter${j}`} className={calcMode1css(g,j)}>
                                {l}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        }</div>;
    }

    function calcCorrectLetterCount(guessletters) {
        let n = 0
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let letter of alphabet) {
            let x = gameOptions.secretWord.split(letter).length - 1
            let y = guessletters.split(letter).length - 1
            n = n + (x < y ? x : y)
        }
        return n
    }

    function calcCorrectPositionCount(guessletters) {
        let n = 0
        for(var i=0; i<gameOptions.secretWord.length; ++i) {
            n = n + (gameOptions.secretWord[i] === guessletters[i] ? 1 : 0)
        }
        return n
    }

    function calcLetterResult(guessLetters, guessLetterIndex) {
        let letter = guessLetters[guessLetterIndex];
        // g is the whoe guess, j is the letter index for which we want the css style name
        if (letter === gameOptions.secretWord[guessLetterIndex]) {
            return "C";
        }
        if (gameOptions.secretWord.indexOf(letter) > -1) {
            // the guess letter is in the secret word and is not in the right spot
            // has it already been counted earlier though?
            // will it be counted later as correct letter correct spot?
            let nextjstart = 0;
            for (let i = 0; i < gameOptions.secretWord.length; i++) {
                if (gameOptions.secretWord[i] === letter && guessLetters[i] !== letter) {
                    let jfound = false;
                    for(let j = nextjstart; !jfound && j < gameOptions.secretWord.length; j++) {
                        if (guessLetters[j] === letter && gameOptions.secretWord[j] !== letter) {
                            if (j === guessLetterIndex) {
                                return "I";
                            }
                            jfound = true;
                            nextjstart = j + 1;
                        }
                    }
                }
            }
        }
        return "W";
    }
    function calcMode1css(guessLetters,guessLetterIndex) {
        let size = cssEasyModeLetterSize();
        let letterResult = calcLetterResult(guessLetters, guessLetterIndex);
        if (letterResult === 'C') {return "wmEasyModeLetter wmCorrectLetterCorrectPosition " + size;}
        if (letterResult === 'I') {return "wmEasyModeLetter wmCorrectLetterWrongPosition " + size;}
        return "wmEasyModeLetter wmWrongLetter " + size;
    }
    function cssEasyModeLetterSize() {
        return (gameOptions.secretWord && gameOptions.secretWord.length > 8 ? 'small' : 'normal');
    }
}

export default Game;