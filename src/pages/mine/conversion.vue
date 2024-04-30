<template>
	<view style="background: #060D1F;height: 100vh;">
		<kefu></kefu>
		<view class=" pdlr30 main">
			<view class="between" style="padding-top: 20rpx;">
				<view class="flex between">
					<nut-icon name="left" @click="methods.back"></nut-icon>
				</view>
				<view class="f34">
					{{ t('new_xq.xq_a22') }}
				</view>

				<view style="width: 30rpx;"></view>
			</view>

			<view class="head">
				<view class="Savings">
					<view class="text">
						{{ t('new_xq.xq_a23') }}
					</view>
					<view class="num">
						{{ lockBalance }} {{ currency }}
					</view>
				</view>
				<image class="Convert" style="width: 64rpx;height: 64rpx;"
					src="../../static/themeNum1/icon/conversion.png" mode=""></image>
				<view class="Savings">
					<view class="text" style="font-size: 24rpx;">
						{{ t('new_xq.xq_a24') }}
					</view>
					<view class="num">
						{{ lixibao }} {{ currency }}
					</view>
				</view>
			</view>

			<view class="mt68" style="font-size: 36rpx;">
				{{ t('new_xq.xq_a25') }}
			</view>

			<input v-model="num" class="inp" :placeholder="t('new_xq.xq_a27')" />

			<view class="btn" @click="loginOutMask = true">
				{{ t('new_xq.xq_a26') }}
			</view>
		</view>
		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<!-- <view class="f40">Tips</view> -->
					<view class="f30 mt40"
						style="text-align: center;width: 384rpx;font-weight: 400;font-size: 28rpx;color: #FFFFFF;">
						Please note: Transferring into this account will return the principal within 360 days!
					</view>
					<view class="between">
						<view> {{ t('all.a_c2') }}
						</view>
						<view style="background: linear-gradient( 308deg, #006BF4 0%, #04E1F4 100%);"
							@click="confirmHandle">{{ t('all.a_c1') }}</view>

					</view>
				</div>
			</div>
		</nut-overlay>
	</view>
</template>

<script setup>
import kefu from "@/components/kefu/kefu.vue"

import request from '../../../comm/request.ts';
import {
	userStore
} from "@/store/themeNum.js";
import {
	Locale
} from '@nutui/nutui';
import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
import {
	Toast
} from '@nutui/nutui';
import {
	onShow,
	onLoad
} from "@dcloudio/uni-app";
import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();
const store = userStore();

const methods = {
	back() {
		history.back()
	},
};
const lockBalance = ref(0)
const loginOutMask = ref(false)
const num = ref()
const confirmHandle = () => {
	request({
		url: 'user/balanceTrade',
		methods: 'post',
		data: {
			money: num.value
		}
	}).then(res => {
		Toast.text('success')
		num.value = ''
		getDate()
	}).catch(err => {
		Toast.text(err)
		num.value = ''
	})
}
const currency = ref("")
const lixibao = ref('')
const getDate = () => {
	request({
		url: 'user/index',
		methods: 'get',

	}).then(res => {
		lixibao.value = res.ai_balance
		lockBalance.value = res.balance
	}).catch(err => {
		Toast.text(err)
	})
}

onLoad(e => {
	getDate()
	currency.value = uni.getStorageSync('currency')
 
})
</script>

<style lang="scss" scoped>
.main {
	background: #080F32;
	height: 100%;
	background-size: 100% 100%;
}

.wrapper {
	display: flex;
	height: 100%;
	justify-content: center;
	padding: 0 50rpx;

	.content {
		margin-top: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 566rpx;
		height: 332rpx;
		background: #00264C;
		border-radius: 24rpx 24rpx 24rpx 24rpx;

		// justify-content: center;
		padding-top: 50rpx;
		position: relative;
		overflow: hidden;

		.between {
			position: absolute;
			bottom: 0;
			width: calc(100% - 80rpx);
			padding: 0 30rpx 40rpx;

			view {


				width: 224rpx;
				height: 88rpx;
				background: #004284;
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				color: #fff;
				text-align: center;
				line-height: 88rpx;
				font-size: 30rpx;
				border-radius: 20rpx
			}
		}
	}
}

.btn {
	width: 590rpx;
	height: 88rpx;
	background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	text-align: center;
	line-height: 88rpx;
	margin: 112rpx auto;
}

.inp {
	// width: 100%;
	padding: 20rpx;
	height: 46rpx;
	margin-top: 24rpx;
	background: #004284;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.Convert {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -32rpx;
	margin-top: -32rpx;

}

.text {
	color: #9499A1;
	line-height: 32rpx;
	font-size: 28rpx;
	text-align: center;
}

.num {
	color: #fff;
	line-height: 32rpx;
	font-size: 28rpx;
	margin-top: 12rpx;
	text-align: center;
}

.head {
	width: 100%;
	// height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 52rpx;
	position: relative;

	.Savings {
		width: 332rpx;
		height: 130rpx;
		background: #042659;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		border-radius: 24rpx;
		box-sizing: border-box;
		padding: 20rpx 35rpx 30rpx 35rpx;
	}

}
</style>
