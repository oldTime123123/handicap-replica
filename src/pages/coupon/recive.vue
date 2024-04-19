<template>
	<view class="share" style="background: #060D1F">
		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 32rpx;height: 30rpx;">
				<image :src="store.$state.imgObj.backIcon" style="width: 100%;height: 100%;" @click="back"></image>
			</view>
			<view class="f36  text_white" style="font-weight: 500;">{{t('parWel.p_p1')}}</view>
			<view style="width: 60rpx;height: 100%;" class="center">
				<image src="../../static/couIndex/shop.png" style="width:60rpx;height:60rpx;" @click="goShop">
				</image>
			</view>
		</view>

		<view class=" mt20 pdlr30">
			<div class="" dir=ltr>
				<view class="center f50 topInv">
					{{pageData.real_invite_count}}
				</view>
				<view class="mt20 text_white">
					{{t('parWel.p_p2')}}
				</view>
			</div>

			<view class="mt30 topInvBox" style="position: relative;">
				<view class="lines">
					<view class="dor">
					</view>
					<view class="jindu" :style="{width: processJ +'%'}"></view>
				</view>
				<view style="position: absolute;width: calc(100% - 40rpx);" class="flex" @click="receviHandle">
					<view v-for="(item,index) in profitList" :class="index == 0 ?'dor':''"
						:style="{width:100 / profitList.length+'%'}">
						<view v-if="index == 0" class="f16" :style="curLang=='ar'?floatStyle:''">
							<!-- <view style="margin-top: -20rpx;">{{t('parWel.a_a1')}}</view> -->
							<view style=" margin-top:95rpx;">{{t('parWel.p_p3')}}</view>
						</view>
						<view v-else style="margin-top: -30rpx;" class="center flex_col">
							<view class="amountEl" style=""> {{item.amount}} </view>
							<view style="width: 70rpx;height: 70rpx;position: relative;">
								<image src="/static/couIndex/welUsdt.png" style="width: 70rpx;height: 70rpx;">
								</image>
								<image src="/static/couIndex/welFin.png"
									style="width: 20rpx;height: 20rpx;position: absolute;right: 0;bottom: 0;"
									v-if="item.status == 1"> </image>
							</view>
							<view style="width: 70rpx;text-align: center;">
								{{item.number}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="mt30 couponBox">
				<view class="center rightBtn " @click="goShop">
					{{t('parWel.a_a2')}}
					<image src="../../static/couIndex/shop.png"
						style="width:40rpx;height:40rpx; margin-left: 20rpx;">
					</image>
				</view>
				<view v-for="item in couponList" class="between listItemtt ">
					<view class="flex col_center">
						<image src="/static/couIndex/coupon1.png" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml30">
							<view class="f34 text_bold">{{item.price}} {{t('parWel.p_p4')}}</view>
							<view class="color6 f24 mt10 textHiddenOne">{{item.name}}</view>
						</view>
					</view>
					<view style="width: 220rpx;display: flex; flex-direction: column;justify-content: center;">
						<view v-if="item.status == 1" class="await" @click="jumpHandle">
							{{t('parWel.p_p5')}}
						</view>
						<view v-if="item.status == 2" class="Receive" @click="ReceiveHandle(item)">{{t('parWel.p_p6')}}
						</view>
						<view v-if="item.status == 3" class="Receive" @click="goShop">{{t('parWel.p_p7')}}</view>
						<view v-if="item.status == 4" class="Received">{{t('parWel.p_p8')}}</view>

						<view class="f24 mt10">
							{{t('parWel.p_p9')}} {{pageData.real_invite_count}} /{{item.number}}
						</view>
					</view>
				</view>
			</view>

			<view class="rules mt30">
				<view class="flex">
					<view class="ruleTitle ">
						{{t('parWel.p_p10')}}
					</view>
				</view>
				<view class="mt30 desc" v-html="pageData.rule" style="word-break: break-all;">
				</view>
			</view>
		</view>


		<view style="height: 100rpx;"></view>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import QrcodeVue from 'qrcode.vue'
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";
	const {
		toClipboard
	} = useClipboard()
	const {
		t
	} = useI18n();
	const curLang = uni.getStorageSync('lang')
	const floatStyle = {
		position: 'absolute',
		right: '-20rpx'
	}
	const back = () => {
		uni.navigateTo({
			url: '/'
		})
	}
	const goShop = () => {
		uni.navigateTo({
			url: './coupon'
		})
	}
	const jumpHandle = () => {
		uni.navigateTo({
			url: '../mine/share'
		})
	}
	const profitList = ref([])

	const pageData = ref({

	})

	const ReceiveHandle = (item) => {

		let data = {
			configId: item.id
		}
		request({
			url: 'invest/coupon',
			methods: 'post',
			data
		}).then(res => {
			Toast.text(t('parWel.c_l9'))
			getData()
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const receviHandle = () => {
		request({
			url: 'invest/receive',
			methods: 'post',
		}).then(res => {
			Toast.text(t('parWel.c_l9'))
			getData()
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const couponList = ref([])
	const processJ = ref(0)
	const getData = () => {
		request({
			url: 'invest/couponList',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			// myInvite.value = res.real_invite_count
			couponList.value = res.list.data
			profitList.value = res.progress.map(item => {
				return {
					number: item.number,
					amount: parseInt(item.price),
					status: item.status
					// isGet: pageData.value.real_invite_count > item.number ? true : false
				}
			})
			profitList.value.unshift({})
			if (res.real_invite_count > res.invite_max) {
				processJ.value = 100
			} else {
				processJ.value = res.real_invite_count / res.invite_max * 100
			}
		}).catch(err => {
			Toast.text(err.message)
		})
	}

	const currency = uni.getStorageSync('currency')
	// 终于可以用了
	onMounted(() => {
		getData()
	})

	const inputMoney = ref("")
	const confirmHandle = () => {

	}
</script>

<style lang="scss" scoped>
	.rules {
		padding: 37rpx;
		background-color: #232234;
		border-radius: 30rpx;
		box-shadow: 0 0 20rpx 1rpx #ccc inset;
		.ruleTitle {
			height: 66rpx;
			background: #52FDFE;
			border-radius: 32rpx;
			text-align: center;
			line-height: 66rpx;
			margin: 0 auto;
			padding: 0 30rpx;
			color: #000;
		}
	}

	.share {
		background: url('/static/couIndex/webBg.png') no-repeat 100%/100%;
		height: 100vh;
		background-position: top;
		text-transform: none;
		background-size: cover;
		background-attachment: fixed;
		overflow-y: scroll;
		min-height: 1400rpx;
	}

	.couponBox {
		padding: 30rpx 22rpx;
		border-radius: 30rpx;
		background-color: #232234;
		box-shadow: 0 0 20rpx 1rpx #ccc inset;
		.listItemtt {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #ccc;
			.await {
				width: 220rpx;
				height: 65rpx;
				background: #FFFFFF;
				border: 6rpx solid #52FDFE;
				border-radius: 60rpx;
				text-align: center;
				line-height: 65rpx;
				color: #000;
			}

			.Receive {
				width: 220rpx;
				height: 65rpx;
				background: #52FDFE;
				border-radius: 60rpx;
				text-align: center;
				line-height: 65rpx;
				color: #000;
				box-shadow: 0px 4px 15px 1px rgba(46, 255, 237, 0.6);
			}

			.Received {
				width: 220rpx;
				height: 65rpx;
				background: #ccc;
				border-radius: 60rpx;
				text-align: center;
				line-height: 65rpx;
				color: #000;
			}
		}

		.borderB {
			border-bottom: 1rpx solid #eee;
		}
	}

	.topInvBox {
		background-color: #232234;
		padding: 50rpx 25rpx;
		border-radius: 20rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		// color: #000;
		box-shadow: 0 0 20rpx 1rpx #ccc inset;
		.amountEl {

			width: 100rpx;
			background-color: #52FDFE;
			color: #000;
			text-align: center;
			margin-bottom: 15rpx;
			border-radius: 20rpx;
		}

		.lines {
			width: 100%;
			height: 20rpx;
			border-radius: 20rpx;
			background-color: #52FDFE;
			position: relative;
			display: flex;
			justify-content: space-between;

			.jindu {
				height: 20rpx;
				background-color: #52FDFE;
				border-radius: 20rpx;
				position: absolute;
			}

			.dor {
				width: 20rpx;
				background-color: #fff;
				height: 20rpx;
				border: 3px solid #52FDFE;
				border-radius: 50%;
				margin-top: -5rpx;
				z-index: 99;
			}
		}

	}

	.topInv {
		background: rgba(255, 255, 255, 0.4);
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		color: #fff;
		font-weight: bold;
		font-size: 65rpx;
		margin-left: 20rpx;
	}

	.rightBtn {
		background: #52FDFE;
		height: 100rpx;
		border-radius: 20rpx;
		color: #000;
		font-weight: bold;
		font-size: 35rpx;
		text-align: center;
		margin-bottom: 40rpx;
		box-shadow: 0px 4px 15px 1px rgba(84, 220, 252, 0.6);
	}
</style>
