import { getMovieDetails } from "../../utils/api";

export default async function MoviePage({ params }) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p className="mt-4">{movie.overview}</p>
      <p><strong>⭐ Puntuación:</strong> {movie.vote_average}</p>
      <p><strong>📅 Fecha de estreno:</strong> {movie.release_date}</p>
    </div>
  );
}