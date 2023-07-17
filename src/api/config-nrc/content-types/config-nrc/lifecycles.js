const axios = require('axios');

const sendActionableMessage = (model, message) => {
  const webhookURL = process.env.MS_WEBHOOK_URL;
  let text = JSON.stringify(message);
  axios.post(webhookURL, {
    "themeColor": "0072C6",
    "title": "Update NRC lists to Middleware  ",
    "text": `**Model** - ${model}  <br>**Message** - ${text}`,
  }).then(function (response) {
  }).catch(function (error) {
  });
};

module.exports = {
  afterUpdate(event) {
    const { result, params, data } = event;
    axios.post(process.env.MW_NRC_URL, {
      "nrcJsonString": JSON.stringify(result.nrc),
    }, {
      headers: {
        'client_id': process.env.MW_CLIENT_ID,
        'client_secret': process.env.MW_CLIENT_SECRET
      }
    }).then(function (response) {
      sendActionableMessage('config-nrc', response.data)
      console.log(response.data);
    }).catch(function (error) {
      sendActionableMessage('config-nrc', error.response.data)
      console.log(error.response.data);
    });

  },
};
