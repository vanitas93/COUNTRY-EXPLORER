import axios from "axios";

export const fetchAllData = async () => {
  const allInfo = await axios("https://restcountries.com/v3.1/all");
  return allInfo;
};
export const fetchDataName = async (name) => {
  const nameInfo = await axios(`https://restcountries.com/v3.1/name/${name}`);
  return nameInfo;
};
