'use strict';

/**
 *  merchant-login controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-login.merchant-login', ({ strapi }) => ({
    async find(ctx) {
        const entriesCategories = await strapi.entityService.findMany('api::merchant-login.merchant-login', {
            populate: 'deep',
            publicationState: 'live',
        });

        return entriesCategories;
    },
}));
