'use strict';

/**
 * wp-home-widget controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-home-widget.wp-home-widget', ({ strapi }) => ({
    async find(ctx) {
        const widgets = await strapi.service('api::wp-home-widget.wp-home-widget').find(ctx);
        return {
            "home_widgets": widgets
        };
    },

}));


