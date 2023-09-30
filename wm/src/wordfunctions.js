const baseurl = (process.env.NODE_ENV === 'production' ? 'https://webappscrabbleclub.azurewebsites.net/api/Values' : 'https://localhost:55557/api/Values');

/**
 * Determine whether a word is in the lexicon, case insensitive
 * @param {string} word A word
 * @returns {Promise<boolean>} Whether the word is in the lexicon
 * @async
 */
 export async function isWordValid(word) {
    let url = `${baseurl}/NWL2023/exists?word=${word}`;
    const response = await fetch(url);
    const jdata = await response.json();
    return jdata.value;
}

/**
 * Pick a random word of the specified length
 * @param {int} wordLength The desired word length
 * @returns {Promise<string>} A random word of the desired word length
 * @async
 */
export async function pickRandomWord(wordLength) {
    const url = `${baseurl}/NWL2023/random?length=${wordLength}`;
    const response = await fetch(url);
    const jdata = await response.json();
    return jdata.value;
}
