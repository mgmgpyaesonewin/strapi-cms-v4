const cronTasks = require("./cron-tasks");
const cronPromotions = require("./cron-promotions");
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true,
    tasks: {
      ...cronTasks,
      ...cronPromotions,
    } ,

  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    autoopen: false,
  },
});
