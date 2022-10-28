'use strict';

/**
 * merchant-force-upgrade-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-force-upgrade-list.merchant-force-upgrade-list', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::merchant-force-upgrade-list.merchant-force-upgrade-list').find(ctx);
  },
}));
