import request from "./request";
export function getDetail(iid) {
  return request({
    url: "/detail",
    method: "get",
    params: {
      iid
    }
  });
}

export class GoodsDetail {
  constructor(columns, services, itemInfo) {
    this.columns = columns;
    this.services = services;
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.price = itemInfo.price;
    this.desc = itemInfo.desc;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class ShopDetail {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class ParamDetail {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend() {
  return request({
    url: "/recommend",
    method: "get"
  }).catch(err => console.log(err));
}
