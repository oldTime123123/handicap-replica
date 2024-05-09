<template>

	<view style="background: #010012;  position: relative;">
		<nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
			<img class="kefu" type="primary" src="../../static/kefu.png" alt=""
				@click="handleToPage('../mine/service')">
		</nut-drag>
		<view class="main" style="background: #080F32;padding-bottom: 80rpx;">

			<view class="flex between topNav">
				<view class="">
					{{ t('pk.t_n1') }}
				</view>
				<view>

				</view>
				<view class="flex" style="align-items: center;">
					<view class="appTime" style="margin-right: 20rpx;">
						<image style="width:32rpx;height: 32rpx;margin-right: 10rpx;" src="../../static/biao.png"
							mode="">
						</image>
						UTC+7-{{ servetTime }}

					</view>
					<image src="/static/themeNum1/icon/indexlang1.png" style="width:52rpx;height:52rpx"
						@click="jumplink('../mine/langSetting')"></image>
				</view>

			</view>
			<view class="pdlr30" style="padding-top: 40rpx;">
				<view class="flex">
					<image style="width: 48rpx;height: 48rpx;" src="../../static/egg/icon1.png" mode=""></image>
					<view class="">
						{{ t('ttn.t_t19') }}：{{ Number(pageData?.total_balance) }} {{ currency }}
					</view>
				</view>
				<view class="flex mt30" style="justify-content: space-between;" v-show="false">

					<view class="Basic back2" style="width: 48%;">
						<view class="text1">
							{{ t('ttn.t_t20') }}
						</view>
						<view class="text2">
							{{ pageData?.job_invest_balance }} {{ currency }}
						</view>
					</view>
					<view class="Basic back2 flex"
						style="width: 48%;justify-content: space-between;align-items: center;"
						@click="jumplink('../recharge/means?type=recharge')">
						<view class="text1">
							{{ t('ttn.t_t21') }}<br>
							{{ t('ttn.t_t22') }}
						</view>
						<image style='width: 48rpx;height: 48rpx;' src="/src/static/themeNum1/icon/backGo.png" mode="">
						</image>
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
							{{ pageData?.ai_balance }} {{ currency }}
							<p>≈$ {{ (pageData?.ai_balance * kurs).toFixed(2) }}</p>
						</view>
					</view>


					<view class="Basic back2 flex"
						style="width: 334rpx; height: 172rpx;justify-content: space-around;flex-direction: column;background-image: url('../../static/imgs/index/content3-2.png');">
						<view class="text1">
							{{ t('ttn.t_t3') }}
						</view>
						<view class="text2" style="margin-top: 0rpx;">
							{{ pageData?.job_invest_balance }} {{ currency }}
							<p>≈$ {{ (pageData?.job_invest_balance * kurs).toFixed(2) }} </p>
						</view>
					</view>
				</view>
			</view>


			<view class="mt100 pdlr30">
				<!-- 	<view class="">
				{{t('new_xq.xq_a12')}}
			</view> -->
				<swiper :indicator-dots="false" :indicator-active-color="store.$state.contentColor" :autoplay="false"
					:interval="3000" :duration="1000" display-multiple-items="2" :circular="false"
					style="height: 64rpx;">
					<swiper-item v-for="item in text" :key='item.index' @click="rechangeIndex = item.index"
						style="border-radius: 0.5rem;">
						<view class="swiper_box2" :style='rechangeIndex == item.index ? rechangeStyle : ""'
							:id="rechangeIndex == item.index ? 'swiper_box2_chose' : ''">
							{{ item.text }}
						</view>

					</swiper-item>
				</swiper>
				<view class="geli"></view>
				<view v-show='rechangeIndex == 1'>
					<view class="flex between">
						<view class="reachange_widt" @click="jumplink('../recharge/means?type=recharge')">
							<image style='width: 48rpx;height: 48rpx;' src="../../static/themeNum1/icon/rechange.png"
								mode=""></image>
							<view class="" style='margin-left: 16rpx;'>
								{{ t('new_xq.xq_a13') }}
							</view>
						</view>
						<view class="reachange_widt" @click="jumplink('../withdraw/index?balance_type=1')">
							<image style='width: 48rpx;height: 48rpx;' src="../../static/themeNum1/icon/widt.png"
								mode="">
							</image>
							<view class="" style='margin-left: 16rpx;'>
								{{ t('new_xq.xq_a14') }}
							</view>
						</view>
					</view>
					<view
						style='background-color: #042659;box-sizing: border-box;padding: 40rpx 28rpx; margin-top: 40rpx;border-radius: 24rpx;'>
						<view class="flex"
							style="justify-content: space-between;margin-bottom: 32rpx;align-items: center;"
							v-for="item of interestList">
							<view class="flex" style="align-items: center;" @click="interest(item.id)">
								<image style="width: 246rpx;height: 164rpx;border-radius: 16rpx;" :src="item.full_img"
									mode=""></image>
								<view style="margin-left: 26rpx;">
									<view class="text1" style="margin-bottom: 15rpx;">{{ item.title }}</view>
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
					<view class="qidai">
						{{t('lo_i.l_o13')}}
					</view>
				</view>

				<view v-show='rechangeIndex == 2'>
					<view class="inver_head">
						<image style="width: 48rpx;height: 48rpx;margin-right: 16rpx;"
							src="../../static/themeNum1/icon/crown.png" mode=""></image>
						<view class="">
							{{ myList?.name }}
						</view>
					</view>
					<view class="content_box">
						<view class="flex spenlen">
							<view>
								{{ t('ttn.t_t31') }}
							</view>
							<view class="">

								{{ myList?.day_max }}
							</view>
						</view>
						<!-- <view class="flex spenlen">
						<view class="">
							Daily Profit
						</view>
						<view class="">
							{{myList?.daily_profit}} USDT
						</view>
					</view> -->
						<view class="flex spenlen">
							<view class="">
								{{ t('ttn.t_t32') }}
							</view>
							<view class="">
								{{ myList?.task_period }}
							</view>
						</view>
						<view class="flex spenlen">
							<view class="">
								{{ t('ttn.t_t33') }}
							</view>
							<view class="">
								{{ pageData?.total_commission }} {{ currency }}
							</view>
						</view>
						<view class="flex spenlen">
							<view class="">
								{{ t('ttn.t_t34') }}
							</view>
							<view class="">
								{{ myList?.price }}
							</view>
						</view>

					</view>

					<view class="flex between" style="margin-top: 32rpx;">
						<view class="reachange_widt" @click="jumplink('../recharge/means')">
							<image style='width: 48rpx;height: 48rpx;' src="../../static/themeNum1/icon/rechange.png"
								mode=""></image>
							<view class="" style='margin-left: 16rpx;'>
								{{ t('ttn.t_t35') }}
							</view>
						</view>
						<view class="reachange_widt" @click="jumplink('../mine/mission')">
							<view class="" style='margin-left: 16rpx;'>
								{{ t('ttn.t_t36') }}
							</view>
						</view>
					</view>
					<!-- 更改 -->
					<view class="box1" v-for="item of vipList">
						<view class="flex" style="justify-content: space-between;">
							<view class="head" style="width: 50%;">
								<image style="width: 48rpx;height: 48rpx;margin-right: 16rpx;"
									src="../../static/themeNum1/icon/crown.png" mode=""></image>
								<view class="">
									{{ item.name }}
								</view>
							</view>
							<view class="" style="width: 50%;text-align: center;">
								{{ t('ttn.t_t75') }}：{{ item.day_max }}
							</view>
						</view>
						<view class="title">
							<view class="">
								{{ t('ttn.t_t37') }}
							</view>
							<view class="textc">
								{{ t('ttn.t_t38') }}
							</view>
						</view>
						<view class="title"
							style="color: #fff;border-bottom: 2rpx solid rgb(125, 125, 125);padding-bottom: 15rpx;">
							<view class="">
								{{ item.price }} {{ t('ttn.t_t40') }}
							</view>
							<view class="textc">
								{{ item.pledge_day }}
							</view>
						</view>
						<view style="margin-top: 15rpx;font-size: 25rpx;">{{ item.desc[0] }}</view>
					</view>


					<view class="more">
						{{ t('ttn.t_t39') }}
					</view>

					<view style="height: 100rpx;">

					</view>
				</view>

				<view v-show='rechangeIndex == 3'>
					<z-paging class="mt34" ref="paging" v-model="recordsList" @query="log" width="100%" :fixed="false"
						:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
						:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('record.r_r1')"
						:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
						:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
						<view class="listItem" style="padding-top: 30rpx;" v-for="(item, index) in recordsList"
							:key="index">
							<view class="f28" :style="{ color: store.$state.contentColor }">

							</view>
							<view class="vvItem" style="margin-top: 0;">
								<view class="f26">{{ t('record.r_s2') }}</view>
								<view class=""> {{ item.order_no }}

								</view>
							</view>
							<view class="vvItem">
								<view class="f26">{{ t('record.r_s3') }}</view>
								<view class="">
									{{ item.num }}
								</view>
							</view>
							<view class="vvItem">
								<view class="f26">{{ t('record.r_s4') }}</view>
								<view class="">{{ (item.rate * 100).toFixed(2) }}%</view>
							</view>
							<view class="vvItem">
								<view class="f26">{{ t('record.r_s5') }}</view>
								<view class="">{{ item.yuji_num }}</view>
							</view>
							<view class="vvItem">
								<view class="f26">{{ t('record.r_s6') }}</view>
								<view class="">{{ item.createTime }}</view>
							</view>
							<view class="vvItem">
								<view class="f26">{{ t('record.r_s7') }}</view>
								<view class="">{{ item.expire_time }}</view>
							</view>
							<view class="vvItem">
								<!-- 							<view class="f26">{{t('all.a_d2')}}</view> -->
								<view class="">
									<text v-if="item.status == 1" class="pass">{{ t('record.r_s8') }}</text>
									<text v-if="item.status == 2" class="pass">{{ t('record.r_s9') }}</text>
									<text v-if="item.status == 3" class="cancle">{{ t('record.r_s10') }}</text>
								</view>
							</view>

							<view class="btns" :style="{ background: store.$state.contentColor }"
								v-if="showBtn && item.status == 1" @click="interruptHandle(item)">
								{{ t('record.r_s11') }}
							</view>
						</view>
					</z-paging>
				</view>
			</view>
		</view>
		<Tabbar :activeIndex="2"></Tabbar>
		<Loading ref="showLoading"></Loading>
		<view style="height: 100rpx; background: #040112">
		</view>

	</view>
