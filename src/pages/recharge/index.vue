<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="balance_type == 2 ? t('ttn.t_t17') : t('ttn.t_t18')"
			:rightIcon="'/static/themeNum1/icon/r_record.png'" :rightUrl="'../record/rechargeRecord'"></topNav>
		<view class="pdlr45 mt70">



			<view class="items between" v-if="showBANK" :style="actInd == 0 ? choStyle : noChoStyle" @click="actInd = 0"
				v-show="AreaCode?.country_code == '+62'">
				<view class="flex col_center">
					<image src="../../static/themeNum1/icon/bank.png" style="width: 52rpx;height: 44rpx;"></image>
					<view class="ml73 F28">
						{{ t('pk.r_i1') }}
					</view>
				</view>
				<view class="circle center" :class="actInd == 0 ? 'actChoose' : 'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 0" :color="store.$state.thirdColor"></nut-icon>
				</view>
			</view>

			<view class="items between" v-if="showUSDT" :style="actInd == 1 ? choStyle : noChoStyle"
				@click="actInd = 1">
				<view class="flex col_center">
					<image src="../../static/themeNum1/icon/usdt.png" mode="widthFix"
						style="width: 55rpx;height: 55rpx;"></image>
					<view class="ml73 F28">
						USDT
					</view>
				</view>
				<view class="circle center" :class="actInd == 1 ? 'actChoose' : 'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 1" :color="store.$state.thirdColor"></nut-icon>
				</view>
			</view>
			<view class="items between" v-if="showTRX" :style="actInd == 2 ? choStyle : noChoStyle" @click="actInd = 2">
				<view class="flex col_center">
					<image src="../../static/trx.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="ml73 F28">
						TRX
					</view>
				</view>
				<view class="circle center" :class="actInd == 2 ? 'actChoose' : 'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 2" :color="store.$state.thirdColor"></nut-icon>
				</view>
			</view>
			<view class="items between" v-if="showUSDC" :style="actInd == 3 ? choStyle : noChoStyle"
				@click="actInd = 3">
				<view class="flex col_center">
					<image src="../../static/usdc.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="ml73 F28">
						USDC
					</view>
				</view>
				<view class="circle center" :class="actInd == 3 ? 'actChoose' : 'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 3" :color="store.$state.thirdColor"></nut-icon>
				</view>
			</view>
			<view class=" center l_inpS mt40 l_inpBg pdlr30 color0 f32" style="margin-top:214rpx"
				:style="{ background: store.$state.secondColor }" @click="jumpPage">
				{{ t('all.a_c1') }}
			</view>
		</view>
	</view>
	<Loading ref="showLoading"></Loading>

</template>

<script setup>
	import kefu from "@/components/kefu/kefu.vue"

	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
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
		background: store.$state.secondColor,
		color: "#000",
		transition: '.1s linear all'
	}
	const noChoStyle = {
		background: store.$state.thirdColor,
		color: "#fff"
	}
	const actInd = ref(0)

	const showUSDT = ref(false)
	const showBANK = ref(false)
	const showTRX = ref(false)
	const showUSDC = ref(false)


	const AreaCode = ref(0)


	const jumpPage = () => {

		if (actInd.value == 1 && showUSDT.value) {
			uni.navigateTo({
				url: '../recharge/u_input?balance_type=' + balance_type.value

			})
		} else if (actInd.value == 0 && showBANK.value) {
			uni.navigateTo({
				url: '../recharge/bankRechrage?balance_type=' + balance_type.value
			})
		} else if (actInd.value == 2 && showTRX.value) {
			uni.navigateTo({
				url: '../recharge/rechangeTRX?balance_type=' + balance_type.value
			})
		} else if (actInd.value == 3 && showUSDC.value) {
			uni.navigateTo({
				url: '../recharge/rechangeUSDC?balance_type=' + balance_type.value
			})
		}
	}

	const getData = () => {
		request({
			url: 'user/index',
			methods: 'get'
		}).then(res => {
			AreaCode.value = res
			if (res.country_code == '+62') {
				actInd.value = 0
			} else {
				actInd.value = 1

			}
		})
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			let {
				recharge_type
			} = res

			if (recharge_type.includes(1)) {
				showUSDT.value = true
			}
			if (recharge_type.includes(2)) {
				showBANK.value = true
			}
			if (recharge_type.includes(3)) {
				showTRX.value = true
			}
			if (recharge_type.includes(4)) {
				showUSDC.value = true
			}
			// console.log(res);
		})
	}
	const balance_type = ref()
	onLoad(e => {
		if (e.balance_type) {
			balance_type.value = e.balance_type
		}
	})
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
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
		border: 1rpx solid #AFAFAF;

	}
</style>