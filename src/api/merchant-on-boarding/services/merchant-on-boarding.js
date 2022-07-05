'use strict';

/**
 * merchant-on-boarding service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-on-boarding.merchant-on-boarding', ({strapi}) => ({
  async find(ctx) {
    const entries = await strapi.entityService.findMany('api::merchant-on-boarding.merchant-on-boarding', {
      populate: 'deep',
    });
    return entries;
  }
}));

