const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;

async function fetchLocalizationList() {
  try {
    return await axios.get(`${BASE_URL}/wc-localization-contents`);
  } catch (e) {
    return [];
  }
}


module.exports = { fetchLocalizationList };