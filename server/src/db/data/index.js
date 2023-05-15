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
        type VARCHAR(20) DEFAULT 'USER' NOT NULL,
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
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,

  CREATE_TABLE_COUNTRIES: `CREATE TABLE IF NOT EXISTS countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
  )`,
  CREATE_TABLE_CITIES: `CREATE TABLE IF NOT EXISTS cities(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(20) UNIQUE NOT NULL,
                        country_id INT NOT NULL,
                        FOREIGN KEY(country_id) REFERENCES countries(id) ON DELETE CASCADE
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
                        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                      );`,
  CREATE_TABLE_SKILLS: `CREATE TABLE IF NOT EXISTS skills (
                      id SERIAL PRIMARY KEY,
                      skill VARCHAR(50) UNIQUE NOT NULL
                      )`,
  CREATE_TABLE_USER_SKILLS: `CREATE TABLE IF NOT EXISTS user_skills(
                      id SERIAL PRIMARY KEY,
                      skill_id INT NOT NULL,
                      user_id INT NOT NULL,
                      proficiency VARCHAR(20) DEFAULT 'BEGINNER' NOT NULL,
                      FOREIGN KEY(skill_id) REFERENCES skills(id),
                      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                      );`,
  CREATE_TABLE_LANGUAGES: `CREATE TABLE IF NOT EXISTS languages (
                        id SERIAL PRIMARY KEY,
                        language VARCHAR(50) UNIQUE NOT NULL
                        )`,
  CREATE_TABLE_USER_LANGUAGES: `CREATE TABLE IF NOT EXISTS user_languages(
                        id SERIAL PRIMARY KEY,
                        language_id INT NOT NULL,
                        user_id INT NOT NULL,
                        proficiency VARCHAR(20) DEFAULT 'BEGINNER' NOT NULL,
                        FOREIGN KEY(language_id) REFERENCES languages(id),
                        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        );`,
  INSERT_COUNTRIES: `INSERT INTO countries (name) VALUES (`,
  INSERT_CITIES: `INSERT INTO cities (name, country_id) VALUES (`,
  INSERT_SKILLS: `INSERT INTO skills (skill) VALUES (`,
  INSERT_LANGUAGES: `INSERT INTO languages (language) VALUES (`,
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
  INSERT_WORK_EXPERIENCE: `INSERT INTO work_experience (
                            company_name, 
                            start_date, 
                            end_date, 
                            current, 
                            city_id, 
                            user_id) 
                          VALUES (`,
  INSERT_USER_SKILLS: `INSERT INTO user_skills (
                            skill_id, 
                            proficiency, 
                            user_id) 
                          VALUES (`,
  INSERT_USER_LANGUAGES: `INSERT INTO user_languages (
                            language_id, 
                            proficiency, 
                            user_id) 
                          VALUES (`,
  GET_ADDRESS: `SELECT * FROM address
                WHERE user_id = $1`,
  GET_USER_USERNAME: `SELECT * FROM users
                      WHERE username = $1`,
  GET_USER_ID: `SELECT * FROM users
                WHERE id = $1`,
  GET_USER_LEFT_JOINT: `SELECT users.*, 
                        address.*, 
                        json_agg(work_experience) AS work_experience,
                        json_agg(user_skills) AS skills,
                        json_agg(user_languages) AS languages
                        FROM users
                        LEFT JOIN address ON address.user_id = users.id
                        LEFT JOIN user_skills ON user_skills.user_id = users.id
                        LEFT JOIN user_languages ON user_languages.user_id = users.id
                        LEFT JOIN work_experience ON work_experience.user_id = users.id
                        WHERE users.id = $1
                        GROUP BY users.id, address.id;`,
  GET_ALL_USER_LEFT_JOINT: `SELECT users.*, 
                            address.*, 
                            json_agg(work_experience) AS work_experience,
                            json_agg(user_skills) AS skills,
                            json_agg(user_languages) AS languages
                            FROM users
                            LEFT JOIN address ON address.user_id = users.id
                            LEFT JOIN user_skills ON user_skills.user_id = users.id
                            LEFT JOIN user_languages ON user_languages.user_id = users.id
                            LEFT JOIN work_experience ON work_experience.user_id = users.id
                            GROUP BY users.id, address.id;`,
  GET_COUNTRIES: `SELECT * FROM countries`,
  GET_CITIES: `SELECT * FROM cities
               WHERE country_id = $1`,
  GET_CITY: `SELECT name FROM cities
             WHERE id = $1`,
  GET_SKILL: `SELECT skill FROM skills WHERE id = $1`,
  GET_LANGUAGE: `SELECT language FROM languages WHERE id = $1`,
  GET_WORK_EXPERIENCE: `SELECT * FROM work_experience WHERE user_id = $1;`,
  DELETE_WORK_EXPERIENCE: `DELETE FROM work_experience WHERE user_id = $1;`,
  DELETE_SKILLS: `DELETE FROM user_skills WHERE user_id = $1;`,
  DELETE_LANGUAGES: `DELETE FROM user_languages WHERE user_id = $1;`,
  UPDATE_INFO_STATE: `UPDATE users
                      SET info_state = $1
                      WHERE id = $2;`,
  ADD_RECRUITER_DEFAULT: `INSERT INTO users(username, email, password, type) 
                          VALUES($1, $2, $3, $4)`,
  GET_ALL_SKILLS: `SELECT * FROM skills`,
  GET_USER_SKILLS: `SELECT user_skills.id, skills.skill, user_skills.proficiency
                    FROM user_skills
                    LEFT JOIN skills ON user_skills.skill_id = skills.id
                    WHERE user_skills.user_id = $1;`,
  GET_ALL_LANGUAGES: `SELECT * FROM languages`,
  DELETE_ALL_USERS: "DELETE FROM users",
  DELETE_USER_BY_ID: `DELETE FROM users WHERE id = $1`,
};

module.exports = { DATA };
