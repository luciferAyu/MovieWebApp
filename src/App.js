import { useState , useEffect } from 'react';
import MovieCard from './MovieCard'
import './App.css'
import SearchIcon from './search.svg'

//API Key : 52afc547

const API_URL = 'http://www.omdbapi.com?apikey=52afc547'

/*
    MOVIE OBJECT STRUCTUR
const movie = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}
*/
// const title = 'spiderman';

const App = ()=> {

    const [movies , setMovies] = useState([]);
    const [searchTerm , setSearchTerm] = useState('');

    const searchMovies = async (title)=>{
        const data = await fetch(`${API_URL}&s=${title}`)
                            .then((response) => response.json());
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('spiderman');

    },[]);

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie)=>(
                          <MovieCard movie={movie}/>))
                        }
                    </div>
                  ) :
                  (
                    <div className='empty'>
                        <h2>No movie found</h2>
                    </div>
                  )
            }
        </div>
    );
}

export default App;