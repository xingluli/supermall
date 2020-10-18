<template>
  <div>
    <nav-bar class="nav">
      <img src="~assets/img/common/back.svg" slot="left" @click="navBack" />
      <div slot="center" class="nav-detail">
        <span
          v-for="(item, index) in detailNavTitles"
          :key="index"
          class="nav-detail-item"
          :class="{ 'nav-title-color': currentIndex === index }"
          @click="navItemClick(index)"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    detailNavTitles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {
    navItemClick(index) {
      this.currentIndex = index;
      this.$emit("navItemClick", index);
    },
    navBack() {
      this.$router.go(-1);
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.nav img {
  padding-top: 10px;
}
.nav-detail {
  display: flex;
  font-size: 13px;
}

.nav-detail-item {
  flex: 1;
}

.nav-title-color {
  color: var(--color-high-text);
}
</style>
