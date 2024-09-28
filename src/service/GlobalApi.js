import { default as axios } from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("/user-resumes", data);

const getUserResume = () => axiosClient.get("/user-resumes");

const updateUserResume = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

const getResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);

const deleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

const getOkStatus = () => axiosClient.get("/ok");

export default {
  createNewResume,
  getUserResume,
  updateUserResume,
  getResumeById,
  deleteResumeById,
  getOkStatus,
};
