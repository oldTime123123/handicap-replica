<template>
	<view style="background: #080F32;" @click="showWhere">
		<nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
			<img class="kefu" type="primary" src="../../static/kefu.png" alt=""
				@click="handleToPage('../mine/service')">
		</nut-drag>
		<view>
			<view class="flex between topNav">
				<image src="../../static/logoindex.png" mode="widthFix" style="width: 120rpx;"></image>
				<!-- @click="handleToPage('../mine/service')" -->
				<view class="flex" style="align-items: center;">
					<view style="display: flex;justify-content: right;margin-right: 20rpx;" v-if="login">
						<view class="topbtnSize topbtnText1" @click="handleToPage('../login/register')">
							{{ t('pk.t_i1') }}
						</view>
						<view class="topbtnSize topbtnText2" @click="handleToPage('../login/login')">
							{{ t('pk.t_i2') }}

						</view>
					</view>
					<view class="appTime" style="margin-right: 20rpx;" v-if="!login">
						<image style="width:32rpx;height: 32rpx;margin-right: 10rpx;" src="../../static/biao.png"
							mode=""></image>
						UTC+7-{{ servetTime }}
					</view>
					<img class="ml12 mr12" src="../../static/top1.png" alt="" @click="handleToPage('down')">
					<nut-badge dot v-if="showBadge" right="10" top="5" size>
						<img class="ml12 mr24" src="../../static/top2.png" @click="handleToPage('../mine/notice')"
							alt="" v-show="!login">
					</nut-badge>
					<img class="ml12 mr24" v-else src="../../static/top2.png" @click="handleToPage('../mine/notice')"
						alt="" v-show="!login">

					<image src="/static/themeNum1/icon/indexlang1.png" style="width:52rpx;height:52rpx"
						@click="handleToPage('../mine/langSetting')"></image>
				</view>




			</view>

			<!--  -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" next-margin="20"
				:circular="true" style="height: 400rpx">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.banner_image" mode="widthFix" style="width: 100%;"></image>
				</swiper-item>
			</swiper>

			<view style="
            position: absolute;
            width: 100%;
            height: 210rpx;
            bottom: -100rpx;
            display: none;
          ">
				<view class="pdlr30">
					<view class="topComm l_inpBg">
						<view class="commItem" v-for="(item, index) in commList" @click="handleToPage(item.url)"
							:class="index !== commList.lengthg - 1 ? 'mr20' : ''">
							<view class="commItem" v-if="item.show">
								<image :src="item.img" mode="widthFix" style="width: 90rpx; height: 90rpx"></image>
								<view class="mt10">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="pdlr30" style="">
			<view style="
            width: 100%;
            height: 88rpx;
            margin-top: 20rpx;
            border-radius: 10rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #00264D;
          ">
				<view style="width: 550rpx;">
					<nut-noticebar border-radius="40" :scrollable="true" :text="barText" color="#fff"
						:background="'#00264D !important'" left-icon="../../static/themeNum1/icon/laba.png">
					</nut-noticebar>
				</view>

				<view class="tz1" @click="showtz1 = true">
					{{ t('pk.t_i3') }}

				</view>
			</view>
			<nut-overlay v-model:visible="showtz1" :close-on-click-overlay="false">
				<div class="overlay-body">
					<div class="overlay-content">
						<div @click.stop="showtz1 = false" style="position: absolute;top: 20rpx;right: 30rpx;">X
						</div>
						{{ barText }}
					</div>
				</div>
			</nut-overlay>
			<!-- content1 -->
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 12rpx;">
				<view class="contentCard" @click="handleToPage('../recharge/means?type=recharge')">
					{{ t('pk.t_i4') }}

				</view>
				<view class="contentCard bg" @click="handleToPage('../withdraw/index?balance_type=1')">
					{{ t('pk.t_i5') }}

				</view>
				<view class="contentCard bg1" @click="handleToPage('../mine/service')">
					{{ t('pk.t_i6') }}

				</view>
				<view class="contentCard bg2" @click="handleToPage('../mine/service')">
					{{ t('pk.t_i7') }}

				</view>
			</view>
			<!-- content2 -->
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 12rpx;">
				<view class="contentCard2" @click="handleToPage('./construct')">
					<p style="width: 300rpx; font-size: 24rpx;line-height: 24rpx;">
						{{ t('pk.t_i8') }}
					</p>
					<view class="contentCard2text">
						{{ t('pk.t_i9') }}

					</view>
				</view>
				<view class="contentCard2" @click="handleToPage('down')"
					style="background-image: url('../../static/imgs/index/content2-2.png');">
					<p style="width: 300rpx; font-size: 24rpx;line-height: 24rpx;">
						{{ t('pk.t_i10') }}

					</p>
					<view class="contentCard2text">
						{{ t('pk.t_i11') }}
					</view>
				</view>
			</view>
			<!-- content3 -->
			<view class="" style="padding-top: 40rpx;">
				<view class="flex">
					<image style="width: 48rpx;height: 48rpx;" src="../../static/egg/icon1.png" mode=""></image>
					<view class="" style="margin-left: 10rpx;">
						{{ t('ttn.t_t1') }}：{{ Number(pageDataTwo?.ai_balance) + Number(pageDataTwo?.balance) }}
						{{ currency }}

					</view>
				</view>
				<view class="flex mt30"
					style="justify-content: space-between;height: 130rpx;background-repeat: no-repeat;background-size: 100%;">
					<view class="Basic back1 flex"
						style="flex-direction: column;width: 334rpx; height: 172rpx;justify-content: space-around;background-image: url('../../static/imgs/index/content3-1.png');background-repeat: no-repeat;background-size: 100%;">
						<view class="text1">
							{{ t('ttn.t_t2') }}
						</view>
						<view class="text2" style="margin-top: 0rpx;">
							{{ pageDataTwo?.ai_balance }} {{ currency }}
							<p>≈$ {{ (pageDataTwo?.ai_balance * kurs).toFixed(2) }}</p>
						</view>
					</view>


					<view class="Basic back2 flex"
						style="width: 334rpx; height: 172rpx;justify-content: space-around;flex-direction: column;background-image: url('../../static/imgs/index/content3-2.png');">
						<view class="text1">
							{{ t('ttn.t_t3') }}
						</view>
						<view class="text2" style="margin-top: 0rpx;">
							{{ pageDataTwo?.job_invest_balance }} {{ currency }}
							<p>≈$ {{ (pageDataTwo?.job_invest_balance * kurs).toFixed(2) }}</p>
						</view>
					</view>
				</view>
			</view>


			<!-- 不用 -->
			<view :style="store.$state.index.red" class="center" @click="showMask" v-if="showRegRed" v-show="false">
				<view style="padding: 0 190rpx; line-height: 35rpx" class="f28 text_center textHiddenThree"
					:style="{ color: '#fff' }">{{ t("other.o_a1") }}</view>
			</view>

			<view class="center" @click="handleToPage('../coupon/recive')" v-if="showParwel" v-show="false">

				<image src="/static/couIndex/couInd.png" style="width: 100%; height: 200rpx"></image>
			</view>
			<!-- 要更改的客服跳转 -->
			<view class="topComm2 mt40" v-show="false">
				<view class="commItem" v-for="(item, index) in commList2" @click="juot(item)">
					<image :src="item.img" mode="widthFix" style="width: 43rpx; height: 43rpx"></image>
					<view class="mt22 textHiddenTwo" style="height: 80rpx; width: 100%">{{ item.name }}
					</view>
					<view class="text_bold f26">{{ item.value }}</view>
					<image v-if="index == 3" style="width: 32rpx; height: 32rpx"
						src="../../static/themeNum1/icon/icon2.png" mode=""></image>
				</view>
			</view>


			<!-- invset -->
			<view class="mt69" v-if="true">
				<view class="f38 text_bold">
					{{ t("other.o_a3") }}
				</view>


				<view class="flex mt30 mb48" style="justify-content: space-between;">

					<view class="invsetbtn2" :style="invsetCard == 0 ? rechangeStyle : ''" @click="invsetChange(0)">
						{{ t('pk.t_i12') }}

					</view>
					<view class="invsetbtn2" :style="invsetCard == 1 ? rechangeStyle : ''" @click="invsetChange(1)">
						{{ t('pk.t_i13') }}

					</view>
				</view>
				<view v-show="invsetCard == 0"
					style="background-color: #080F32;border-radius: 24rpx 24rpx 24rpx 24rpx;">
					<view class="tableHead between" v-for="item in lineData">
						<view class="flex col_center item" style="width: 30%;">
							<image :src="item.pro_img" style="width:52rpx ;height: 52rpx;"></image>
							<view class="mglr14 f28 text_bold">
								<text class="text_white" style="color: #fff;">
									{{ item.pro_name }}
								</text>
								<!-- /{{ currency }} -->
								<!-- <view class="f20">Vol:{{ item.vol }}</view> -->

							</view>
						</view>
						<view class="item" style="width: 25%;">
							<view class="f28" style="color: #fff;">{{ item.price }}</view>
						</view>
						<view class="item flex" style="flex-direction:row-reverse;width: 15%;" v-show="false">
							<view class=" downEl" v-if="item.is_rise == 1">
								-{{ item.rise_rate }}%
							</view>

							<view class="upEl" v-else>
								+{{ item.rise_rate }}%
							</view>
						</view>
						<view class="btcBtn" @click="handleToPage('./panel')">
							{{ t('pk.t_i14') }}

						</view>
					</view>
					<view class="panelbottom">
						<p style="display: flex;justify-content: center;align-items: center;"
							@click="handleToPage('./panel')">
							{{ t('pk.t_i15') }}

							<img class="mr24" src="../../static/imgs/index/right.png" alt="">
						</p>
					</view>

				</view>
				<view v-show="invsetCard == 1"
					style="background-color: #042659;border-radius: 24rpx 24rpx 24rpx 24rpx;">
					<view
						style='background-color: #042659;box-sizing: border-box;padding: 40rpx 28rpx 0rpx 28rpx; margin-top: 40rpx;border-radius: 24rpx;'>
						<view class="flex"
							style="justify-content: space-between;margin-bottom: 32rpx;align-items: center;"
							v-for="item of interestList">
							<view class="flex" style="align-items: center;" @click="interest(item.id)">
								<image style="width: 246rpx;height: 164rpx;border-radius: 16rpx;" :src="item.full_img"
									mode="">
								</image>
								<view style="margin-left: 26rpx;">
									<view class="text1 textshow3" style="margin-bottom: 15rpx;width: 300rpx;">
										{{ item.title }}
									</view>
									<!-- <view class="text2">profit:{{item.rate}}</view> -->
									<view class="text2" style="margin-bottom: 15rpx;font-size: 26rpx;">
										{{ t('ttn.t_t28') }}:{{ ((item.rate) * 100).toFixed(2) }}%
									</view>
									<view class="text2" style="margin-bottom: 15rpx;font-size: 26rpx;">
										{{ t('ttn.t_t29') }}: {{ item.day }} {{ t('ttn.t_t30') }}
									</view>

								</view>
							</view>
							<view class="" style="width: 48rpx;">
								<image style="width: 36rpx;height: 36rpx;"
									src="../../static/imgs/index/content3-2-1.png" mode="" @click="interest(item.id)">
								</image>
							</view>

						</view>
					</view>
					<view class="panelbottom">
						<p style="display: flex;justify-content: center;align-items: center;"
							@click="handleToPage('./news')">
							{{ t('pk.t_i15') }}

							<img class="mr24" src="../../static/imgs/index/right.png" alt="">
						</p>
					</view>
					<view class="fg"></view>
				</view>

				<!-- Help FAQ -->

				<view>
					<view class="assist_topic">{{ t('pk.t_i16') }}</view>
					<view class="help_center">
						<view class="" v-for="item in newsList" @click="changePage(item.id)">
							<view class=""
								style="height: 99rpx;width: 100%;display: flex;justify-content: space-between;align-items: center;">
								<p class="ml34 "> {{ item.des }}</p>
								<img class="mr24" src="../../static/imgs/index/right.png" alt="">
							</view>
							<view class="fg"></view>
						</view>


					</view>
				</view>



				<view class="mt46"
					style="display: flex;width: 652rpx;padding-left: 32rpx; height: 88rpx;background: #00264D;border-radius: 20rpx 20rpx 20rpx 20rpx;border: 2rpx solid #006BF4;align-items: center;overflow: hidden;">
					<view class="bot">
					</view>
					<view style="width: 600rpx;">
						<nut-noticebar direction='vertical' :list="horseLamp1" :speed='10' :standTime='1000'
							:background="`#00264D`" :color="`#fff`" left-icon="'../../static/ims/index/bot.png'">
						</nut-noticebar>
					</view>

				</view>

				<!--  -->

				<view class="between flex-wrap mt39" style="flex-wrap: wrap" v-show="false">
					<view v-for="item in newsList" class="mb29 newsItem flex flex-col"
						style="width: 48%; border-radius: 20rpx; overflow: hidden" @click="changePage(item.id)">
						<!-- <view style="width: 100%;height:190rpx;" v-html="item.contents"></view> -->
						<image :src="item.full_cover" style="width: 100%; height: 190rpx"></image>
						<view class="pdtb25 pdlr32 f24 textHiddenOne"
							style="background-color: #151527; font-weight: bold">
							{{ item?.des }}
						</view>
					</view>
				</view>
			</view>

			<!-- Platform Introduction -->
			<view class="mt64">
				<p style="
            font-weight: 600;
            font-size: 36rpx;
            color: #FFFFFF;
            text-align: left;">
					{{ t('pk.t_i17') }}

				</p>
				<view class="mt24 pb40"
					style="width: 686rpx;background: #042659;border-radius: 16rpx 16rpx 16rpx 16rpx;overflow: hidden;">
					<p
						style="width: 632rpx;overflow: hidden;margin: 34rpx auto 10rpx;font-weight: 400;font-size: 24rpx;color: #FFFFFF;">

						{{ income.content }}
					</p>
					<view
						style="width: 632rpx; display: flex;justify-content: space-between;font-size: 24rpx; text-align: center;margin: 0 auto;">
						<view
							style="width: 311rpx;height: 116rpx;background: #004284;border-radius: 12rpx 12rpx 12rpx 12rpx;">
							<p class="mt24" style="font-weight: 500;">{{ income.day }} {{ t('pk.t_i19') }}</p>
							<p class="mt12" style="font-weight: 400;color: #007FFF;">{{ t('pk.t_i20') }}</p>
						</view>
						<view
							style="width: 311rpx;height: 116rpx;background: #004284;border-radius: 12rpx 12rpx 12rpx 12rpx;">
							<p class="mt24" style="font-weight: 500;">{{ income.income }} $</p>
							<p class="mt12" style="font-weight: 400;color: #007FFF;">{{ t('pk.t_i21') }}</p>
						</view>

					</view>
				</view>
			</view>

			<view class="newbanner" @click="changePage(newbanner.id)" v-show="false">
				<img :src="newbanner.full_cover" alt="" style="width: 100%" />
			</view>
			<view class="mt69" v-if="partnerList.length > 0" v-show="false">
				<view class="f38 text_bold">
					{{ t("other.o_a2") }}
				</view>
				<view class="between flex-wrap mt39" style="flex-wrap: wrap">
					<view v-for="(item,index) in partnerList" :key="index" class="mb29" style="
                width: 48%;
                height: 150rpx;
                border-radius: 20rpx;
                overflow: hidden;
              " @click="openLink(item)">
						<image :src="item.full_poster" style="width: 100%; height: 100%"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 150rpx"></view>
		<nut-overlay v-model:visible="show" :overlay-style="{ background: 'rgba(0,0,0,0.3)' }"
			:close-on-click-overlay="false">
			<div class="wrapper flex-col" v-if="maskInd == 0">
				<div class="normalContent desc">
					<view v-html="maskContent.content"></view>

				</div>

				<view class="center mt20">
					<image src="../../static/themeNum1/icon/closeBtn.png" mode="widthFix"
						style="width: 80rpx; height: 80rpx" @click="show = false"></image>
				</view>
			</div>

			<div class="wrapper" v-else>
				<div class="content ml30" style="
              height: 571rpx;
              background: url('/static/themeNum1/img/redMask.png') no-repeat
                100%/100%;
              position: relative;
            ">
					<view class="text_center f36 text_bold" style="
                color: #aa3922;
                padding: 0 100rpx 0 70rpx;
                margin-top: 115rpx;
                line-height: 55rpx;
              ">
						{{ t("other.o_a4") }} {{ redReg }} {{ t("other.o_a5") }}
					</view>
					<view class="center" style="
                position: absolute;
                left: 50%;
                transform: translateX(-55%);
                bottom: 80rpx;
              ">
						<view class="text_center f40 text_bold recBtn" style="color: #db4128" @click="closeMask">
							{{ t("other.o_a6") }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
	</view>

	<nut-drag v-if="prizePackage" attract :boundary="{ top: 60, left: 0, bottom: 55, right: 0 }"
		:style="{ top: '60vh', left: '0px' }">
		<image @click="handleToPage('../act/redEnvelope')" style="width: 70px; height: 80px;"
			src='../../static/actIcon/redElove/hList.png'></image>

	</nut-drag>


	<tqbTabbar :activeIndex="0"></tqbTabbar>

	<Loading ref="showLoading"></Loading>

</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue";
	import request from "../../../comm/request.ts";
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from "@nutui/nutui";
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		useI18n
	} from "vue-i18n";
	import {
		ref
	} from "vue";
	import io from 'socket.io-client'
	import {
		getLocale
	} from "i18n";
	import {
		nextTick
	} from "vue";

	const showWhere = () => {
		document.addEventListener("mousemove", function(e) {
			const x = e.clientX; /*返回鼠标相对于浏览器窗口可视区的X坐标，确保页面向下滚动是效果不会消失*/
			const y = e.clientY;
		})
	}


	const store = userStore();
	const showTIme = setInterval(() => {
		getEasternTime()
	}, 1000)
	const servetTime = ref()

	function getEasternTime() {

		const time = new Date().toLocaleString("en-US", {
			timeZone: "Asia/Jakarta",
			hour12: false,
		});
		servetTime.value = time.split(',')[1];
	}
	const lineData = ref()
	// 获取Investasikan的列表数据
	// const socket = io('https://tujdndhsjbd.xyz', {
	// 	transports: ['websocket']
	// })
	// socket.on('project', (data) => {
	// 	console.log("websocket: " + data.list);
	// 	lineData.value = data.list
	// 	// 在这里可以对服务器返回的数据进行处理
	// 	});

	// const getLineData = () => {
	// 	socket.emit('project', {
	// 		'type': 1
	// 	})
	// }
	// 获取Investasikan的列表数据
	const getLineData = () => {
		request({
			url: "page/trade/productList",
			methods: "get",
		}).then((res) => {
			console.log("resd===", res);
			lineData.value = res || [];
		});

	}


	const timer = ref(null)
	// const startTimer = () => {
	// 	timer.value = setInterval(() => {
	// 		getLineData()
	// 	}, 1000)
	// }
	const showBadge = ref(false)
	const horseLamp1 = ref(['111111111111', '2222222222222222']);
	let serviceTime = ref('')
	let sysTimer = ref(null)

	function getSysTime() {
		if (sysTimer.value) clearInterval(sysTimer.value);
		sysTimer.value = setInterval(() => {
			let reg = /(\/)/g;
			var d = new Date();
			//得到1970年⼀⽉⼀⽇到现在的秒数
			var len = d.getTime();
			//本地时间与GMT时间的时间偏移差(注意：GMT这是UTC的民间名称。GMT=UTC）
			var offset = d.getTimezoneOffset() * 60000;

			var utcTime
			//得到现在的格林尼治时间
			utcTime = len + offset - 3600000 * 5;
			let year = new Date(utcTime).getFullYear();
			let mon = new Date(utcTime).getMonth() + 1;
			let day = new Date(utcTime).getDate();
			let hours = addZero(new Date(utcTime).getHours());
			let min = addZero(new Date(utcTime).getMinutes());
			let sec = addZero(new Date(utcTime).getSeconds());
			serviceTime.value = day + '/' + mon + '/' + year + ' ' + hours + ':' + min + ':' + sec;
			uni.setStorageSync('timers', serviceTime.value);
		}, 1000);
	}

	function addZero(num) {
		let newNum = num < 10 ? '0' + num : num;
		return newNum;
	}
	const {
		t
	} = useI18n();
	const rechangeStyle = ref("background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);")
	const show = ref(false); //首页弹窗开关
	const maskInd = ref(0); //首页弹窗
	const redReg = ref(0);
	const invsetCard = ref(0); //invset切换
	const showRegRed = ref(false); //展示红包
	const newsList = ref([]);
	const pageDataTwo = ref()
	const appLink = ref(""); //安卓app下载链接
	const scnot = ref([])
	const commList = ref([{
			name: t("mine.m_c1"),
			img: "/static/themeNum1/icon/comm1.png",
			url: "https://dxaigpt.com/",
			show: true,
		},
		{
			name: t("act.m_m2"),
			img: "/static/themeNum1/icon/lanimg.png",
			// url: 'https://web.3iquant.com',
			url: "../mine/langSetting",
			show: true,
		},
		{
			name: t("other.o_a7"),
			img: "/static/themeNum1/icon/comm3.png",
			url: "../mine/share",
			show: true,
		},
		{
			name: t("other.o_a8"),
			img: "/static/themeNum1/icon/comm4.png",
			url: "down",
			show: false,
		},
	]);
	const showtz1 = ref(false)
	const login = ref(true)
	const assistData = ref([]);
	const interest = (id) => {
		uni.navigateTo({
			url: '../mine/investPage?id=' + id
		})
	}
	// invset 切换
	const invsetChange = (num) => {
		invsetCard.value = num
	}

	// 帮助中心
	const assist = () => {
		request({
			url: "page/article/lists?page=1&size=10&pos=9",
			methods: "get",
		}).then((res) => {
			assistData.value = res;
		});
	};

	const juot = (ind) => {
		if (ind.url) {
			window.open('https://t.me/AGC_GPT4');
		}
	};
	const commList2 = ref([{
			name: t("other.o_a9"),
			img: "/static/themeNum1/icon/light_one.png",
			value: "0",
		},
		{
			name: t("other.o_a10"),
			img: "/static/themeNum1/icon/light_two.png",
			value: "0",
		},
		{
			name: t("other.o_a11"),
			img: "/static/themeNum1/icon/light_three.png",
			value: "176+",
		},
		{
			name: t("other.o_a12"),
			img: "/static//themeNum1/icon/kefu2.png",
			value: "",
			url: "true",
		},
	]);

	const handleToPage = (url) => {
		if (url == "down") {
			var userAgent = navigator.userAgent; //获取userAgent信息
			if (userAgent.includes("iPhone")) {
				// uni.navigateTo({
				//   url: "../mine/iosIntro",
				// });
				window.open('https://defi11.xyz', '_blank');
				return false;
			}
			window.open('https://defi11.xyz');
			return false;
		}
		if (url.includes("https")) {
			window.location.href = url;
			return;
		}
		uni.navigateTo({
			url,
		});
	};
	const openLink = (item) => {
		if (item.link_type == 0) {
			return false;
		}
		if (item.link_type == 1) {
			window.open(item.link);
			// uni.navigateTo({
			// 	url: "../mine/iframe?url=" + 'https://www.baidu.com/'
			// })
			// window.location.href = item.link
			return false;
		}

		if (item.link_type == 2) {
			// 文章详情
			uni.navigateTo({
				url: "../mine/artcle?pos=" + item.id,
			});
		}

		// window.location.href = (url)
	};
	const closeMask = () => {
		// request({
		// 	url: 'activity/registerGift/get',
		// 	methods: 'post'
		// }).then(res => {
		// 	show.value = false
		// 	showRegRed.value = false
		// 	Toast.text(t('other.o_a13'))
		// 	getData()
		// }).catch(err => {
		// 	Toast.text(err.message)
		// })
	};

	const showMask = () => {
		show.value = true;
		maskInd.value = 1;
	};

	const changePage = (pos) => {
		uni.navigateTo({
			url: "../mine/artcle?pos=" + pos,
		});
	};

	const bannerList = ref([]); //轮播图
	const barText = ref(""); //跑马灯
	const maskContent = ref(""); //普通弹窗
	const income = ref({}); //获取天数和收入
	const appData = ref({});
	const partnerList = ref([]);
	const newbanner = ref({});
	const showCharity = ref(false);
	const showParwel = ref(false);
	const currency = ref('')
	const kurs = ref('')
	var id = ref()
	const prizePackage = ref(false)
	const showDetail = () => {
		Toast.text(barText.value)
	}
	const interestList = ref()
	const getData = () => {


		request({
			url: 'user/unreadNoticeNum',
			methods: 'get'
		}).then((res) => {
			res > 0 ? (showBadge.value = true) : (showBadge.value = false);
		});

		//获取滚动通知
		request({
			url: 'home/deposit',
			methods: 'get'
		}).then(res => {
			let messages = []
			for (let index = 0; index < res.length; index++) {
				let message = 'Account: ' + res[index].phone + ' Withdraw earnings:' + res[index].amount +
					' IDR'
				messages.push(message)
			}
			horseLamp1.value = messages
		})
		//获取天数和收入
		request({
			url: 'setting/show',
			methods: 'get'
		}).then(res => {
			income.value = res
		})
		if (localStorage.getItem('token')) {

			//获取汇率
			request({
				url: 'finance/usdt/recharge/index',
				methods: 'get'
			}).then(res => {
				kurs.value = res.rate
			})
			request({
				url: 'user/index',
				methods: 'get',
			}).then(res => {
				pageDataTwo.value = res
				id.value = res.id

			})
		}

		request({
			url: 'lixibao/list',
			methods: 'get'
		}).then(res => {
			interestList.value = res.slice(0, 4)
		})
		// 轮播图
		request({
			url: "home/banner",
			methods: "get",
		}).then((res) => {
			bannerList.value = res;
		});
		request({
			url: "activity/status",
			methods: "get",
		}).then((res) => {
			prizePackage.value = res.prizePackage.status == 1 ? true : false

		});
		// 公告
		request({
			url: "home/marquee",
			methods: "get",
		}).then((res) => {
			// res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content;

		});

		request({
			url: "activity/status",
			methods: "get",
		}).then((res) => {
			// 	res.welfare.status == 1 ? showCharity.value = true : ''
		});

		// 弹窗
		request({
			url: "home/alert",
			methods: "get",
		}).then((res) => {
			try {
				if (res.length > 0) {
					maskContent.value = res[0];
					show.value = true;
					maskInd.value = 0;
				}
			} catch (e) {
				//TODO handle the exception
			}
		});
		// 弹窗
		request({
			url: "home/other",
			methods: "get",
		}).then((res) => {
			partnerList.value = res.partner;
		});
		if (localStorage.getItem('token')) {
			request({
				url: "user/index",
				methods: "get",
			}).then((res) => {
				commList2.value[0].value = res.total_recharge;
				commList2.value[1].value = res.total_commission;
			});
		}
		//

		// 是否展示红包
		request({
			url: "home/article",
			methods: "get",
		}).then((res) => {
			newsList.value = res;
			// res.forEach(function (value, index) {
			//   if (value.id == 35) {
			//     newbanner.value = value;
			//   }
			// });
		});
		// 获取货币符号
		request({
			url: "/setting/currency",
			methods: "get",
		}).then((res) => {
			uni.setStorageSync("currency", res.currency);
			currency.value = res.currency
		});

		// app
		request({
			url: "setting/app",
			methods: "get",
			data: {},
		}).then((res) => {
			appData.value = res;
			if (res.download_status == 1) {
				commList.value.find((item) => item.url == "down").show = true;
				// commList.value[2].show = true
			}
		});
	};
	// 终于可以用了
	onShow(() => {
		getSysTime()
	});

	const showLoading = ref(null);
	onMounted(() => {
		showLoading.value.loading = true;
		setTimeout(() => {
			showLoading.value.loading = false;
		}, 1000);

		if (!uni.getStorageSync("setLang")) {
			request({
				url: "setting/lang",
				methods: "get",
			}).then((res) => {
				uni.setStorageSync("lang", res[0].lang);
				uni.setStorageSync("setLang", true);
				window.location.reload();
				return false;
			});
		}


	});

	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}

	})


	onLoad((e) => {
		getLineData()
		// startTimer()
		request({
			url: "home/article",
			methods: "get",
		}).then((res) => {
			newsList.value = res;
		});
		assist();
		getData();
		if (e.code) {
			uni.navigateTo({
				url: "../login/register?code=" + e.code,
			});
		}

		if (e.key) {
			uni.navigateTo({
				url: "../linkEgg/linkEgg?key=" + e.key,
			});
			return false;
		}

		if (localStorage.getItem('token')) {
			login.value = false
		} else {
			login.value = true
		}
	});
