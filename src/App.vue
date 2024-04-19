<script>
import pageAnimation from "@/components/yy-PageAnimation";
import { useI18n } from "vue-i18n";



export default {
  mixins: [pageAnimation],
  onLaunch: function () {},
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>

<style lang="scss">
.infiniteUl {
  .nut-infiniteloading {
    .nut-infinite-bottom {
      .bottom-box {
        .nut-icon__img {
          display: none;
        }
      }
    }
  }
}
.nutbig-marquee .start {
  // background: url('static/act/go.png') no-repeat center !important;
}
.nutbig-turntable {
  top: 480rpx !important;
}
.nutbig-hiteggs {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20rpx 20rpx;
}
@font-face {
  font-family: "PingFangSC";
  // src: url('@/static/PingFang.ttf');
}

/*每个页面公共css */
.nut-navbar {
  padding: 0 !important;
}

.maskItem img,
.mt70 img {
  width: calc(100% - 45rpx) !important;
  max-height: 100% !important;
}
::-webkit-scrollbar {
  display: none;
}
page {
  font-family: PingFangSC;
  color: #fff;
  font-size: 30rpx;
  animation: 0.3s linear all;
  // text-transform: capitalize;
  font-display: auto;
  background-color: #000;

  max-width: 790rpx;
  margin: 0 auto;
}

.normalBg {
  background: url("/static/themeNum1/img/normalBg.png") no-repeat 100%/100%;
  min-height: 100vh;
  background-position: top;
  text-transform: none;
  background-size: 100%;
  background-attachment: fixed;
  max-width: 790rpx;
  margin: 0 auto;
}
.l_bg {
  background: url("/static/themeNum1/l_icon/l_bg.png") no-repeat 100%/100%;
  min-height: 100vh;
  background-position: top;
  text-transform: none;
  background-attachment: fixed;
  background-size: cover;
}

.secondClo {
  font-weight: bold;
  color: #e7c46e;
}

.btns {
  transition: 0.3s linear all;
}

.collapse-content {
  font-size: 23rpx !important;
  color: #666666 !important;
}

.collapse-icon-title {
  font-size: 32rpx !important;
  color: #000 !important;
}

.nut-noticebar-page {
  background: rgba(0, 0, 0, 0.18) !important;
  border-radius: 20rpx !important;
  height: 80rpx !important;

  .left-icon {
    margin: 0 20rpx 0 0 !important;
  }
}

uni-page {
  display: webkit-box;
  overflow: auto;
  paddingb-bottom: 10rpx;
  margin-bottom: -10rpx; // overflow: hidden;
  font-family: SF UI Text;
}

// ::-webkit-scrollbar {
// 	display: none;
// }
// 签名大小
.nut-signature .nut-signature-inner {
  height: 70vh !important;
}
.sign {
  .nut-button {
    width: 90% !important ;
    margin: 20rpx 5% !important;
    height: 100rpx;
    border-radius: 20rpx;
  }
}

.desc {
  img {
    width: 100% !important;
  }
}
.nut-button--primary {
  background-color: rgb(22, 183, 57) !important;
}
</style>
