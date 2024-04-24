<template>
	<view class="normalBg" style="background: #060D1F">
		<topNav :title="t('withdraw.w_w1')" :rightIcon="'/static/themeNum1/icon/r_withdraw.png'"
			:rightUrl="'../record/withdrawRecord'"></topNav>
		<view class="pdlr45 mt70">

			<view class="items between" v-if="showUSDT" :style="actInd == 0 ?choStyle:noChoStyle " @click="actInd = 0">
				<view class="flex col_center">
					<image src="../../static/themeNum1/icon/usdt.png" mode="widthFix"
						style="width: 55rpx;height: 55rpx;"></image>
					<view class="ml73 F28">
						USDT
					</view>
				</view>
				<view class="circle center" :class="actInd == 0?'actChoose':'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 0" :color="store.$state.thirdColro"></nut-icon>
				</view>
			</view>

			<view class="items between" v-if="showBANK" :style="actInd == 1 ?choStyle:noChoStyle " @click="actInd = 1">
				<view class="flex col_center">
					<image src="../../static/themeNum1/icon/bank.png" style="width: 52rpx;height: 44rpx;"></image>
					<view class="ml73 F28">
						Bank Card
					</view>
				</view>
				<view class="circle center" :class="actInd == 1?'actChoose':'noChoose'">
					<nut-icon name="checklist" v-if="actInd == 1" :color="store.$state.thirdColro"></nut-icon>
				</view>
			</view>
			
			<view class=" center l_inpS mt40 l_inpBg pdlr30 color0  f32" style="margin-top:214rpx" :style="{background:store.$state.secondColor}" @click="jumpPage">
				{{t('all.a_c1')}}
			</view>
		</view>
	</view>
</template>

<script setup>
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
		transition:'.1s linear all'
	}
	const noChoStyle = {
		background: store.$state.thirdColor,
		color: "#fff"
	}
	const actInd = ref(0)
	
	const showUSDT = ref(false)
	const showBANK = ref(false)
	
	const rechargeType = [1,2]
	
	
	const jumpPage = ()=>{
		if(rechargeType.length ==0){
			return false
		}
		if(actInd.value == 0 && showUSDT.value){
			uni.navigateTo({
				url:'./usdtWithdraw?balance_type='+balance_type.value
			})
		}else if(actInd.value == 1 && showBANK.value){
			uni.navigateTo({
				url:'./bankWithdraw?balance_type='+balance_type.value
			})
		}
	}
	
	const getData = ()=>{
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			let {withdraw_type} = res
			if(withdraw_type.includes(1)){
				showUSDT.value = true
			}
			 if(withdraw_type.includes(2)){
				showBANK.value = true
			}
		})
	}
	const balance_type = ref()
	onLoad(e=>{
		if(e.balance_type){
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
