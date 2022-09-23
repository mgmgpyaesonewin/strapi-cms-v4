'use strict';

/**
 * strapi-model service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::strapi-model.strapi-model', ({ strapi }) => ({

    async findByModel(model) {
        return await strapi.db.query('api::strapi-model.strapi-model').findOne({
            where: { name: model },
            populate: {
                ["app_urls"]: {
                    populate: {
                        ["firebase_topics"]: {
                            where: {
                                publishedAt: {
                                    $notNull: true,
                                },
                            },
                        },
                        app: true,
                    },
                }
            },

        });
    },

}));
