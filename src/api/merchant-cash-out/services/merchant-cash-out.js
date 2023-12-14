'use strict';

/**
 * merchant-cash-out service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-cash-out.merchant-cash-out',
({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::merchant-cash-out.merchant-cash-out').findOne({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['expired_duration']
        });
    },
}),


);
