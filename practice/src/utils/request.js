import axios from "axios";
import { Notification } from 'element-gui';

//二次封装axios
function request(options){
    return axios(options)
    .then(res=>{
        return res;
    })
    .catch(err=>{
        const {response: {status,statusText}} = err
        Notification.error({
            title: status,
            message: statusText
          });
        // return Promise.reject(err)
    });
}

export default request;