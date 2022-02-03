const connection = require('../config/db-config');

const dataBase = connection.promise();

const findAllWines = ({sortBy}) => {
  let query = 'SELECT * FROM Wines';
  const params = [];

  if (sortBy) {
    query += ` ORDER BY ${sortBy}`;
  }

  return dataBase.query(query, params);
};


const findOneWineById = (id) => dataBase.query('SELECT * FROM Wines WHERE id = ?', [id]);

const insertWine = ({ name, vintage,type }, image) => {
  if (image) {
    return dataBase.query(
      'INSERT INTO Wines (`name`,`vintage`,`type`,`image`) VALUES (?,?,?,?)',
      [name, vintage,type ,image],
    );
  }
  return dataBase.query(
    'INSERT INTO Wines (`name`,`vintage`,`type`) VALUES (?,?,?)',
    [name, vintage,type],
  );
};
const deleteWine = (id) => dataBase.query('DELETE FROM Wines WHERE id = ?', [id]);

const updateWine = (data, image, id) => {
  if (image) {
    return dataBase.query('UPDATE Wines SET ?, image = ? WHERE id = ?', [data, image.path, id]);
  }
  return dataBase.query('UPDATE Wines SET ? WHERE id = ?', [data, id]);
};

const updateQuantity = (quantity,id) => {
  return dataBase.query('UPDATE Wines SET quantity = ? WHERE id = ?', [quantity,id]);
};

const sumOfBottles = () => dataBase.query('SELECT SUM(quantity) FROM Wines');

module.exports = {
  findAllWines,
  findOneWineById,
  insertWine,
  deleteWine,
  updateWine,
  updateQuantity,
  sumOfBottles,
};
