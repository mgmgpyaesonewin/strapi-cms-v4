'use strict';

/**
 *  wp-tutorial-story-list controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-story-list.wp-tutorial-story-list', ({strapi}) => ({
  async find(ctx) {
    let stories= await strapi.service('api::wp-tutorial-story-list.wp-tutorial-story-list').find(ctx);
    return {
      data: stories
    };
  }
}));
