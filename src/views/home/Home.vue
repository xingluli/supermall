<template>
  <div id="home">
    <nav-bar class="home-navbar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="home-tab-control-top"
      @itemClick="tabClick"
      ref="tabConrtolRefTop"
      v-show="isTabControlShow"
    />
    <scroll
      class="home-scroll"
      ref="scrollRef"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="getScroll"
      @pullingUp="getPullingUp"
    >
      <home-swiper
        :banners="banners"
        @swiperLoad="homeSwiperLoad"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-popular></home-popular>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="home-tab-control"
        @itemClick="tabClick"
        ref="tabConrtolRef"
      />
      <goods-list :goods="goodsCurrentType" />
    </scroll>
    <back-top v-show="isShow" @click.native="backTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import HomePopular from "./childComponents/HomePopular";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemImageMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      goodsKeys: ["pop", "new", "sell"],
      currentType: "pop",
      isTabControlShow: false,
      tabControlHeight: 0,
      homeLeaveY: 0
    };
  },
  mixins: [itemImageMixin, backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  activated() {
    this.$refs.scrollRef.refresh();
    this.$refs.scrollRef.scrollTo(0, this.homeLeaveY, 0);
  },
  deactivated() {
    this.homeLeaveY = this.$refs.scrollRef.getLeaveY();
    this.$bus.$off("itemImageLoad", this.refreshFunc);
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      this.goods[type].page += 1;
      getHomeGoods(type, this.goods[type].page).then(res => {
        this.goods[type].list.push(...res.data.list);
      });
    },
    tabClick(index) {
      this.currentType = this.goodsKeys[index];
      this.$refs.tabConrtolRef.currentIndex = index;
      this.$refs.tabConrtolRefTop.currentIndex = index;
    },
    getScroll(position) {
      this.isShow = -position.y > 1000;
      this.isTabControlShow = -position.y > this.tabControlHeight;
    },
    // backTop() {
    //   this.$refs.scrollRef.scrollTo(0, 0);
    // },
    getPullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scrollRef.finishPullUp();
    },
    homeSwiperLoad() {
      this.tabControlHeight = this.$refs.tabConrtolRef.$el.offsetTop;
    }
  },
  computed: {
    goodsCurrentType() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
.home-navbar {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}

#home {
  position: relative;
  height: 100vh;
}

.home-scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.home-tab-control-top {
  position: relative;
  z-index: 9;
}
</style>
