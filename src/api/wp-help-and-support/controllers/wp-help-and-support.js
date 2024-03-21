'use strict';

/**
 *  wp-help-and-support controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-help-and-support.wp-help-and-support', ({ strapi }) => ({

    async find(ctx) {
        let help = await strapi.service('api::wp-help-and-support.wp-help-and-support').find(ctx);
        return {
            'data': help
        }
    }

}));


