<template>
  <div class="home-view">
    <zp-header></zp-header>
    <div class="container">
      <zp-hint></zp-hint>
      <shop-info></shop-info>
      <div class="tip" ref="test">
        <img src="../assets/image/tip.png" alt="">
      </div>
      <!-- goods -->
      <!-- <sticky :offset-top="44" @change="goodsInnerFixedHanndle"> -->
        <div class="space" v-if="isCanScroll"></div>
        <div class="goods-wrapper" ref="goodsWrapper" :class="{canScroll: isCanScroll}">
          <div class="menu-wrapper scroll" ref="menuWrapper">
            <ul>
              <li
                class="menu-item"
                v-for="(classify, index) in goods.class"
                :key="classify.id"
                :class="{active: currentIndex === index}"
                @click="menuClickHandle(index)"
              >
                <span>{{classify.name}}</span>
              </li>
            </ul>
          </div>
          <div class="foods-wrapper scroll" ref="foodWrapper" @scroll="foodsScrollHandle">
            <div>
              <div class="food-list-hook" v-for="classify in goods.class" :key="classify.id">
                <div class="good-card" v-for="good in classify.goods" :key="good.id">
                  <img src="../assets/image/default2.jpg" alt="" />
                  <div class="good-info">
                    <h5>{{ good.title}}</h5>
                    <div class="good-control">
                      <div class="left">参考价 <i>¥</i><span>{{ good.price }}</span></div>
                      <div class="right">
                        <zp-stepper></zp-stepper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- </sticky> -->
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import goods from '../util/goods'
  import ZpHeader from '@/components/ZpHeader.vue'
  import ZpHint from '@/components/ZpHint.vue'
  import ShopInfo from '@/components/ShopInfo.vue'
  import ZpStepper from '@/components/ZpStepper.vue';
  export default {
    data(){
      return {
        goods,
        isCanScroll: false,
        goodsScrollTop: 0,
        menuHeightArr: [],
        listHeightArr: [],
      }
    },
    created() {
      console.log(this.goods)
    },

    components: { ZpHeader, ZpHint, ShopInfo, ZpStepper },

    computed: {
      currentIndex() {
        const { goodsScrollTop } = this
        for (let i = 0; i < this.listHeightArr.length; i++) {
          const height = this.listHeightArr[i]
          const heightNext = this.listHeightArr[i + 1]
          if (!heightNext || (goodsScrollTop >= height && goodsScrollTop < heightNext)) {
            return i
          }
        }
        return 0
      }
    },
    watch:{
      currentIndex(index) {
        // const menus = this.$refs.menuWrapper.getElementsByClassName('menu-item')
        // const selectMenu = menus[index]
        console.log(this.menuHeightArr[index + 1]);
        const menuScrollTop = this.$refs.menuWrapper.scrollTop
        const menuClientHeight = this.$refs.menuWrapper.clientHeight
        console.log(menuScrollTop);
        const diff = this.menuHeightArr[index + 1] - menuScrollTop - menuClientHeight
        if (diff > 0) {
          this.$refs.menuWrapper.scrollTo(0, menuScrollTop + diff)
          console.log(1);
        }

        if (this.menuHeightArr[index] < menuScrollTop) {
          this.$refs.menuWrapper.scrollTo(0, this.menuHeightArr[index])
        }

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 监听window滚动，用来控制商品区域是否开启滚动
        window.addEventListener('scroll', this.windowScrollHandle, true)
        setTimeout(() => {
          this.computedMenuOffsetTop()
          this.computedListOffsetTop()
        }, 500)
      },
      goodsInnerFixedHanndle(fixed) {
        console.log(fixed)
      },
      computedMenuOffsetTop() {
        const menus = this.$refs.menuWrapper.getElementsByClassName('menu-item')
        let height = 0
        this.menuHeightArr.push(height)
        for (let i = 0; i < menus.length; i++) {
          const menu = menus[i];
          height = menu.clientHeight + height
          this.menuHeightArr.push(height)
        }
      },
      computedListOffsetTop() {
         const menus = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeightArr.push(height)
        for (let i = 0; i < menus.length; i++) {
          const menu = menus[i];
          height = menu.clientHeight + height
          this.listHeightArr.push(height)
        }
        console.log(this.listHeightArr);
      },
      foodsScrollHandle() {
        this.goodsScrollTop = this.$refs.foodWrapper.scrollTop
      },
      windowScrollHandle() {
        const goodsWrapperOffsetTop = this.$refs.goodsWrapper.offsetTop
        this.scrollTop =  document.documentElement.scrollTop
        // if (this.isCanScroll && this.scrollTop > scrollTop) {
        //   console.log(1);
        //   this.menuScroll && this.menuScroll.destroy()
        //   this.foodScroll && this.foodScroll.destroy()
        //   this.isCanScroll = false
        //   return
        // } else {
        //   this.scrollTop = scrollTop
        // }
        if (this.scrollTop >= goodsWrapperOffsetTop - 44) {
          this.top = goodsWrapperOffsetTop - 44
          this.isCanScroll = true
          this.$nextTick(() => {
            this.menuScroll=new BScroll(this.$refs.menuWrapper, { click: true })
            this.foodScroll=new BScroll(this.$refs.foodWrapper, {click: true, probeType: 3, eventPassthrough: 'vertical'})
          })
        }
      },

      menuClickHandle(index) {
        console.log(index);
        const scrollTop = this.listHeightArr[index]
        this.$refs.foodWrapper.scrollTo(0, scrollTop)
      }
    },
    beforeDestroy() {
      window,removeEventListener('scroll', this.windowScrollHandle, true)
    }

  }
</script>

<style lang="less" scoped>
  .container {
    padding-top: 44px;
  }
  .tip {
    height: 0.92rem;
    padding: 0 0.1rem;
    margin-bottom: 0.16rem;
    img {
      height: 100%;
      display: block;
      width: 100%;
    }
  }

  .goods-wrapper {
    &.canScroll {
      position: fixed;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .space {
    height: calc(100vh - 44px);
  }
  .scroll {
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .goods-wrapper {
    display: flex;
    .menu-wrapper {
      width: 0.78rem;
      li {
        padding: 0.16rem 0.1rem;
        color: #999;
        font-size: 0.12rem;
        font-weight: 700;
        background-color: #F5F5F5;
        &.active {
          background-color: #fff;
          color: #333;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
    }
  }

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