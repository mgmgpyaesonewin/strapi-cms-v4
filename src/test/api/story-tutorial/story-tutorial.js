const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;


async function fetchStoryTutorialList() {
  try {

    return await axios.get(`${BASE_URL}/wp-tutorial-story-lists`);
  } catch (e) {
    return [];
  }
}
async function fetchStoryTutorialDetail(id) {
  try {

    return await axios.get(`${BASE_URL}/wp-tutorial-stories/${id}`);
  } catch (e) {
    return [];
  }
}




module.exports = { fetchStoryTutorialList, fetchStoryTutorialDetail };