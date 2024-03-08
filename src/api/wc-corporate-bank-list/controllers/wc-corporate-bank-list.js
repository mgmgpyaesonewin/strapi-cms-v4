'use strict';

/**
 * wc-corporate-bank-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-corporate-bank-list.wc-corporate-bank-list', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.service('api::wc-corporate-bank-list.wc-corporate-bank-list').findAll(ctx);
    }
}));
