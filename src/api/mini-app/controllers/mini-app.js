'use strict';

/**
 *  mini-app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mini-app.mini-app', ({ strapi }) => ({
    async find(ctx) {
        const entries = await strapi.entityService.findMany('api::mini-app.mini-app', {
            populate: 'deep',

        });
       
        return entries;
    }
}));
