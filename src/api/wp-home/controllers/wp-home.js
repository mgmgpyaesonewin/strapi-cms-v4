"use strict";

/**
 *  wp-home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::wp-home.wp-home", ({ strapi }) => ({
  async find(ctx) {
    let obj = await strapi.service("api::wp-home.wp-home").find(ctx);

    if(obj.promotion_widget.background.image){
        obj.promotion_widget.background.image.aspect_ratio =obj.promotion_widget.background.aspect_ratio;
        delete obj.promotion_widget.background.aspect_ratio;
    }else{
        delete obj.promotion_widget.background.aspect_ratio;
    }

    if(obj.top_widget.background.image){
        obj.top_widget.background.image.aspect_ratio =obj.top_widget.background.aspect_ratio;
        delete obj.top_widget.background.aspect_ratio;
    }else{
        delete obj.top_widget.background.aspect_ratio;
    }
    if(obj.popular_widget.background.image){
        obj.popular_widget.background.image.aspect_ratio =obj.popular_widget.background.aspect_ratio;
        delete obj.popular_widget.background.aspect_ratio;
    }else{
        delete obj.popular_widget.background.aspect_ratio;
    }
    if(obj.recent_activity_widget.background.image){
        obj.recent_activity_widget.background.image.aspect_ratio =obj.recent_activity_widget.background.aspect_ratio;
        delete obj.recent_activity_widget.background.aspect_ratio;
    }else{
        delete obj.recent_activity_widget.background.aspect_ratio;
    }
  

    let sorted = {};
    Object.keys(obj)
      .sort(function (a, b) {
        return obj[a].position - obj[b].position;
      })
      .forEach(function (key) {
        sorted[key] = obj[key];
      });
    return sorted;
  },
}));
