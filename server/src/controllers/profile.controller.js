const {
  GetCountries,
  GetCities,
  AddBasicInfo,
  GetAddress,
} = require("../db/query");
const { FIELDS } = require("../utils");

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
    const id = req.params?.id;
    if (!id) throw { error: "country id not provided" };
    const { cities } = await GetCities({ id });
    res.status(200).send({ message: "CITIES FETCHED", cities });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const InsertBasicInfo = async (req, res) => {
  try {
    const bodyParams = req.body;
    const id = req.user.id;
    const fieldCheck = FIELDS.BASIC_INFO.map((field) =>
      !!bodyParams[field] ? null : field
    ).filter((val) => !!val);
    if (fieldCheck.length)
      throw {
        message: {
          message: "MANDATORY FIELDS MISSING",
          missingFields: fieldCheck,
        },
      };
    const { user, address } = await AddBasicInfo({ ...bodyParams, id });
    res.send({ message: "PROFILE UPDATED", user: { ...user, ...address } });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const GetBasicInfo = async (req, res) => {
  try {
    const id = req.user.id;
    const { address } = await GetAddress({ id });
    res.send({
      message: "USER DETAILS FETCHED",
      user: { ...req.user, ...address },
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  GetCountryController,
  GetCityController,
  InsertBasicInfo,
  GetBasicInfo,
};
