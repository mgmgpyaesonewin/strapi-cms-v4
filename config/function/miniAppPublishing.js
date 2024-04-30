const { isSameWithDateOfToday, isExpired } = require('./dateUtil');
module.exports = async () => {
  try {
    const todayISODate = new Date().toISOString();
    /*
    * Auto Publish and Unpublish with Start Date - End Date
    */
    let publishCount = await strapi.db.query('api::wp-mini-app.wp-mini-app').updateMany({
        data: { publishedAt: todayISODate },
        where: {
          $and: [
            { is_monthly: { $eq: false } },
            { publishedAt: { $null: true } },
            { start_date: { $eq: todayISODate } },
          ],
        },
    });
    let unpublishCount = await strapi.db.query('api::wp-mini-app.wp-mini-app').updateMany({
      data: { publishedAt: null },
      where: {
        $and: [
          { is_monthly: { $eq: false } },
          { publishedAt: { $notNull: true } },
          { end_date: { $lt: todayISODate } },
        ],
      },
    });

    var monthlyMiniApps = await strapi.db.query('api::wp-mini-app.wp-mini-app').findMany({
      where: { is_monthly: { $eq: true } }
    });

    for(monthlyMiniApp in monthlyMiniApps ) {
      if (monthlyMiniApp.publishedAt == null && isSameWithDateOfToday({ startDate: monthlyMiniApp.start_date })) {
        let result = await strapi.db.query('api::wp-mini-app.wp-mini-app').update({
          where: { id: monthlyMiniApp.id },
          data: { publishedAt: todayISODate }
        });
        publishCount.count++;
      } else if (monthlyMiniApp.publishedAt != null && isExpired({ startDate: monthlyMiniApp.start_date, endDate: monthlyMiniApp.end_date })) {
        let result = await strapi.db.query('api::wp-mini-app.wp-mini-app').update({
          where: { id: monthlyMiniApp.id },
          data: { publishedAt: null }
        });
        unpublishCount.count++;
      }
    }

    console.log("@> PublishMiniAppCount:" , publishCount.count);
    console.log("@> UnpublishMiniAppCount:", unpublishCount.count);

    return publishCount.count + unpublishCount.count;
  } catch (error) {
    console.log(error);
  }
};