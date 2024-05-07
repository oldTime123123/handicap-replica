<template>
	<view style="background: #060D1F; min-height: 100vh; position: relative;">
		<kefu></kefu>
		<view class="main" style="background: #060D1F">

			<view class="pdlr49 pt33">

				<view class="flex" style="justify-content: space-between;">
					<view class="flex between">
						<nut-icon name="left" @click="goBack"></nut-icon>
					</view>
					<view class="f34">
						{{ type == 'withdraw' ? t('withdraw.w_w1') : t('ttn.t_t12') }}
					</view>

					<view style="width: 30rpx;"></view>
				</view>

				<view class="mt80" style="height: 10rpx;">
				</view>




				<view class="" v-show="flag" @click="chooseHandle(2)">
					<view class="Smart">
						<view class="text">
							{{ t('ttn.t_t15') }}
						</view>
						<image style="width: 40rpx;height: 40rpx;" src="../../static/themeNum1/icon/backGo.png" mode="">
						</image>
					</view>
					<view class="vorne">
						{{ t('ttn.t_t16') }}
					</view>
				</view>
				<view class="mt60" @click="chooseHandle(1)">
					<view class="Smart"
						style="background: url('../../static/egg/wallet.png') no-repeat;background-size: 100% 100%;">
						<view class="text">
							{{ t('ttn.t_t13') }}
						</view>
						<image style="width: 40rpx;height: 40rpx;" src="../../static/themeNum1/icon/backGo.png" mode="">
						</image>
					</view>
					<view class="vorne">
						{{ t('ttn.t_t14') }}
					</view>
				</view>

				<!-- 
			<view class="choItem mt38" @click="changeChoosed('usdt')" :style="cType =='usdt'?choStyle:''"
				v-if="showUsdt">
				<view class="flex">
					<image :src="store.$state.imgObj.usdt" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDT</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='usdt'"></image>
				</view>
			</view> -->

				<!-- <view class="choItem" @click="changeChoosed('bank')" :style="cType =='bank'?choStyle:''" v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.bank" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">Bank Card</view>
				</view>
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType =='bank'"></image>
				</view>
			</view> -->

				<!-- btn -->
				<!-- <view class="btns" :style="{background:store.$state.thirdColor}" @click="chooseHandle">
				{{t('all.a_c1')}}
			</view> -->

			</view>
		</view>
	</view>
	<Loading ref="showLoading"></Loading>
	
</template>

<script setup>
import kefu from "@/components/kefu/kefu.vue"

import request from '../../../comm/request.ts';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
	userStore
} from "@/store/themeNum.js";
// import {
// 	Toast
// } from '@nutui/nutui';
import {
	onShow,
	onLoad
} from "@dcloudio/uni-app";
const store = userStore();
import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();

const choStyle = {
	background: store.$state.thirdColor,
	animation: '.2s linear all',
	color: '#fff'
}
const cType = ref('usdt')
const changeChoosed = (type) => {
	cType.value = type
}
const flag = ref(true)
const showUsdt = ref(false)
const showBank = ref(false)
const router = useRouter()
const goBack = () => {
	history.back()
}
const getData = () => {
	request({
		url: 'setting/financeWay',
		methods: 'get'
	}).then(res => {
		let {
			recharge_type
		} = res

		if (recharge_type.includes(1)) {
			showUsdt.value = true
		}
		if (recharge_type.includes(2)) {
			showBank.value = true
		}
		// console.log(res);
	})
}

const chooseHandle = (num) => {
	if (type.value == 'recharge') {
		uni.navigateTo({
			url: "../recharge/index?balance_type=" + num
			// 	url: '?balance_type=1'
		})
	} else {
		uni.navigateTo({
			url: "../withdraw/index?balance_type=" + num
			// 	url: '?balance_type=1'
		})
	}

	return
	if (type.value == 'recharge') {
		if (num == 1) {
			uni.navigateTo({
				url: "../recharge/u_input?balance_type=2"
				// 	url: '?balance_type=1'
			})
		} else {
			uni.navigateTo({
				url: "../recharge/u_input?balance_type=1"
			})
		}

	} else if (type.value == 'bank') {
		if (num == 1) {
			uni.navigateTo({
				url: '../recharge/bankRechrage?balance_type=1'
			})
		} else {
			uni.navigateTo({
				url: '../recharge/bankRechrage?balance_type=2'
			})
		}

	}
}
const type = ref()
onLoad((e) => {
	type.value = e.type

 
})
// 终于可以用了
onShow(() => {
	getData()
	if (router.currentRoute.value.query.type == 'withdraw') {
		flag.value = false
	}
})
</script>

<style lang="scss">
.main {
	background: url('../../static/back.png') no-repeat;
	background-size: 100% 100%;
	height: 100vh;
}

.Smart {
	width: 100%;
	height: 190rpx;
	background: url('../../static/egg/smart.png') no-repeat;
	background-size: 100% 100%;
	box-sizing: border-box;
	padding: 48rpx 28rpx 24rpx 24rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.text {
		width: 246rpx;
		font-size: 36rpx;
	}
}

.vorne {
	background-color: #242424;
	height: 235rpx;
	width: 100%;
	box-sizing: border-box;
	padding: 24rpx 32rpx;
	font-size: 24rpx;
	color: #A2A2A2
}

.choItem {
	padding: 37rpx 50rpx;
	background-color: #1a1a1a;
	border-radius: 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30rpx;

	.noCho {
		width: 35rpx;
		height: 35rpx;
		// border: 1px solid #AFAFAF;
		border-radius: 10rpx;
	}
}

.btns {
	margin-top: 313rpx;
	text-align: center;
	line-height: 100rpx;
	color: #fff;
	height: 100rpx;
	border-radius: 20rpx;
	font-size: 32rpx;
}
</style>
