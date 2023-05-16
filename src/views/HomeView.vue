<template>
  <div class="home-view">
    <!-- 标题 -->
    <zp-header></zp-header>
    <div class="container">
      <!-- 提示 -->
      <zp-hint></zp-hint>
      <!-- 店铺信息 -->
      <shop-info></shop-info>
      <!-- 购买流程 -->
      <div class="tip">
        <img src="../assets/image/tip.png" alt="">
      </div>
      <!-- 页面下半部分商品展示 -->
      <div class="goods-wrapper" ref="goodsWrapper">
        <!-- 商品导航 -->
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
              <badge v-if="classify.count" :content="classify.count" color="#FA5150" />
            </li>
          </ul>
        </div>
        <!-- 商品列表 -->
        <div class="foods-wrapper" ref="foodWrapper" :class="isCanScroll? 'scroll' : 'fixedP'">
          <div>
            <div class="food-list-hook" v-for="classify in goods.class" :key="classify.id">
              <div class="good-card" v-for="good in classify.goods" :key="good.id">
                <img src="../assets/image/default.png" alt="" />
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
    </div>
    <!-- 底部购物车 -->
    <shopping-cart :shoppingCartData="shoppingCartData" :num="shoppingCartNum"></shopping-cart>
  </div>
</template>

<script>
  // import { Sticky } from 'vant';
  import BScroll from '@better-scroll/core'
  import { Badge } from 'vant';
  import goods from '../util/goods'
  import ZpHeader from '@/components/ZpHeader.vue'
  import ZpHint from '@/components/ZpHint.vue'
  import ShopInfo from '@/components/ShopInfo.vue'
  import ZpStepper from '@/components/ZpStepper.vue';
  import ShoppingCart from '@/components/ShoppingCart.vue'
  export default {
    data(){
      return {
        goods, // 商品数据，随机生成
        isCanScroll: false, // 控制商品未吸顶时禁止滚动
        goodsScrollTop: 0, //商品列表滚动距离
        menuHeightArr: [], // 商品导航菜单每个子菜单距离顶部高度
        listHeightArr: [], // 商品列表每个分类距离顶部高度
        shoppingCartData: [], // 购物车数据
        shoppingCartNum: 0, // 已加入购物车买数量
      }
    },

    components: { ZpHeader, ZpHint, ShopInfo, ZpStepper, ShoppingCart, Badge },

    computed: {
      // 商品列表滚动后所对应的商品分类下标
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
    },
    watch:{
      currentIndex(index) {
        const menuScrollTop = Math.abs(Math.round(this.menuScroll.y))
        const menuClientHeight = this.$refs.menuWrapper.clientHeight
        const diff = this.menuHeightArr[index + 1] - menuScrollTop - menuClientHeight
        // 商品向下滚动切换分类后对应的导航菜单如需滚动则滚动
        if (diff > 0) {
          this.menuScroll.scrollTo(0, this.menuScroll.y-diff, 500)
        }
        // 商品向上滚动切换分类后对应的导航菜单如需滚动则滚动
        if (this.menuHeightArr[index] < menuScrollTop) {
          this.menuScroll.scrollTo(0, -this.menuHeightArr[index], 500)
        }
      },
      goods: {
        handler() {
          // 计算已加入购物车的总数，同时计算每个分类已加入购物车的数量
          this.shoppingCartNum = 0
          this.goods.class.map((goodsClass) => {
            let classCount = 0
            goodsClass.goods.forEach(good => {
              classCount += good.count
              this.shoppingCartNum += good.count
            });
            goodsClass.count = classCount
          })
          // 筛选购物车已选商品
          let goodsArray = []
          this.goods.class.forEach(goodsClass => {
            const selectGoods = goodsClass.goods.filter(good => {
              return good.count > 0
            })
            goodsArray = goodsArray.concat(selectGoods)
          });
          this.shoppingCartData = goodsArray
        },
        deep: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 监听window滚动，用来控制商品区域是否开启滚动
        window.addEventListener('scroll', this.windowScrollHandle, true)
        // 计算导航菜单和商品列表商品分类距离顶部的高度
        setTimeout(() => {
          this.computedMenuOffsetTop()
          this.computedListOffsetTop()
        }, 500)
      },
      // 计算每个导航菜单距离顶部的高度
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
      // 计算每个商品分类距离顶部的高度
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
      // 监听window滚动，用来控制商品区域是否开启滚动，同时定义和销毁商品列表和导航列表的滚动
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
              this.goodsScrollTop = Math.abs(Math.round(pos.y))
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
      
      // 商品菜单点击事件
      menuClickHandle(index) {
        if (!this.isCanScroll) {
          return
        }
        const scrollTop = this.listHeightArr[index]
        this.foodScroll.scrollTo(0, -scrollTop)
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
        position: relative;
        &.active {
          background-color: #fff;
          color: #333;
        }
      }
      .van-badge {
        position: absolute;
        right: 0.02rem;
        top: 0.07rem;
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