import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import toast from 'react-hot-toast';

import style from './MoviesPage.module.css';

import { apiTMDBService } from '../../services';

import {SearchBar} from '../../components/SearchBar/SearchBar';
import { Loader } from '../../components/Loader/Loader';
import {MovieList} from "../../components/MovieList/MovieList";


const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const movieName = searchParams.get('movie_name') ?? '';

    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!movieName) return;
        setMoviesList([]);
        setLoading(true);

        const getMovieSearch = async (movieName) => {
            try {
                const data = await apiTMDBService.searchMovie({query: movieName});
                if (!data.results.length) {
                    setError(true);
                    toast.error('There are no movies with this request. Please, try again');
                    return;
                }
                setMoviesList(data.results);
            } catch (error) {
                setError(true);
                console.log(error);
                toast.error("Whoops. Something went wrong! Please try reloading this page!");
            } finally {
                setLoading(false);
                setError(false);
            }
        };

        getMovieSearch(movieName);
    }, [movieName]);

    const handleSubmit = e => {
        e.preventDefault();
        const searchForm = e.currentTarget;
        const newMovieName = searchForm.elements.movie_name.value.trim();

        if (!newMovieName) {
            toast.error('Please enter a keyword!');
            return;
        }
        setSearchParams({ movie_name: newMovieName });
        searchForm.reset();
    }

    return (
        <div className={style.container}>
            <SearchBar onSubmit={handleSubmit} />
            {loading && <Loader />}
            {error && <p>There is no movies with this request. Please, try again</p>}
            <MovieList movies={moviesList} />
        </div>
    );
}

export default MoviesPage