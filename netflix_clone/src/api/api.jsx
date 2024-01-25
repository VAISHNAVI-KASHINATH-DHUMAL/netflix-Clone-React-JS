//Importing npm package axios for api fetching
import axios from "axios";

//Movies API URL and API-Key
const URL = "https://api.themoviedb.org/3";
const API_KEY = "44ed27f2e9c3ca375964589aee7f96da";

//API-Key ends with movies option
const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export const fetchData = (param) => {
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`)
}