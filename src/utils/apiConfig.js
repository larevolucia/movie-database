export const apiEndpoint = "https://api.themoviedb.org/3";

export const getHeaders = () => {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_KEY}`
    }
  };
};
