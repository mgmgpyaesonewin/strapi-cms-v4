const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;

async function fetchDynamicList() {
  try {
    return await axios.get(`${BASE_URL}/wp-dynamic-list`);
  } catch (e) {
    return [];
  }
}


module.exports = { fetchDynamicList };