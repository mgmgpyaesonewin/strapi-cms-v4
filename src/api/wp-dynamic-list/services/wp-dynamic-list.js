'use strict';

/**
 * wp-dynamic-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.entityService.findMany('api::wp-dynamic-list.wp-dynamic-list', {
            populate: 'deep',
            publicationState: 'live',
        });
    }

}));