import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ph-assignment-11-server-murex.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
