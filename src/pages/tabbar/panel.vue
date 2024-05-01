<template>
   <!-- <topNavbar-menu
      icon="/src/static//qushi-white.png"
      @clickMenu="popShow = true"
      @clickIcon="jump('/pages/marks/index?id=' + pid)"
   >
      {{ pDetial.pro_name }}/USDT{{ $t('sec.a1') }}
   </topNavbar-menu> -->

   <view class="between pdlr30" style="padding-top: 20rpx;">
      <nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
         <img class="kefu" type="primary" src="../../static/kefu.png" alt="" @click="jump('../mine/service')">
      </nut-drag>
      <view class="">
      </view>
      <view class="f34">
         {{ pro_name }}/USDT
      </view>

      <view style="width: 30rpx;" @click="jump('../mine/panelPage')">
         <image style="width: 48rpx;height: 48rpx;" src="../../static/gdjl.png" mode=""></image>
      </view>
   </view>
   <view class="pl40  f40 pdtb30 flex col_center" v-show="false">

      <image src="../../static/list.png" mode="aspectFit" style="width: 60upx; height: 60upx" @click="popShow = true">
      </image>

      <view class="ml20">
         {{ t('pk.t_p1') }}
         <!-- {{ pDetial.pro_name }}/USDT{{ $t('sec.a1') }} -->
      </view>
      <!-- popShow -->
   </view>
   <view class="container cont1">
      <view class="heads">
         <view class="money-total between" style="flex: 1">
            <view class="head-left head-item">
               <view class="" style="font-size: 42upx; color: #ed3b5d">{{ nowData.close }}</view>
               <view class="" style="font-size: 23upx"></view>
               <view style="font-size: 23upx">{{ $t('mark.a1') }}:{{ nowData.close }}</view>
            </view>
            <view class="head-right head-item">
               <view class="right-row">
                  <view class="right-item">
                     <view style="color: #999999">{{ $t('mark.a2') }}</view>
                     <view>{{ nowData.high }}</view>
                  </view>
                  <view class="right-item" style="text-align: right">
                     <view style="color: #999999">{{ $t('mark.a3') }}</view>
                     <view>{{ nowData.low }}</view>
                  </view>
               </view>
               <view class="right-row">
                  <view class="right-item">
                     <view style="color: #999999">{{ $t('mark.a4') }}</view>
                     <view>{{ nowData.close }}</view>
                  </view>
                  <view class="right-item" style="text-align: right">
                     <view style="color: #999999">Vol</view>
                     <view>{{ Number(nowData.vol).toFixed(2) }}</view>
                  </view>
               </view>
            </view>
         </view>
         <view class="right-icon ml40" @click="viewOpen = !viewOpen" v-show="false">
            <image v-if="viewOpen" src="/src/static/view-open.png" mode="aspectFit" style="width: 72upx; height: 72upx">
            </image>
            <image v-else src="/src/static/view-off.png" mode="aspectFit" style="width: 72upx; height: 72upx"></image>
         </view>
      </view>
      <!-- k线图 / 表格 -->
      <view class="table-view" v-show="viewOpen">
         <view class="flex f28" style="color: #999">
            <text style="width: 33%">{{ $t('sec.a2') }}</text>
            <text style="width: 33%">{{ $t('sec.a3') }}</text>
            <text style="text-align: right; width: 34%">{{ $t('sec.a4') }}</text>
         </view>
         <view class="flex mt10 f28" v-for="(item, index) in chartData">
            <text style="width: 33%">{{ index + 1 }}</text>
            <text style="width: 33%">{{ item.amount.toFixed(4) }}</text>

            <text style="text-align: right; width: 34%" :class="item.open < item.close ? 'colorUp' : 'colorDown'">
               {{ item.close.toFixed(2) }}
            </text>
         </view>
      </view>

      <view class="k-line-chart-container" v-show="!viewOpen">
         <view style="display: flex">
            <view class="timerBtnListEl">
               Time:
               <view class="timeItem" v-for="(item, index) in timerBtnList"
                  :class="timerBtnInd == index ? 'actColor' : ''" @click="changeTimeSelect(item, index)">
                  {{ item.name }}
               </view>
            </view>
            <view class="timerBtnListEl">
               <view class="timeItem" v-for="(item, index) in candTypeList"
                  :class="candTypeInd == index ? 'actColor' : ''" @click="setType(item, index)">
                  {{ item.key }}
               </view>
            </view>
         </view>
         <div id="indicator-k-line" class="k-line-chart" />
      </view>
      <!-- <mjCharts :dataList1="chartData"></mjCharts> -->

      <view class="buy-btn-row between h88 mt40" v-show="false">
         <view class="btn-normal grow1 mr14 center" :class="{ 'btn-more': buyType == 1 }" @click="buyType = 1">
            {{ $t('sec.a5') }}
         </view>
         <view class="btn-normal grow1 ml14 center" :class="{ 'btn-short': buyType == 2 }" @click="buyType = 2">
            {{ $t('sec.a6') }}
         </view>
      </view>
      <!-- :class="{ 'btn-more': buyType == 1, 'btn-short': buyType == 2 }" -->
      <view class="btn-normal submit-btn h88" style="text-align: center"
          @click="buyTostShow = true">
         {{ t('pk.t_p2') }}

      </view>
      <view style="height: 100rpx;">

      </view>

      <!-- 时间选择 -->
      <scroll-view scroll-x="true">
         <view class="sec-scroll-view">
            <view class="sec-item" :class="{ 'active-sec': times == item.time }" v-for="(item, index) in pDetial.times"
               @click="times = item.time">
               <view class="item-cont">
                  <text style="font-size: 53rpx">{{ item.time }}</text>
                  <text style="font-size: 33rpx">Sec</text>
               </view>
               <view class="item-bfb">{{ item.rate }}%</view>
            </view>
         </view>
      </scroll-view>
      <!-- 购买商品的类型信息 -->
      <!-- <view class="cont-block block-item" v-show="false">
         <view class="item-label">
            <view class="label-title">{{$t('newAdd2.n_n3')}}</view>
            <view class="label-cont">{{ pDetial.pro_name }}/USDT</view>
         </view>
         <view class="item-label">
            <view class="label-title">{{$t('newAdd2.n_n2')}}</view>
            <view class="label-cont" style="color: #06ad90" v-if="buyType == 1">{{ $t('sec.a5') }}</view>
            <view class="label-cont" style="color: #ed3b5d" v-else-if="buyType == 2">{{ $t('sec.a6') }}</view>
         </view>
         <view class="item-label" style="text-align: right">
            <view class="label-title">{{$t('newAdd2.n_n1')}}</view>
            <view class="label-cont">{{nowData.close}}</view>
         </view>
      </view> -->
      <!-- 购买商品金额填写栏 -->
      <!-- <view class="cont-block" v-show="false">
         <view class="block-item block-grow-item">
            <view class="item-label">
               <view class="label-title label-flex">
                  <text>{{ $t('sec.a8') }}</text>
                  <view style="display: flex; align-items: center">
                     {{ $t('sec.a9') }} {{ tradeBalance }}
                     <image
                        src="/src/static/jiaoyi.png"
                        mode="aspectFit"
                       
                        style="width: 26upx; height: 26upx; margin-left: 20upx"
                     ></image>
                  </view>
               </view>
               <view class="label-cont label-flex" style="border-bottom: 1px solid #999999; padding-bottom: 10upx">
                  <input
                     class="grow1"
                     type="text"
                     v-model="price"
                     :placeholder="$t('newAdd2.n_n21')"
                     placeholder-style="font-weight:100"
                  />
                  <text class="ml24" style="color: #7273f7">{{ $t('all.a0') }}</text>
               </view>
            </view>
         </view>
      </view> -->
      <!-- 提交按钮 -->

   </view>


   <!-- 下半部分 订单 -->
   <view class="order" v-show="false">
      <!-- <view class="between mt28 pdlr28" >
         <view class="center h88" style="color: #fff">{{$t('tabbar.a4')}}</view>
         <view class="right-icon center" @click="jump('/pages/Mine/EuteresRecord')">
           <image
               src="../../static/allorder.png"
               style="width: 32upx; height: 32upx; margin-right: 12upx"
               mode="aspectFit"
            ></image>
            <text style="color: #fff">{{ $t('all.a0') }}</text>
         </view>
      </view> -->
      <!-- 内容区 -->
      <view v-show="false">
         <!-- 空内容 -->
         <view class="flex-col center pdtb160" v-if="recordList.length == 0">
            <!--            <image src="/src/static/notdata.png" mode="aspectFit" style="width: 240upx; height: 240upx"></image> -->
            <text>{{ $t('ter.a6') }}</text>
         </view>
         <!-- 订单 -->
         <view class="record pb28" style="width: 100%" v-else>
            <view class="record-item pdtb28 pdlr28 mglr28 mgtb28"
               style="background-color: #242424; border-radius: 20upx" v-for="item in recordList">
               <view class="item-row between">
                  <view style="color: #666">{{ $t('sec.c1') }} </view>
                  <view>{{ item.product.pro_name }}</view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b2') }}</view>
                  <view>{{ item.price }}</view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b3') }}</view>
                  <view>{{ item.start_price }}</view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b4') }}</view>
                  <view v-if="item.end_price">{{ item.end_price }}</view>
                  <view v-else>{{ $t('sec.b5') }}</view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b6') }}</view>
                  <view>
                     <!-- 					  $t('sec.b7')  -->

                     <text v-if="item.status == 1">{{ item.rest_time }}</text>
                     <text v-else-if="item.status == 2">{{ $t('sec.b8') }}</text>
                     <text v-else-if="item.status == 3">{{ $t('sec.b9') }}</text>
                  </view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b10') }}</view>
                  <view>
                     <text v-if="item.buy_type == 1">{{ $t('sec.b11') }}</text>
                     <text v-else-if="item.buy_type == 2">{{ $t('sec.b12') }}</text>
                  </view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b13') }}</view>
                  <view>{{ item.times }}</view>
               </view>
               <view class="item-row between mt20">
                  <view style="color: #666">{{ $t('sec.b14') }}</view>
                  <view>{{ item.create_time }}</view>
               </view>
            </view>
         </view>
      </view>
   </view>
   <!-- 商品列表弹窗 -->
   <nut-overlay v-model:visible="popShow" :overlay-style="{ background: 'rgba(0,0,0,0.3)' }"
      :close-on-click-overlay="true">
      <view class="pop-wrap">
         <view class="pop-head h88 pl28" style="background: #1a1a1a; color: #fff">
            USDT {{ $t('sec.b15') }}
         </view>
         <view class="pop-tabs flex" style="border-bottom: 1px solid #f1f1f1">
            <view class="pop-tab h88 pdlr28" style="border-bottom: 2px solid #fff; color: #fff">USDT</view>
         </view>
         <view class="pop-list">
            <view class="list-item pdlr28 pdtb28  " :class="{ 'active-item': pid == item.id }"
               style="border-bottom: 1px solid #f1f1f1" v-for="(item, index) in productList"
               @click="changeProduct(item)">
               <view class="item-left">
                  <view>
                     <text>{{ item.pro_name }}</text>
                     <text class="f24">/USDT</text>
                  </view>
                  <view class="f24 mt8">24h / {{ item.vol }}</view>
               </view>
               <view class="item-right" style="text-align: right">
                  <view class="f34" :class="item.is_rise == 2 ? 'colorUp' : 'colorDown'">{{ item.price }}</view>
                  <view class="f24 mt8" :class="item.is_rise == 2 ? 'colorUp' : 'colorDown'">
                     {{ item.is_rise == 1 ? '-' : '+' }} {{ item.rise_rate }}%
                  </view>
               </view>
            </view>
         </view>
      </view>
   </nut-overlay>
   <!-- 下注成功弹窗 -->
   <!-- <van-popup v-if='false' v-model:show="successPurchasePop" position="bottom" :round="true" style="background: #1a1a1a;">
      <view class="head pdtb28 pdlr28 f32" style="font-weight: bold; border-bottom: 1px solid #5b5b5b">
         {{ pDetial.pro_name }}/USDT
      </view>
	  
      <view class="center f72 h160">{{ purchaseMsg.times }}</view>
	  <view class="text_center">{{$t('newAdd3.a_a5')}}</view>
      <view class="wrap pdlr28">
         <view class="between mt28">
            <view>{{ $t('add.b3') }}</view>
            <view style="font-weight: bold">{{ purchaseMsg.start_price }}</view>
         </view>
         <view class="between mt28">
            <view>{{ $t('add.b4') }}</view>
            <view style="font-weight: bold">{{ times }}</view>
         </view>
         <view class="between mt28">
            <view>{{ $t('add.b2') }}</view>
            <view style="font-weight: bold">
               <text v-if="buyType == 1">{{ $t('sec.a5') }}</text>
               <text v-if="buyType == 2">{{ $t('sec.a6') }}</text>
            </view>
         </view>
         <view class="between mt28 mb28">
            <view>{{ $t('sec.a8') }}</view>
            <view style="font-weight: bold">{{ price }}</view>
         </view>
      </view>
      <view class="buy-btn mglr28 mgtb28" style="color: #fff;" @click="successPurchasePop = false">{{$t('all.a2')}}</view>
   </van-popup> -->
   <view class="buyTost" v-show="buyTostShow">
      <view class="buyCard">
         <view class="flex ml32 mt48 mr32" style="text-align: center;justify-content: center; position: relative;">
            <view> {{ t('pk.t_p3') }}
            </view>
            <img style="position: absolute; top: 0; right: 0;" src="../../static/themeNum1/l_icon/down.png" alt="" class="ml176" @click="buyTost(false)">
         </view>
         <view class="paddingLR30 mt32 flex" style="justify-content: space-between;">
            <view class="pt30 pb30">{{ pro_name }}/USDT</view>
            <view @click="jump('../recharge/means?type=recharge')" class="pt30 pb30 pl30 pr30"
               style="background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);border-radius: 16rpx 16rpx 16rpx 16rpx;">
               {{ t('pk.t_p4') }}
            </view>
         </view>
         <view class="paddingLR30 mt32">{{ t('pk.t_p5') }} (min: {{ amount }} {{currency}})</view>
         <input v-model="amount10" class="moenyIn mt16 ml32" type="text" placeholder="Please enter amount">
         <view>

         </view>
         <view class="paddingLR30  PlaceAbet flex">{{ t('pk.t_p6') }}:{{ aiBalance }} {{currency}}</view>
         <view class="paddingLR30 mt16 PlaceAbet flex">

            <!-- <view @click="amount = 1000">1000</view>
            <view @click="amount = 2000">2000</view>
            <view @click="amount = 3000">3000</view> -->
            <view @click="allIn()">{{ t('pk.t_p7') }}</view>
         </view>
         <view class="paddingLR30 mt24 flex"
            style="justify-content: space-between;font-weight: 400;font-size: 32rpx;color: #FFFFFF;">
            <view>{{ t('pk.t_p8') }}: {{ aiBalance }} {{currency}}</view>
         </view>
         <view class="paddingLR30 mt24 flex"
            style="justify-content: space-between;font-weight: 400;font-size: 32rpx;color: #FFFFFF;">
            <view>{{ t('pk.t_p9') }}: {{ lockT }} min</view>
         </view>

         <!-- {{ amount + (amount * rate) }} -->
         <view class="mt16 paddingLR30" style="font-weight: 400;font-size: 32rpx;color: #04E1F4;">{{ t('pk.t_p10') }}:
            1%~10%
         </view>
         <view class="mt16 paddingLR30" style="font-weight: 400;font-size: 32rpx;color: #04E1F4;">{{ t('pk.t_p11') }}:
            {{
               (aiBalance * 0.01).toFixed(2) }} ~ {{ (aiBalance * 0.1).toFixed(2) }}</view>
         <view class="confirmBtn" @click="submitAdd">
            {{ t('pk.t_p12') }}
         </view>
      </view>
   </view>
   <!--   <TabBar currentIndex="3"></TabBar> -->
   <Tabbar :activeIndex="1"></Tabbar>
   <Loading ref="showLoading"></Loading>
   <Loading2 ref="showLoading2"></Loading2>
