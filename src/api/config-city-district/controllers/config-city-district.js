'use strict';

/**
 * config-city-district controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config-city-district.config-city-district', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::config-city-district.config-city-district').find(ctx);
  },
  async findDistrictByCode(ctx) {
    const { name } = ctx.params;
    let regions = await strapi.service('api::config-city-district.config-city-district').findByCode(name);
    return regions;
  }
}));
