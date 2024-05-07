<template>
  <view class="contentBg" style="background: #060d1f">
    <nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
      <img class="kefu" type="primary" src="../../static/kefu.png" alt="" @click="handleToPage('../mine/service')">
    </nut-drag>
    <view class="pdlr30 pt50 topBox">
      <view class="flex between topNav">
        <view class="f32 text_bold flex col_center" v-if="showEye">
          <view class="f36 text_white" style="font-weight: 500; text-transform: none">
            {{ pageData?.phoneNew }}
          </view>
          <image class="ml20" src="../../static/themeNum1/l_icon/eyeClose.png" style="width: 29rpx; height: 25rpx"
            @click="showEye = !showEye"></image>
        </view>
        <view class="f32 text_bold flex col_center" v-else>
          <view class="f36 text_white" style="font-weight: 500; text-transform: none">
            {{ pageData?.phone }}
          </view>
          <image class="ml20" src="../../static/themeNum1/l_icon/eyeOpen.png" style="width: 29rpx; height: 25rpx"
            @click="showEye = !showEye"></image>
        </view>
        <view class='flex' style="align-items: center;">
          <view class="appTime" style="margin-right: 20rpx;">
            <image style="width:32rpx;height: 32rpx;margin-right: 10rpx;" src="../../static/biao.png" mode=""></image>
            UTC+7-{{ servetTime }}
          </view>
          <image src="/static/lang.png" style="width: 57rpx; height: 56rpx"
            @click="handleToPage('../mine/langSetting')"></image>
        </view>
      </view>

      <view class="mt22 flex flex-between" style="align-items: center;">
        <view>
          <view class="f36 mt10 flex col_center">
            <view class="flex col_center text_bold">
              ID:{{ pageData?.id }}
            </view>
            <view class="ml20">
              <image src="/static/themeNum1/icon/copy.png" style="width: 29rpx; height: 29rpx"
                @click="copyHandle(String(pageData?.id))"></image>
            </view>
          </view>
        </view>
        <view class="f22 text_white" style="
            border-radius: 10rpx;
            padding: 20rpx;
            background-color: #0a87d1;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 350rpx;
          ">
          {{ t("mine.m_s1") }}: {{ codeUrl }}
          <!-- <image src="../../static/themeNum1/icon/copy.png" mode="widthFix" style="width: 19rpx; height: 19rpx"
            @click="copyHandle(codeUrl)"></image> -->
        </view>
        <image src="../../static/themeNum1/icon/copy.png" mode="widthFix" style="width: 30rpx; height: 30rpx"
          @click="copyHandle(codeUrl)"></image>
      </view>

      <view class="balanceBox">
        <view class="vipItem">
          <!-- pic -->
          <!-- <image :src="pageData?.vip?.pic" style="width: 100rpx; height: 80rpx"></image> -->
        </view>
        <view class="text_center pt40">
          <view class="f24">{{ t("all.b_b1") }}</view>
          <view class="f60 text_bold mt29">
            {{ Number(pageData?.ai_balance) + Number(pageData?.balance) }}
            {{ currency }}</view>
        </view>

        <view class="text_center between mt54">
          <view>
            <view class="f24">{{ t("mine.m_m1") }}</view>
            <view class="f30 text_bold mt31"> {{ pageData?.ai_balance }}</view>
          </view>

          <view>
            <view class="f24">{{ t("mine.m_m2") }}</view>
            <view class="f30 text_bold mt31"> {{ pageData?.balance }}</view>
          </view>
        </view>
      </view>
    </view>
    <view>

    </view>

    <view class="pdlr30">
      <!-- 改 -->
      <view style="" class="commBox l_inpBg">
        <view v-for="item in commList" class="commBoxItem"
          :style="minTransfer == -1 ? { width: '33%' } : { width: '25%' }">
          <image :src="item.img" style="width: 76rpx; height: 76rpx" @click="skip_page(item)"></image>
          <view class="mt25 f26 textHiddenOne pdlr20" style="white-space: wrap" @click="skip_page(item)">{{ item.name }}
          </view>
        </view>
      </view>
      <view v-show="false" class="mt24" style="width: calc(100%-48rpx) ;height: 148rpx;background-image: url('../../static/mine/minebanner.png');background-size: 100% 100%;font-weight: 600;font-size: 40rpx;color: #FFFFFF;
