'use strict';

/**
 *  strapi-model controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::strapi-model.strapi-model', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.entityService.findMany('api::strapi-model.strapi-model', {
      populate: {
        app_urls: {
          populate: {
            firebase_topics: true,
            app: true,
            model: true
          }
        }
      },
    });
  }

}));

