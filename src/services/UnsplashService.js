import axios from 'axios';
const APP_ID = `b4080172c33dbb92ab4ef760f0f53c4972babb5e1cfff640297071a517fb4f94`;

const http = axios.create({
  baseURL: 'https://api.unsplash.com/photos'
});

const getProfilePhotos = () => http.get(`/?client_id=${APP_ID}`)

export default {
  getProfilePhotos
}