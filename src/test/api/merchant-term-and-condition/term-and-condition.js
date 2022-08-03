const axios = require('axios');
const strapi = require('@strapi/strapi')
const BASE_URL = process.env.API_URL;
async function fetchTermAndCondition() {
    try {
        return await axios.get(`${BASE_URL}/merchant-term-and-condition-content/get-latest`);
    } catch (e) {
        return [];
    }
}
module.exports = {fetchTermAndCondition };