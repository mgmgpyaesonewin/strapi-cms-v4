'use strict';

/**
 *  wc-story-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-story-content.wc-story-content', ({ strapi }) => ({
    async find(ctx) {
        let stories = await strapi.service('api::wc-story-content.wc-story-content').find();
        return {
            data: stories
        };
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        return await strapi.service('api::wc-story-content.wc-story-content').findOne(id);
    },
    async filterByName(ctx) {
        const { name } = ctx.params;
        return await strapi.service('api::wc-story-content.wc-story-content').filterByName(name);
    }
}));

