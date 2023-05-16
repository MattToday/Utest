<!-- 购物车 -->

<template>
  <div class="shopping-cart-wrapper">
    <div class="shopping-cart">
      <div class="price" @click="openGoodsList">
        <div class="left" :class="{active: boxMove}">
          <img class="box-pic" v-if="num" :style="{left: `${-0.01 - boxMoveIndex * 0.72}rem`}" src="../assets/image/box_p.png" alt="">
          <div class="badge" v-if="num">{{num}}</div>
          <img v-else class="empty" src="../assets/image/empty.png" alt="">
          <div id="target"></div>
        </div>
        <div class="show-price">
          <p>参考价格：¥{{ totalPrice }}</p>
          <span>实际价格以跑男购买小票为准</span>
        </div>
      </div>
      <div class="btn" :class="{disabled: !num}">立即下单</div>
    </div>
    <action-sheet v-model="showGoodsList">
      <div class="goods-list-wrapper">
        <h5>已选商品</h5>
        <ul class="goods-list">
          <li v-for="good in shoppingCartData" :key="good.id">
            <img src="../assets/image/default.png" alt="">
            <div class="right">
              <h4>{{ good.title }}</h4>
              <div class="control">
                <p>
                  参考价 <i>¥</i><span>{{ good.price }}</span>
                </p>
                <zp-stepper :selectNum.sync="good.count"></zp-stepper>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </action-sheet>
  </div>
</template>

<script>
  import { ActionSheet } from 'vant';
  import ZpStepper from '@/components/ZpStepper.vue';

  export default {
    name: 'UtestShoppingCart',

    data() {
      return {
        boxMove: false,
        boxMoveIndex: 0,
        timer: null,
        showGoodsList: false,
      };
    },

    props: ['num', 'shoppingCartData'],

    components: {
      ActionSheet,
      ZpStepper,
    },

    watch: {
      num(val, old) {
        // 购物车为空自动关闭已加入商品列表
        if (!val) {
          this.showGoodsList = false
        }
        // 当增加购物数量时出发购物盒子的动画
        if (val > old) {
          this.boxMoveHandle()
        }
      }
    },

    computed: {
      // 计算当前购物车总价格
      totalPrice() {
        const price = this.shoppingCartData?.reduce((pre, cur) => {
          return pre + cur.count * cur.price
        }, 0)
        return price ? price.toFixed(2) : '0.00'
      }
    },

    methods: {
      // 打开购物车列表
      openGoodsList() {
        if (!this.num) {
          return
        }
        this.showGoodsList = !this.showGoodsList
      },

      // 购物盒子动画控制
      boxMoveHandle() {
        this.timer = setTimeout(() => {
          if (this.boxMoveIndex === 15) {
            this.boxMoveIndex = 0
            clearTimeout(this.timer)
          } else {
            this.boxMoveIndex++
            this.boxMoveHandle()
          }
        }, 80)
      }
    },
  };
</script>

<style lang="less" scoped>
  .shopping-cart-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.74rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);
    .shopping-cart {
      width: 3.55rem;
      height: 0.5rem;
      display: flex;
      position: relative;
      z-index: 3000;
      .price {
        width: 2.55rem;
        box-shadow: 0rem 0.02rem 0.05rem 0rem rgba(0,0,0,0.2);
        border-radius: 0.5rem 0 0 0.5rem;
        background: #333;
        padding-left: 0.7rem;
        position: relative;
        .left {
          position: absolute;
          width: 0.72rem;
          height: 0.72rem;
          overflow: hidden;
          bottom: -0.0415rem;
          left: -0.01rem;
          .box-pic {
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .empty {
            position: absolute;
            left: 0;
            top: 0;
            width: 0.72rem;
          }
        }
      }
      .btn{
        flex: 1;
        background: linear-gradient(90deg, #FF9111 0%, #FF752F 100%);
        box-shadow: 0rem 0.02rem 0.05rem 0rem rgba(0,0,0,0.2);
        border-radius: 0rem 0.5rem 0.5rem 0rem;
        font-size: 0.16rem;
        font-weight: 700;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        &.disabled {
          background: linear-gradient(90deg, #9E9E9E 0%, #8D8D8D 100%);
        }
      }
    }
  }
  .badge {
    position: absolute;
    min-width: 0.16rem;
    padding: 0 0.03rem;
    color: #fff;
    background: #FA5150;
    font-size: 0.11rem;
    text-align: center;
    border-radius: 50%;
    right: 0.05rem;
    top: 0.22rem;
    line-height: 1.2;
  }
  #target {
    position: absolute;
    width: 1px;
    height: 1px;
    left: 50%;
    top: 50%;
    opacity: 0;
  }

  .show-price {
    padding-top: 0.07rem;
    p {
      height: 0.2rem;
      font-size: 0.16rem;
      line-height: 0.2rem;
      color: #fff;
      font-weight: 700;
    }
    span {
      height: 0.15rem;
      font-size: 0.11rem;
      color: #999;
      margin-top: 0.01rem;
    }
  }
  
  .goods-list-wrapper {
    padding: 0.13rem 0.14rem 0.74rem;
    h5 {
      margin-bottom: 0.05rem;
      color: #666;
      font-size: 0.13rem;
    }
    .goods-list {
      max-height: 3rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    li {
      padding: 0.08rem 0;
      display: flex;
      img {
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        border-radius: 0.08rem;
      }
      .right {
        margin-left: 0.1rem;
        flex: 1;
        h4 {
          width: 2.7rem;
          color: #1A1A1A;
          font-size: 0.14rem;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 0.2rem;
          line-height: 0.2rem;
          white-space: nowrap;
          font-weight: 40;
        }
        .control {
          display: flex;
          justify-content: space-between;
          margin-top: 0.19rem;
          font-size: 0.12rem;
          align-items: center;
          p {
            line-height: 0.25rem;
          }
          i {
            font-style: initial;
            color: #FA5150;
          }
          span {
            font-size: 0.18rem;
            color: #FA5150;
          }
        }
      }
    }
  }
</style>