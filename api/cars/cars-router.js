const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const allCars = await Cars.getAll();
    res.status(201).json(allCars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      res.status(201).json(car);
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {//eslint-disable-line
  res
    .status(err.status || 500)
    .json({ message: err.message, stack: err.stack });
});

module.exports = router;