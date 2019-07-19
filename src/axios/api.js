import axios from 'axios';

//视频云后端接口
export const VCloudAPI = axios.create({
    baseURL: '',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})