'use strict';

/**
 * merchant-core-config service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-core-config.merchant-core-config', ({strapi}) => ({
  async find(ctx) {
    const entriesCoreConfig = await strapi.entityService.findMany('api::merchant-core-config.merchant-core-config', {
      populate: {
        config: {
         populate: {
            theme: true,
            header_logo: true,
            footer_logo:true,
            expired_duration: true
          },
        },
      },
      publicationState: 'live',
    });
    return entriesCoreConfig;
  }
}));

