'use strict';

/**
 * merchant-login service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-login.merchant-login', ({strapi}) => ({
  async find(ctx) {
    const login = await strapi.entityService.findMany('api::merchant-login.merchant-login', {
      populate: 'deep',
      publicationState: 'live',
    });
    return login;
  }
}));

