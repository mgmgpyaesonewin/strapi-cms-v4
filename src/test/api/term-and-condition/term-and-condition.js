const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;

async function fetchTermAndConditionList() {
  try {
    return await axios.get(`${BASE_URL}/wp-term-and-conditions`);
  } catch (e) {
    return [];
  }
}

async function fetchTermAndConditionDetail(version) {
  try {
    return await axios.get(`${BASE_URL}/wp-term-and-conditions/version/${version}`);
  } catch (e) {
    return [];
  }
}
module.exports = { fetchTermAndConditionList, fetchTermAndConditionDetail };