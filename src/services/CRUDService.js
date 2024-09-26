const connection = require('../config/database');

const getAllUsers = async () => {
  const [results, fields] = await connection.query('SELECT * FROM Users');
  return results;
}

const getUserById = async (id) => {
  const [results, fields] = await connection.query(
    'SELECT * FROM Users WHERE id = ?',
    [id]
  );
  return (results && results.length > 0) ? results[0] : null;
}

const updateUser = async (req) => {
  const [results, fields] = await connection.query(
    'UPDATE Users SET email = ?, name = ?, city = ? WHERE id = 8',
    [req.body.email, req.body.name, req.body.city, req.params.id]
  );
}
module.exports = {
  getAllUsers,
  getUserById,
  updateUser
}