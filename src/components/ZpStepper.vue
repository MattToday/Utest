<template>
  <div class="stepper-wrapper">
    <div class="have-add-cart" v-if="selectNum">
      <img @click="subGood" src="../assets/image/sub.png" alt="">
      <span>{{selectNum}}</span>
      <img @click="addGood" src="../assets/image/add.png" alt="">
    </div>
    <div class="have-no-cart">
      <img @click="addGood" src="../assets/image/add.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: ['selectNum'],
    methods: {
      addGood() {
        this.$emit('update', this.selectNum + 1)
      },
      subGood() {
        this.$emit('update', this.selectNum - 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .have-add-cart {
    display: flex;
    align-items: center;
    img {
      width: 0.21rem;
      height: 0.21rem;
      display: block;
    }
    span {
      padding: 0 0.08rem;
      line-height: 0.21rem;
      color: #999;
      font-size: 0.13rem;
      min-width: 0.24rem;
    }
  }
  .have-no-cart {
    img {
      width: 0.21rem;
      height: 0.21rem;
      display: block;
    }
  }
</style>