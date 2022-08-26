'use strict';

/**
 * wp-tutorial service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial.wp-tutorial', ({strapi}) => ({

  async findOne(id) {
    console.log(id);
    const entityTutorial = await strapi.db.query('api::wp-tutorial.wp-tutorial').findOne({
      where: {
        $and: [
          {
            publishedAt: {
              $notNull: true,
            },
          },
          {
            id: id
          }
        ],
      },
      //where: { id: id },
      select: ['name'],
      populate: {
        title: true,
        description: true,
        ["image"]: {
          select: ["url"],
        },
        ["tutorials"]: {
          populate: {
            title: true,
            description: true,
            ["image_en"]: {
              select: ["url"],
            },
            ["image_my"]: {
              select: ["url"],
            },
          },
        },
        ["buttons"]: {
          populate: {
            ['deeplink']: {
              select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url', 'alternative_url_IOS', 'deeplink_IOS', 'client_id'],
            },
          }
        }
      }
    });
    return entityTutorial;
  },
  async find() {

    const entityTutorial = await strapi.db.query('api::wp-tutorial.wp-tutorial').findMany({
      where: {
        publishedAt: {
          $notNull: true,
        }
      },
      //where: { id: id },
      select: ['name'],
      populate: {
        title: true,
        description: true,
        ["image"]: {
          select: ["url"],
        },
        ["tutorials"]: {
          populate: {
            title: true,
            description: true,
            ["image_en"]: {
              select: ["url"],
            },
            ["image_my"]: {
              select: ["url"],
            },
          },
        },
        ["buttons"]: {
          populate: {
            ['deeplink']: {
              select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url', 'alternative_url_IOS', 'deeplink_IOS', 'client_id'],
            },
          }
        }
      }
    });
    return entityTutorial;
  }


}));
