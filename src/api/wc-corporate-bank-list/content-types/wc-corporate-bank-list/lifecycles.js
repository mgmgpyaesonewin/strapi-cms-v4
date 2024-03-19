"use strict";
const axios = require("axios");
const { v4: uuid } = require("uuid");

const sendActionableMessage = (model, message) => {
  const webhookURL = process.env.MS_WEBHOOK_URL;
  let text = JSON.stringify(message);
  axios
    .post(webhookURL, {
      themeColor: "0072C6",
      title: "[WC] Update Corporate Bank List to Middleware",
      text: `**Model** - ${model}  <br>**Message** - ${text}`,
    })
    .then(function (response) {})
    .catch(function (error) {});
};

module.exports = {
  async beforeCreate(model) {
    model.params.data.uuid = uuid();
  },

  async afterUpdate(event) {
    const { result, params, data } = event;
    const allData = await strapi
      .service("api::wc-corporate-bank-list.wc-corporate-bank-list")
      .find();
    const requestData = JSON.stringify(allData);
    axios
      .post(process.env.MW_WC_CORPORATE_BANK_LIST_URL, requestData, {
        headers: {
          clientId: process.env.MW_WC_CLIENT_ID,
          clientSecret: process.env.MW_WC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        sendActionableMessage("wc-corporate-bank-list", response.data.message);
      })
      .catch(function (error) {
        sendActionableMessage("wc-corporate-bank-list", error.data.message);
      });
  },

  async afterDelete(event) {
    const { result, params, data } = event;
    const allData = await strapi
      .service("api::wc-corporate-bank-list.wc-corporate-bank-list")
      .find();
    const requestData = JSON.stringify(allData);
    axios
      .post(process.env.MW_WC_CORPORATE_BANK_LIST_URL, requestData, {
        headers: {
          clientId: process.env.MW_WC_CLIENT_ID,
          clientSecret: process.env.MW_WC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        sendActionableMessage("wc-corporate-bank-list", response.data.message);
      })
      .catch(function (error) {
        sendActionableMessage("wc-corporate-bank-list", error.data.message);
      });
  }
};
