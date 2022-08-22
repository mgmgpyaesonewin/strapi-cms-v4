'use strict';

/**
 * firebase-topic service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::firebase-topic.firebase-topic');
