'use strict';

/**
 * merchant-force-upgrade-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-force-upgrade-list.merchant-force-upgrade-list', ({ strapi }) => ({
    async find() {
        return strapi.db.query('api::merchant-force-upgrade-list.merchant-force-upgrade-list').findOne({
           select: [],
            populate:{
                iOS: {
                    populate: {
                        forcedUpgrade: {
                            populate: { 
                                build:{
                                    select:['buildNumber']
                                },
                    
                            }
                        },
                        softUpgrade: {
                            populate: {
                                build: {
                                    select: ["buildNumber"]
                                }
                            }
                        },
                        new_version_info: true
                    }
                },
                Android: {
                    populate: {
                        forcedUpgrade: {
                            populate: {
                                build: {
                                    select: ["buildNumber"]
                                }
                            }
                        },
                        softUpgrade: {
                            populate: {
                                build: {
                                    select: ["buildNumber"]
                                }
                            }
                        },
                        new_version_info: true
                    }
                },

             },
        }
        );
    },
}));
