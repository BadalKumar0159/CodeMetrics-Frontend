import axios from "axios";
const link = import.meta.env.VITE_BACKEND_LINK;
const login = async (email, password) => {
    try {
        const body = { email, password };
        const response = await axios.post(`${link}/api/auth/login`, body);

        return { success: true, message: response.data.message, name: response.data.name, handle: response.data.handle };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
};

const register = async (email, password, name, handle) => {
    try {
        const body = { email, password, name, handle };
        const response = await axios.post(`${link}/api/auth/register`, body);

        return { success: true, message: response.data.message };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
};

const userid = async (email) => {
    try {
        const response = await axios.get(`${link}/api/auth/userid?email=${email}`);

        return { success: true, userid: response.data.userid };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
};



export { login, register, userid };