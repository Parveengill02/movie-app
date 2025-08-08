import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdMovie } from 'react-icons/md';
interface MovieType{
  id:number,
  title:string,
  poster:string,
}
function Movies() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [query, setQuery] = useState<string>('');
     const [debouncedQuery,setDebouncedQuery]=useState('');//Debouunced Query
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
       'https://fooapi.com/api/movies'
      );
      const data = await res.json();
      console.log(data,"dfdfsdf");
      // console.log(data[0].id,"sbbdbwjh");
      // console.log(data[0].title,"title");

      setMovies(data.data);
    };
    fetchMovies();
  }, []);

 const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );


    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebouncedQuery(query);
        },500);

       return ()=>{
        clearTimeout(handler);
       };
    },[query])
  // Optional: filter by search query
//   const filteredMovies = movies.filter((movie) =>
//     movie.Title.toLowerCase().includes(query.toLowerCase())
//   );

  return (
    <div>
      <div className='Movie-container'>
        <div className='Movie-title'>
          <h1>
            <MdMovie
              style={{ fontSize: '2.5rem', verticalAlign: 'middle', color: 'white' }}
            />{' '}
            All Movies
          </h1>
        </div>

        <div className='Movie-search'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search the movie'
          />
        </div>
      </div>

      <div className='movies'>
        {filteredMovies.map((movie) => (
            <Link style={{color:'black',border:'none'}}href={`/movies/${movie.id}`} key={movie.id}>
          <div className='movie-items' key={movie.id}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: '180px', height: '280px', objectFit: 'cover',borderRadius:'8px' }}
            />
            <h3>{movie.title}</h3>
          </div>
          </Link>
        ))}
          {filteredMovies.map((movie) => (
          <div className='movie-items' key={movie.id}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: '180px', height: '280px', objectFit: 'cover',borderRadius:'8px' }}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
