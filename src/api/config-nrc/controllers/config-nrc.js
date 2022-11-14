'use strict';

/**
 *  config-nrc controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config-nrc.config-nrc', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.service('api::config-nrc.config-nrc').find(ctx);
    },
    async merchantNRC(ctx) {
        return await strapi.service('api::config-nrc.config-nrc').find(ctx);
    },
    async wpNRC(ctx) {
        return await strapi.service('api::config-nrc.config-nrc').find(ctx);
    },
    async wcNRC(ctx) {
        return await strapi.service('api::config-nrc.config-nrc').find(ctx);
    }


}));
