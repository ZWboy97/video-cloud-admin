import axios from 'axios';

//视频云后端接口
export const VCloudAPI = axios.create({
    baseURL: "http://114.116.180.115:9000/",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})