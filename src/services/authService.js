// services/authService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        const { token, user } = response.data;

        if (token && user) {
            return { success: true, user, token };
        }

        return { success: false, message: response.data.message || "Invalid credentials" };
    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Login failed",
        };
    }
};
