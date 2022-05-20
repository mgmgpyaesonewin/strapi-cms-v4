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
  ],
};
