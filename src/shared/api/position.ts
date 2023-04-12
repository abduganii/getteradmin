import urls from "../constants/urls";
import api from "./apis";

export const GetPosition = async () => {
    const response = await api.get(urls.POSITION);
    return response.data;
}

export const GetPositionbyId = async (id: any) => {
    const response = await api.get(urls.POSITION + `/${id}`);
    return response.data;
}
export const createPosition = (data: any) => api.post(urls.POSITION, data, { withCredentials: true })

export const UpdatePosition = (data: any, id: any) => api.put(urls.POSITION + `/${id}`, data, { withCredentials: true })

export const deletePosition = (id: any) => api.delete(urls.POSITION + `/${id}`, { withCredentials: true })