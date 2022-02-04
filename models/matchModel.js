const connection = require('../config/db-config');

const dataBase = connection.promise();

const findWine = ({ name }) => {
  return dataBase.query(
    `SELECT * FROM Wines w INNER JOIN WinePairings wp ON w.id = wp.WineId INNER JOIN Dishes d on wp.DisheId = d.id WHERE w.name LIKE ?`,
    [`%${name}%`]
  );
};

//
const findWineMatchById = (id) => {
  return dataBase.query(
    `SELECT * FROM Wines w INNER JOIN wineMatch  wp ON w.id = wp.wineId INNER JOIN Dishes d on wp.dishId = d.id WHERE w.id = ?`,
    [id]
  );
};

//

const findMatchById = (id) => {
  return dataBase.query(
    `SELECT * FROM Wines w INNER JOIN WinePairings wp ON w.id = wp.WineId INNER JOIN Dishes d on wp.DisheId = d.id WHERE w.id = ?`,
    [id]
  );
};

const insertMatch = ({ wineId, title }, image) => {
  if (image) {
    return dataBase.query(
      'INSERT INTO WineMatch (`wineId`,`title`,`image`) VALUES (?,?,?)',
      [dishId, wineId, title, image]
    );
  }
  return dataBase.query(
    'INSERT INTO WineMatch (`wineId`,`title`) VALUES (?,?,?)',
    [dishId, wineId, title]
  );
};

const updateMatch = (data, image, id) => {
  if (image) {
    return dataBase.query('UPDATE WineMatch SET ?, image = ? WHERE id = ?', [
      data,
      image.path,
      id,
    ]);
  }
  return dataBase.query('UPDATE WineMatch SET ? WHERE id = ?', [data, id]);
};

const deleteMatch = (id) =>
  dataBase.query('DELETE FROM WineMatch WHERE id = ?', [id]);

module.exports = {
  findWine,
  findWineMatchById,
  findMatchById,
  insertMatch,
  updateMatch,
  deleteMatch,
};
