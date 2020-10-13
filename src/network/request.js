import axios from "axios";

export default function(options) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/w6",
    timeout: 5000
  });

  // 请求拦截器
  // instance.interceptors.request.use(
  //   req => {
  //     return req;
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
  // 相应拦截器
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  return instance(options);
}
