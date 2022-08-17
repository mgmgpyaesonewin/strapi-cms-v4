const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;

async function fetchLocalizationListforIOS() {
  try {
    return await axios.get(`${BASE_URL}/wp-localization-ios-contents`);
  } catch (e) {
    return [];
  }
}

async function fetchLocalizationListforAndroid() {
  try {
    return await axios.get(`${BASE_URL}/wp-localization-android-contents`);
  } catch (e) {
    return [];
  }
}

module.exports = { fetchLocalizationListforIOS,fetchLocalizationListforAndroid };