line-height: 148rpx;padding-left: 48rpx;">
        {{ t('pk.t_m1') }}
      </view>
      <!-- <view class="mt30 pdlr50 pdtb30 between" :style="{ background: store.$state.secondColor, color: '#000' }"
        style="box-shadow: 0px 9px 16px 0px #54a8b0; border-radius: 20rpx" @click="handleToPage('../mine/share')">
        {{ t("ttn.t_t26") }}
        <image src="/static/themeNum1/icon/shareIcon.png" style="width: 50rpx; height: 50rpx"></image>
      </view> -->

      <view class="listBox">
        <view class="mb40" v-for="item in botList" @click="handleToPage(item.url)">
          <view class="between" v-if="item.show">
            <view class="flex col_center">
              <image :src="item.img" style="width: 92rpx; height: 92rpx"></image>
              <view class="mglr41 f30">{{ item.name }}</view>
            </view>
            <view>
              <IconFont v-if="curLang !== 'ar'" name="right" color="#fff"></IconFont>
              <IconFont v-else name="rect-left" color="#fff"></IconFont>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="flex_col center rightIcon">
      <image class=" " src="/static/act/lottery.png" mode="widthFix" v-if="showDraw" style="width: 80rpx; height: 80rpx"
        @click="handleToPage('../act/lottery')">
      </image>

      <image class="mt40" src="/static/act/egg.png" mode="widthFix" v-if="showEgg" style="width: 80rpx; height: 80rpx"
        @click="handleToPage('../act/goldEgg')">
      </image>

      <image class="mt40" src="/static/actIcon/redElove/hongbao.png" mode="widthFix" v-if="showRedlove"
        style="width: 90rpx; height: 90rpx" @click="handleToPage('../act/redEnvList')">
      </image>
    </view>
    <view style="height: 200rpx"> </view>
    <tqbTabbar :activeIndex="4"></tqbTabbar>
    <Loading ref="showLoading"></Loading>

    <!-- 充值弹窗 -->
    <view class="popUp_bottom" :style="{ display: PopUpData }">
      <view class="popUp">
        <view style="background: #1c1c50">
          <!-- 上面标题头 -->
          <view class="between" style="
              height: 88rpx;
              padding: 0 31rpx;
              justify-content: space-between;
            ">
            <view class=""> </view>
            <view class="" style="font-size: 36rpx"> rechange </view>
            <view style="width: 45rpx; height: 30rpx">
              <image src="../../static/imgs/quant/dow.png" style="width: 48rpx; height: 100%"
                @click="PopUpData = 'none'"></image>
            </view>
          </view>

          <view class="pdlr45 mt70">
            <!-- 充值方式一 -->
            <view class="items between" v-if="showUSDT" :style="actInd == 0 ? choStyle : noChoStyle"
              style="border: 1rpx solid rgb(125, 125, 125)" @click="actInd = 0">
              <view class="flex col_center">
                <image src="../../static/themeNum1/icon/usdt.png" mode="widthFix" style="width: 55rpx; height: 55rpx">
                </image>
                <view class="ml73 F28"> USDT </view>
              </view>

              <view class="circle center" :class="actInd == 0 ? 'actChoose' : 'noChoose'">
                <nut-icon name="checklist" v-if="actInd == 0" :color="store.$state.thirdColor"></nut-icon>
              </view>
            </view>
            <!-- 充值方式二 -->
            <view class="items between" v-if="showUSDT" :style="actInd == 1 ? choStyle : noChoStyle"
              style="border: 1rpx solid rgb(125, 125, 125)" @click="actInd = 1">
              <view class="flex col_center">
                <image src="../../static/images11-removebg-preview.png" mode="widthFix"
                  style="width: 55rpx; height: 55rpx"></image>
                <view class="ml73 F28"> USDC </view>
              </view>

              <view class="circle center" :class="actInd == 1 ? 'actChoose' : 'noChoose'">
                <nut-icon name="checklist" v-if="actInd == 1" :color="store.$state.thirdColor"></nut-icon>
              </view>
            </view>
            <!-- 充值方式三 -->
            <view class="items between" v-if="showUSDT" :style="actInd == 2 ? choStyle : noChoStyle"
              style="border: 1rpx solid rgb(125, 125, 125);" @click="actInd = 2">
              <view class="flex col_center">
                <image src="../../static/Untitled1-removebg-preview.png" mode="widthFix"
                  style="width: 55rpx; height: 55rpx"></image>
                <view class="ml73 F28"> TRX </view>
              </view>

              <view class="circle center" :class="actInd == 2 ? 'actChoose' : 'noChoose'">
                <nut-icon name="checklist" v-if="actInd == 2" :color="store.$state.thirdColor"></nut-icon>
              </view>
            </view>

            <!-- <view
              class="items between"
              v-if="showBANK"
              :style="actInd == 1 ? choStyle : noChoStyle"
              @click="actInd = 1"
             >
              <view class="flex col_center">
                <image
                  src="../../static/themeNum1/icon/bank.png"
                  style="width: 52rpx; height: 44rpx"
                ></image>
                <view class="ml73 F28"> Bank Card </view>
              </view>
              <view
                class="circle center"
                :class="actInd == 1 ? 'actChoose' : 'noChoose'"
              >
                <nut-icon
                  name="checklist"
                  v-if="actInd == 1"
                  :color="store.$state.thirdColor"
                ></nut-icon>
              </view>
            </view> -->

            <view class="center l_inpS mt40 l_inpBg pdlr30 color0 f32" style="margin-top: 110rpx"
              :style="{ background: store.$state.secondColor }" @click="jumpPage">
              {{ t("all.a_c2") }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 提现 -->
    <view class="popUp_bottom" :style="{ display: widUpData }">
      <view class="popUp">
        <view style="background: #1c1c50">
          <!-- 上面标题头 -->
          <view class="between" style="
              height: 88rpx;
              padding: 0 31rpx;
              justify-content: space-between;
            ">
            <view class=""> </view>
            <view class="" style="font-size: 36rpx"> withdraw </view>
            <view style="width: 45rpx; height: 30rpx">
              <image src="../../static/imgs/quant/dow.png" style="width: 48rpx; height: 100%"
                @click="widUpData = 'none'"></image>
            </view>
          </view>
          <view class="pdlr45 mt70">
            <view class="items between" v-if="showWidUSDT" :style="actInd == 0 ? choStyle : noChoStyle"
              @click="actInd = 0">
              <view class="flex col_center">
                <image src="../../static/themeNum1/icon/usdt.png" mode="widthFix" style="width: 55rpx; height: 55rpx">
                </image>
                <view class="ml73 F28"> USDT </view>
              </view>

              <view class="circle center" :class="actInd == 0 ? 'actChoose' : 'noChoose'">
                <nut-icon name="checklist" v-if="actInd == 0" :color="store.$state.thirdColor"></nut-icon>
              </view>
            </view>

            <view class="items between" v-if="showWidBANK" :style="actInd == 1 ? choStyle : noChoStyle"
              @click="actInd = 1">
              <view class="flex col_center">
                <image src="../../static/themeNum1/icon/bank.png" style="width: 52rpx; height: 44rpx"></image>
                <view class="ml73 F28"> Bank Card </view>
              </view>
              <view class="circle center" :class="actInd == 1 ? 'actChoose' : 'noChoose'">
                <nut-icon name="checklist" v-if="actInd == 1" :color="store.$state.thirdColor"></nut-icon>
              </view>
            </view>

            <view class="center l_inpS mt40 l_inpBg pdlr30 color0 f32" style="margin-top: 100rpx"
              :style="{ background: store.$state.secondColor }" @click="jumpPagewid">
              {{ t("all.a_c2") }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import tqbTabbar from "@/components/botTabbar/botTabbar.vue";
import request from "../../../comm/request.ts";
import { userStore } from "@/store/themeNum.js";
import useClipboard from "vue-clipboard3";
import { Toast } from "@nutui/nutui";
import { onShow, onLoad, onHide } from "@dcloudio/uni-app";
import { onMounted } from "vue";
const store = userStore();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { toClipboard } = useClipboard();

const showEye = ref(true);

const commList = ref([
  {
    name: t("recharge.r_r1"),
    img: "/static/themeNum1/icon/m_comm2.png",
    url: "../recharge/means?type=recharge",
  },
  {
    name: t("withdraw.w_w1"),
    img: "/static/themeNum1/icon/m_comm1.png",
    url: "../withdraw/index?balance_type=1",
  },
  {
    name: t("mine.m_t1"),
    img: "/static/themeNum1/icon/m_comm3.png",
    url: "../mine/teamDetail",
  },
  {
    name: t("ttn.t_t27"),
    img: "/static/themeNum1/icon/m_comm4.png",
    url: `../mine/conversion`,
  },
]);

const botList = ref([
  {
    name: t("rec.r_r1"),
    img: "/static/themeNum1/icon/m_list1.png",
    url: "../record/balanceRecord",
    show: true,
  },
  {
    name: t("rec.r_r11"),
    img: "/static/themeNum1/icon/m_list2.png",
    url: "../record/rechargeRecord",
    show: true,
  },
  {
    name: t("rec.r_w1"),
    img: "/static/themeNum1/icon/m_list3.png",
    url: "../record/withdrawRecord",
    show: true,
  },
  {
    name: t("mine.m_m3"),
    img: "/static/themeNum1/icon/m_list4.png",
    url: "down",
    show: false,
  },
  // {
  // 	name: t('newAct.c_l1'),
  // 	img: "/static/themeNum1/icon/m_list6.png",
  // 	url: '../mine/coupon',
  // 	show: false
  // },
  // {
  // 	name: t('newAct.r_r1'),
  // 	img: "/static/themeNum1/icon/jifen.png",
  // 	url: '../mine/redemption',
  // 	show: false
  // },
  // {
  // 	name: t('mine.m_m4'),
  // 	img: "/static/themeNum1/icon/treasure.png",
  // 	url: '',
  // 	show: true
  // },
  {
    name: t("setting.s_c1"),
    img: "/static/themeNum1/icon/m_list5.png",
    url: "../setting/setting",
    show: true,
  },
]);

// 弹窗数据

import topNav from "@/components/topNav/topNav.vue";
const PopUpData = ref("none");
const widUpData = ref("none");

// 跳转页面
const skip_page = (url) => {
  if (!url.url == "../recharge/means?type=recharge") {
    // PopUpData.value = "block";
  } else if (!url.url == "../recharge/means?type=withdraw") {
    // widUpData.value = "block";
  } else {
    uni.navigateTo({
      url: url.url,
    });
  }
};

const showTIme = setInterval(() => {
  getEasternTime()
}, 1000)
const servetTime = ref()
function getEasternTime() {

  const time = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
  });
  servetTime.value = time.split(',')[1];
}
const choStyle = {
  background: store.$state.secondColor,
  color: "#000",
  transition: ".1s linear all",
};
const noChoStyle = {
  background: store.$state.thirdColor,
  color: "#fff",
};
const actInd = ref(0);
// 充值方式
const chongzhi = ref("usdt");

