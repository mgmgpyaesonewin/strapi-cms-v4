const axios = require('axios');

// const BASE_URL = "http://localhost:1337/api";

// const fetchPromotions = async (BASE_URL) => {
//   try {
//     return await axios.get(`${BASE_URL}/wp-promotions`);
//   } catch (e) {
//     return [];
//   }
// };

async function fetchPromotions(BASE_URL) {
  try {
    return await axios.get(`${BASE_URL}/wp-promotions`);
  } catch (e) {
    return [];
  }
}

module.exports = fetchPromotions;