</template>

<script setup>
import { dispose, init, registerIndicator } from 'klinecharts';
import * as echarts from 'echarts';
import request from '../../../comm/request.ts';
import mjCharts from '@/components/echarts/mjCharts.vue';
import { onLoad, onHide, onShow } from '@dcloudio/uni-app';
import { computed, getCurrentInstance } from 'vue';
import { Toast } from "@nutui/nutui";
import Tabbar from '@/components/botTabbar/botTabbar.vue';
import Loading2 from '@/components/loading/loading2.vue';
import FullMask from "@/components/fullMask/fullMask";
import {
   useI18n
} from "vue-i18n";
const {
   t
} = useI18n();
//allIn
const amountIn = ref()
const allIn = () => {
   amount10.value = aiBalance.value
}
// import getOption from './option.js';
const { proxy } = getCurrentInstance();
const aiBalance = ref('')
let viewOpen = ref(false);
let popShow = ref(false);
const buyTostShow = ref(false)
const amount = ref(1000)
const buyTost = (falg) => {
   buyTostShow.value = falg
}
function jump(url) {
   uni.navigateTo({
      url
   });
}
const chartData = ref([]);

const back = () => {
   history.back()
}

let tradeBalance = ref(0);
const currency = ref()
function getUserInfo() {
   request({
      url: '/user/index',
      methods: 'GET'
   }).then((res) => {
      tradeBalance.value = res.job_balance;
      aiBalance.value = res.ai_balance
      amount10.value = res.ai_balance
   });

   // 获取货币符号
   request({
      url: "/setting/currency",
      methods: "get",
   }).then((res) => {
      uni.setStorageSync("currency", res.currency);
      currency.value = res.currency
   });
}

