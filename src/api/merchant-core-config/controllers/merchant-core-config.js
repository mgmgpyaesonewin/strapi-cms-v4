'use strict';

/**
 *  merchant-core-config controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-core-config.merchant-core-config', ({strapi}) => ({
  async find(ctx) {
    const coreConfig = await strapi.service('api::merchant-core-config.merchant-core-config').find(ctx);
    const login = await strapi.service('api::merchant-login.merchant-login').find(ctx)
    const merchantOnBoarding = await strapi.service('api::merchant-on-boarding.merchant-on-boarding').find(ctx)
    let merchantSorting = merchantOnBoarding.pages;
    let sortingValues = merchantSorting.sort((firstItem, secondItem) => firstItem.position - secondItem.position);
    merchantOnBoarding.pages = sortingValues.filter(function (filterType) {
      return filterType.publishedAt != null;
    });
    return {
      "core": coreConfig,
      "login": login,
      "onboarding": merchantOnBoarding

    }
  }

}));
