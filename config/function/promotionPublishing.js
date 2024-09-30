const { isSameWithDateOfToday, isExpired } = require("./dateUtil");

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
    let publishCount = await strapi.db
      .query("api::wp-promotions-ad.wp-promotions-ad")
      .updateMany({
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
    let unpublishCount = await strapi.db
      .query("api::wp-promotions-ad.wp-promotions-ad")
      .updateMany({
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

    var monthlyPromotions = await strapi.db
      .query("api::wp-promotions-ad.wp-promotions-ad")
      .findMany({
        where: { is_monthly: { $eq: true } },
      });

    for (const monthlyPromo of monthlyPromotions) {
      {
        let startDate = monthlyPromo.start_date;
        let endDate = monthlyPromo.end_date;
        if (
          monthlyPromo.publishedAt == null &&
          startDate != null &&
          isSameWithDateOfToday({ startDate: startDate })
        ) {
          console.log("____________IS SAME DATE___________");
          let result = await strapi.db
            .query("api::wp-promotions-ad.wp-promotions-ad")
            .update({
              where: { id: monthlyPromo.id },
              data: { publishedAt: todayISODate },
            });
          publishCount.count++;
        } else if (
          monthlyPromo.publishedAt != null &&
          startDate != null &&
          endDate != null &&
          isExpired({ startDate: startDate, endDate: endDate })
        ) {
          let result = await strapi.db
            .query("api::wp-promotions-ad.wp-promotions-ad")
            .update({
              where: { id: monthlyPromo.id },
              data: { publishedAt: null },
            });
          unpublishCount.count++;
        }
      }
    }
    return publishCount.count + unpublishCount.count;
  } catch (error) {
    console.log(error);
  }
};
