<template>
  <div class="zp-header">
    <div class="left">
      <img src="../assets/image/back.png" alt="" />
    </div>
    <div class="center">网红店铺</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.zp-header {
  display: flex;
  height: 44px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  align-items: center;
  background: #fff;
  box-shadow: 0rem 0.02rem 0.04rem 0rem rgba(0,0,0,0.08);
  .left {
    width: 50px;
    height: inherit;
    display: flex;
    align-items: center;
    padding-left: 15px;
    img {
      height:50%;
    }
  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .right {
    width: 50px;
  }
}
</style>