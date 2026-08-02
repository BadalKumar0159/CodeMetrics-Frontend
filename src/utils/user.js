import axios from "axios";
const link = import.meta.env.VITE_BACKEND_LINK;
const add = async (userid,username)=>{
    try{
        const body={userid,username};
        const response=await axios.post(`${link}/api/user/add`, body);
        return { success: true, message: response.data.message };
    }catch(err){
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
}

const remove = async (userid,username)=>{
    try{
        const body={username,userid};
        const response=await axios.post(`${link}/api/user/remove`, body);
       
        return { success: true, message: response.data.message };
    }catch(err){
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
}

const fetchusernames = async (userid)=>{
    try{
        const response=await axios.get(`${link}/api/user/fetchusernames?userid=${userid}`);
       
        return { success: true, arr: response.data.data };
    }catch(err){
        return { success: false, message: err.response?.data?.message || "Server error" };
    }
}

export {add,remove,fetchusernames};