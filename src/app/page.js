"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMovies } from "./utils/api.js";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const data = await getMovies(page);
      setMovies(data.results);
      setTotalPages(data.totalPages);
      setLoading(false);
    }
    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/?page=${newPage}`, { scroll: false });

    setTimeout(() => {
      window.scrollTo({
        top: 50,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Películas Populares
      </h1>

      <div className="h-full min-h-[100vh]">
        {loading ? (
          <p className="text-center text-gray-500">Cargando películas...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-gray-900 text-white p-4 rounded-lg"
                  >
                    <Link href={`/movies/${movie.id}`} className="block">
                      <div className="w-full bg-gray-700 flex items-center justify-center">
                        {movie.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-300">
                            Imagen no disponible
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-center font-semibold">
                        {movie.title}
                      </h2>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No se encontraron películas.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Botones de paginación */}
      { totalPages && 
        <div className="flex justify-center mt-6 space-x-4 sticky bottom-4 left-0 right-0">
          <div className=" bg-cyan-950 p-4 rounded-lg">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              Anterior
            </button>

            <span className="text-white px-4 py-2">
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded ${
                page >= totalPages
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      }
    </div>
  );
}
