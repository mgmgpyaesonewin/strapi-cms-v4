'use strict';

/**
 * wp-reject-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-reject-list.wp-reject-list');