</template>

<script setup>
	import Tabbar from '@/components/botTabbar/botTabbar.vue'
	import request from '../../../comm/request.ts';
	import topNav from "@/components/topNav/topNav.vue"

	import {
		Toast
	} from '@nutui/nutui';
	import {
		useI18n
	} from "vue-i18n";
	import {
		onMounted
	} from 'vue';
	import useClipboard from 'vue-clipboard3'
	import {
		onHide
	} from '@dcloudio/uni-app';
	const kurs = ref('')

	const {
		toClipboard
	} = useClipboard()
	const {
		t
	} = useI18n();
	const handleToPage = (url) => {
		uni.navigateTo({
			url: url
		})
	}
	const store = userStore();
	const rechangeIndex = ref(1)
	const rechangeStyle = ref({
		color: "#4BF7F9"
	})
	const recordsList = ref([])

	const jumplink = (item) => {
		uni.navigateTo({
			url: item
		})
	}
	const text = [{
			index: 1,
			text: t('ttn.t_t23')
		},
		// {
		// 	index: 2,
		// 	text: t('ttn.t_t24')
		// },
		{
			index: 3,
			text: t('ttn.t_t25')
		}
	]

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from "@/store/themeNum.js";

	const interestList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const pageData = ref()
	const vipList = ref([])
	const myList = ref()
	const userData = ref()
	const barText = ref("sfgsgdhgdhdfsfgsgdhgdhdfhfdhfd") //跑马灯

	const log = () => {
		request({
			url: 'lixibao/log',
			methods: 'get',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const getData = () => {

		//获取汇率
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			kurs.value = res.rate
		})
		//利息宝
		request({
			url: 'lixibao/list',
			methods: 'get'
		}).then(res => {
			interestList.value = res
		})





		request({
			url: 'home/vipList',
			methods: 'get',
		}).then(res => {
			vipList.value = res

			res.forEach(e => {
				if (e.is_active == 1) {
					myList.value = e
				}
			})
		})


		// 公告
		request({
			url: 'home/marquee',
			methods: 'get'
		}).then(res => {
			// res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content
		})
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
		})


	}
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
	const currency = ref()


	const interest = (id) => {
		uni.navigateTo({
			url: '../mine/investPage?id=' + id
		})
	}
	onHide(() => {
		clearInterval(showTIme.value)
	})
	onLoad(() => {
		getData()
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss" scoped>
	.qidai {
		width: 100%;
		text-align: center;
		line-height: 32rpx;
		padding: 30rpx 0rpx;
		background-color: #004284;
		margin-top: 30rpx;
		border-radius: 20rpx;
	}

	.kefu {
		width: 100rpx;
		height: 100rpx;
	}

	.Basic {
		box-sizing: border-box;
		padding: 24rpx 16rpx;
		border-radius: 16rpx;

		.text1 {
			color: #4BF7F9
		}

		.text2 {
			margin-top: 16rpx;
			font-size: 26rpx;

		}
	}

	.back1 {
		background: url('../../static/egg/basic1.png') no-repeat;
		background-size: 100% 100%;


	}

	.back2 {
		background: url('../../static/egg/basic2.png') no-repeat;
		background-size: 100% 100%;

	}

	.main {
		background: url('../../static/back.png') no-repeat;
		background-size: 100% 100%;
		height: 100%;
		min-height: 100vh;
	}

	.textb {
		width: 33%;
		text-align: center;
	}

	.more {
		width: 100%;
		height: 88rpx;
		background-color: #242424;
		border-radius: 24rpx;
		text-align: center;
		line-height: 88rpx;
		margin-top: 24rpx;

	}

	.textc {
		text-align: center;
		width: 50%;
	}

	.box1 {
		width: 100%;
		border-radius: 24rpx;
		background-color: #1E253B;
		box-sizing: border-box;
		padding: 32rpx;
		margin-top: 32rpx;

		.head {
			display: flex;
			align-items: center;
		}

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #5B5E66;
			font-size: 26rpx;
			margin-top: 34rpx;
		}

		.WordTip {
			color: #A2A2A2;
			font-size: 24rpx;
		}

	}

	.content_box {
		box-sizing: border-box;
		padding: 20rpx 0rpx 30rpx 0rpx;
		background-color: #1E253B;
		border-radius: 0rpx 0rpx 24rpx 24rpx;

		.spenlen {
			box-sizing: border-box;
			padding: 0rpx 28rpx;
			justify-content: space-between;
			line-height: 62rpx;
		}
	}

	.geli {
		background-color: #212121;
		width: 100%;
		height: 1px;
		margin-bottom: 24rpx;
		margin-top: 22rpx;
	}

	.inver_head {
		background: url('../../static/egg/head.png') no-repeat;
		background-size: 50% 100%;
		background-position: right;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
	}

	.reachange_widt {
		width: 332rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #004284;
		box-sizing: border-box;
		padding: 20rpx 0rpx;
		border-radius: 16rpx;
		border: 1px solid #04E1F4;

	}

	.team {
		box-sizing: border-box;
		// padding-left: 32rpx;
		margin-top: 28rpx;
	}

	.swiper_box2 {
		width: 100%;
		height: 64rpx;
		background: #004284;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		opacity: 1;
		position: relative;
		box-sizing: border-box;
		text-align: center;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 0.625rem 0;
		border-radius: 0.5rem;

		margin-left: 5rpx;
	}

	.topNav {

		width: 100%;
		background-color: #0C1526;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 16rpx 32rpx;
		z-index: 99;
	}


	#swiper_box2_chose {
		background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
		border-radius: 0.5rem;
		width: 100%;
	}
</style>