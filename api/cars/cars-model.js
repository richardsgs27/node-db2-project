
   
const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

function getById(id) {
  return db("cars").where("id", id).first();
}

function getByVin(vin) {
  return db("cars").where("vin", vin).first();
}

async function create(car) {
  const [id] = await db("cars").insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
};