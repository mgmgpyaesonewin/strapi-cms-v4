'use strict';

/**
 *  wp-tutorial-story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-story.wp-tutorial-story', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    return await strapi.service('api::wp-tutorial-story.wp-tutorial-story').findOne(id);

  },
  async getbyName(ctx) {
    const { name } = ctx.params;
    return await strapi.service('api::wp-tutorial-story.wp-tutorial-story').findByName(name);

  }

}));
