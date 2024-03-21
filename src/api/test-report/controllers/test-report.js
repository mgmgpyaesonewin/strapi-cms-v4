'use strict';

const { pagesReport, custom } = require("../services/test-report");

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
  },
  async findOne(ctx, next) {
    try {
      const data = await strapi.service('api::test-report.test-report').custom(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest('Page report controller error', { moreDetails: err })
    }
  },
  async create(ctx, next) {
    try {
     let body= ctx.request.body;
    } catch (err) {
      ctx.badRequest('Page report controller error', { moreDetails: err })
    }
  }

};
