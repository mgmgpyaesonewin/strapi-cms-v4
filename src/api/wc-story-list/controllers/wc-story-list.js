'use strict';

/**
 *  wc-story-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-story-list.wc-story-list', ({strapi}) => ({
    async find(ctx) {
      let stories= await strapi.service('api::wc-story-list.wc-story-list').find(ctx);
      return {
        data: stories
      };
    }
  }));
