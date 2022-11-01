module.exports = async () => {
  try {
    console.log("cron " + new Date());
    const subtract = new Date();
    const todayDate = new Date();
    const additionOfMonths = 3;
    subtract.setMonth(subtract.getMonth() - additionOfMonths);
    const entries = await strapi.db.query('api::trail.trail').deleteMany({
      where: {
        $and: [
          {
            createdAt: {
              $gte: subtract,
            },
          },
          {
            createdAt: {
              $lte: todayDate,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.warm(error);
  }
};