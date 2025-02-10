import axios from "axios";

const instance = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com",
  headers: {
    "X-Rapidapi-Key": "9e0c04e969mshb36681e8556a045p1c0469jsn9074a9226f18",
    "X-Rapidapi-Host": "sky-scrapper.p.rapidapi.com",
  },
});

export const getAirportDetail = async (char) => {
  try {
    const response = await instance.get(
      `/api/v1/flights/searchAirport?query=${char}&locale=en-US`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const searchFlights = async (values) => {
    try {
       
        const originSkyId = (values.originId || "").trim();
const destinationSkyId = (values.destinationId || "").trim();
const originEntityId = (values.originEntityId || "").trim();
const destinationEntityId = (values.destinationEntityId || "").trim();
const departureDate = (values.departureDate || "").trim();
const cabinClass = (values.cabinClass || "").trim().toLowerCase();  // Convert to lowercase
const adults = values.adults || 1;
const childrens = values.childrens || 0;
const infants = values.infants || 0;



        const url = `/api/v2/flights/searchFlights?originSkyId=${encodeURIComponent(originSkyId)}&destinationSkyId=${encodeURIComponent(destinationSkyId)}&originEntityId=${encodeURIComponent(originEntityId)}&destinationEntityId=${encodeURIComponent(destinationEntityId)}&date=${encodeURIComponent(departureDate)}&cabinClass=${encodeURIComponent(cabinClass)}&adults=${adults}&childrens=${childrens}&infants=${infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`;
        
  
      if (values.returnDate) {
        url += `&returnDate=${values.returnDate}`;
      }
  
      console.log(url)
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
  };
