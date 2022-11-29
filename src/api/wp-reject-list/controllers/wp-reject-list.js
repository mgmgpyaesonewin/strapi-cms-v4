'use strict';

/**
 * wp-reject-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-reject-list.wp-reject-list', ({ strapi }) => ({
    async find(ctx) {
        let contents = await strapi.service('api::wp-reject-list.wp-reject-list').find(ctx);
        return {
            'data': contents
        }
    }

}));