</script>

<style lang="scss" scoped>
	.kefu {
		width: 100rpx;
		height: 100rpx;
	}

	body {
		background-color: #080F32 !important;
	}

	.assist_topic {
		font-weight: 600;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 42rpx;
		margin: 64rpx 0 24rpx;
	}

	.help_center {
		background-color: #042659;
		margin: 0;
		box-sizing: border-box;
		border-radius: 20rpx;
		width: 686rpx;

	}

	.textshow3 {
		overflow: hidden; //隐藏超出内容
		text-overflow: ellipsis; //显示三个点
		white-space: nowrap; //不换行
	}

	.display_area {
		margin: 0 auto;
		width: 90%;
		padding: 30rpx 10rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid rgb(125, 125, 125);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main {
		// background: url('../../static/back1.png') no-repeat;
		background-size: 100% 100%;
		height: 100%;
		// 	height: 100vh;
	}

	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;

		.content {
			display: flex;
			flex-direction: column;
			width: 640rpx;
			height: 530rpx;
			border-radius: 30rpx;
			margin-top: -250rpx;
		}

		.normalContent {
			width: 640rpx;
			height: 700rpx;
			border-radius: 30rpx;
			padding: 20rpx 30rpx;
			background: url("/static/themeNum1/img/indexMask.png") no-repeat 100%/100%;
			// background-color: #fff;
			overflow: scroll;
		}

		.recBtn {
			background: linear-gradient(0deg, #fec65c 0%, #fff3ac 100%);
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 25rpx 130rpx;
		}
	}

	.topNav {
		// position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #0C1526;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 16rpx 32rpx;
		z-index: 99;
	}

	.topComm {
		border-radius: 20rpx;
		padding: 35rpx 19rpx;
		// height: 130rpx;
		// display: flex;
		// align-items: center;
		color: #fff;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		.commItem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 22rpx;
			width: 100%;
		}
	}

	.topComm2 {
		padding: 34rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 17rpx;
		color: #fff;
		border-radius: 20rpx;
		background: url("/static/themeNum1/img/lightBg.png") no-repeat 100%/100%;

		.commItem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 22rpx;
			width: 25%;
			padding: 0 20rpx;
			text-align: center;



		}
	}

	.fg {
		width: 686rpx;
		height: 0rpx;
		border: 2rpx solid #0B3B6B;
	}

	// .newLogo {
	// 	color: #fff;
	// 	border: 5rpx solid #2c52aa;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	width: 60rpx;
	// 	height: 60rpx;
	// 	border-radius: 10rpx;
	// 	text-transform: uppercase;
	// 	font-size: 30rpx;
	// 	font-weight: bold;

	// 	.textLang {
	// 		background: linear-gradient(to right bottom, #ffff7f, #ffaaff);
	// 		-webkit-background-clip: text;
	// 		color: transparent;
	// 	}

	// 	// line-height: 65rpx;
	// }

	.topbtnSize {
		width: 152rpx;
		height: 64rpx;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		border: 2rpx solid #00AAFF;
		margin-left: 16px;
	}

	.topbtnText1 {
		font-weight: 400;
		font-size: 28rpx;
		color: #02A3F4;
		line-height: 64rpx;
		text-align: center;
	}

	.topbtnText2 {
		font-weight: 400;
		font-size: 28rpx;
		color: #0C1526;
		line-height: 64rpx;
		text-align: center;
		background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	}

	.contentCard {
		width: 306rpx;
		line-height: 128rpx;
		height: 128rpx;
		background-image: url('../../static/imgs/index/content1.png');
		background-repeat: no-repeat;
		background-size: 100%;
		font-weight: 400;
		font-size: 30rpx;
		color: #FFFFFF;
		padding-left: 28rpx;
		margin-top: 16rpx;
	}

	.bg {
		background-image: url('../../static/imgs/index/content1-3.png');
	}

	.bg1 {
		background-image: url('../../static/imgs/index/content1-2.png');
	}

	.bg2 {
		background-image: url('../../static/imgs/index/content1-4.png');
	}

	.contentCard2 {
		width: 660rpx;
		line-height: 156rpx;
		height: 156rpx;
		background-image: url('../../static/imgs/index/content2.png');
		background-repeat: no-repeat;
		background-size: 100%;
		font-weight: 400;
		font-size: 30rpx;
		color: #FFFFFF;
		padding-left: 28rpx;
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: space-between;

		p {
			margin-left: 160rpx;
			font-weight: 400;
			font-size: 32rpx;
			color: #000000;
		}

		view {
			width: 146rpx;
			height: 56rpx;
			background: #FFA945;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 56rpx;
			margin-right: 32rpx;

		}

		.contentCard2text {
			width: 204rpx;
			height: 56rpx;
			background: #00AAFF;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			font-size: 28rpx;
		}
	}

	.text1 {
		height: 34rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: #04DFF4;
		line-height: 33rpx;
		margin-left: 24rpx;

	}

	.text2 {
		font-weight: 400;
		font-size: 26rpx;
		color: #FFFFFF;
		line-height: 36rpx;
		margin-left: 24rpx;
	}

	.invsetbtn2 {
		width: 336rpx;
		height: 72rpx;
		background: #004284;
		border-radius: 36rpx 36rpx 36rpx 36rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: #EFEFEF;
		text-align: center;
		line-height: 72rpx;
		text-align: center;
	}

	.bot {
		width: 16rpx;
		height: 16rpx;
		background: #006BF4;
		border-radius: 8rpx;
		// margin-left: 32rpx;
	}

	.tz1 {
		width: 116rpx;
		height: 52rpx;
		background-color: #006BF4;
		margin-right: 18rpx;
		background: #00AAFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 52rpx;
		text-align: center;
	}

	.panelTitle {
		padding: 34rpx 0;

		view {
			width: 25%;
			text-align: center;
			font-weight: 400;
			font-size: 32rpx;
			color: #5B5E66;
		}
	}

	.tableHead {
		padding: 27rpx 0;
		background-color: #080F32;
	}

	.btcBtn {
		// width: 158rpx;
		height: 64rpx;
		background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 64rpx;
		padding: 0 12rpx;
	}


	.panelbottom {
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.withdraw {
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
	}

	.overlay-body {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.overlay-content {
		display: flex;
		width: 600rpx;
		height: 300px;
		background: black;
		box-sizing: border-box;
		padding: 30rpx;
		border-radius: 8px;
		align-items: center;
		justify-content: center;
		position: relative;
		color: white;
	}
</style>