const showUSDT = ref(false);
const showBANK = ref(false);

// const jumpPage = () => {
//   if (actInd.value == 0 && showUSDT.value) {
//     uni.navigateTo({
//       url: "../recharge/u_input?balance_type=" + balance_type.value,
//     });
//   } else if (actInd.value == 1 && showBANK.value) {
//     uni.navigateTo({
//       url: "../recharge/bankRechrage?balance_type=" + balance_type.value,
//     });
//   }
// };
// 提现
const jumpPagewid = () => {
  if (actInd.value == 0) {
    widUpData.value = "none";
    uni.navigateTo({
      url: "../withdraw/usdtWithdraw",
    });
  } else {
    widUpData.value = "none";
    uni.navigateTo({
      url: "../withdraw/bankWithdraw",
    });
  }
};
// 付款
const jumpPage = () => {
  if (actInd.value == 0) {
    uni.navigateTo({
      url: "../recharge/means?id=" + "usdt",
    });
  } else if (actInd.value == 1) {
    uni.navigateTo({
      url: "../recharge/means?id=" + "usdc",
    });
  } else if (actInd.value == 2) {
    uni.navigateTo({
      url: "../recharge/means?id=" + "trx",
    });
  }

  return;
  request({
    url: "finance/usdt/recharge/index",
    methods: "get",
  }).then((res) => {
    if (res.order) {
      uni.navigateTo({
        url: "../recharge/usdtOrder",
      });
    } else {
      request({
        url: "finance/usdt/recharge/submit",
        methods: "post",
        data: {
          amount: "100",
          balance_type: 1,
        },
      }).then((res) => {
        uni
          .navigateTo({
            url: "../recharge/usdtOrder",
          })
          .catch((err) => {
            uni.showToast({
              title: "Lose",
              icon: err.message,
            });
          });
      });
    }
  });
};

