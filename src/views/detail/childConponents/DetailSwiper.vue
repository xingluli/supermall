<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in swiperData" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    swiperData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 40vh;
  overflow: hidden;
}
</style>
