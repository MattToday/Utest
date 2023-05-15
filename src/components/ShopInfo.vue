<template>
  <div class="shop-info">
    <div class="shop-message-wrap">
      <div class="left">
        <h5>我是店铺名称店铺名称店铺名称店铺名称店铺名称</h5>
        <p>
          <span>月售9999+</span>
          <span>距离我265m</span>
        </p>
      </div>
      <div class="right">
        <img src="../assets/image/default.jpg" alt="">
      </div>
    </div>
    <div class="shop-hint">
      营业时间：11:00-14:00  17:00-23:00，请在营业时间内下单，否则因店铺关门而取消订单引起的白跑费需自行承担
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .shop-info {
    padding: 0.1rem 0.1rem 0.1rem;
  }
  .shop-message-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.1rem;
    .left {
      h5 {
        margin-top: 0.04rem;
        color: #1A1A1A;
        font-size: 0.2rem;
        font-weight: 700;
        width: 2.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        margin-top: 0.08rem;
        font-size: 0.12rem;
        color: #333;
        span {
          margin-right: 0.14rem;
        }
      }
    }
    .right {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.08rem;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .shop-hint {
    color: #999;
    font-size: 0.1rem;
  }
</style>