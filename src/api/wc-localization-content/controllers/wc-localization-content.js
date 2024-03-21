'use strict';

/**
 *  wc-localization-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-localization-content.wc-localization-content', ({ strapi }) => ({
    
    async find(ctx) {
        let contents= await strapi.service('api::wc-localization-content.wc-localization-content').find(ctx);
        return {
            'contents':contents
        }
    }

}));
