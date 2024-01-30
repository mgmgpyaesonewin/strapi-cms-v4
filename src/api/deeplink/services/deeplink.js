'use strict';

/**
 * deeplink service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deeplink.deeplink', ({strapi}) => ({
    async find(ctx) {
        const deeplinks = strapi.db.query('api::deeplink.deeplink').findMany({
            populate: {
                wp_feature_id: {
                    select: ["feature_id"],
                }
            }
        })
        return deeplinks;
    }
}));
