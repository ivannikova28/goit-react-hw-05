import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";

import NotFound_image from '../../assets/not_found.jpg'

import style from './MovieReviews.module.css';

import { apiTMDBService } from '../../services';

import { Loader } from '../../components/Loader/Loader';

const MovieReviews = () => {
    const [reviewsList, setReviewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        const getMovieReviews = async () => {
            try {
                setLoading(true);
                const data = await apiTMDBService.movieReviews(movieId);
                setReviewsList(data.results);
            } catch (error) {
                toast.error("Whoops. Something went wrong! Please try reloading this page!");
            } finally {
                setLoading(false);
            }
        }
        getMovieReviews(movieId);
    }, [movieId]);

    // const defaultImg = NotFound_image;

    return (
        <main className='container'>
            {loading ? (
                <Loader />
            ) : !!reviewsList.length ? (
                <ul>
                    {reviewsList.map(({ author, content, id }) => (
                        <li key={id} className={style.item}>
                            <p className={style.name}><FaUserCircle className={style.icon} />{author}</p>
                            <p className={style.content}>{content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We do not have any reviews for this movie yet</p> // Повідомлення, якщо відгуки відсутні
            )}
        </main>
    );
}

export default MovieReviews