let productList = ref([]); //产品列表
let pid = ref(0);
let pDetial = ref({}); //商品详情
let times = ref(0); //开奖时间选择
let buyType = ref(1); //购买类型
let price = ref(''); //购买价格
const amount10 = ref()



// const countdown = async(item) =>{
// 	// let data = await fn(item)
// 	// return data

// }

function getProductList() {
   uni.showLoading();
   request({
      url: 'page/trade/productList',
      methods: 'get'
   })
      .then((res) => {
         productList.value = res;

         config()

         console.log(pid.value);

      })
      .catch()
      .finally((res) => uni.hideLoading());
}

function changeProduct(item) {
   recordList.value = [];
   pid.value = item.id;
   chart.value.applyNewData([], true);
   clearInterval(timer.value);
   getProductDetail();
   getRecord();
   startTime();
   popShow.value = false;
}

const nowData = ref({});
const myChart = ref('');
const candTypeInd = ref(0);
const candTypeList = [
   { key: 'candle_solid', text: 'All solid' },
   { key: 'candle_stroke', text: 'All stroke' },
   { key: 'candle_up_stroke', text: 'Up stroke' },
   { key: 'candle_down_stroke', text: 'Down stroke' },
   { key: 'ohlc', text: 'OHLC' },
   { key: 'area', text: 'Area' }
];
const setType = (type, index) => {
   chart.value.setStyles({
      candle: { type: type.key }
   });
   candTypeInd.value = index;
};
const lockT = ref('')
const timerBtnInd = ref(0);
const changeTimeSelect = (item, index) => {
   pageData.value.period = item.value;
   clearInterval(timer.value);
   chart.value.clearData();
   // startTime();
   getKlineData();
   timerBtnInd.value = index;
};
const timerBtnList = ref([
   {
      name: '1min',
      value: '1min'
   },
   {
      name: '5min',
      value: '5min'
   },
   {
      name: '15min',
      value: '15min'
   },
   {
      name: '30min',
      value: '30min'
   },
   {
      name: '1h',
      value: '60min'
   },
   {
      name: '4h',
      value: '4hour'
   },
   {
      name: '1mon',
      value: '1mon'
   }
   // 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon
]);
const pageData = ref({
   period: '1min',
   size: 500,
   symbol: ''
});
const getKlineData = () => {
   if (pDetial.value) {
      let sys = (pDetial.value.pro_name + 'usdt').toLowerCase();
      pageData.value.symbol = sys;
      console.log(pageData.value);
      uni.request({
         url: 'https://api.huobi.pro/market/history/kline',
         data: pageData.value,
         method: 'get'
      }).then((res) => {

         chartData.value = res.data.data.reverse();
         const lengtData = res.data.data.length - 1
         nowData.value = res.data.data[lengtData]



         applyChartData();
      });
   }
};
const mainIndicators = ['MA', 'EMA', 'SAR'];
const subIndicators = ['VOL', 'MACD', 'KDJ'];

