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
        <div class="goods-wrapper" ref="goodsWrapper">
          <div class="menu-wrapper" ref="menuWrapper" :class="isCanScroll? 'scroll' : 'fixedP'" >
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
          <div class="foods-wrapper" ref="foodWrapper" @scroll="foodsScrollHandle" :class="isCanScroll? 'scroll' : 'fixedP'">
            <div>
              <div class="food-list-hook" v-for="classify in goods.class" :key="classify.id">
                <div class="good-card" v-for="good in classify.goods" :key="good.id">
                  <img src="../assets/image/default2.jpg" alt="" />
                  <div class="good-info">
                    <h5>{{ good.title}}</h5>
                    <div class="good-control">
                      <div class="left">参考价 <i>¥</i><span>{{ good.price }}</span></div>
                      <div class="right">
                        <zp-stepper :selectNum.sync="good.count"></zp-stepper>
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
    <shopping-cart :num="shoppingCartNum"></shopping-cart>
  </div>
</template>

<script>
  // import { Sticky } from 'vant';
  import BScroll from '@better-scroll/core'
  import goods from '../util/goods'
  import ZpHeader from '@/components/ZpHeader.vue'
  import ZpHint from '@/components/ZpHint.vue'
  import ShopInfo from '@/components/ShopInfo.vue'
  import ZpStepper from '@/components/ZpStepper.vue';
  import ShoppingCart from '@/components/ShoppingCart.vue'
  export default {
    data(){
      return {
        goods,
        isCanScroll: false,
        goodsScrollTop: 0,
        menuHeightArr: [],
        listHeightArr: [],
        foodScollPos: 0,
        fixed: false
      }
    },
    created() {
      console.log(this.goods)
    },

    components: { ZpHeader, ZpHint, ShopInfo, ZpStepper, ShoppingCart },

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
      },
      shoppingCartNum() {
        let num = 0
        this.goods.class.forEach((classType) => {
          classType.goods.forEach(good => {
            num += good.count
          });
        })
        return num
      }
    },
    watch:{
      currentIndex(index) {
        const menuScrollTop = Math.abs(Math.round(this.menuScroll.y))
        const menuClientHeight = this.$refs.menuWrapper.clientHeight
        const diff = this.menuHeightArr[index + 1] - menuScrollTop - menuClientHeight
        if (diff > 0) {
          this.menuScroll.scrollTo(0, this.menuScroll.y-diff, 500)
        }

        if (this.menuHeightArr[index] < menuScrollTop) {
          this.menuScroll.scrollTo(0, -this.menuHeightArr[index], 500)
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
        this.fixed = fixed
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
        if (this.scrollTop >= goodsWrapperOffsetTop - 44) {
          this.top = goodsWrapperOffsetTop - 44
          this.isCanScroll = true
          this.$nextTick(() => {
            this.menuScroll=new BScroll(this.$refs.menuWrapper, { click: true })
            this.foodScroll=new BScroll(this.$refs.foodWrapper, {click: true, probeType: 3, bounce: {top: false}})
            this.foodScroll.on('scroll', (pos) => {
              if (pos.y === 0 && this.foodScroll.movingDirectionY === -1) {
                this.destroyScroll()
              }
              this.foodScollPos = pos.y
              this.goodsScrollTop = Math.abs(Math.round(pos.y))
              // console.log(Math.abs(parseInt(pos.y)));
            })
          })
        } else {
          this.isCanScroll = false
          this.destroyScroll();
        }
      },
      destroyScroll() {
        this.menuScroll && this.menuScroll.destroy()
        this.foodScroll && this.foodScroll.destroy()
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

  .space {
    height: calc(100vh - 44px);
  }
  .scroll {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .fixedP {
    overflow-y: hidden;
  }

  .goods-wrapper {
    display: flex;
    height: calc(100vh - 44px);
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