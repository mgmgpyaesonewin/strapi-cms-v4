'use strict';

/**
 *  wp-localization-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-localization-content.wp-localization-content', ({ strapi }) => ({
    
    async find(ctx) {
        let contents = await strapi.service('api::wp-localization-content.wp-localization-content').find(ctx);
        return {
            'contents': contents
        }
    }

}));

