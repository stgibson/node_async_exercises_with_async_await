const BASE_URL = "https://pokeapi.co/api/v2/";
const NUM_OF_POKEMON = 1118

$(async function() {
  try {
    // get all pokemon
    let resp = 
      await axios.get(`${BASE_URL}pokemon/?limit=${NUM_OF_POKEMON}`);
    let namesAndUrls = resp.data.results;
    
    // get data for 3 pokemon
    let promises = [];
    for (let i = 0; i < 3; i++) {
      const randNum = Math.floor(Math.random() * NUM_OF_POKEMON);
      promises.push(axios.get(namesAndUrls[randNum].url));
    }
    let responses = await Promise.all(promises);
    const names = [];
    const speciesUrls = [];
    for (let response of responses) {
      const pokemon = response.data;
      names.push(pokemon.name);
      speciesUrls.push(pokemon.species.url);
    }

    // get description of species for each of 3 pokemon
    promises = [];
    const speciesDescriptions = [];
    for (let speciesUrl of speciesUrls) {
      promises.push(axios.get(speciesUrl));
    }
    responses = await Promise.all(promises);
    for (let response of responses) {
      for (let speciesDescription of response.data.flavor_text_entries) {
        if (speciesDescription.language.name === "en") {
          speciesDescriptions.push(speciesDescription.flavor_text);
          break;
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      console.log(`${names[i]}: ${speciesDescriptions[i]}`);
    }    
  }
  catch(e) {
    console.log(e);
  }
})