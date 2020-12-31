const BASE_URL = "https://pokeapi.co/api/v2/";
const NUM_OF_POKEMON = 1118

$(async function() {
  // get all pokemon
  let namesAndUrls;
  try {
    const resp = 
      await axios.get(`${BASE_URL}pokemon/?limit=${NUM_OF_POKEMON}`);
    namesAndUrls = resp.data.results;
    console.log(namesAndUrls);
  }
  catch(e) {
    console.log(e);
    return;
  }
})
