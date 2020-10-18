<template>
  <div class="detail">
    <detail-nav-bar
      :detailNavTitles="navTitles"
      class="detail-nav"
      @navItemClick="navItemClick"
      ref="detailNavRef"
    ></detail-nav-bar>
    <scroll
      class="detail-scroll"
      ref="scrollRef"
      :probeType="3"
      @scroll="detailScroll"
    >
      <detail-swiper :swiperData="swiperData"></detail-swiper>
      <detail-base-info :goodsDetail="goodsDetail"></detail-base-info>
      <detail-shop-info :shopDetail="shopDetail"></detail-shop-info>
      <detail-goods-info
        :moreShopDetail="moreShopDetail"
        @imageLoad="imageLoad"
      >
      </detail-goods-info>
      <detail-param-info
        :paramDetail="paramDetail"
        ref="detailParamRef"
      ></detail-param-info>
      <detail-comment-info
        :commentDetail="commentDetail"
        ref="detailCommentRef"
      ></detail-comment-info>
      <div class="recommendTitle" ref="detailRecommendRef">看了又看</div>
      <goods-list :goods="recommendData"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top v-show="isShow" @click.native="backTop"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailSwiper from "./childConponents/DetailSwiper";
import DetailNavBar from "./childConponents/DetailNavBar";
import DetailBaseInfo from "./childConponents/DetailBaseInfo";
import DetailShopInfo from "./childConponents/DetailShopInfo";
import DetailGoodsInfo from "./childConponents/DetailGoodsInfo";
import DetailParamInfo from "./childConponents/DetailParamInfo";
import DetailCommentInfo from "./childConponents/DetailCommentInfo";
import DetailBottomBar from "./childConponents/DetailBottomBar";

import {
  getDetail,
  GoodsDetail,
  ShopDetail,
  ParamDetail,
  getRecommend
} from "network/detail";

import { itemImageMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      navTitles: ["商品", "参数", "评论", "推荐"],
      iid: null,
      swiperData: [],
      goodsDetail: {},
      shopDetail: {},
      moreShopDetail: {},
      paramDetail: {},
      commentDetail: {},
      recommendData: [],
      navTransformY: [0],
      currentNavIndex: 0
    };
  },
  mixins: [itemImageMixin, backTopMixin],
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  created() {
    this.iid = this.$route.query.iid;
    this.getDetail();
    this.getRecommend();
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.refreshFunc);
  },
  methods: {
    // 获取详情页数据
    getDetail() {
      getDetail(this.iid).then(res => {
        const result = res.result;
        this.swiperData = result.itemInfo.topImages;
        // 获取商品简略信息
        this.goodsDetail = new GoodsDetail(
          result.columns,
          result.shopInfo.services,
          result.itemInfo
        );
        // 获取店铺信息
        this.shopDetail = new ShopDetail(result.shopInfo);

        // 获取商品详情信息
        this.moreShopDetail = result.detailInfo;

        // 获取商品参数
        this.paramDetail = new ParamDetail(
          result.itemParams.info,
          result.itemParams.rule
        );
        // 获取评论信息
        if (result.rate.cRate != 0) {
          this.commentDetail = result.rate.list[0] || {};
        }
      });
    },
    getRecommend() {
      getRecommend().then(res => {
        this.recommendData = res.data.list;
      });
    },
    imageLoad() {
      this.$refs.scrollRef.refresh();
      this.navTransformY.push(this.$refs.detailParamRef.$el.offsetTop - 44);
      this.navTransformY.push(this.$refs.detailCommentRef.$el.offsetTop - 44);
      this.navTransformY.push(this.$refs.detailRecommendRef.offsetTop - 50);
      this.navTransformY.push(Number.MAX_VALUE);
    },
    navItemClick(index) {
      this.$refs.scrollRef.scrollTo(0, -this.navTransformY[index], 200);
    },
    detailScroll(position) {
      for (let i = 0; i < this.navTransformY.length - 1; i++) {
        if (
          this.currentNavIndex !== i &&
          this.navTransformY[i] <= -position.y &&
          -position.y < this.navTransformY[i + 1]
        ) {
          this.currentNavIndex = i;
          this.$refs.detailNavRef.currentIndex = i;
        }
      }
      this.isShow = -position.y > 1000;
    }
    // backTop() {
    //   this.$refs.scrollRef.scrollTo(0, 0, 300);
    // }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-scroll {
  height: calc(100% - 44px - 49px);
  /* calc计算方法中-号两边有空格，否则不生效 */
  overflow: hidden;
}

.recommendTitle {
  margin: 15px 25px;
  padding-left: 20px;
  border-left: 3px solid var(--color-high-text);
  font-size: 15px;
}
</style>
