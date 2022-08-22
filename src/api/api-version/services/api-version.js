'use strict';

/**
 * api-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::api-version.api-version', ({ strapi }) => ({

    async findByEntity(entity) {
        return await strapi.db.query('api::api-version.api-version').findOne({
            where: { entity: entity },
        });
    },
    async create(apiVersion) {
        return await strapi.entityService.create('api::api-version.api-version', {
            data: {
                entity: apiVersion.attribute.entity,
                version: apiVersion.attribute.version
            },
        });
    },
    async update(apiVersion, ctx) {
        return await strapi.db.query('api::api-version.api-version').update({
            where: { entity: ctx.request.body.model },
            data: {
                entity: apiVersion.attribute.entity,
                version: apiVersion.attribute.version
            },
        });
    },
    async findAllByEntity(model) {
        return await strapi.entityService.findMany('api::api-version.api-version', {
            filters: {
                entity: {
                    $eq: model
                }
            }
        });
    },


}));

