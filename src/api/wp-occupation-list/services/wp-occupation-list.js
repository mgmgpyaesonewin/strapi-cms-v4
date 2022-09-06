'use strict';

/**
 * wp-occupation-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-occupation-list.wp-occupation-list', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.entityService.findMany('api::wp-occupation-list.wp-occupation-list', {
            populate: 'deep',
            publicationState: 'live',
        });
    }

}));