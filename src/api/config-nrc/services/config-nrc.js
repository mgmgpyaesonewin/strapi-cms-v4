'use strict';

/**
 * config-nrc service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-nrc.config-nrc', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.entityService.findMany('api::config-nrc.config-nrc', {
            publicationState: 'live',
        });
    }

}));