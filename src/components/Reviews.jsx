import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const API_KEY = '4eb4e6539dc3b8035d2876c8ff1613bb';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`)
      .then(response => {
        setReviews(response.data.results);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [movieId]);

  return (
    <div className={styles.reviewsContent}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
