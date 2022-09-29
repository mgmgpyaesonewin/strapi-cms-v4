'use strict';

/**
 * wp-tutorial-story router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter= createCoreRouter('api::wp-tutorial-story.wp-tutorial-story');
const customRouter = (innerRouter, extraRoutes = []) => {
    let routes;
    return {
      get prefix() {
        return innerRouter.prefix;
      },
      get routes() {
        if (!routes) routes = innerRouter.routes.concat(extraRoutes);
        return routes;
      },
    };
  };
  
  const myExtraRoutes = [
    {
      method: 'GET',
      path: "/wp-tutorial-stories/name/:name",
      handler: 'wp-tutorial-story.getbyName',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
  
  
