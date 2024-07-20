import axios from 'axios'


export function request(config:any) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3001',
        // baseURL: '/api',
        timeout: 5000,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
                // 'content-type': 'application/json'
        }
    })

    let token:any
    if (window.localStorage.getItem("token")) {
        token = window.localStorage.getItem("token")
    }

    
    //请求拦截的作用
    instance.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = token
        }
        return config
    }, err => {
        console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}