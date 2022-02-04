const connection = require('../config/db-config');

const dataBase = connection.promise();


const findAllDishes = () => dataBase.query(`SELECT * FROM Dishes`);


const createDishMatch = (
    {dishId},
    wineId
  ) => dataBase.query(`INSERT INTO  wineMatch (dishId, wineId) VALUES (?, ?)`, [dishId,wineId]);

module.exports = {
    findAllDishes,
    createDishMatch,
  };