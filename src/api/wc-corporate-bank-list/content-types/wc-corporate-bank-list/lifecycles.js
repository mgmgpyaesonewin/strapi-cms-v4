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

const generateUUID = async () => {
  const generatedUUID = uuid();
  const isUUIDInDb = await strapi
        .service("api::wc-corporate-bank-list.wc-corporate-bank-list")
        .findByUUID(generatedUUID);
  
  if (isUUIDInDb) {
    generateUUID();
  }

  return generatedUUID;
};

const setUUID = (params, UUID) => params.data.uuid = UUID;

const generateAndSetUUID = async (params) => {
  const generatedUUID = await generateUUID();
  setUUID(params, generatedUUID)
}

const updateDataToMiddleware = async () => {
  const allData = await strapi
    .service("api::wc-corporate-bank-list.wc-corporate-bank-list")
    .find();
  const requestData = JSON.stringify(allData);
  axios
    .post(process.env.MW_WC_CORPORATE_BANK_LIST_URL, requestData, {
      headers: {
        clientId: process.env.MW_CLIENT_ID,
        clientSecret: process.env.MW_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      sendActionableMessage("wc-corporate-bank-list", response.data.message);
    })
    .catch(function (error) {
       console.log(error.response.data);
       sendActionableMessage("wc-corporate-bank-list", error.response.data);
    });
}

module.exports = {

  async beforeCreate(event) {
      await generateAndSetUUID(event.params);
  },

  async beforeUpdate(event) {
    if (event.params.data.uuid !== undefined) {
      await generateAndSetUUID(event.params);
    }
  },

  async afterUpdate() {
    updateDataToMiddleware();
  },

  async afterDelete() {
    updateDataToMiddleware();
  },

  async afterDeleteMany() {
    updateDataToMiddleware();
  }
};
