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
                let response = await strapi.service('api::merchant-version-info-android.merchant-version-info-android').findOne(versionCode);
                response.version_info.version = response.version_info.v.version_name;
                response.version_info.versionCode = response.version_info.v.version_code;
                delete response.version_info.v;
                return response;
            }
            else if(platform == "ios") {
                let response = await strapi.service('api::merchant-ios-app-version-info.merchant-ios-app-version-info').findOne(versionCode);
                response.version_info.version = response.version_info.v.version_name;
                response.version_info.versionCode = response.version_info.v.version_code;
                delete response.version_info.v;
                return response;
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
        response.iOS.new_version_info.version = response.iOS.new_version_info.v.version_name;
        response.Android.new_version_info.version = response.Android.new_version_info.v.version_name;
        delete response.iOS.new_version_info.v;
        delete response.Android.new_version_info.v;
        return response;
    },
}));