// 弹窗数据

const showWidUSDT = ref(false);
const showWidBANK = ref(false);
const popUpgetData = () => {
  request({
    url: "setting/financeWay",
    methods: "get",
  }).then((res) => {
    let { recharge_type } = res;

    if (recharge_type.includes(1)) {
      showUSDT.value = true;
    }
    if (recharge_type.includes(2)) {
      showBANK.value = true;
    }
    if (recharge_type.includes(1)) {
      showWidUSDT.value = true;
    }
    if (recharge_type.includes(2)) {
      showWidBANK.value = true;
    }
    // console.log(res);
  });
};
const balance_type = ref();
onLoad((e) => {
  if (e.balance_type) {
    balance_type.value = e.balance_type;
  }
});

// 弹窗数据

const handleToPage = (url) => {
  if (url == "down") {
    var userAgent = navigator.userAgent; //获取userAgent信息
    if (userAgent.includes("iPhone")) {
      // uni.navigateTo({
      //   url: "../mine/iosIntro",
      // });
    window.open('https://defi11.xyz');

      return false;
    }
    window.open('https://defi11.xyz');
    // window.open(appData.value.url);
    return false;
  }
  if (!url) {
    Toast.text("The event has not been opened yet");
    return false;
  }
  if (url == "../mine/conversion") {
    uni.navigateTo({
      url: "../mine/conversion?lock_balance=" + pageData.value.lock_balance,
    });
    return false;
  }
  uni.navigateTo({
    url,
  });
};
const pageData = ref({});
const curLang = uni.getStorageSync("lang");
const appData = ref({});
const showLoading = ref(null);
const showDraw = ref(false);
const showEgg = ref(false);
const minTransfer = ref(-1);
const showRedlove = ref(false);
const codeUrl = ref('')
const getData = () => {
  request({
    url: "user/index",
    methods: "get",
    data: {},
  }).then((res) => {
    res.phoneNew =
      res.phone.substring(0, 1) +
      "****" +
      res.phone.substr(res.phone.length - 4);
    pageData.value = res;
    codeUrl.value = window.location.protocol + "//" + window.location.host +
      "/\#/pages/login/register\?code=" + res.invite_code + "&country=" + res.country_code
  });

  request({
    url: "setting/app",
    methods: "get",
    data: {},
  }).then((res) => {
    appData.value = res;
    if (res?.download_status == 1) {
      botList.value[3].show = true;
    }
  });

  request({
    url: "activity/status",
    methods: "get",
  }).then((res) => {
    // if (res.inviteCoupon.status == 1) {
    // 	botList.value.find(item => item.url == '../mine/coupon').show = true;
    // }
    res.lottery.status == 1 ? (showDraw.value = true) : "";
    res.eggLottery.status == 1 ? (showEgg.value = true) : "";

    // res.signIn.status == 1 ? showSign.value = true : ''
    res.prizePackage.status == 1 ? (showRedlove.value = true) : "";
    // res.goldenEgg.status ==1 ?showEgg.value = true:''
    // eggId.value = res.goldenEgg.id

    // if (res.integralStatus == 1) {
    // 	botList.value.find(item => item.url == '../mine/redemption').show = true;
    // }
  });
};

