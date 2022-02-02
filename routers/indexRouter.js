const cellarRouter = require('./cellarRouter');


const setupRoutes = (app) => {
  app.use('/api/cellar', cellarRouter);
};

module.exports = setupRoutes;