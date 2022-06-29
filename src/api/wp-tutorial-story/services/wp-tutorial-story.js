'use strict';

/**
 * wp-tutorial-story service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-story.wp-tutorial-story');
