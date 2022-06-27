'use strict';

/**
 *  merchant-onboarding-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-onboarding-page.merchant-onboarding-page', ({ strapi }) => ({
    async find(ctx) {
        const entries = await strapi.entityService.findMany('api::merchant-onboarding-page.merchant-onboarding-page', {
            populate: 'deep',
            
          });
          let pages = entries;
          return {pages};
    },
}));
