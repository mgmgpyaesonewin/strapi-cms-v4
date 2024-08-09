'use strict';

/**
 *  wp-tutorial-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-list.wp-tutorial-list', ({ strapi }) => ({

  async find(ctx) {
    let tutorialLists = await strapi.service('api::wp-tutorial-list.wp-tutorial-list').find(ctx);
    let title = await strapi.service('api::wp-help-and-support.wp-help-and-support').getLatestStoryHelp(ctx);
    title.categories = tutorialLists;
    return {
      data: title
    };
  }

}));