const chart = ref('');
const paneId = ref(null);
const applyChartData = () => {
   if (!chart.value) {
      chart.value = init('indicator-k-line');
      paneId.value = chart.value.createIndicator('VOL');
      chart.value.setStyles({
         grid: {
            show: false
         }
      });
      // 设置MACD指标图的高度为300
      let macdPaneId = chart.value.createIndicator('MACD', [12, 26, 9], paneId.value);
      chart.value.setPaneOptions({
         id: macdPaneId,
         height: 140
      });

      // chart.value.createIndicator('EMA', false, {
      //    id: 'candle_pane'
      // });

      // 设置VOL指标图的高度为150
      chart.value.setPaneOptions({
         id: paneId.value
      });

      let data = changeDataType(chartData.value);
      chart.value.applyNewData(data);
      chart.value.setBarSpace(5);
   } else if (chart.value.getDataList().length == 0) {
      chart.value.applyNewData([], true);
      let data = changeDataType(chartData.value);
      chart.value.clearData();
      chart.value.applyNewData(data);
   } else {
      let data = changeDataType([chartData.value[chartData.value.length - 1]]);
      chart.value.clearData();
      chart.value.updateData(data);
   }

   if (chartData.value[0].close < 1) {
      chart.value.setPriceVolumePrecision(5, 0);
   } else {
      chart.value.setPriceVolumePrecision(2, 2);
   }
};

