/* Due to heroku's security issue, they prevented my deploys to tilerunner.
   They suggested using heroku CLI, so I followed instructions and it worked, but to a new url.
*/
const baseurl = 'https://enigmatic-lake-42795.herokuapp.com'; //'https://tilerunner.herokuapp.com';

/**
 * Determine whether a word is in the ENABLE2K lexicon, case insensitive
 * @param {string} word A word
 * @returns {Promise<Boolean>} Whether the word is in the ENABLE2K lexicon
 * @async
 */
export async function isWordValid(word) {
    let url = `${baseurl}/ENABLE2K?exists=${word.toLowerCase()}`;
    const response = await fetch(url);
    const jdata = await response.json();
    return jdata.exists;
}

/**
 * Pick a random word of the specified length
 * @param {int} wordLength The desired word length
 * @returns {Promise<string>} A random word of the desired word length
 * @async
 */
export async function pickRandomWord(wordLength) {
    const url = `${baseurl}/ENABLE2K?random=${wordLength}`;
    const response = await fetch(url);
    const jdata = await response.json();
    return jdata;
}
