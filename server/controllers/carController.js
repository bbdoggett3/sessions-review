module.exports = {
  getAllCars: async (req, res) => {
    const db = req.app.get("db");

    try {
      const cars = await db.get_all_cars();
      res.status(200).send(cars);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getCarById: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    const car = await db.get_car_by_id([id]);

    if (car[0]) {
      res.status(200).send(car[0]);
    } else {
      res.status(404).send("Could not find a car");
    }
  },
  addCar: async (req, res) => {
    const db = req.app.get("db");
    const { make, model, year, miles, color } = req.body;

    const newCar = await db.create_car({ make, model, year, miles, color });
  },
  deleteCar: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    try {
      await db.delete_car([id]);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Could not delete car");
    }
  },
};
