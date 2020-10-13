<template>
  <div>
    <tabbar>
      <barItem path="/home">
        <img slot="imageActice" src="~assets/img/tabbar/home_active.svg" />
        <img slot="image" src="~assets/img/tabbar/home.svg" />
        <div slot="title">首页</div>
      </barItem>
      <barItem path="/category">
        <img slot="imageActice" src="~assets/img/tabbar/category_active.svg" />
        <img slot="image" src="~assets/img/tabbar/category.svg" />
        <div slot="title">分类</div>
      </barItem>
      <barItem path="/shopcart">
        <img slot="imageActice" src="~assets/img/tabbar/shopcart_active.svg" />
        <img slot="image" src="~assets/img/tabbar/shopcart.svg" />
        <div slot="title">购物车</div>
      </barItem>
      <barItem path="/profile">
        <img slot="imageActice" src="~assets/img/tabbar/profile_active.svg" />
        <img slot="image" src="~assets/img/tabbar/profile.svg" />
        <div slot="title">我的</div>
      </barItem>
    </tabbar>
  </div>
</template>

<script>
import tabbar from "components/common/tabBar/Tabbar.vue";
import barItem from "components/common/tabBar/Bar-item.vue";
export default {
  components: {
    tabbar,
    barItem
  }
};
</script>

<style></style>
