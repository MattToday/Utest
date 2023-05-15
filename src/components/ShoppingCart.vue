<template>
  <div class="shopping-cart-wrapper">
    <div class="shopping-cart">
      <div class="price">
        <div class="left" :class="{active: boxMove}">
          <img :style="{left: `${-0.01 - boxMoveIndex * 0.72}rem`}" src="../assets/image/box_p.png" alt="">
          <div class="badge" v-if="num">{{num}}</div>
          <div id="target"></div>
        </div>
      </div>
      <div class="btn" @click="boxMoveHandle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtestShoppingCart',

  data() {
    return {
      boxMove: false,
      boxMoveIndex: 0,
      timer: null
    };
  },

  props: ['num'],

  mounted() {
    
  },

  methods: {
    boxMoveHandle() {
      this.timer = setTimeout(() => {
        if (this.boxMoveIndex === 15) {
          this.boxMoveIndex = 0
          clearTimeout(this.timer)
        } else {
          this.boxMoveIndex++
          this.boxMoveHandle()
        }
        console.log(this.boxMoveIndex);
      }, 100)
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
          img {
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
          }
          &.active {
            img {
              left: -7.92rem;
            }
          }
        }
      }
      .btn{
        flex: 1;
        background: linear-gradient(90deg, #FF9111 0%, #FF752F 100%);
        box-shadow: 0rem 0.02rem 0.05rem 0rem rgba(0,0,0,0.2);
        border-radius: 0rem 0.5rem 0.5rem 0rem;
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
  @keyframes boxMove {
    from {
      left: 0;
    }
    to {
      left: -7.92rem
    }
  }
  #target {
    position: absolute;
    width: 1px;
    height: 1px;
    left: 50%;
    top: 50%;
    opacity: 0;
  }
</style>