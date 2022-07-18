'use strict';

/**
 *  wp-term-and-condition controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-term-and-condition.wp-term-and-condition', ({strapi}) => ({

  async filterByVersion(ctx) {
    let {version} = ctx.params;
    const data= await strapi.service('api::wp-term-and-condition.wp-term-and-condition').findByVersion(version);
    if(data){
      data.version = data.wp_mobile_app_version.version;
      delete data.wp_mobile_app_version;
    }
    return data;
  },
  async find(ctx) {
    const terms= await strapi.service('api::wp-term-and-condition.wp-term-and-condition').find(ctx);
    if (terms.length > 0) {
      terms.map(term => {
        term.version = !!term.wp_mobile_app_version ? term.wp_mobile_app_version.version : '';
        delete term.wp_mobile_app_version;
      });
    }
    return terms;
  }

}));
