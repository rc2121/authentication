import axios from 'axios'

const baseUrl = 'http://localhost:3002/'

export const signin = async (payload) => {
    try {
        const data = await axios.post(`${baseUrl}api/sign-in`, payload);
        if(data.status === 200) {
            localStorage.setItem('id', data.data.id)
        }
        return data.status;
    } catch (error) {
        console.log("Error while signin", error);
    }
}

export const signup = async (payload) => {
    try {
        const data = await axios.post(`${baseUrl}api/sign-up`, payload);
        if(data.status === 201) {
            localStorage.setItem('id', data.data.id)
        }
        return data.status;
    } catch (error) {
        console.log("Error while signin", error);
    }
}

export const getAllUsers = async(id) => {
    try {
        const data = await axios.get(`${baseUrl}api/user/${id}`);
        return data.data;
    } catch (error) {
        console.log("Error while fetching users", error);
    }
}

export const deleteUser = async(id) => {
    try {
        const data = await axios.delete(`${baseUrl}api/user/delete/${id}`);
        return data.data;
    } catch (error) {
        console.log("Error while deleting user", error);
    }
}

export const addUser = async (payload) => {
    const superId = localStorage.getItem('id')
    try {
        const data = await axios.post(`${baseUrl}api/user/create`, {...payload, super_user_id: superId });
        return data.status;
    } catch (error) {
        console.log("Error while signin", error);
    }
}

export const getSpecificUser = async (id) => {
    try {
        const data = await axios.get(`${baseUrl}api/user/get/${id}`);
        return data.data;
    } catch (error) {
        console.log("Error while fetching users", error);
    }
}

export const updateUser = async (id, payload) => {
    try {
        const data = await axios.put(`${baseUrl}api/user/update/${id}`, payload);
        return data.status;
    } catch (error) {
        console.log("Error while fetching users", error);
    }
}