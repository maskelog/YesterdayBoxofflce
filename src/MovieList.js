import React from "react";

function MovieList({ boxOfficeMovies }) {
  return (
    <ul>
      {boxOfficeMovies.map((movie) => (
        <li key={movie.movieCd}>
          <div className="movie-poster">
            {movie.poster && <img src={movie.poster} alt={movie.movieNm} />}
            <span className="movie-rank">{movie.rank}</span>
          </div>
          <div className="movie-info">
            <h3>{movie.movieNm}</h3>
            <p>개봉일: {movie.openDt}</p>
            <p>누적관람객: {movie.audiAcc}명</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
