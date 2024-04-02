// import axios from "axios";

// const apiBaseUrl = "https://carbonfootprint1.p.rapidapi.com";
// const rapidApiKey = "8645d75245msh17a75789c2c2b54p134494jsn00e9f5c229c0";

// const makeApiCall = async (factor, params) => {
//   const url = `${apiBaseUrl}/${factor}`;

//   const options = {
//     method: "GET",
//     url,
//     params,
//     headers: {
//       "X-RapidAPI-Key": rapidApiKey,
//       "X-RapidAPI-Host": "carbonfootprint1.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error making API call:", error.message);
//     throw error;
//   }
// };

// export default makeApiCall;
