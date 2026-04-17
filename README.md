# WebAPI Assignment 5 React

**Author:** Elijah Heimsoth
**Class:** CSCI 3916 Web API
**Date:** 04/17/26

## Description

Single Page Application that consumes the HW5 Movies + Reviews API. Users sign up, log in, browse a carousel of movies sorted by aggregated rating, view a movie detail page with poster image, cast, avg rating, and reviews, and submit new reviews inline. Bootstrapped with Create React App and built on the HW3 React starter.

New in HW5:

- **Poster images** - movies now render with an `imageUrl` from the API.
- **Aggregated `avgRating`** - displayed in the movie list and detail views, formatted to one decimal.
- **Inline review submission** - new `ReviewForm` component on the movie detail page. Dispatches a thunk that POSTs to `/reviews` and re-fetches the movie on success so the reviews grid and `avgRating` update automatically.
- **Defensive rendering** - carousel handles empty movie state without crashing; detail page is null-safe against the window between `SET_MOVIE` and the detail fetch completing.

**API companion repo:** [WebAPI-HW5](https://github.com/heimsothe/WebAPI-HW5)

## Installation

```bash
git clone https://github.com/heimsothe/WebAPI-HW5-React.git
cd WebAPI-HW5-React
yarn install
```

## Usage

Start the dev server:

```bash
yarn start
```

Build for production:

```bash
yarn build
```

The dev server runs at [http://localhost:3000](http://localhost:3000). The companion API must be running at the URL in `.env.development` (defaults to `http://localhost:8080`).

## Environment Variables


| Variable            | Loaded by          | Default / Production Value                        |
| ------------------- | ------------------ | ------------------------------------------------- |
| `REACT_APP_API_URL` | `yarn start` (dev) | `http://localhost:8080` (from `.env.development`) |


## Deployed URLs

- **React App:** [https://webapi-hw5-react-heimsoth.onrender.com](https://webapi-hw5-react-heimsoth.onrender.com)
- **API:** [https://webapi-hw5-heimsoth.onrender.com](https://webapi-hw5-heimsoth.onrender.com)

## Component Overview


| Component                  | Responsibility                                                             |
| -------------------------- | -------------------------------------------------------------------------- |
| `authentication.js`        | HOC wrapping sign-in / register flow                                       |
| `login.js` / `register.js` | Auth forms that dispatch `submitLogin` / `submitRegistration` thunks       |
| `movieheader.js`           | Top nav bar - Movie List / Movie Detail / Logout links                     |
| `movielist.js`             | Carousel of movies sorted by `avgRating`; empty-state fallback             |
| `movie.js`                 | Route wrapper that extracts `movieId` and renders `MovieDetail`            |
| `moviedetail.js`           | Poster, title (year), actors, avg rating, reviews grid, and `<ReviewForm>` |
| `reviewForm.js` (new)      | Inline controlled form; dispatches `submitReview` thunk                    |


## Redux Layer


| File                       | Responsibility                                                            |
| -------------------------- | ------------------------------------------------------------------------- |
| `actions/authActions.js`   | `submitLogin`, `submitRegistration`, `logout` - store JWT in localStorage |
| `actions/movieActions.js`  | `fetchMovies`, `fetchMovie`, `setMovie`, `submitReview` - all JWT-authed  |
| `reducers/authReducer.js`  | Tracks `isAuthenticated` flag                                             |
| `reducers/movieReducer.js` | Tracks `movies` list and `selectedMovie`                                  |
| `stores/store.js`          | Redux Toolkit store with thunk + logger middleware                        |


