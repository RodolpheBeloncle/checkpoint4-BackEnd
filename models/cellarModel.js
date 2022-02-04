const connection = require('../config/db-config');

const dataBase = connection.promise();

const findAllWines = ({ sortBy }) => {
  let query = 'SELECT * FROM Wines';
  const params = [];

  if (sortBy) {
    query += ` ORDER BY ${sortBy}`;
  }

  return dataBase.query(query, params);
};

const findOneWineById = (id) =>
  dataBase.query('SELECT * FROM Wines WHERE id = ?', [id]);

const insertWine = ({ name, vintage, type, quantity }, image) => {
  if (image) {
    return dataBase.query(
      'INSERT INTO Wines (`name`,`vintage`,`image`,`type`,`quantity`) VALUES (?,?,?,?,?)',
      [name, vintage, image, type, quantity]
    );
  }
  return dataBase.query(
    'INSERT INTO Wines (`name`,`vintage`,`type`,`quantity`) VALUES (?,?,?,?)',
    [name, vintage, type, quantity]
  );
};
const deleteWine = (id) =>
  dataBase.query('DELETE FROM Wines WHERE id = ?', [id]);

const updateWine = (data, image, id) => {
  if (image) {
    return dataBase.query('UPDATE Wines SET ?, image = ? WHERE id = ?', [
      data,
      image.path,
      id,
    ]);
  }
  return dataBase.query('UPDATE Wines SET ? WHERE id = ?', [data, id]);
};

const updateQuantity = (quantity, id) => {
  return dataBase.query('UPDATE Wines SET quantity = ? WHERE id = ?', [
    quantity,
    id,
  ]);
};

const sumOfBottles = () => dataBase.query('SELECT SUM(quantity) as total FROM Wines');

module.exports = {
  findAllWines,
  findOneWineById,
  insertWine,
  deleteWine,
  updateWine,
  updateQuantity,
  sumOfBottles,
};
