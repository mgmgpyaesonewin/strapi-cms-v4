'use strict';

/**
 *  wc-tutorial-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-tutorial-list.wc-tutorial-list', ({strapi}) => ({
    async find(ctx) {
      let stories= await strapi.service('api::wc-story-list.wc-story-list').find(ctx);
      return {
        data: stories
      };
    }
  }));
