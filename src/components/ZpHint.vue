<template>
  <div class="hint" v-if="show">
    <p>商品均由UU跑腿提供帮买服务，一切商业行为与该品无关</p>
    <img @click="show = false" src="../assets/image/close.png" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
      }
    }
  }
</script>

<style lang="less" scoped>
  .hint {
    height: 0.36rem;
    background: #FFEFDC;
    color: #F55E21;
    font-size: 0.13rem;
    line-height: 0.36rem;
    display: flex;
    align-items: center;
    p {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 0.1rem;
    }
    img {
      width: 0.2rem;
      height: 0.2rem;
      display: block;
      margin-right: 0.1rem;
    }
  }
</style>