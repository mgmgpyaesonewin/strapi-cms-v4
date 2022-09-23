'use strict';

/**
 * app-url service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app-url.app-url', ({ strapi }) => ({
    async findByModel(model) {
        return await strapi.entityService.findMany('api::app-url.app-url', {
          populate: {
                model:true,
                firebase_topics:true,
                app:true
              },
            publicationState: 'live',
            filters: {
                model: model,
            },
        });
    }
}));
