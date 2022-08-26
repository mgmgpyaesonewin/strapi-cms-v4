'use strict';

/**
 * wc-dynamic-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-dynamic-list.wc-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.entityService.findMany('api::wc-dynamic-list.wc-dynamic-list', {
            populate: 'deep',
            publicationState: 'live',
        });
    }

}));
