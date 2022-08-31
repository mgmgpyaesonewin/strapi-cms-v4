'use strict';

/**
 * app-error service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app-error.app-error', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.entityService.findMany('api::app-error.app-error', {
            populate: 'deep',
            publicationState: 'live',
        });
    }

}));

