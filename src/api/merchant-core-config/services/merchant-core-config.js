'use strict';

/**
 * merchant-core-config service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-core-config.merchant-core-config', ({strapi}) => ({
  async find(ctx) {
    const entriesCoreConfig = await strapi.entityService.findMany('api::merchant-core-config.merchant-core-config', {
      populate: 'deep',
      publicationState: 'live',
    });
    return entriesCoreConfig;
  }


}));

