'use strict';

/**
 * wp-home service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-home.wp-home', ({ strapi }) => ({
    async find(ctx) {
        const entriesCoreConfig = await strapi.entityService.findMany('api::wp-home.wp-home', {
            populate: 'deep',
            publicationState: 'live',
        });
        // return entriesCoreConfig;
        return await strapi.db.query('api::wp-home.wp-home').findOne({
            populate: {
                ['top_widget']: {
                    populate: {
                        ['background']: {
                            populate: {
                                ["image"]: {
                                    select: ["url"],
                                },
                            }
                        }

                    },
                    select:['id','is_hide','position','theme_color','attributes']
                },
                ['recent_activity_widget']: {
                    populate: {
                        ['background']: {
                            populate: {
                                ["image"]: {
                                    select: ["url"],
                                },
                            }
                        }

                    },
                    select:['id','is_hide','position','theme_color','attributes']
                },
                ['popular_widget']: {
                    populate: {
                        ['background']: {
                            populate: {
                                ["image"]: {
                                    select: ["url"],
                                },
                            }
                        }

                    },
                    select:['id','is_hide','position','theme_color','attributes']
                },
                ['promotion_widget']: {
                    populate: {
                        ['background']: {
                            populate: {
                                ["image"]: {
                                    select: ["url"],
                                },
                            }
                        }

                    },
                    select:['id','is_hide','position','theme_color','attributes']
                },

            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },

        });
    }

}));

