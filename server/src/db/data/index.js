const DATA = {
  CREATE_USER_TABLE: `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(20),
        middle_name VARCHAR(20),
        last_name VARCHAR(20),
        dob DATE,
        phone VARCHAR(11) UNIQUE,
        password VARCHAR(100) NOT NULL
    );`,

  CREATE_ADDRESS_TABLE: `CREATE TABLE IF NOT EXISTS address(
        id SERIAL PRIMARY KEY,
        address_line1 VARCHAR(50),
        address_line2 VARCHAR(50),
        city_id INT,
        pincode INT,
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );`,

  CREATE_TABLE_COUNTRIES: `CREATE TABLE IF NOT EXISTS countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
  )`,
  CREATE_TABLE_CITIES: `CREATE TABLE IF NOT EXISTS cities(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY(country_id) REFERENCES countries(id)
  )`,
  INSERT_COUNTRIES: `INSERT INTO countries (name) VALUES (`,
  INSERT_CITIES: `INSERT INTO cities (name, country_id) VALUES (`,
  INSERT_USER: `INSERT INTO users(username, email, password)
                VALUES ($1, $2, $3);`,
  GET_USER_USERNAME: `SELECT * FROM users
                      WHERE username = $1`,
  GET_USER_ID: `SELECT * FROM users
                WHERE user_id = $1`,
  GET_COUNTRIES: `SELECT * FROM countries`,
};

module.exports = { DATA };
