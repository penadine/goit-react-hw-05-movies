import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Movies.module.css';

const Movies = () => {
  const API_KEY = '4eb4e6539dc3b8035d2876c8ff1613bb';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState([]);
  const [inputQuery, setInputQuery] = useState(currentQuery);

  useEffect(() => {
    if (inputQuery) {
      axios
        .get(`${BASE_URL}/search/movie?query=${inputQuery}&api_key=${API_KEY}`)
        .then(response => {
          setMovies(response.data.results);
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  }, [inputQuery]);

  const updateQueryString = evt => {
    setInputQuery(evt.target.value);
  };
  const handleSearch = () => {
    const nextParams = inputQuery !== '' ? { query: inputQuery } : {};
    setSearchParams(nextParams);
  };
  const handleMovieClick = () => {
    sessionStorage.setItem('lastQuery', inputQuery);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={inputQuery}
          onChange={updateQueryString}
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link
              to={{ pathname: `/movies/${movie.id}` }}
              onClick={handleMovieClick}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
