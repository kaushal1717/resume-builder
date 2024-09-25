import api from "@/service/GlobalApi"; // Adjust the path accordingly

const logOkStatus = async () => {
  try {
    const response = await api.getOkStatus();
    console.log("OK Status Response:", response.data);
  } catch (error) {
    console.error("Error fetching OK status:", error);
  }
};

// Log every 10 seconds (10 * 1000 milliseconds)
setInterval(logOkStatus, 14 * 60 * 1000);
