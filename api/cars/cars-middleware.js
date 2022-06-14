const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

async function checkCarId(req, res, next) {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkCarPayload(req, res, next) {
  let { vin, make, model, mileage } = req.body;
  if (vin === undefined) {
    res.status(400).json({ message: `vin is missing` });
  } else if (make === undefined) {
    res.status(400).json({ message: `make is missing` });
  } else if (model === undefined) {
    res.status(400).json({ message: `model is missing` });
  } else if (mileage === undefined) {
    res.status(400).json({ message: `mileage is missing` });
  } else {
    next();
  }
}

function checkVinNumberValid(req, res, next) {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
}

async function checkVinNumberUnique(req, res, next) {
  try {
    const existingVin = await Cars.getByVin(req.body.vin);
    if (!existingVin) {
      next();
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};