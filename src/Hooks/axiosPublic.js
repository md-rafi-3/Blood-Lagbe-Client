import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://blood-lagbe-server-delta.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;