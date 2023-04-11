import urls from "../constants/urls";
import api from "./apis";

export const GetArticles = async (isActive: any) => {
    const response = await api.get(urls.ARTICLE + `?isActive=${isActive}`);
    return response.data;
}

export const GetArticlesbyid = async (id: any) => {
    const response = await api.get(urls.ARTICLE + `/${id}`);
    return response.data;
}
export const createArticles = (data: any) => api.post(urls.ARTICLE, data, { withCredentials: true })

export const UpdateArticles = (data: any, id: any) => api.patch(urls.ARTICLE + `/${id}`, data, { withCredentials: true })

export const IscheckedArticles = (id: any, data: any) => api.patch(urls.ARTICLE + '/isActive' + `/${id}`, data, { withCredentials: true })

export const deleteArticles = (id: any) => api.delete(urls.ARTICLE + `/${id}`, { withCredentials: true })