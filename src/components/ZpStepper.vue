<!-- 商品数量步进器 -->

<template>
  <div class="stepper-wrapper">
    <div class="have-add-cart" v-if="selectNum">
      <img @click="subGood" src="../assets/image/sub.png" alt="">
      <span>{{selectNum}}</span>
      <img @click="addGood" src="../assets/image/add.png" alt="">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ballFlag" ref="ball">
          <div class="ball-inner" ref="ballInner"></div>
        </div>
      </transition>
    </div>
    <div class="have-no-cart" v-else>
      <img @click="addGood" src="../assets/image/add.png" alt="">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ballFlag" ref="ball">
          <div class="ball-inner" ref="ballInner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ballFlag: false
      }
    },
    props: ['selectNum'],
    methods: {
      // 增加商品
      addGood() {
        this.$emit('update:selectNum', this.selectNum + 1)
        this.ballFlag = true
      },
      // 减少商品
      subGood() {
        this.$emit('update:selectNum', this.selectNum - 1)
      },

      // 抛物线球运动前钩子
      beforeEnter() {
        // 初始化小球状态
        this.$refs.ballInner.style.transition = ''
        this.$refs.ball.style.transition = ''
        this.$refs.ball.style.transform = `translate(0, 0)`
        this.$refs.ballInner.style.transform = `translate(0, 0)`
      },
      // 抛物线球运动时钩子
      enter(el, done) {
        // 根据小球位置和页面底部购物盒位置计算移动位置
        // 通过分别控制两个dom的横向和纵向运动达到抛物线效果
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        const badgePosition = document.getElementById('target').getBoundingClientRect()
        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top
        el.style.transform = `translate(${xDist}px, 0)`
        el.style.transition = 'all 0.3s linear'

        this.$refs.ballInner.style.transform = `translate(0, ${yDist}px)`
        this.$refs.ballInner.style.transition = 'all 0.3s ease-in'
        done()
      },
      // 抛物线球运动后钩子
      afterEnter() {
        this.ballFlag = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .have-add-cart {
    display: flex;
    align-items: center;
    position: relative;
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
    position: relative;
    img {
      width: 0.21rem;
      height: 0.21rem;
      display: block;
    }
  }
  .ball {
    position: absolute;
    width: 0.21rem;
    height: 0.21rem;
    right: 0;
    top: 0;
    z-index: 9999;
    .ball-inner {
      background: #FF9111;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
</style>