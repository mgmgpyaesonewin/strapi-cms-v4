'use strict';

/**
 * deeplink service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deeplink.deeplink', ({strapi}) => ({
    async find(ctx) {
        const deeplinks = strapi.db.query('api::deeplink.deeplink').findMany({
            select: ["id", "name", "deeplink", "is_external", "is_webURL", "alternative_url", "alternative_url_IOS", "deeplink_IOS", "client_id", "deeplink_id"],
            populate: {
                wp_feature_id: {
                    select: ["feature_id"],
                }
            }
        })
        return deeplinks;
    }
}));
