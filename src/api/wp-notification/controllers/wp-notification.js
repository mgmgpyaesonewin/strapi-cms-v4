'use strict';

/**
 * wp-notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-notification.wp-notification', ({ strapi }) => ({

    async find(ctx) {
        let result= await strapi.service('api::wp-notification.wp-notification').find(ctx);
        return {
            'notification':result
        }
    }


}));

