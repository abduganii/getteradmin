import urls from "../constants/urls";
import api from "./apis";

export const Loginuser = async (data: any,) =>
    api.post(urls.LOGIN, data, { withCredentials: true })