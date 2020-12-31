const BASE_URL = "https://deckofcardsapi.com/api/deck/";

$(async function() {
  try {
    // get 1 card from newly shuffled deck
    const resp = await axios.get(`${BASE_URL}new/draw/?count=1`);
    const card = resp.data.cards[0];
    const value = card.value.toLowerCase();
    const suit = card.suit.toLowerCase();
    console.log(`${value} of ${suit}`);
  }
  catch(e) {
    console.log(e);
  }
});