import urls from "../constants/urls";
import api from "./apis";

export const GetUser = async () => {
    const response = await api.get(urls.USERS, { withCredentials: true });
    return response.data;
}

export const DeleteUser = (id: any) => api.delete(urls.USERS + `/${id}`, { withCredentials: true })