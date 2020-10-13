<template>
  <div>
    <div class="tabbar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 49px;
  background-color: #f5f4f5;
  position: fixed;
  left: 0px;
  bottom: 0px;
  box-shadow: 0px -1px 3px rgba(245, 244, 245, 0.6);
  display: flex;
}
</style>
