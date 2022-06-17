'use strict';

/**
 *  merchant-on-boarding controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-on-boarding.merchant-on-boarding', ({ strapi }) => ({
  async find(ctx) {
    const entries = await strapi.entityService.findMany('api::merchant-on-boarding.merchant-on-boarding', {
      populate: 'deep',

    });
    let sortingArr = entries.pages;
    let sortingValues = sortingArr.sort((firstItem, secondItem) => firstItem.position - secondItem.position);

    entries.pages = sortingValues.filter(function (filterType) {
      return filterType.publishedAt != null;
    });
    return entries;
  },
}));