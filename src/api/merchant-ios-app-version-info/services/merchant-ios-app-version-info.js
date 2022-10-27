'use strict';

/**
 * merchant-ios-app-version-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::merchant-ios-app-version-info.merchant-ios-app-version-info', ({ strapi }) => ({
    async findOne(params) {
        return await strapi.db.query('api::merchant-ios-app-version-info.merchant-ios-app-version-info').findOne({
            select: [],
            where: {
                version_info: {
                    v: {
                        version_code: params
                    }
                }
            },
            populate: {
                version_info: {
                    populate: {
                        v: {
                            select: ["version_name", "version_code"]
                        }
                    }
                }
            },
        });
    }
}));
