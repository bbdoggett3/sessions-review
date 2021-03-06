require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const setup = require("./controllers/setup");
const authCtrl = require("./controllers/authController");
const carCtrl = require("./controllers/carController");
const movieCtrl = require("./controllers/moviesController");
const session = require("express-session");
const authMiddleware = require('../middlewares/authMiddleware');
const { USER, ADMIN } = require("../constants/ROLES");


app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 31 }
  })
);

/**
 * ! MASSIVE AND QUERIES TODOS
 * TODO: Set up heroku db/.env
 * TODO: Set up massive connection
 * TODO: Build controllers
 * TODO: - Cars controller(db folder/object syntax)
 * TODO: - Movies controller(inline)
 * TODO: Set up queries
 * TODO: - Filter cars by make, model, year, color
 * TODO: - Filter movies by year, rating
 */

/**
 * ! SESSION & MIDDLEWARE TODOS
 * TODO: Set up session
 * TODO: - Modify auth functions to use session
 * TODO: Build useful middleware
 * TODO: - Auth middleware
 * TODO: - User specific information
 * TODO: - User tracking
 */

//* Movie Endpoints
app.get("/api/movies", authMiddleware([USER, ADMIN]), movieCtrl.getAllMovies);
app.get("/api/movies/:id", movieCtrl.getMovieById);
app.post("/api/movies", movieCtrl.addMovie);
app.delete("/api/movies/:id", movieCtrl.deleteMovie);

//* Car endpoints

app.get("/api/cars", carCtrl.getAllCars);
app.get("/api/cars/:id", carCtrl.getCarById);
app.post("/api/cars", carCtrl.addCar);
app.delete("/api/cars/:id", carCtrl.deleteCar);

//* Auth endpoints
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.delete("/auth/logout", authCtrl.logout);

//! Seeding endpoint.  Keep at bottom.
app.post("/api", setup.seed);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log("Database is connected-You rock Ben!");
    app.listen(SERVER_PORT, () =>
      console.log(`Listening on port ${SERVER_PORT}`)
    );
  })
  .catch((error) => console.log(error));
