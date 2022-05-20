'use strict';

/**
 * A set of functions called "actions" for `test-report`
 */

module.exports = {
  async findAll(ctx, next) {
    try {
      const data = await strapi.service('api::test-report.test-report').pagesReport();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest('Page report controller error', { moreDetails: err })
    }
  }
};
