const cronTasks = require("./cron-tasks");
const cronAutoPublish = require("./cron-auto-publish");
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true,
    tasks: {
      ...cronTasks,
      ...cronAutoPublish,
    },

  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    autoopen: false,
  },
});
