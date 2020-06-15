module.exports = {
  getAllMovies: async (req, res) => {
    const db = req.app.get("db");
    const {rating, year} = req.query

    const movies = await db.movies.find();

    if(rating) {
      const filteredMovies = movies.filter.filter((movie) => {
        return movie.rating > +rating
      })
      res.status(200).send(filteredMovies);
    }else {
      res.status(200).send(movies)
    }

  },

  getMovieById: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const [movie] = await db.movies.find({ id });

    try {
      if (movie) {
        res.status(200).send(movie);
      } else {
        res.status(404).send("movie not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  },

  addMovie: async (req, res) => {
    const db = req.app.get("db");
    const { title, rating, year } = req.body;

    const newMovie = await db.movies.insert({ title, rating, year });
    res.status(200).send(newMovie);
  },

  deleteMovie: async(req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    await db.movies.destroy({ id })
    res.status(200).send('Deleted Movie')
  },
};
