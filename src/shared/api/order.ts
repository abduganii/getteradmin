import urls from "../constants/urls";
import api from "./apis";

export const GetOrders = async () => {
    const response = await api.get(urls.ORDER);
    return response.data;
}

export const DeleteOrder = (id: any) => api.delete(urls.ORDER + `/${id}`, { withCredentials: true })