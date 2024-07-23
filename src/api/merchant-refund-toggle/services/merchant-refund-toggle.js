'use strict';

/**
 * merchant-refund-toggle service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-refund-toggle.merchant-refund-toggle',
({ strapi }) => ({
    async find(ctx) {
        var versionCode = ctx.query.versionCode;
        var versionName = ctx.query.versionName;
        if (versionCode!=null && versionName!==null) {
            let entriesAppVersions = await strapi.db.query('api::merchant-refund-toggle.merchant-refund-toggle').findMany({
         
              where: {
                $and: [
                  {
                    merchant_app_version_lists: {
                      version_name: versionName,
                      version_code: versionCode,
                    },
                  },
                  {
                    publishedAt: {
                      $notNull: true,
                    },
                  },
                ],
              },
              fields: [],
         
           });
            return entriesAppVersions.length!=0;
          } else {
            return  false;
        }
    }
}));
