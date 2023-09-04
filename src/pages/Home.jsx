import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = '4eb4e6539dc3b8035d2876c8ff1613bb';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <div>
      <h1>Trending Movies Today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
                        <Link to={`/movies/${movie.id}`}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className={styles.movieImage}
                            />
                            <span className={styles.movieTitle}>{movie.title}</span>
                        </Link>
                    </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
