'use strict';

/**
 *  merchant-core-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-core-config.merchant-core-config',({ strapi }) => ({
    async find(ctx) {
        const entriesCoreConfig = await strapi.entityService.findMany('api::merchant-core-config.merchant-core-config', {
            populate: 'deep',
            publicationState: 'live',
        });

        const entriesLogin = await strapi.entityService.findMany('api::merchant-login.merchant-login', {
            populate: 'deep',
            publicationState: 'live',
        });

        const entries = await strapi.entityService.findMany('api::merchant-on-boarding.merchant-on-boarding', {
            populate: 'deep',
      
          });
          let sortingArr = entries.pages;
          let sortingValues = sortingArr.sort((firstItem, secondItem) => firstItem.position - secondItem.position);
      
          entries.pages = sortingValues.filter(function (filterType) {
            return filterType.publishedAt != null;
          });
          return {
            "core": entriesCoreConfig,
            "login": entriesLogin,
            "onboarding":entries

        }
       
    }

}));
