import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
interface Movie {
  id: number
  title: string,
  year: number,
  poster: string,
  runtime: string,
  director: string,
  actors: string,
  released: string,
  genre: string,
  writer: string,
  language: string,
  imdbRating: string
}
interface MovieApiResponse {
  data: Movie,
}
export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    console.log("Fetching movie with ID:", id); // 🔍 Log the id

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://fooapi.com/api/movies/${id}`
        );
        const data: MovieApiResponse = await res.json();
        setMovie(data.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading movie...</p>;
  if (!movie?.title) return <p style={{ padding: '2rem' }}>Movie not found.</p>;

  return (
    <div className='movieDetail-container' style={{ padding: '2rem' }}>
      <div className='movie-titlePart'>
        <h1 style={{ fontFamily: 'fangsong' }}>{movie.title} ({movie.year})</h1>
        <p><strong>IMDb Rating:</strong> <FaStar style={{ color: 'gold', alignItems: 'center' }} />{movie.imdbRating}</p>
      </div>

      <div className='movieDetail-box'>
        <div className="movie-poster"> <img
          src={movie.poster}
          alt={movie.title}

        /></div>

        <div className="movie-details"> <p><strong>Released:</strong> {movie.released}</p><p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Writer:</strong> {movie.writer}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <Link href="/">
            <button style={{ marginTop: '2rem' }}>← All Movies</button>
          </Link>
        </div>

      </div>

    </div>
  );
}
