module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/test-report',
     handler: 'test-report.findAll',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/test-report/:id',
      handler: 'test-report.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'POST',
      path: '/test-report',
      handler: 'test-report.create',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
