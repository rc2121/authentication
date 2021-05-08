import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:3002/";

export const signin = async (payload) => {
  try {
    const res = await axios.post(`${baseUrl}api/sign-in`, payload);
    if (res.status === 200) {
      localStorage.setItem("id", res.data.id);
    }
    return res.status;
  } catch (error) {
    console.log("Error while signin", error);
    if (error.message === "Request failed with status code 401") {
      toast.error("Email or password is incorrect");
    }
  }
};

export const signup = async (payload) => {
  try {
    const res = await axios.post(`${baseUrl}api/sign-up`, payload);
    if (res.status === 201) {
      toast.success("You have successfully signedup");
      localStorage.setItem("id", res.data.id);
    }
    return res.status;
  } catch (error) {
    console.log("Error while signin", error);
  }
};

export const getAllUsers = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}api/user/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}api/user/delete/${id}`);
    if (res.data?.length > 0) {
      toast.success("User deleted successfully");
    } else {
      toast.warning("No user found");
    }
    return res.data;
  } catch (error) {
    console.log("Error while deleting user", error);
  }
};

export const addUser = async (payload) => {
  const superId = localStorage.getItem("id");
  try {
    const res = await axios.post(`${baseUrl}api/user/create`, {
      ...payload,
      super_user_id: superId,
    });
    if (res.data?.length > 0) {
      toast.success("User added successfully");
    } else {
      toast.warning("Error while adding the user");
    }
    return res.status;
  } catch (error) {
    console.log("Error while signin", error);
  }
};

export const getSpecificUser = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}api/user/get/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};

export const updateUser = async (id, payload) => {
  try {
    const res = await axios.put(`${baseUrl}api/user/update/${id}`, payload);
    if (res.data?.length > 0) {
      toast.success("User updated successfully");
    } else {
      toast.warning("Error while updating the user");
    }
    return res.status;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};
