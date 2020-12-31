const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const NUM_OF_CARDS_IN_DECK = 52;
const $drawCardBtn = $("#btn-draw");
let num_of_cards_drawn = 0;
let deckId = null;

/**
 * Draws card and displays on page
 * @param {Object} event The event of user clicking button to draw card
 */
async function drawCard(event) {
  num_of_cards_drawn++;
  if (num_of_cards_drawn >= NUM_OF_CARDS_IN_DECK) {
    $drawCardBtn.remove();
  }
  try {
    const resp = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    const cardImgUrl = resp.data.cards[0].image;
    const $cardImg = $(`<img src="${cardImgUrl}">`);
    const MAX_ROTATION = 80;
    const rotation = Math.floor(Math.random() * MAX_ROTATION) -
      (MAX_ROTATION / 2);
    $cardImg.css("transform", `rotate(${rotation}deg)`);
    $("#cards").append($cardImg);
  }
  catch(e) {
    console.log(e);
  }
}

$(async function() {
  // get 1 card from newly shuffled deck
  try {
    const resp = await axios.get(`${BASE_URL}new/draw/?count=1`);
    const card = resp.data.cards[0];
    const value = card.value.toLowerCase();
    const suit = card.suit.toLowerCase();
    console.log(`${value} of ${suit}`);
  }
  catch(e) {
    console.log(e);
  }

  // get 2 cards from newly shuffled deck
  try {
    let resp = await axios.get(`${BASE_URL}new/draw/?count=1`);
    const card1 = resp.data.cards[0];
    const deckId = resp.data.deck_id;
    const value1 = card1.value.toLowerCase();
    const suit1 = card1.suit.toLowerCase();
    resp = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    const card2 = resp.data.cards[0];
    const value2 = card2.value.toLowerCase();
    const suit2 = card2.suit.toLowerCase();
    console.log(`${value1} of ${suit1}`);
    console.log(`${value2} of ${suit2}`);
  }
  catch(e) {
    console.log(e);
  }

  // create a new deck for drawing cards
  try {
    const resp = await axios.get(`${BASE_URL}new/shuffle/`);
    deckId = resp.data.deck_id;
    // set up event listener for drawing a card
    $drawCardBtn.on("click", drawCard);
  }
  catch(e) {
    console.log(e);
  }
});