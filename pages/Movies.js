import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/Cards/MovieCards/MovieCard";
import { theme } from "../styles/defaultTheme";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMovieSearchTermState } from "../redux/movieSlice";
import Image from "next/image";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const searchTermState = useSelector(selectMovieSearchTermState);

  const leftArrowIcon = require("../components/Icons/leftArrowIcon.png");
  const rightArrowIcon = require("../components/Icons/rightArrowIcon.png");

  const getMovies = useCallback(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageCount}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [pageCount]);

  const movieSearch = useCallback((searchQuery) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setSearchedMovies(json.results);
      })
      .catch((err) => console.error("error:" + err));
  });

  useEffect(() => {
    if (searchTermState) {
      movieSearch(searchTermState);
      setPageCount(1);
    } else {
      setSearchedMovies([]);
    }
    getMovies();
  }, [searchTermState, pageCount]);

  console.log("Check the main ci");

  return (
    <Container>
      <HeaderContainer>
        <H1>Movies</H1>
      </HeaderContainer>
      <Grid container>
        {searchedMovies?.length !== 0
          ? searchedMovies?.map((movie) => (
              <Grid item xs={12} sm={4} md={2} padding="1rem" key={movie.id}>
                <MovieCard id={movie.id} />
              </Grid>
            ))
          : movies?.map((movie) => (
              <Grid item xs={12} sm={4} md={2} padding="1rem" key={movie.id}>
                <MovieCard id={movie.id} />
              </Grid>
            ))}
      </Grid>
      {searchedMovies?.length === 0 ? (
        <PageCounterContainer>
          <PageCountItem
            onClick={() =>
              pageCount !== 1 ? setPageCount(pageCount - 1) : setPageCount(1)
            }
          >
            <Image
              width={15}
              height={15}
              src={leftArrowIcon}
              alt="leftArrowIcon"
            />
          </PageCountItem>
          {pageCount !== 1 ? (
            <PageCountItem
              onClick={() => {
                setPageCount(pageCount - 1);
              }}
            >
              <text>{pageCount - 1}</text>
            </PageCountItem>
          ) : (
            <></>
          )}
          <PageCountItem
            selected={true}
            onClick={() => {
              setPageCount(pageCount);
            }}
          >
            <text>{pageCount}</text>
          </PageCountItem>
          <PageCountItem
            onClick={() => {
              setPageCount(pageCount + 1);
            }}
          >
            <text>{pageCount + 1}</text>
          </PageCountItem>
          <PageCountItem
            onClick={() => {
              setPageCount(pageCount + 2);
            }}
          >
            <text>{pageCount + 2}</text>
          </PageCountItem>
          <PageCountItem onClick={() => setPageCount(pageCount + 1)}>
            <Image
              width={15}
              height={15}
              src={rightArrowIcon}
              alt="rightArrowIcon"
            />
          </PageCountItem>
        </PageCounterContainer>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default Movies;

const Container = styled.div`
  width: 100%;
  padding: ${theme.spacings.px20} ${theme.spacings.px20} ${theme.spacings.px20}
    0px;
`;

const PageCounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${theme.spacings.px20};
  padding-bottom: ${theme.spacings.px20};
`;

const PageCountItem = styled.button`
  padding: ${theme.spacings.px10};
  background-color: ${(props) =>
    props.selected ? theme.colors.grey : theme.colors.grey2};
  border-radius: ${theme.spacings.px5};
  margin: ${theme.spacings.px5};
  border: 1px solid ${theme.colors.borderColor};
  min-width: 40px;
  &:hover {
    background-color: ${theme.colors.beige};
  }
`;

const H1 = styled.h1`
  text-align: center;
  position: relative;
  margin: 0;
  font-size: ${theme.fontSizes.px36};
  font-weight: ${theme.fontWeight.w700};
  color: ${theme.colors.greenDark};
  padding: 0 ${theme.spacings.px20};
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${theme.spacings.px20};
`;