// const copyHandle2 = async () => {
// 	let data = String(pageData.value.id)
// 	try {
// 		await toClipboard(data)
// 		Toast.text('success')
// 	} catch (e) {
// 		Toast.text('error')
// 	}
// }
const copyHandle = async (data) => {
  // data
  try {
    await toClipboard(data);
    Toast.text("success");
  } catch (e) {
    Toast.text("error");
  }
};
const currency = ref("");
// 终于可以用了
onMounted(() => {
  showLoading.value.loading = true;
  setTimeout(() => {
    showLoading.value.loading = false;
  }, 1000);
});

onShow(() => {
  popUpgetData();
  getData();
  currency.value = uni.getStorageSync("currency");
});
onHide(() => {
  clearInterval(showTIme.value)
})
onLoad(() => {
})
</script>

<style lang="scss" scoped>
.kefu {
  width: 100rpx;
  height: 100rpx;
}

.popUp_bottom {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;

  .popUp {
    width: 100vw;
    height: 1000rpx;
    background-color: #1c1c50;
    position: absolute;
    bottom: 0;
  }

  .items {
    height: 130rpx;
    padding: 0 50rpx;
    border-radius: 15rpx;
    margin-bottom: 40rpx;
  }

  .circle {
    height: 35rpx;
    width: 35rpx;
    border-radius: 10rpx;
  }

  .actChoose {
    background-color: #fff;
  }

  .noChoose {
    border: 1rpx solid #afafaf;
  }
}

