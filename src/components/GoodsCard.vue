<!-- 商品卡片展示 -->

<template>
  <div class="good-card">
    <img src="../assets/image/default2.jpg" alt="" />
    <div class="good-info">
      <h5>{{ goods[index].title}}</h5>
      <div class="good-control">
        <div class="left">参考价 <i>¥</i><span>{{ goods[index].price }}</span></div>
        <div class="right">
          <zp-stepper :value="goods[index].count" @input="inputHandle"></zp-stepper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZpStepper from '@/components/ZpStepper.vue';
export default {
  name: 'UtestGoodsCard',

  data() {
    return {
      ownGoods: this.goods
    };
  },

  components: {
    ZpStepper,
  },

  props: ['goods', 'index'],

  mounted() {
    
  },

  methods: {
    inputHandle(i) {
      console.log(i);
      this.ownGoods[this.index].count = i
      console.log(this.ownGoods);
      this.$emit('update:goods', this.ownGoods)
    }
  },
};
</script>

<style lang="less" scoped>
  .good-card {
    padding: 0.1rem;
    display: flex;
    img {
      width: 0.95rem;
      height: 0.95rem;
      display: block;
      border-radius: 0.08rem;
      margin-right: 0.1rem;
    }
    .good-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h5 {
        margin-top: 0.02rem;
        line-height: 0.2rem;
        color: #1A1A1A;
        font-weight: 400;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      }
      .good-control {
        display: flex;
        justify-content: space-between;
        .left {
          color: #666;
          font-size: 0.12rem;
          span {
            font-size: 0.18rem;
            color: #FA5150;
          }
          i {
            font-style: initial;
            color: #FA5150;
            margin-right: 0.02rem;
          }
        }
      }
    }
  }
</style>