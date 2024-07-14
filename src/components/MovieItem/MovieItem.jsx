import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";

import Not_Found_img from '../../assets/not_found.jpg'


import style from './MovieItem.module.css';

export const MovieItem = ({ movie }) => {
    const location = useLocation();

    const navigate = useNavigate()

    const { id, poster_path, title } = movie;
    const defaultImg = Not_Found_img;

    const handlerTo = () => {
        navigate(`/movies/${id}`, {
            state: location
        })
    }

    return (
        <div>
            <div onClick={handlerTo} className={style.container}>
                <img
                    className={style.image}
                    src={poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : defaultImg}
                    alt={title}
                />
            </div>
        </div>
    );
}

MovieItem.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string.isRequired,
    }).isRequired,
};