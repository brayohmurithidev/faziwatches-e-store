import axios from "axios";

export const getCountries = async () => {
  try {
    const res = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/states",
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
