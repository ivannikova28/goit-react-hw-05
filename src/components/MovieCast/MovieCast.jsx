import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import NotFound_image from '../../assets/not_found.jpg'

import style from './MovieCast.module.css';

import { apiTMDBService } from '../../services';

import { Loader } from '../../components/Loader/Loader';

export default function MovieCast() {
    const [loading, setLoading] = useState(false);
    const [castList, setCastList] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const getMovieCast = async () => {
            try {
                setLoading(true);
                const data = await apiTMDBService.movieCast(movieId);
                setCastList(data.cast);
            } catch (error) {
                toast.error("Whoops. Something went wrong! Please try reloading this page!");
            } finally {
                setLoading(false);
            }
        };

        getMovieCast();
    }, [movieId]);

    const defaultImg = NotFound_image;

    return (
        <ul className={style["cast-list"]}>
            {loading ? (
                <Loader />
            ) : castList.length > 0 ? (
                castList.map(({ id, name, profile_path, character }) => (
                    <li key={id} className={style["list-item"]}>
                        <div className={style["img-container"]}>
                            <img
                                src={
                                    profile_path
                                        ? `https://image.tmdb.org/t/p/w200${profile_path}`
                                        : defaultImg
                                }
                                alt={name}
                                loading="lazy"
                                width='120'
                            />
                        </div>
                        <h3 className={style.name}>{name}</h3>
                        <p className={style.character}> Character: {character}</p>
                    </li>
                ))
            ) : (
                <p>Sorry, there isn't any info :(</p>
            )}
        </ul>
    );
}