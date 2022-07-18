'use strict';

/**
 *  merchant-home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-home.merchant-home', ({strapi}) => ({
    async find(ctx) {
      return  await strapi.service('api::merchant-home.merchant-home').find(ctx);
    }
  
  }));
  