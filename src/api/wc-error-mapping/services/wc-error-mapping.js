'use strict';

/**
 * wc-error-mapping service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-error-mapping.wc-error-mapping', ({ strapi }) => ({

    async find(ctx) {
        // return await strapi.entityService.findMany('api::wc-error-mapping.wc-error-mapping', {
        //     populate: 'deep',
        //     publicationState: 'live',
        // });

        return await strapi.db.query('api::wc-error-mapping.wc-error-mapping').findMany({
            populate: {
                ['wc_app_version']: {
                    select:['name','version_code']
                },
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['ekyc']
        });
    }

}));

