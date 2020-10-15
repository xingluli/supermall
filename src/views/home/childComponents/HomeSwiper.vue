<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isEmit: true
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperLoad() {
      if (this.isEmit) {
        this.$emit("swiperLoad");
        this.isEmit = false;
      }
    }
  }
};
</script>

<style scoped></style>
