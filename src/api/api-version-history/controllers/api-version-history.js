'use strict';

/**
 *  api-version-history controller
 */
const axios = require('axios');
const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::api-version-history.api-version-history', ({strapi}) => ({

  async create(ctx) {


    if (ctx.request.body.model === 'api-version-history' || ctx.request.body.model === 'api-version' || ctx.request.body.model === 'url-version') {
      return null;
    }

    if (ctx.request.body.model !== 'api-version-history' || ctx.request.body.model !== 'api-version' || ctx.request.body.model !== 'url-version') {
      const model = ctx.request.body.model;
      const objModel = strapi.config.get("config.models." + model);
      if (objModel) {
        const urlArr = objModel.url;
        const app = objModel.app;


        // APP-Version
        const apiVersions = await strapi.entityService.findMany('api::api-version.api-version', {
          filters: {
            entity: {
              $eq: ctx.request.body.model
            }
          }
        });
        const apiVersion = {
          attribute: {
            entity: ctx.request.body.model,
            version: 1
          }
        };
        if (apiVersions.length > 0) {
          apiVersion.attribute.version = ++apiVersions[0].version;
        }

        await strapi.entityService.create('api::api-version-history.api-version-history', {
          data: {
            entity: apiVersion.attribute.entity,
            version: apiVersion.attribute.version,
            response: ctx.request.body,
          },
        });

        const checkVersion = await strapi.db.query('api::api-version.api-version').findOne({
          where: {entity: apiVersion.attribute.entity},

        });
        if (!checkVersion) {
          await strapi.entityService.create('api::api-version.api-version', {
            data: {
              entity: apiVersion.attribute.entity,
              version: apiVersion.attribute.version
            },
          });
        } else {
          await strapi.db.query('api::api-version.api-version').update({
            where: {entity: ctx.request.body.model},
            data: {
              entity: apiVersion.attribute.entity,
              version: apiVersion.attribute.version
            },
          });
        }

        // App-version-URLs
        if (urlArr.length > 0) {
          urlArr.forEach(async (url, index) => {
            const entry_URL = await strapi.db.query('api::url-version.url-version').findOne({
              select: ['url', 'version'],
              where: {url: url},

            });
            const api_version_url = {
              attribute: {
                URL: url,
                version: 1
              }
            };

            if (entry_URL) {
              api_version_url.attribute.version = ++entry_URL.version;
              await strapi.db.query('api::url-version.url-version').update({
                where: {url: url},
                data: {

                  version: api_version_url.attribute.version,
                  publicationState: 'live',
                  publishedAt: new Date(),
                  app: app,
                },
              });
            } else {
              await strapi.entityService.create('api::url-version.url-version', {
                data: {
                  url: url,
                  version: api_version_url.attribute.version,
                  publishedAt: new Date(),
                  app: app,
                },
              });
            }
          });

        }

        axios.post('https://fcm.googleapis.com/fcm/send', {
          "to": process.env.NOTIFICATION_TO,
          "notification": {
            "title": "Content Update",
            "body": "Strapi Content is updated",
            "type": "17",
            "alert": ""
          }
        }, {
          headers: {
            'Authorization': process.env.NOTIFICATION_TOKEN
          }
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    }
  }
}));
