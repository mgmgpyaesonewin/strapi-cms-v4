'use strict';

const deeplink = require('../services/deeplink');

/**
 *  deeplink controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::deeplink.deeplink', ({strapi}) => ({
    async find(ctx){
        const deeplinks = await strapi.service('api::deeplink.deeplink').find(ctx);
        deeplinks.map(deeplink => {
                deeplink.feature_id = !!deeplink.wp_feature_id ? deeplink.wp_feature_id.feature_id : null
                delete deeplink.wp_feature_id;
            }
        );
        return {
            "data": deeplinks,
        };
    }
}));
