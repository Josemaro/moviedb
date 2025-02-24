const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?language=es-ES&page=${page}`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });
  const data = await res.json();
  return {
    results: data.results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });
  return res.json();
}
