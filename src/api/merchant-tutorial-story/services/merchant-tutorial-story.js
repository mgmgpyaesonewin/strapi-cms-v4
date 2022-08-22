'use strict';

/**
 * merchant-tutorial-story service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-tutorial-story.merchant-tutorial-story', ({strapi}) => ({
    async findOne(id) {
    const entityStory = await strapi.db.query('api::merchant-tutorial-story.merchant-tutorial-story').findOne({
        where: { id: id },
        select: ['name'],
        populate: {
            title: true,
            description: true,
            ["image"]: {
                select: ["url"],
            },
            ["options"]: {
                populate: {
                    ['buttons']: {
                        populate: {
                            ['deeplink']: {
                                select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url','client_id'],

                            },
                        },
                    }
                }
            },

            ["stories"]: {
                populate: {
                    ['en']: {
                        populate: {
                            ["extra_large"]: {
                                select: ["url"],
                            },
                            ["large"]: {
                                select: ["url"],
                            },
                            ["mid"]: {
                                select: ["url"],
                            },
                            ["small"]: {
                                select: ["url"],
                            },
                            ["extra_small"]: {
                                select: ["url"],
                            },

                        },
                    },
                    ['my']: {
                        populate: {
                            ["extra_large"]: {
                                select: ["url"],
                            },
                            ["large"]: {
                                select: ["url"],
                            },
                            ["mid"]: {
                                select: ["url"],
                            },
                            ["small"]: {
                                select: ["url"],
                            },
                            ["extra_small"]: {
                                select: ["url"],
                            },
                        },
                    },
                }
            }
        }
    });
    return entityStory;
}
}));