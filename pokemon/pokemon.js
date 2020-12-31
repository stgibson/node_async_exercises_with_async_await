const BASE_URL = "https://pokeapi.co/api/v2/";
const NUM_OF_POKEMON = 1118

$(async function() {
  try {
    // get all pokemon
    let resp = 
      await axios.get(`${BASE_URL}pokemon/?limit=${NUM_OF_POKEMON}`);
    let namesAndUrls = resp.data.results;
    
    // get data for 3 pokemon
    const promises = [];
    for (let i = 0; i < 3; i++) {
      const randNum = Math.floor(Math.random() * NUM_OF_POKEMON);
      promises.push(axios.get(namesAndUrls[randNum].url));
    }
    responses = await Promise.all(promises);
    for (let response of responses) {
      console.log(response.data);
    }
  }
  catch(e) {
    console.log(e);
    return;
  }
})