'use strict';

/**
 *  config-township controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config-township.config-township', ({strapi}) => ({
    async find(ctx) {
      return  await strapi.service('api::config-township.config-township').find(ctx);
    }

  }));

