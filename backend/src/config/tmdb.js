import axios from "axios";

const tmdbAPI = axios.create({

    baseURL:
      process.env.TMDB_BASE_URL,

    headers: {

        Authorization:
          `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,

        accept: "application/json"

    }

});

export default tmdbAPI;