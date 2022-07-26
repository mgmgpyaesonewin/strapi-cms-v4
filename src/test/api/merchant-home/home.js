const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;


async function fetchHome() {
  try {
    return await axios.get(`${BASE_URL}/merchant-home`);
  } catch (e) {
    return [];
  }
}




module.exports = { fetchHome };