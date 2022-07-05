'use strict';

/**
 * wp-tutorial-story service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-story.wp-tutorial-story', ({ strapi }) => ({
    async findOne(id) {
        const entityDeep = await strapi.entityService.findOne('api::wp-tutorial-story.wp-tutorial-story', id, {
            populate: 'deep',
            publicationState: 'live',

        });
        const entity = await strapi.db.query('api::wp-tutorial-story.wp-tutorial-story').findOne({
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
                                    select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url'],

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
        return entity;
    }
}));
