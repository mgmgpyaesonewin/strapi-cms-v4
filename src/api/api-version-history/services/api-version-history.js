'use strict';

/**
 * api-version-history service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::api-version-history.api-version-history', ({ strapi }) => ({
    async create(apiVersion,ctx) {
        return await strapi.entityService.create('api::api-version-history.api-version-history', {
            data: {
                entity: apiVersion.attribute.entity,
                version: apiVersion.attribute.version,
                response: ctx.request.body,
            },
        });
    }
}));
