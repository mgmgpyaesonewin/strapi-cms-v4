'use strict';

/**
 * wp-tutorial-story service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-story.wp-tutorial-story', ({strapi}) => ({
  async findOne(id) {
    const entityStory = await strapi.db.query('api::wp-tutorial-story.wp-tutorial-story').findOne({
      where: {id: id},
      select: ['name'],
      populate: {
        title: true,
        description: true,
        ["image"]: {
          select: ["url"],
        },
        ["options"]: {
          populate: {
            ['buttons']: {
              populate: {
                ['deeplink']: {
                  select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url','alternative_url_IOS','deeplink_IOS','client_id'],

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
            },
            ['my']: {
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
  },
  async findByName(name) {
    const entityStory = await strapi.db.query('api::wp-tutorial-story.wp-tutorial-story').findOne({
      where: {name: name},
      select: ['name'],
      populate: {
        title: true,
        description: true,
        ["image"]: {
          select: ["url"],
        },
        ["options"]: {
          populate: {
            ['buttons']: {
              populate: {
                ['deeplink']: {
                  select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url','alternative_url_IOS','deeplink_IOS','client_id'],

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
            },
            ['my']: {
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
  },
  async find(id) {
    const entityStory = await strapi.db.query('api::wp-tutorial-story.wp-tutorial-story').findMany({
    
      select: ['name'],
      populate: {
        title: true,
        description: true,
        ["image"]: {
          select: ["url"],
        },
        ["options"]: {
          populate: {
            ['buttons']: {
              populate: {
                ['deeplink']: {
                  select: ['name', 'deeplink', 'is_external', 'is_webURL', 'alternative_url','alternative_url_IOS','deeplink_IOS','client_id'],

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
            },
            ['my']: {
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
  },
}));
