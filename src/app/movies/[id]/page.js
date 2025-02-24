import { getMovieDetails } from "../../utils/api";
import Image from "next/image";

export default async function MoviePage({ params }) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="relative min-h-screen content-center">
      {/* Imagen de fondo con overlay oscuro */}
      {movie.backdrop_path && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-90 text-white p-8 rounded-lg shadow-lg">
          {/* Título */}
          <h1 className="text-4xl font-bold text-center mb-4">{movie.title}</h1>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Póster */}
            <div className="flex justify-center">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Información */}
            <div className="space-y-4">
              <p className="text-lg">{movie.overview}</p>

              <p>
                <strong>⭐ Puntuación:</strong> {movie.vote_average} ({movie.vote_count} votos)
              </p>

              <p>
                <strong>📅 Fecha de estreno:</strong> {movie.release_date}
              </p>

              <p>
                <strong>⏳ Duración:</strong> {movie.runtime} minutos
              </p>

              {movie.budget > 0 && (
                <p>
                  <strong>💰 Presupuesto:</strong> {`$${movie.budget.toLocaleString()}`}
                </p>
              )}

              {movie.revenue > 0 && (
                <p>
                  <strong>📈 Ingresos:</strong> {`$${movie.revenue.toLocaleString()}`}
                </p>
              )}

              {/* Géneros */}
              {movie.genres.length > 0 && (
                <p>
                  <strong>🎭 Géneros:</strong>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              )}

              {/* Países de producción */}
              {movie.production_countries.length > 0 && (
                <p>
                  <strong>🌍 Países de producción:</strong>{" "}
                  {movie.production_countries.map((country) => country.name).join(", ")}
                </p>
              )}

              {/* Idiomas hablados */}
              {movie.spoken_languages.length > 0 && (
                <p>
                  <strong>🗣️ Idiomas:</strong>{" "}
                  {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                </p>
              )}

              {/* Productoras */}
              {movie.production_companies.length > 0 && (
                <div>
                  <strong>🏢 Productoras:</strong>
                  <ul className="list-disc ml-6 mt-2">
                    {movie.production_companies.map((company) => (
                      <li key={company.id}>
                        {company.name} ({company.origin_country})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}