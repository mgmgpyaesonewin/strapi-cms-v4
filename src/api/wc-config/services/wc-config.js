'use strict';

/**
 * wc-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-config.wc-config', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.entityService.findMany('api::wc-config.wc-config', {
            publicationState: 'live',
        });
    }

}));

