'use strict';

/**
 *  api-version-history controller
 */
const axios = require('axios');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::api-version-history.api-version-history', ({ strapi }) => {
  return ({

    create: async function (ctx) {
      const { model } = ctx.request.body;
      console.log(model);
      console.log("########");

      // to prevent recursion of webhook, should return null.
      const versionConfig = ['api-version-history', 'api-version', 'url-version', 'app', 'app-url'];
      if (versionConfig.includes(model)) {
        return null;
      }

      if (!versionConfig.includes(model)) { // no more necessary
        const model = ctx.request.body.model;

        /* get all value by model in api version */
        const apiVersions = await strapi.service('api::api-version.api-version').findAllByEntity(ctx.request.body.model);
        const apiVersion = {
          attribute: {
            entity: ctx.request.body.model,
            version: 1
          }
        };

        /* if model is already exist, increase model's version */
        if (apiVersions.length > 0) {
          apiVersion.attribute.version = ++apiVersions[0].version;
        }

        /* store to trace any content changes data as Json format in API Version History  */
        await strapi.service('api::api-version-history.api-version-history').create(apiVersion, ctx);

        /* check model is exit or not */
        const checkVersion = await strapi.service('api::api-version.api-version').findByEntity(apiVersion.attribute.entity);

        if (!checkVersion) {
          /* if model does not exit, create model and version as 1 */
          await strapi.service('api::api-version.api-version').create(apiVersion);
        } else {
          /* if model is exit, update version */
          await strapi.service('api::api-version.api-version').update(apiVersion, ctx);
        }

        // App-version-URLs
        /* find app url value by model*/
        const appURL = await strapi.service('api::strapi-model.strapi-model').findByModel(model);
         
        

        let app = '';
        const pushNotiVersion = [];
        if (appURL) {
          for (const data of appURL.app_urls) {
            app = data.app ? data.app.name : '';
            const url = data.url;
            const app_version_arr = data.firebase_topics;
            /* data push */
            pushNotiVersion.push(...app_version_arr);
            const entry_URL = await strapi.service('api::url-version.url-version').findByURL(url);
            const api_version_url = {
              attribute: {
                URL: url,
                version: 1
              }
            };
            if (entry_URL) {
              /* if url is exit, increase version */
              api_version_url.attribute.version = ++entry_URL.version;
              await strapi.service('api::url-version.url-version').update(api_version_url, url, app);
            } else {
              /* if url does not exit, create url and version as 1 */
              await strapi.service('api::url-version.url-version').create(api_version_url, url, app);
            }
          }
        }
        /*firebase notification */
        if (pushNotiVersion.length > 0) {
          const uniqueArr = [...new Set(pushNotiVersion.map(item => item.topic_name))]; /* remove duplicate version */
          for (const appVersion of uniqueArr) {
            console.log(appVersion);
            sendNotificationToWp(appVersion);
          };
        }
        /*firebase notification */
      }
    }
  });

});

function sendNotificationToWp(topics) {
  axios.post('https://fcm.googleapis.com/fcm/send', {
    "to": topics,
    "data": {
      "title": "Content Update",
      "body": "Strapi Content is updated",
      "type": "17",
      "alert": ""
    },
    "content_available": true
  }, {
    headers: {
      'Authorization': process.env.NOTIFICATION_TOKEN
    }
  }).then(function (response) {
    console.log(response.data, topics);
  })
    .catch(function (error) {
      console.log(error);
    });
}
