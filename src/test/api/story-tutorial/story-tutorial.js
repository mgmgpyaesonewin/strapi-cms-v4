const axios = require('axios');

 const BASE_URL = "http://localhost:1337/api";


async function fetchStoryTutorialList() {
  try {
    console.log(process.env.BASE_URL,"url");
    return await axios.get(`${BASE_URL}/wp-tutorial-lists`);
  } catch (e) {
    return [];
  }
}


  

module.exports = fetchStoryTutorialList;