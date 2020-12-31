const BASE_URL = "http://numbersapi.com/";
const FAVORITE_NUM = 7;

// get json from Numbers API
async function getFact(num) {
  try {
    const resp = await axios.get(`${BASE_URL}${num}?json`);
    return resp.data.text;
  }
  catch(e) {
    return e;
  }
}

$(async function() {
  const fact = await getFact(FAVORITE_NUM);
  console.log(fact);
});