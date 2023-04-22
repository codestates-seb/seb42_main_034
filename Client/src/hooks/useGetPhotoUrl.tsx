import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "api/instance";
import { AxiosResponse } from "axios";


const config = {
    headers: {'Content-Type' : 'multipart/form-data'},
};

const useGetPhotoUrl = () => {
    return useMutation(
        (formData: FormData): Promise<AxiosResponse> => 
        axiosInstance.post(`/upload`, formData, config),
    );
};

export default useGetPhotoUrl;

