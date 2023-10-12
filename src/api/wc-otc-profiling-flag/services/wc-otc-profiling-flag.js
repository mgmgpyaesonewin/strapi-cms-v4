'use strict';

/**
 * wc-otc-profiling-flag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-otc-profiling-flag.wc-otc-profiling-flag', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.db.query('api::wc-otc-profiling-flag.wc-otc-profiling-flag').findMany({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['id','key', 'value']
        });
    }
}));


