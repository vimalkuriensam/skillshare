const { GetCountries } = require("../db/query");

const GetCountryController = async (req, res) => {
  try {
    const { countries } = await GetCountries();
    res.status(200).send({ message: "COUNTRIES FETCHED", countries });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetCityController = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = { GetCountryController, GetCityController };
