'use strict';

/**
 *  app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app.app', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.entityService.findMany('api::app.app', {
            populate: 'deep',
            publicationState: 'live',
          });

        return await strapi.service('api::app.app').find();

    }
}));
