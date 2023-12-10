import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const film = async () => {
      try {
        const c = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=a05dbfd`);
        if (!c.ok) {
          throw new Error('Not found');
        }
        const data = await c.json();
        setMovie(data);
      } catch (error) {
         console.log('')
      }
    }; film();
  }, [id]);

  return (
    <div className="details">
      {Object.keys(movie).length > 0 ? (
        <>
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
          <img src={movie.Poster} alt='movie'/> 
          <a href={`https://www.imdb.com/title/${movie.imdbID}`} >
            IMDb Link
          </a>
        </>
      ) : (<p></p>)
      }
    </div>
  );
};

export default MovieDetails;