function getProductDetail() {
   uni.showLoading();
   request({
      url: 'page/trade/productInfo',
      methods: 'post',
      data: {
         pid: pid.value
      }
   }).then((res) => {
      pDetial.value = res;
      getKlineData();
   })
      .catch()
      .finally((res) => uni.hideLoading());
}

let successPurchasePop = ref(false);
let purchaseMsg = ref({});
let purchaseTime = ref(null);

function submit() {
   if (times.value == 0) {
      return Toast.text(proxy.$t('add.b5'));
   }
   if (price.value == 0) return Toast.text('Vui lòng nhập số tiền');
   uni.showLoading();
   request({
      url: '/trade/trade',
      methods: 'POST',
      data: {
         pid: pid.value,
         times: times.value,
         price: price.value,
         buy_type: buyType.value
      }
   })
      .then((res) => {
         console.log(res, 'ss')
         purchaseMsg.value = res;
         if (purchaseTime.value) clearInterval(purchaseTime.value);
         getRecord();
         purchaseTime.value = setInterval(() => {
            purchaseMsg.value.times--;
            if (purchaseMsg.value.times == 0) {
               clearInterval(purchaseTime.value);
               successPurchasePop.value = false;
               uni.showLoading()
               setTimeout(() => {
                  uni.hideLoading()
                  getRecord();
               }, 5000)
            }
         }, 1000);
         Toast.text(proxy.$t('add.b1'));
         successPurchasePop.value = true;
      })
      .catch((err) => Toast.text(err.message))
      .finally((res) => uni.hideLoading());
}

