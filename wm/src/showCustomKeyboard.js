/**
 * Custom keyboard div
 * @param {string} inputWord The word being input
 * @param {function} handleInputLetter Routine to handle next input letter
 * @param {function} handleDeleteLetter Routine to handle deleting the last letter
 * @param {div} divUnderKeyboard Div under keyboard. Callers routine can show things like a "submit word" button, or the input word
 * @returns Custom keyboard div
 */
export default function ShowCustomKeyboard({inputWord, handleInputLetter, handleDeleteLetter, divUnderKeyboard}) {
    return (
        <div className="customKeyboard">
            <div>
                <span onClick={() => { handleInputLetter('Q'); } }>Q</span>
                <span onClick={() => { handleInputLetter('W'); } }>W</span>
                <span onClick={() => { handleInputLetter('E'); } }>E</span>
                <span onClick={() => { handleInputLetter('R'); } }>R</span>
                <span onClick={() => { handleInputLetter('T'); } }>T</span>
                <span onClick={() => { handleInputLetter('Y'); } }>Y</span>
                <span onClick={() => { handleInputLetter('U'); } }>U</span>
                <span onClick={() => { handleInputLetter('I'); } }>I</span>
                <span onClick={() => { handleInputLetter('O'); } }>O</span>
                <span onClick={() => { handleInputLetter('P'); } }>P</span>
            </div>
            <div>
                <span onClick={() => { handleInputLetter('A'); } }>A</span>
                <span onClick={() => { handleInputLetter('S'); } }>S</span>
                <span onClick={() => { handleInputLetter('D'); } }>D</span>
                <span onClick={() => { handleInputLetter('F'); } }>F</span>
                <span onClick={() => { handleInputLetter('G'); } }>G</span>
                <span onClick={() => { handleInputLetter('H'); } }>H</span>
                <span onClick={() => { handleInputLetter('J'); } }>J</span>
                <span onClick={() => { handleInputLetter('K'); } }>K</span>
                <span onClick={() => { handleInputLetter('L'); } }>L</span>
            </div>
            <div>
                <span onClick={() => { handleInputLetter('Z'); } }>Z</span>
                <span onClick={() => { handleInputLetter('X'); } }>X</span>
                <span onClick={() => { handleInputLetter('C'); } }>C</span>
                <span onClick={() => { handleInputLetter('V'); } }>V</span>
                <span onClick={() => { handleInputLetter('B'); } }>B</span>
                <span onClick={() => { handleInputLetter('N'); } }>N</span>
                <span onClick={() => { handleInputLetter('M'); } }>M</span>
                <span onClick={() => { inputWord.length > 0 && handleDeleteLetter(); } } class="backspace"></span>
            </div>
            {divUnderKeyboard}
        </div>
    );
}
