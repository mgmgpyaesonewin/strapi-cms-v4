'use strict';

/**
 *  app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app.app', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.service('api::app.app').find();
    }
}));
