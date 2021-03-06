const BASE_URL = "http://numbersapi.com/";
const FAVORITE_NUM = 7;

/**
 * Gets a fact on num
 * @param {number} num The number to get a fact on
 * @return {string} The fact, or an error message
 */
async function getFact(num) {
  try {
    const resp = await axios.get(`${BASE_URL}${num}?json`);
    return resp.data.text;
  }
  catch(e) {
    return e;
  }
}

/**
 * Create an HTML list item of fact
 * @param {string} fact The fact to create a list item from
 * @return {string} The HTML list item
 */
function generateFact(fact) {
  return `<li>${fact}</li>`;
}

$(async function() {
  // get json from Numbers API
  const fact = await getFact(FAVORITE_NUM);
  console.log(fact);

  // get facts on mult numbers
  try {
    const resp = await axios.get(`${BASE_URL}${FAVORITE_NUM},42?json`);
    const facts = resp.data;
    for (let num in facts) {
      $("#mult-num-facts").append(generateFact(facts[num]));
    }
  }
  catch(e) {
    console.log(e);
  }

  // get multiple facts on favorite number
  try {
    const NUM_OF_FACTS = 4;
    const promises = [];
    for (let i = 0; i < NUM_OF_FACTS; i++) {
      const promise = axios.get(`${BASE_URL}${FAVORITE_NUM}?json`);
      promises.push(promise);
    }
    const responses = await Promise.all(promises);
    for (let response of responses) {
      const fact = response.data.text;
      $("#favorite-num-facts").append(generateFact(fact));
    }
  }
  catch(e) {
    console.log(e);
  }
});