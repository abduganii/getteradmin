import axios from "axios";
export const FileUpload = async (data:any) => { 
    const response = await axios.post(`https://grm-upload.getter.uz/upload/image`, data, {
        headers: {
            'Content-Type': "multipart/form-data",
    }},);
    return response;
}

export const FileRemove = async (body:any) => { 
    const response = await axios.delete(`https://grm-upload.getter.uz/remove`,{data:body});
    return response;
}