'use strict';

/**
 * wp-notification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-notification.wp-notification',({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.db.query('api::wp-notification.wp-notification').findOne({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select:['reject','approve']
        });
    }

}));
