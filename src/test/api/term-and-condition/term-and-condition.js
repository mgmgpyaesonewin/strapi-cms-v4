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

async function fetchTermAndCondition() {
  try {
    return await axios.get(`${BASE_URL}/wp-term-and-conditions/version/get`);
  } catch (e) {
    return [];
  }
}
module.exports = { fetchTermAndConditionList, fetchTermAndCondition };