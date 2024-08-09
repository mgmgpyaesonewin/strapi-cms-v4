'use strict';

/**
 * wp-wallet-limit-size controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-wallet-limit-size.wp-wallet-limit-size', ({strapi}) => ({
    async find(ctx) {
        const data= await strapi.service('api::wp-wallet-limit-size.wp-wallet-limit-size').find();
        return {data};
    }
  }));
  
