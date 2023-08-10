import axios from "axios";

const BASE_URL = "https://api.openverse.engineering/v1/images/";

// Hàm gọi API và lấy hình ảnh có giấy phép "Use commercially"
export const getCommercialImages = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&license_type=commercial`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
};
