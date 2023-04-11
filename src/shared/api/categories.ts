import urls from "../constants/urls";
import api from "./apis";

export const GetCategory = async () => {
    const response = await api.get(urls.CATEGORIES);
    return response.data;
}

export const GetCategorybyId = async (id: any) => {
    const response = await api.get(urls.CATEGORIES + `/${id}`);
    return response.data;
}
export const createCategory = (data: any) => api.post(urls.CATEGORIES, data, { withCredentials: true })

export const UpdateCategory = (data: any, id: any) => api.put(urls.CATEGORIES + `/${id}`, data, { withCredentials: true })

export const deleteCategory = (id: any) => api.delete(urls.CATEGORIES + `/${id}`, { withCredentials: true })