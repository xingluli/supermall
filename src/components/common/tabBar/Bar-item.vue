<template>
  <div class="root" @click="itemClick">
    <div v-if="isActive"><slot name="imageActice"></slot></div>
    <div v-else><slot name="image"></slot></div>
    <div :style="activeStyle">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "#f57777",
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path).catch((err) => err)
    },
  },
  computed: {
    isActive() {
      return this.$route.path === this.path
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
}
</script>

<style>
.root {
  flex: 1;
  text-align: center;
  align-content: center;
  font-size: 12px;
}

.root img {
  width: 24px;
  height: 24px;
  margin-top: 6px;
  vertical-align: middle;
}
</style>
