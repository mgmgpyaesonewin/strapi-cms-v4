'use strict';

/**
 * wp-wallet-limit-size service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-wallet-limit-size.wp-wallet-limit-size', ({ strapi }) => ({
    async find() {
        return await strapi.db.query('api::wp-wallet-limit-size.wp-wallet-limit-size').findMany({
            select: ['id','status', 'level_display', 'wallet_capacity', 'daily_limit', 'monthly_limit'],
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
        });
     }
}));

