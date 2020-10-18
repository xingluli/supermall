<template>
  <div class="base" v-if="Object.keys(goodsDetail).length !== 0">
    <div class="base-title">{{ goodsDetail.title }}</div>
    <div class="base-price">
      <span class="base-price-n">{{ goodsDetail.price }}</span>
      <span class="base-price-o">{{ goodsDetail.oldPrice }}</span>
      <span class="base-price-discount">{{ goodsDetail.discount }}</span>
    </div>
    <div class="base-columns">
      <span>{{ goodsDetail.columns[0] }}</span>
      <span>{{ goodsDetail.columns[1] }}</span>
      <span>
        {{ goodsDetail.services[goodsDetail.services.length - 1].name }}
      </span>
    </div>
    <div class="base-services">
      <div
        v-for="n in goodsDetail.services.length - 1"
        :key="n"
        class="base-services-item"
      >
        <img :src="goodsDetail.services[n - 1].icon" />
        <span>{{ goodsDetail.services[n - 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsDetail: {
      style: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base {
  margin: 8px;
}

.base-title {
  font-size: 15px;
}
.base-price {
  margin-top: 10px;
}
.base-price-n {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-high-text);
}

.base-price-o {
  font-size: 10px;
  margin-left: 4px;
  text-decoration: line-through;
}

.base-price-discount {
  background-color: var(--color-high-text);
  font-size: 13px;
  color: #fff;
  border-radius: 7px;
  padding: 0 5px;
  position: relative;
  left: 4px;
  top: -8px;
}

.base-columns {
  margin-top: 18px;
  font-size: 12px;
  color: var(--color-text);
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  padding-bottom: 5px;
}

.base-services {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
}

.base-services-item img {
  width: 12px;
  height: 12px;
}

.base-services-item span {
  font-size: 12px;
}
</style>
