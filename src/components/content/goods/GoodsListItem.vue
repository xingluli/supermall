<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="imgSrc" alt="" @load="imageLoad" class="goodsImage" />
    <div class="goods-content">
      <p>{{ good.title }}</p>
      <span>￥</span>
      <span class="price">{{ good.price }}</span>
      <img src="~assets/img/common/collect.svg" alt="" />
      <span class="cfav">{{ good.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.good.iid
        }
      });
    }
  },
  computed: {
    imgSrc() {
      return this.good.image || this.good.show.img;
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  position: relative;
  width: 48%;
  font-size: 12px;
  padding-bottom: 32px;
}
.goods-content {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.goods-content img {
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: 2px;
}

.cfav {
  margin-left: 16px;
}
.goods-content p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.price {
  color: var(--color-high-text);
  margin: 0px 5px 0px 0px;
}

.goods-list-item .goodsImage {
  width: 100%;
  border-radius: 3%;
}
</style>
