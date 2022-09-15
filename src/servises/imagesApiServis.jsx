import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export default async function fetchImages(searchQuery, page) {
  const API_KEY = "27864525-ff71541033aed67fff3a2f597";
  const searchParams = "image_type=photo&orientation=horizontal&per_page=12";
  const response = await axios.get(`?q=${searchQuery}&page=${page}&key=${API_KEY}&${searchParams}`);
  return response.data;
};