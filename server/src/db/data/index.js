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
};

module.exports = { DATA };
