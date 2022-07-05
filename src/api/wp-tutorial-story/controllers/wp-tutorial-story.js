'use strict';

/**
 *  wp-tutorial-story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-story.wp-tutorial-story', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;
        const entityStoryDetail = await strapi.service('api::wp-tutorial-story.wp-tutorial-story').findOne(id);
        return entityStoryDetail;

    }

}));
