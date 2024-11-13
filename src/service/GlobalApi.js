import { default as axios } from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API;
const BASE_URL = "https://careerai-cms.onrender.com";

// Main axios client for JSON requests
const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Separate axios client for file uploads (multipart/form-data)
const uploadClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
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

// New methods for file handling and email
const uploadFile = async (formData) => {
  try {
    const response = await uploadClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await axiosClient.delete(`/upload/files/${fileId}`);
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

const sendEmail = async (emailData) => {
  try {
    const response = await axiosClient.post("/email", {
      data: {
        to: emailData.to,
        from: emailData.from, // Optional, will use SMTP_FROM if not provided
        subject: emailData.subject,
        html: emailData.html,
        attachments: emailData.attachments,
      },
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default {
  createNewResume,
  getUserResume,
  updateUserResume,
  getResumeById,
  deleteResumeById,
  getOkStatus,
  uploadFile,
  deleteFile,
  sendEmail,
};
