'use strict';

/**
 *  wp-occupation-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-occupation-list.wp-occupation-list', ({ strapi }) => ({
    
    async find(ctx) {
        let occupations= await strapi.service('api::wp-occupation-list.wp-occupation-list').find(ctx);
        return {
            "occupations": occupations.length > 0 ? occupations : [],
        }
    }

}));


