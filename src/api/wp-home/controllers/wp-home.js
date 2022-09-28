"use strict";

/**
 *  wp-home controller
 */

const {createCoreController} = require("@strapi/strapi").factories;

module.exports = createCoreController("api::wp-home.wp-home", ({strapi}) => ({
  /**
   *
   * @param ctx
   * @returns {Promise<{}>}
   */
  async find(ctx) {
    let obj = await strapi.service("api::wp-home.wp-home").find(ctx);
    formatting(obj.promotion_widget);
    formatting(obj.top_widget);
    formatting(obj.popular_widget);
    formatting(obj.recent_activity_widget);
    let sorted = {};
    Object.keys(obj)
      .sort(function (widget, next_widget) {
        return obj[widget].position - obj[next_widget].position;
      })
      .forEach(function (widget_key) {
        console.log(widget_key);
        sorted[widget_key] = obj[widget_key];
      });
    return sorted;
  },
}));
/**
 *
 * @param name
 * @returns {*}
 */
const formatting = (name) => {
  /* strapi return image as object but want to put aspect_ration inside image object when image is not null */
  if (name.background.image) {
    name.background.image.aspect_ratio = name.background.aspect_ratio;
    delete name.background.aspect_ratio;
  } else {
    delete name.background.aspect_ratio;
  }
  return name;
};
