'use strict';

/**
 *  wp-tutorial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial.wp-tutorial', ({ strapi }) => ({
    async findOne(ctx) {

        const { id } = ctx.params;
        const entity = await strapi.service('api::wp-tutorial.wp-tutorial').findOne(id);
        return entity;
    }
}));
