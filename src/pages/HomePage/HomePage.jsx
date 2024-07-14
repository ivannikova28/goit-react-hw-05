import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import style from './HomePage.module.css'

import { apiTMDBService } from '../../services'

import { Loader } from '../../components/Loader/Loader'
import { MovieList } from '../../components/MovieList/MovieList'

const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getTrendMovies() {
            try {
                setLoading(true);

                const data = await apiTMDBService.moviesTrends();

                setTrendMovies(data.results);

                // setLoading(false);
            } catch (error) {
                toast.error("Whoops. Something went wrong! Please try reloading this page!");
            } finally {
                setLoading(false);
            }
        }

        getTrendMovies();

    }, [])

    return (
        <div className={style.container}>
            <h1 className={style.title}>Trending today</h1>
            {loading && <Loader />}
            <MovieList movies={trendMovies} />
        </div>
    );
}

export default HomePage