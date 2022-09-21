'use strict';

/**
 * wc-story-content service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-story-content.wc-story-content', ({strapi}) => ({
  async find() {
    const entityStory = await strapi.db.query('api::wc-story-content.wc-story-content').findMany({
      select: ['name', 'position'], orderBy: {position: 'asc'}, where: {
        publishedAt: {
          $notNull: true,
        },
      }, populate: {
        title: true, description: true, ["image"]: {
          select: ["url"],
        }, ["options"]: {
          populate: {
            ['buttons']: {
              populate: {
                ['wc_deeplink']: {
                  select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url', 'client_id'],
                },
              },
            }
          }
        },
        ["stories"]: {
          populate: {
            ['en']: {
              populate: {
                ["image"]: {
                  select: ["url"],
                }
              },
            }, ['my']: {
              populate: {
                ["image"]: {
                  select: ["url"],
                }
              },
            },
          }
        }
      }
    });
    return entityStory;
  }, async findOne(id) {
    const entityStory = await strapi.db.query('api::wc-story-content.wc-story-content').findOne({
      //where: { id: id },
      where: {
        $and: [{
          publishedAt: {
            $notNull: true,
          }
        }, {
          id: id
        }]
      }, select: ['name'], populate: {
        title: true, description: true, ["image"]: {
          select: ["url"],
        }, ["options"]: {
          populate: {
            ['buttons']: {
              populate: {
                ['wc_deeplink']: {
                  select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url', 'client_id'],
                },
              },
            }
          }
        },
        ["stories"]: {
          populate: {
            ['en']: {
              populate: {
                ["image"]: {
                  select: ["url"],
                }
              },
            }, ['my']: {
              populate: {
                ["image"]: {
                  select: ["url"],
                }
              },
            },
          }
        }
      }
    });
    return entityStory;
  }
}));

