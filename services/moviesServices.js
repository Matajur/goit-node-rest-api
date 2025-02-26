import Movie from "../db/models/Movie.js";

export const getMovies = () => Movie.findAll();

export const getMovieById = (id) => Movie.findByPk(id);

export const removeMovie = (id) => Movie.destroy({ where: { id } });

export const addMovie = (data) => Movie.create(data);

export const updateMovieById = async (id, data) => {
  const movie = await getMovieById(id);
  if (!movie) return null;

  return movie.update(data, { returning: true });
};
