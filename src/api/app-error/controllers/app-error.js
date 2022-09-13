'use strict';

/**
 *  app-error controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-error.app-error', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.service('api::app-error.app-error').find(ctx);
    }
}));