let recordPage = ref(1);
let recordSize = ref(10);
let recordList = ref([]);

function getRecord() {
   // uni.showLoading();
   request({
      url: '/trade/tradeLog',
      methods: 'get',
      data: {
         pid: pid.value,
         page: recordPage.value,
         size: recordSize.value
      }
   }).then((res) => {
      recordList.value = res.data;
   })
      .catch((err) => Toast.text(err.message))
      .finally((res) => uni.hideLoading());
}

const timer = ref(null);
const startTime = () => {
   timer.value = setInterval(() => {
      getKlineData();
   }, 5000);
};


const submitAdd = () => {
   console.log('123')
   // if (amount10.value<amount.value) {
   //    Toast.text(t('pk.t_p13'))
   //    return
   // }
   // if (amount10.value>aiBalance.value) {
   //    Toast.text(t('pk.t_p14'))
   //    return
   // }
   request({
      url: 'activity/follow/follow',
      methods: 'post',
      data: {
         amount: amount10.value,
         project_id: pid.value
      }
   }).then((res) => {
      Toast.text('successfully ordered')
      history.back()
   }).catch(err => {
      Toast.text(err.message)
   })
}

const rate = ref()
const config = () => {
   request({
      url: 'activity/follow/config',
      methods: 'get',
   }).then((res) => {
      console.log(res, 'sss')
      rate.value = res.rate / 100
      pid.value = res.pid;
      pro_name.value = res.pro_name
      lockT.value = res.end_time
      amount.value = res.min_price
      amountIn.value = res.min_price
      getUserInfo();
      getProductDetail();
      startTimeTwo();
      startTime();
   }).catch(err => {
      Toast.text(err.message)
   })
}
const pro_name = ref()
onLoad((e) => {
   if (e.type) {
      buyType.value = e.type;
   }

   getProductList();
   // config()
});
const timerTwo = ref()
const startTimeTwo = () => {
   timerTwo.value = setInterval(() => {
      // getRecord();
   }, 3000);
};


onUnmounted(() => {
   if (timerTwo.value) {
      clearInterval(timerTwo.value);

   }
   if (timer.value) {
      clearInterval(timer.value);
   }
});


