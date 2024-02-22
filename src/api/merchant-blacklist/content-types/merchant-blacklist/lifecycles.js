const axios = require("axios");

const sendActionableMessage = (model, message) => {
  const webhookURL = process.env.MS_WEBHOOK_URL;
  let text = JSON.stringify(message);
  axios
    .post(webhookURL, {
      themeColor: "0072C6",
      title: "Update feature blacklist to Middleware  ",
      text: `**Model** - ${model}  <br>**Message** - ${text}`,
    })
    .then(function (response) {})
    .catch(function (error) {});
};

module.exports = {
  async afterUpdate(event) {
    const { result, params, data } = event;
    const allData = await strapi
      .service("api::merchant-blacklist.merchant-blacklist")
      .find();
    axios
      .post(process.env.MW_MERCHANT_FEATURE_BLACKLIST_URL, allData, {
        headers: {
          client_id: process.env.MW_MERCHANT_CLIENT_ID,
          client_secret: process.env.MW_MERCHANT_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        sendActionableMessage("merchant-blacklist", response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        sendActionableMessage("merchant-blacklist", error.response.data);
      });
  },

  async afterDelete(event) {
    const { result, params, data } = event;

    const allData = await strapi
      .service("api::merchant-blacklist.merchant-blacklist")
      .find();
    axios
      .post(process.env.MW_MERCHANT_FEATURE_BLACKLIST_URL, allData, {
        headers: {
          client_id: process.env.MW_MERCHANT_CLIENT_ID,
          client_secret: process.env.MW_MERCHANT_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        sendActionableMessage("merchant-blacklist", response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        sendActionableMessage("merchant-blacklist", error.response.data);
      });
  },
};
