// path: ./config/cron-tasks.js
const checkAuditLog = require('./function/parseAuditLogs.js')
// path: ./config/cron-tasks.js

module.exports = {
    /**
    * Cron job with timezone example.
    * Every Monday at 1am for Asia/Dhaka timezone.
    * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
    */


    myJob: {
        task: ({ strapi }) => {
            /* Add your own logic here */
            checkAuditLog();
        },
        options: {
            rule: '*/30 * * * * *',
             tz: 'Asia/Rangoon',
        },
    },
};