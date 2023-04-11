import urls from "../constants/urls";
import api from "./apis";

export const GetPortfolio = async () => {
    const response = await api.get(urls.PORTFOLIO);
    return response.data;
}

export const GetPortfoliobyid = async (id: any) => {
    const response = await api.get(urls.PORTFOLIO + `/${id}`);
    return response.data;
}
export const createProtfoio = (data: any) => api.post(urls.PORTFOLIO, data, { withCredentials: true })

export const UpdateProtfoio = (data: any, id: any) => api.patch(urls.PORTFOLIO + `/${id}`, data, { withCredentials: true })

export const deleteProtfoio = (id: any) => api.delete(urls.PORTFOLIO + `/${id}`, { withCredentials: true })