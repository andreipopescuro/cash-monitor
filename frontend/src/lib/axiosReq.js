import axios from "axios";
// const baseURL = "http://localhost:5000/api"; // dev
const baseURL = "https://cash-monitor-app.onrender.com/api"; //prod
export const axiosRequest = axios.create({
  baseURL,
});
