import React, { useState } from 'react';
import './App.css';


const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <span>Rating: {movie.rating}</span>
    </div>
  );
};

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

const Filter = ({ onTitleChange, onRatingChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by title"
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filter by rating"
        onChange={(e) => onRatingChange(e.target.value)}
      />
    </div>
  );
};

const MovieForm = ({ onMovieAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [rating, setRating] = useState('');

  const handleAddClick = () => {
    const newMovie = {
      title,
      description,
      posterURL,
      rating: Number(rating),
    };

    onMovieAdd(newMovie);

    setTitle('');
    setDescription('');
    setPosterURL('');
    setRating('');
  };

  return (
    <div className="movie-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Poster URL"
        value={posterURL}
        onChange={(e) => setPosterURL(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleAddClick}>Add Movie</button>
    </div>
  );
};

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleTitleFilterChange = (value) => {
    setTitleFilter(value);
    filterMovies(value, ratingFilter, movies);
  };

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
    filterMovies(titleFilter, value, movies);
  };

  const filterMovies = (title, rating, movies) => {
    const filtered = movies.filter((movie) => {
      const matchTitle = movie.title.toLowerCase().includes(title.toLowerCase());
      const matchRating = movie.rating >= Number(rating);
      return matchTitle && matchRating;
    });
    setFilteredMovies(filtered);
  };

  const handleAddMovie = (newMovie) => {
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    filterMovies(titleFilter, ratingFilter, updatedMovies);
  };


  const initialMovies = [
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      posterURL: 'https://example.com/inception-poster.jpg',
      rating: 8.8,
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      posterURL: 'https://example.com/shawshank-redemption-poster.jpg',
      rating: 9.3,
    },
  ];

  useState(() => {
    setMovies(initialMovies);
    setFilteredMovies(initialMovies);
  }, []);

  return (
    <div className="movie-app">
      <div className="content-overlay">
        <h1>My Movie App</h1>
        <Filter
          onTitleChange={handleTitleFilterChange}
          onRatingChange={handleRatingFilterChange}
        />
        <MovieForm onMovieAdd={handleAddMovie} />
        <MovieList movies={filteredMovies} />
      </div>
    </div>
  );
};

export default MovieApp;
