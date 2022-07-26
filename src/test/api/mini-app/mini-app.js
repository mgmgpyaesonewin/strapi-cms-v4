const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;


async function fetchMiniApp() {
    try {

        return await axios.get(`${BASE_URL}/wp-mini-app-categories`);
    } catch (e) {
        return [];
    }
}



module.exports = { fetchMiniApp };