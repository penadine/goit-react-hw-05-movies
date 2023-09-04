import React, { useState, useEffect, Suspense } from "react";
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const API_KEY = '4eb4e6539dc3b8035d2876c8ff1613bb';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [movieId]);

    return (
        <div className={styles.container}>
            <Link to={`/movies?query=${sessionStorage.getItem('lastQuery') || ''}`}>Back to movies</Link>
            {movie && (
                <div className={styles.movieContent}>
                    <img className={styles.movieImage} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                    </div>
                </div>
            )}
            <div className={styles.additionalInfo}>
                <h2>Additional information</h2>
                <ul>
                    <li>
                        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                    </li>
                    <li>
                        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
                    </li>
                </ul>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export default MovieDetails;
