const { isSameWithDateOfToday, isExpired } = require('./dateUtil');
module.exports = async () => {
  try {
    // const today = new Date();
    // const formattedToday = today.toISOString().split("T")[0]; // "2024-09-26"
    // const todayISODate = new Date().toISOString();


    const now = new Date();
    const myanmarOffset = 6 * 60 + 30; // 6 hours and 30 minutes = 390 minutes
    const myanmarTime = new Date(now.getTime() + myanmarOffset * 60000);
    const formattedToday = myanmarTime.toISOString().split("T")[0];  //"2024-09-26"
    const timePart = myanmarTime.toTimeString().split(" ")[0];
    
    const todayISODate = `${formattedToday}T${timePart}+06:30`;

    /*
    * Auto Publish and Unpublish with Start Date - End Date
    */
    let publishCount = await strapi.db.query('api::wp-mini-app.wp-mini-app').updateMany({
        data: { publishedAt: todayISODate },
        where: {
          $and: [
            { is_monthly: { $eq: false } },
            { publishedAt: { $null: true } },
            { start_date: { $notNull: true } },
            { start_date: { $eq: formattedToday } },
          ],
        },
    });
    let unpublishCount = await strapi.db.query('api::wp-mini-app.wp-mini-app').updateMany({
      data: { publishedAt: null },
      where: {
        $and: [
          { is_monthly: { $eq: false } },
          { publishedAt: { $notNull: true } },
          { end_date: { $notNull: true } },
          { end_date: { $lt: formattedToday } },
        ],
      },
    });

    var monthlyMiniApps = await strapi.db.query('api::wp-mini-app.wp-mini-app').findMany({
      where: { is_monthly: { $eq: true } }
    });

    for(const monthlyMiniApp of monthlyMiniApps ) {
      let startDate = monthlyMiniApp.start_date;
      let endDate = monthlyMiniApp.end_date;
      if (monthlyMiniApp.publishedAt == null && startDate != null && isSameWithDateOfToday({ startDate: monthlyMiniApp.start_date })) {
        let result = await strapi.db.query('api::wp-mini-app.wp-mini-app').update({
          where: { id: monthlyMiniApp.id },
          data: { publishedAt: todayISODate }
        });
        publishCount.count++;
      } else if (monthlyMiniApp.publishedAt != null && startDate != null && endDate != null && isExpired({ startDate: monthlyMiniApp.start_date, endDate: monthlyMiniApp.end_date })) {
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