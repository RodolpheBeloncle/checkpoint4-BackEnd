const cellarRouter = require('./cellarRouter');
const  matchRouter = require('./matchRouter');


const setupRoutes = (app) => {
  app.use('/api/cellar', cellarRouter);
  app.use('/api/match', matchRouter);
};

module.exports = setupRoutes;