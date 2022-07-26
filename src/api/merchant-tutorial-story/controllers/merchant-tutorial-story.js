'use strict';

/**
 *  merchant-tutorial-story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-tutorial-story.merchant-tutorial-story', ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;
      return await strapi.service('api::merchant-tutorial-story.merchant-tutorial-story').findOne(id);
  
    }
  
  }));
  
