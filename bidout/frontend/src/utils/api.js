import axios from 'axios';

export const getRandomPhoto = async (query) => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }&query=${query}`,
      {
        withCredentials: false,
      }
    );
    return res.data.urls.full;
  } catch (error) {
    console.error(error);
  }
};
