import PropTypes from 'prop-types';

import style from './MovieList.module.css'

import { MovieItem } from '../MovieItem/MovieItem';

export const MovieList = ({ movies }) => {
    return (
        <ul className={style.container}>
            {movies.map((movie) => (
                <li className={style.item} key={movie.id}>
                    <MovieItem movie={movie} />
                </li>
            ))}
        </ul>
    );
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
};