export const fetchGetRestaurants = async () => {
  const url = "http://192.168.0.16:8000/api/restaurants/";
  // const options = {
  //   method: "GET",
  //   // headers: {
  //   //   "x-rapidapi-key": "tu-api-key",
  //   //   "x-rapidapi-host": "imdb8.p.rapidapi.com",
  //   // },
  // };

  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }
    const result = await response.json();
    // return result.data.mainSearch.edges;

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

fetchGetRestaurants();
