import urls from "../constants/urls";

import api from "./apis"

export const GetWebSite = async (isActive: any) => {
    const response = await api.get(urls.WEBSITE + `?isActive=${isActive}`);
    return response.data;
}

export const GetWebSitebyid = async (id: any) => {
    const response = await api.get(urls.WEBSITE + `/${id}`);
    return response.data;
}

export const createWebSite = (data: any) => api.post(urls.WEBSITE, data, { withCredentials: true })

export const UpdateWebSite = (data: any, id: any) => api.patch(urls.WEBSITE + `/${id}`, data, { withCredentials: true })

export const IscheckedWebSite = (id: any, data: any) => api.patch(urls.WEBSITE + '/isActive' + `/${id}`, data, { withCredentials: true })

export const deleteWebsite = (id: any) => api.delete(urls.WEBSITE + `/${id}`, { withCredentials: true })