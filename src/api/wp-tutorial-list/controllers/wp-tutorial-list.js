'use strict';

/**
 *  wp-tutorial-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const stories = require('../../wp-tutorial-story/controllers/wp-tutorial-story.js');

module.exports = createCoreController('api::wp-tutorial-list.wp-tutorial-list', ({ strapi }) => ({
    async find(ctx) {
        const entityStories = await strapi.service('api::wp-tutorial-story-list.wp-tutorial-story-list').find(ctx);
        const entityTutorials = await strapi.service('api::wp-tutorial-list.wp-tutorial-list').find(ctx);

        /*
        const entriesCategories = await strapi.entityService.findMany('api::wp-tutorial-list.wp-tutorial-list', {
            populate: 'deep',
            publicationState: 'live',
        });
        */
        const merged = [...entityStories, ...entityTutorials];
        console.log(merged);

        return merged;
    }
}));