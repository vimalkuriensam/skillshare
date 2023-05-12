const DATA = {
  CREATE_USER_TABLE: `CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(20),
        middle_name VARCHAR(20),
        last_name VARCHAR(20),
        dob DATE,
        phone VARCHAR(11) UNIQUE,
        password VARCHAR(100) NOT NULL
    );`,
  INSERT_USER: `INSERT INTO users(username, email, password)
                VALUES ($1, $2, $3);`,
  GET_USER_USERNAME: `SELECT * FROM users
                      WHERE username = $1`,
  GET_USER_ID: `SELECT * FROM users
                WHERE user_id = $1`,
};

module.exports = { DATA };
