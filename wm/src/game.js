import React, { useState } from 'react';
import { isMobile } from 'react-device-detect'
import ShowCustomKeyboard from './showCustomKeyboard';
import { isWordValid } from './wordfunctions';
import { themes } from './themes';
const Game = ({gameOptions, setGameOptions}) => {
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [solved, setSolved] = useState(false);
    const divUnderKeyboard = showDivUnderKeyboard();
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
        let copyText = gameOptions.showHeader ? "Word Mastermind\nhttps://tilerunner.github.io/word-mastermind/\n" : "";
        copyText = `${copyText}${guesses.length} guesses\n`;
        for (let g = guesses.length - 1; g > -1; g--) {
            const guessWord = guesses[g];
            if (gameOptions.showGuesses) {
                copyText = `${copyText}${guessWord}:\n`;
            }
            for (let l = 0; l < guessWord.length; l++) {
                const letterResult = calcLetterResult(guessWord, l); // C, I, or W
                if (letterResult === 'C') {
                    copyText += themes[gameOptions.theme].c;
                } else if (letterResult === 'I') {
                    copyText += themes[gameOptions.theme].i;
                } else {
                    copyText += themes[gameOptions.theme].w;
                }
            }
            copyText += "\n";
        }
        if (!gameOptions.showGuesses) {
            copyText += gameOptions.secretWord;
        }
        navigator.clipboard.writeText(copyText);
        alert(`Clipboard updated`);
    }
    const InitialInfo = <div className="Outertable">
        <p>Guesses: {guesses.length}</p>
        {gameOptions.mode === 'easy' && <>
            <span className="wmEasyModeLetter wmCorrectLetterCorrectPosition">C</span>orrect position
            <span className="wmEasyModeLetter wmCorrectLetterWrongPosition MarginLeft">I</span>ncorrect position
        </>}
    </div>;
    const displayGuesses = <div>{gameOptions.mode === 'hard' ?
        <table>
            <thead>
                <tr>
                    <th>Guess</th>
                    <th>Correct Position</th>
                    <th>Wrong Position</th>
                    <th>Incorrect Letter</th>
                </tr>
            </thead>
            <tbody>
                {guesses.map((g,i) => (
                    <tr key={`mode0guess${i}`}>
                        <td>{g}</td>
                        <td className="AlignCenter">{calcCorrectPositionCount(g)}</td>
                        <td className="AlignCenter">{calcCorrectLetterCount(g) - calcCorrectPositionCount(g)}</td>
                        <td className="AlignCenter">{gameOptions.wordLength - calcCorrectLetterCount(g)}</td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        :
        <table>
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
    const MainInfo = <div className="Outertable">
        <h3>{solved ? `Secret Word: ${gameOptions.secretWord}` 
        : `Guess the ${gameOptions.wordLength} letter word`}</h3>
        {solved ? promptForPlayAgain : promptForGuess}
        {displayGuesses}
    </div>;
    return (
        <div className="game">
            {InitialInfo}
            {MainInfo}
        </div>
    );

    function showPlayAgainPrompt() {
        return <div>
            <h4>👏🏽 Solved in {guesses.length} moves! 👏🏽</h4>
            <button className='MarginLeft'
            onClick={function () {
                let newGameOptions = JSON.parse(JSON.stringify(gameOptions));
                newGameOptions.set = false;
                setGameOptions(newGameOptions);
            } }
            >
                Play Again
            </button>
            {gameOptions.mode === 'easy' &&
            <button className="MarginLeft" onClick={() => {copyToClipboard();}}>
                Clipboard
            </button>}
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
            <div className="form-group">
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
        if (gameOptions.wordLength < 6) {return 'len3-5';}
        return `len${gameOptions.wordLength}`;
    }
}

export default Game;