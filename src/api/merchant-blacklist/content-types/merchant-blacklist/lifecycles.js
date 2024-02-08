const axios = require('axios');

const sendActionableMessage = (model, message) => {
  const webhookURL = process.env.MS_WEBHOOK_URL;
  let text = JSON.stringify(message);
  axios.post(webhookURL, {
    "themeColor": "0072C6",
    "title": "Update feature blacklist to Middleware  ",
    "text": `**Model** - ${model}  <br>**Message** - ${text}`,
  }).then(function (response) {
  }).catch(function (error) {
  });
};

module.exports = {

  async afterUpdate(event)  {
    const { result, params, data } = event;
    console.log("After Update");
    console.log(result, 'Event data:');

    const allData = await strapi.service('api::merchant-blacklist.merchant-blacklist').find(); 

    console.log(allData, 'All Data');


    axios.post(process.env.MW_MERCHANT_FEATURE_BLACKLIST_URL, allData
    , {
      headers: {
        'client_id': process.env.MW_CLIENT_ID,
        'client_secret': process.env.MW_CLIENT_SECRET,
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
 
      console.log(response.data,'MW response');
      sendActionableMessage('merchant-blacklist', response)

    }).catch(function (error) {
      console.log(error.response);
      sendActionableMessage('merchant-blacklist', error.response)

    });

  },


  async  afterDelete(event) {
    const { result, params, data } = event;
    console.log("After Delete");
    console.log(result, 'Event data:');

    const allData = await strapi.service('api::merchant-blacklist.merchant-blacklist').find(); 

    console.log(allData, 'All Data');


    axios.post(process.env.MW_MERCHANT_FEATURE_BLACKLIST_URL, allData
    , {
      headers: {
        'client_id': process.env.MW_CLIENT_ID,
        'client_secret': process.env.MW_CLIENT_SECRET,
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
 
      console.log(response.data,'MW response');
      sendActionableMessage('merchant-blacklist', response)

    }).catch(function (error) {
      console.log(error.response);
      sendActionableMessage('merchant-blacklist', error.response)

    });
  },

};

