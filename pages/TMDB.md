---
title: "TMDB - The Movie DB"
layout: default
---

# Testing Access

```sh
source ~/.tmdb
curl 'https://api.themoviedb.org/3/search/movie?query=Batman&api_key='"$TMDB_KEY"
```

# Links

- [Homepage](https://themoviedb.org)
- [Getting Started](https://developer.themoviedb.org/docs/getting-started)
- [Authentication](https://developer.themoviedb.org/docs/authentication-application)
- [Search & Query](https://developer.themoviedb.org/docs/search-and-query-for-details)
  - [API Details](https://developer.themoviedb.org/reference/search-movie)