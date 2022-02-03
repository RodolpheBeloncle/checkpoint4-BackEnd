const connection = require('../config/db-config');

const dataBase = connection.promise();


const findWineMatch = ({name}) => {
 
  return dataBase.query(`SELECT * FROM Wines w  INNER JOIN WinePairings wp ON w.id = wp.WineId INNER JOIN Dishes d on wp.DisheId = d.id WHERE w.name LIKE ?`, [`%${name}%`]);
  };
  
    
  module.exports = {
    findWineMatch,
  };