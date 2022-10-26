'use strict';

/**
 * merchant-ios-app-version-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-ios-app-version-info.merchant-ios-app-version-info', ({ strapi }) => ({
    async findOne(params) {
        console.log(">>>>>>>>>>>>>PARAMS")
        console.log(params)
        return await strapi.db.query('api::merchant-ios-app-version-info.merchant-ios-app-version-info').findOne({
            select: [],
            where: {
                version_info: {
                    versionCode: params
                }
            },
            populate: {
                version_info: true
            },
        });
    }
}));
