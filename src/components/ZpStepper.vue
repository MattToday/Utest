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
      addGood() {
        this.$emit('update:selectNum', this.selectNum + 1)
        this.ballFlag = true
      },
      subGood() {
        this.$emit('update:selectNum', this.selectNum - 1)
      },

      beforeEnter(e) {
        console.log(e);
      },
      enter(el, done) {
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        const badgePosition = document.getElementById('target').getBoundingClientRect()
        console.log(ballPosition);
        console.log(badgePosition);
        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top
        el.style.transform = `translate(${xDist}px, 0)`
        el.style.transition = 'all 0.5s linear'

        this.$refs.ballInner.style.transform = `translate(0, ${yDist}px)`
        this.$refs.ballInner.style.transition = 'all 0.5s ease-in'
        done()
      },
      afterEnter() {
        this.ballFlag = false
        setTimeout(() => {
          this.$refs.ballInner.style.transition = ''
          this.$refs.ball.style.transition = ''
          this.$refs.ball.style.transform = `translate(0, 0)`
          this.$refs.ballInner.style.transform = `translate(0, 0)`
        }, 1000)
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