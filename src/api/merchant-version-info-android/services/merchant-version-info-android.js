'use strict';

/**
 * merchant-version-info-android service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-version-info-android.merchant-version-info-android', ({ strapi }) => ({
    async findOne(params) {
        console.log(">>>>>>>>>>>>>PARAMS")
        console.log(params)
        return await strapi.db.query('api::merchant-version-info-android.merchant-version-info-android').findOne({
            select:[],
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