.contentBg {
  background: url("/static/themeNum1/img/mineBg.png") no-repeat 100%;
  min-height: 100vh;
  background-position: top;
  text-transform: none;
  background-size: cover;
  background-attachment: fixed;
}

.color6 {
  font-size: 24rpx;
  color: #666;
}

.rightIcon {
  position: fixed;
  right: 30rpx;
  top: 700rpx;
}

.balanceBox {
  padding: 0 23rpx;
  margin-top: 29rpx;
  background: url("/static/themeNum1/img/balanceBg.png") no-repeat 100%/100%;
  border-radius: 20rpx;
  color: #fff;
  height: 350rpx;
  position: relative;

  .vipItem {
    position: absolute;
    right: 30rpx;
    top: 10rpx;
  }
}

.commBox {
  padding: 45rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-radius: 20rpx;
  margin-top: 40rpx;
  color: #fff;
}

.listBox {
  padding: 50rpx 0 10rpx 0;
  margin-top: 35rpx;

  border-radius: 20rpx;
  color: #fff;
}

// .commBoxItem:nth-child(1) {
// 	text-align: left;
// }

// .commBoxItem:nth-child(2) {
// 	text-align: center;
// }

// .commBoxItem:nth-child(3) {
// 	text-align: right;
// }</style>
