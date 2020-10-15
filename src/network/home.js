import request from "network/request";
// 获取首页多个数据
export function getHomeMultidata() {
  return request({
    url: "/home/multidata",
    method: "get"
  });
}

// 获取首页商品的数据
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    method: "get",
    params: {
      type,
      page
    }
  });
}
