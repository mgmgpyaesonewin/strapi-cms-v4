'use strict';

/**
 * merchant-force-upgrade-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-force-upgrade-list.merchant-force-upgrade-list', ({ strapi }) => ({
    async find(ctx) {
        var platform = ctx.query.platform;
        var versionCode = ctx.query["version-code"];
        console.log(platform);
        console.log(versionCode);

        if (platform && versionCode) {
            if (platform == "android") {
                return await strapi.service('api::merchant-version-info-android.merchant-version-info-android').findOne(versionCode);
            }
            else if(platform == "ios") {
                return await strapi.service('api::merchant-ios-app-version-info.merchant-ios-app-version-info').findOne(versionCode);
            } else {
               return null
            }
        }

        var response = await strapi.service('api::merchant-force-upgrade-list.merchant-force-upgrade-list').find(ctx);
        console.log(response)
        response.iOS.new_version_info =  response.iOS.version_info.version_info;
        
        response.Android.new_version_info =  response.Android.version_info.version_info;
        delete response.iOS.version_info;
        delete response.Android.version_info;
        return response;
    },
}));
