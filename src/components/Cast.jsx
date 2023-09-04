import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const API_KEY = '4eb4e6539dc3b8035d2876c8ff1613bb';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [movieId]);

  return (
    <div className={styles.castContent}>
      <h2 className={styles.title}>Cast</h2>
      <div className={styles.container}>
        {cast.map(actor => (
          <div key={actor.id} className={styles.actor}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