const setTooltip = (chart) => {
   chart.applyOptions({
      priceScale: {
         position: 'right'
      },
      timeScale: {
         timeVisible: true
      }
   });

   chart.addCandlestickSeries({
      upColor: '#00ff00',
      downColor: '#ff0000',
      borderDownColor: '#ff0000',
      borderUpColor: '#00ff00',
      wickDownColor: '#ff0000',
      wickUpColor: '#00ff00'
   });

   chart.applyOptions({
      layout: {
         backgroundColor: '#253248',
         textColor: 'rgba(255, 255, 255, 0.9)'
      },
      grid: {
         vertLines: {
            color: '#334158'
         },
         horzLines: {
            color: '#334158'
         }
      }
   });

   chart.subscribeCrosshairMove((param) => {
      if (param.time) {
         const price = param.seriesPrices.get(chart.series()[0]);
         const tooltipContent = document.createElement('div');

         tooltipContent.innerHTML = `
		            <div class="custom-tooltip">
		                <div>Time: ${param.time}</div>
		                <div>Price: ${price}</div>
		            </div>
		        `;

         tooltipContent.style.padding = '4px 8px';
         tooltipContent.style.backgroundColor = '#253248';
         tooltipContent.style.color = 'white';
         tooltipContent.style.fontSize = '14px';

         chart.applyOptions({
            crosshair: {
               horzLine: {
                  visible: false
               },
               vertLine: {
                  color: '#6A5ACD',
                  style: 1,
                  visible: true,
                  width: 1
               }
            },
            tooltip: {
               position: param.point,
               formatter: () => {
                  return tooltipContent.outerHTML;
               }
            }
         });
      } else {
         chart.applyOptions({
            crosshair: {
               horzLine: {
                  visible: true
               },
               vertLine: {
                  visible: false
               }
            },
            tooltip: {
               visible: false
            }
         });
      }
   });
};

const setMainIndicator = (name) => {
   chart.value.createIndicator(name, false, {
      id: 'candle_pane'
   });
};
const setSubIndicator = (name) => {
   chart.value.createIndicator(name, false, {
      id: paneId.value
   });
};

const timestampToDateTime = (timestamp) => {
   // 时间戳转时间
   const time = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour12: false,
   });
   console.log('time', time);
   //   alert(time)
   const date = new Date(timestamp * 1000);
   const year = date.getFullYear();
   const month = ('0' + (date.getMonth() + 1)).slice(-2);
   const day = ('0' + date.getDate()).slice(-2);
   const hours = ('0' + date.getHours()).slice(-2);
   const minutes = ('0' + date.getMinutes()).slice(-2);
   const seconds = ('0' + date.getSeconds()).slice(-2);
   // console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
   return time;
};

const changeDataType = (Arr) => {
   const newArr = Arr.map((item) => {
      return (item = {
         timestamp: timestampToDateTime(item.id),
         open: item.open,
         low: item.low,
         high: item.high,
         close: item.close,
         volume: item.vol
      });
   });
   return newArr;
};
onLoad(() => {

})
</script>

<style lang="scss" scoped>
.kefu {
   width: 100rpx;
   height: 100rpx;
}

.confirmBtn {
   width: 686rpx;
   height: 88rpx;
   background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
   border-radius: 16rpx 16rpx 16rpx 16rpx;
   line-height: 88rpx;
   text-align: center;
   margin: 56rpx auto 0;
}

.PlaceAbet {
   justify-content: space-between;
   line-height: 96rpx;
   text-align: center;

   view {
      // width: 160rpx;
      padding: 0 30rpx 0 30rpx;
      height: 96rpx;
      background: #004284;
      border-radius: 24rpx 24rpx 24rpx 24rpx;
   }
}

.moenyIn {
   width: 638rpx;
   padding: 0 24rpx;
   height: 96rpx;
   background: #004284;
   border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.paddingLR30 {
   padding: 0 30rpx;
}

.buyTost {
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.50);
   position: fixed;
   top: 0;
   z-index: 99;

}

.buyCard {
   width: 750rpx;
   // height: 824rpx;
   background-color: rgba(0, 38, 76, 1);
   overflow: hidden;
   position: fixed;
   bottom: 100rpx;
   padding-bottom: 50rpx;
}

