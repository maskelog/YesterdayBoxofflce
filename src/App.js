import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MovieList from "./MovieList";

const cleanKMDbTitle = (title) => {
  // <!HS>와 <!HE> 특수 태그를 제거
  title = title.replace(/<!HS>|<!HE>/g, "");
  // !HS와 !HE 제거
  title = title.replace(/\!HS|\!HE/g, "");
  // 앞뒤 공백 제거
  title = title.replace(/^\s+|\s+$/g, "");
  // 여러 개의 공백을 하나로 줄임
  title = title.replace(/ +/g, " ");
  return title;
};

const formatDate = (date) => {
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
};

function App() {
  const [boxOffice, setBoxOffice] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [showRange, setShowRange] = useState("");

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = formatDate(yesterday);
    fetchBoxOfficeData(formattedDate);
    setShowRange(formattedDate);
  }, []);

  const handleSearch = () => {
    fetchBoxOfficeData(searchDate);
    setShowRange(searchDate);
  };

  const fetchMoviePosters = async (movies, KOREAFILM_API_KEY) => {
    return await Promise.all(
      movies.map(async (movie) => {
        const releaseDate = movie.openDt.replace(/-/g, "");
        const QUERY_URL = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${KOREAFILM_API_KEY}&detail=Y&query=${encodeURIComponent(
          movie.movieNm
        )}&releaseDts=${releaseDate}`;

        try {
          const posterResponse = await axios.get(QUERY_URL);
          const data = posterResponse.data?.Data?.[0];
          const matchingMovies = data?.Result?.filter((resultMovie) => {
            const isTitleMatch =
              cleanKMDbTitle(resultMovie.title) ===
              cleanKMDbTitle(movie.movieNm);
            const isYearMatch =
              Math.abs(
                Number(resultMovie.prodYear) -
                  Number(movie.openDt.substring(0, 4))
              ) <= 1; // 개봉년도와 발매년도가 1년 이내 차이나는 경우에도 포함

            return isTitleMatch && isYearMatch;
          });

          if (matchingMovies && matchingMovies.length > 0) {
            // posters 문자열에서 <![CDATA[ ... ]]> 태그 제거
            const postersData = matchingMovies[0]?.posters.replace(
              /<!\[CDATA\[|\]\]>/g,
              ""
            );
            // '|' 문자를 기준으로 URL 분할
            const postersUrls = postersData.split("|");
            // 첫 번째 URL을 사용 (추가적인 로직이 필요한 경우 이 부분을 수정)
            const posterURL = postersUrls.length > 0 ? postersUrls[0] : null;
            return { ...movie, poster: posterURL };
          } else {
            console.log(`Poster not found for movie: ${movie.movieNm}`);
            return { ...movie, poster: null };
          }
        } catch (error) {
          console.error(
            `Error fetching poster for movie: ${movie.movieNm}`,
            error
          );
          return { ...movie, poster: null };
        }
      })
    );
  };

  const fetchBoxOfficeData = async (date) => {
    const formattedDate = date.split("-").join("");

    const KOBIS_API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
    const KOREAFILM_API_KEY = process.env.REACT_APP_KOREAFILM_API_KEY;

    const KOBIS_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${formattedDate}`;

    try {
      const response = await axios.get(KOBIS_URL);
      const movies = response.data?.boxOfficeResult?.dailyBoxOfficeList || [];
      const moviePosters = await fetchMoviePosters(movies, KOREAFILM_API_KEY);
      setBoxOffice(moviePosters);
    } catch (error) {
      console.error("Error fetching box office data:", error);
    }
  };

  return (
    <div className="App">
      <h1>어제자 박스오피스 순위</h1>
      <div className="header-section">
        <h2>조회일자: {showRange}</h2>
        <div className="search-box">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <MovieList boxOfficeMovies={boxOffice} />
    </div>
  );
}

export default App;
