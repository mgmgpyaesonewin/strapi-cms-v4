const miniAppPublishing = require("./function/miniAppPublishing");
const promotionPublishing = require("./function/promotionPublishing");

module.exports = {
    myJob: {
        task: async  ({ strapi })  => {
            promotionUpdatedCount = await promotionPublishing();
            miniAppUpdatedCount = await miniAppPublishing();
            totalUpdateCount = promotionUpdatedCount + miniAppUpdatedCount;
            console.log("@>promotionUpdatedCount:", promotionUpdatedCount);
            console.log("@>miniAppUpdatedCount:", miniAppUpdatedCount);
            var ctx = {
                request: {
                    body: {
                        model: null,
                    }
                },
            }

            if(totalUpdateCount > 0) {
                try {
                    if(promotionUpdatedCount > 0) {
                        ctx.request.body.model = 'wp-promotions-ad';
                        await strapi.controllers["api::api-version-history.api-version-history"].create(ctx);
                    } 
                    if(miniAppUpdatedCount > 0) {
                        ctx.request.body.model = 'wp-mini-app';
                        await strapi.controllers["api::api-version-history.api-version-history"].create(ctx);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // options: {
        //     //  rule: '0 0 0 * * *',
        //     rule: '*/30 * * * * *',
        //     tz: 'Asia/Rangoon',
        // },
        options: new Date(Date.now() + 5000),
    },
};