.heads {
   display: flex;
   justify-content: space-between;

   .head-item {
      height: 120upx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

   .right-row {
      font-size: 22upx;
      width: 220upx;
      display: flex;
      justify-content: space-between;

      .right-item {
         width: 50%;
      }
   }
}

.between view:nth-child(1) {
   color: #5b5b5b;
}

.timerBtnListEl {
   padding: 10rpx 20rpx;
   display: flex;
   width: 50%;
   overflow: scroll;
   color: #ccc;

   .timeItem {
      // width: 100rpx;
      text-align: center;
      margin-right: 10rpx;
   }

   .actColor {
      color: #1a73e8;
   }
}

.cont2 {
   margin-top: 10upx;

   .head-left {
      border-bottom: 2px solid #7273f7;
      color: #7273f7;
      padding-bottom: 10upx;
   }

   .head-right {
      display: flex;
      align-items: center;
   }
}

.container {
   padding: 28upx;
}

.head {
   display: flex;
   align-items: center;
   justify-content: space-between;
}

.table-view {
   .table-row {
      display: flex;
      // justify-content: space-between;
      font-size: 24upx;
      margin-top: 20upx;
   }
}

.k-view {
   height: 360upx;
}

.btn-normal {
   position: fixed;
   bottom: 150rpx;
   width: 96%;
   left: 50%;
   margin-left: -48%;
   font-size: 44rpx;
   line-height: 144rpx;
   height: 144rpx;
   z-index: 99;
   background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%) !important;
   border-radius: 8px 8px 8px 8px;
}

.btn-more {
   background: #06ad90;
   color: #fff !important;
}

.btn-short {
   background: #ed3b5d;
   color: #fff;
}

.buy-btn-row {
   display: flex;
   justify-content: space-between;

   .btn-disabled {
      background: #e0e0e0;
      border-radius: 10rpx;
      color: #333;
   }
}

.sec-scroll-view {
   margin-top: 28upx;
   display: flex;

   .sec-item {
      margin-right: 24upx;
      flex-shrink: 0;
      width: 192rpx;
      background: #2e2e2e;
      box-shadow: 0rpx 4rpx 10rpx 1rpx rgba(217, 217, 217, 0.52);
      border-radius: 10rpx;
      color: #5b5b5b;

      .item-cont {
         height: 110upx;
         line-height: 110upx;
         text-align: center;
      }

      .item-bfb {
         height: 67rpx;
         background: #121212;
         border-radius: 10rpx 10rpx 0 0;
         text-align: center;
         line-height: 67upx;
      }
   }

   .active-sec {
      color: #fff;
      background: #354FAF;
      box-shadow: #fff;

      .item-bfb {
         background-color: #2a418f;
      }
   }
}

.cont-block {
   margin-top: 28upx;
   display: flex;
   justify-content: space-between;
}

.block-item {
   padding: 28upx;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background: #1a1a1a;
   border: 1px solid #242424;
   border-radius: 10rpx;

   .item-label {
      .label-title {
         font-size: 23rpx;
      }

      .label-cont {
         font-size: 29rpx;
         margin-top: 24upx;
         font-weight: bold;
      }

      .label-flex {
         display: flex;
         align-items: center;
         justify-content: space-between;
      }
   }
}

.block-grow-item {
   flex-grow: 1;

   .item-label {
      width: 100%;
   }
}

.money-scroll-view {
   display: flex;
   align-items: center;
   margin-top: 28upx;

   .money-item {
      padding: 10upx 28upx;
      background: #7273f7;
      color: #fff;
      border-radius: 10rpx;
   }

   .money-item:not(:first-child) {
      margin-left: 20upx;
   }
}

.buy-btn {
   height: 90rpx;
   background: #06ad90;
   border-radius: 10rpx;
   text-align: center;
   line-height: 90upx;
   margin-top: 28upx;
}

.btn-red {
   background-color: #ed3b5d;
}

.disbaled-btn {
   background: #e0e0e0;
}

.pop-wrap {
   height: 100vh;
   width: 550upx;
   background-color: #1a1a1a;

   .active-item {
      background-color: #242424;
      color: #fff !important;
   }

   .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #848186;
      background-color: #1a1a1a;
   }
}

.k-line-chart-container {
   display: flex;
   flex-direction: column;
   margin: 15px 0;
   border-radius: 2px;
   width: 100%;
   height: 1240rpx;
   padding: 16rpx 10rpx;
}

.k-line-chart-title {
   margin: 0;
   color: #252525;
   padding-bottom: 10px;
}

.k-line-chart {
   display: flex;
   flex: 1;
}

.k-line-chart-menu-container {
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-top: 10px;
   font-size: 12px;
   color: #606060;
}

.k-line-chart-menu-container .btns {
   cursor: pointer;
   background-color: #1677ff;
   border-radius: 2px;
   margin-right: 8px;
   height: 24px;
   line-height: 26px;
   padding: 0 6px;
   font-size: 12px;
   color: #fff;
   border: none;
   outline: none;
}
</style>
