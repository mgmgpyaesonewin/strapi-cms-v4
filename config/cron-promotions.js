const promotionPublishing = require("./function/promotionPublishing");

module.exports = {
    /**
    * Cron job with timezone example.
    * Every Monday at 1am for Asia/Dhaka timezone.
    * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
    */
    myJob: {
        task: async  ({ strapi })  => {
            console.log("@>New Promotions Cron Jobs");
            const updatedCount = await promotionPublishing();
            console.log("@>Update Count:", updatedCount);
            if(updatedCount > 0) {
                try {
                    var ctx = {
                        request: {
                            body: {
                                model: 'wp-promotions-ad',
                            }
                        },
                    }
                    await strapi.controllers["api::api-version-history.api-version-history"].create(ctx)
                } catch (error) {
                    console.log(error);
                }
            
        }
            
        },
        options: {
            //  rule: '0 0 0 * * *',
            rule: '*/30 * * * * *',
            tz: 'Asia/Rangoon',
        },
    },
};