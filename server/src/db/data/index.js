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
        password VARCHAR(100) NOT NULL,
        info_state INT DEFAULT 1 NOT NULL,
        profile_state VARCHAR(10) DEFAULT 'enabled' NOT NULL
    );`,

  CREATE_ADDRESS_TABLE: `CREATE TABLE IF NOT EXISTS address(
        id SERIAL PRIMARY KEY,
        address_line1 VARCHAR(50),
        address_line2 VARCHAR(50),
        city_id INT,
        pincode VARCHAR(10),
        user_id INT UNIQUE,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );`,

  CREATE_TABLE_COUNTRIES: `CREATE TABLE IF NOT EXISTS countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
  )`,
  CREATE_TABLE_CITIES: `CREATE TABLE IF NOT EXISTS cities(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(20) UNIQUE NOT NULL,
                        country_id INT NOT NULL,
                        FOREIGN KEY(country_id) REFERENCES countries(id)
                      )`,
  CREATE_TABLE_WORKEXPERIENCE: `CREATE TABLE IF NOT EXISTS work_experience(
                        id SERIAL PRIMARY KEY,
                        company_name VARCHAR(50) NOT NULL,
                        start_date DATE NOT NULL,
                        end_date DATE,
                        current BOOLEAN DEFAULT false NOT NULL,
                        city_id INT NOT NULL,
                        user_id INT NOT NULL,
                        FOREIGN KEY(city_id) REFERENCES cities(id),
                        FOREIGN KEY(user_id) REFERENCES users(id)
                      );`,
  INSERT_COUNTRIES: `INSERT INTO countries (name) VALUES (`,
  INSERT_CITIES: `INSERT INTO cities (name, country_id) VALUES (`,
  INSERT_USER: `INSERT INTO users(username, email, password)
                VALUES ($1, $2, $3);`,
  INSERT_BASIC_INFO: `UPDATE users
                      SET first_name = $1,
                          middle_name = $2,
                          last_name = $3,
                          dob = $4,
                          phone = $5,
                          info_state = 2
                      WHERE id = $6
                      RETURNING *`,
  INSERT_ADDRESS_INFO: `INSERT INTO address (address_line1, address_line2, city_id, pincode, user_id)
                        VALUES ($1, $2, $3, $4, $5)
                        ON CONFLICT (user_id) DO UPDATE
                        SET address_line1 = $1,
                            address_line2 = $2,
                            city_id = $3,
                            pincode = $4,
                            user_id = EXCLUDED.user_id
                        RETURNING *`,
  GET_ADDRESS: `SELECT * FROM address
                WHERE user_id = $1`,
  GET_USER_USERNAME: `SELECT * FROM users
                      WHERE username = $1`,
  GET_USER_ID: `SELECT * FROM users
                WHERE id = $1`,
  GET_COUNTRIES: `SELECT * FROM countries`,
  GET_CITIES: `SELECT * FROM cities
               WHERE country_id = $1`,
};

module.exports = { DATA };
