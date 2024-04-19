<template>
	<view style="background-color: #060D1F;min-height: 100vh;" >
		<view class="pdlr30 pt33">
			<view class="between">
				<view class="flex between">
					<nut-icon name="left" @click="goBack"></nut-icon>
				</view>
				<view class="f34">
<!-- 					{{t('add2.t_t5')}} -->
				</view>
				<view style="width: 30rpx;"></view>
			</view>
			<view class="flex mt50">
				<view :style="headIndex==1?changeStyle:''" style="background-color: #1E253C; padding: 20rpx; border-radius: 10rpx;  margin-left: 36rpx;font-size: 36rpx;" @click="choose(1)">
					{{t('ttn.t_t56')}}
				</view>
				<view :style="headIndex==2?changeStyle:''" style="background-color: #1E253C; padding: 20rpx; border-radius: 10rpx;   margin-left: 72rpx;font-size: 36rpx;" @click="choose(2)">
					{{t('ttn.t_t57')}}
				</view>
			</view>
			<view class="isolation"></view>
			
			<view class="head" v-show="headIndex==1">
				<view class="head_box">
					<view class="">
						{{t('ttn.t_t58')}}
					</view>
					<view class="" style="color: #000;">
						{{inviteData[0]?.user_num}}
					</view>
				</view>
				
				<view class=" rewards pdlr30" >
					<view class="font" >
						{{t('ttn.t_t59')}} 	{{inviteData[0]?.inviteRechargeAmount}} {{currency}}
					</view>
					<view class="font flex">
<!-- 						 {{inviteData[0]?.inviteRechargeAmount}} {{currency}} -->
						<view class="" style="font-size: 24rpx;color: #A2A2A2;">
<!-- 							{{t('ttn.t_t60')}} -->
						</view>
					</view>
				</view>
				
				<view class="isolation "></view>
				
				<view class="pdlr30 " style="padding-bottom: 30rpx;">
					<view class="col">
						*{{t('ttn.t_t61')}} {{inviteData[0]?.recharge_num}} {{currency}}; 
					</view>
					<view class="col">
						*{{t('ttn.t_t62')}}
						
					</view>
				</view>
			</view>
			
			<view v-show="headIndex==2" style="font-size: 32rpx;">
				{{t('ttn.t_t63')}}
			</view>
			
			<view class="rectangle"></view>
			
			<view v-show="headIndex == 2" class="between tab_head" style="color: #fff;background-color: #313951; font-size: 28rpx;justify-content: space-evenly;">
				 <view style="width: 50%;text-align: center;">
				 	{{t('ttn.t_t64')}}
				 </view>
				 <view style="width: 50%;text-align: center;">
				 	{{t('ttn.t_t65')}}
				 </view>
			</view>
			
			<view v-show="headIndex==1" class="between tab_head" style="color: #fff;background-color: #313951; font-size: 28rpx;">
				<view style="width: 15%;text-align: center;">
					{{t('ttn.t_t64')}}
				</view>
				<view class="bfb">
					{{t('ttn.t_t66')}}
				</view>
				<view class="bfb">
					{{t('ttn.t_t67')}}
				</view>
				<view style="width: 25%;text-align: center;">
					{{t('ttn.t_t68')}}
				</view>
				<view class="bfb">
					{{t('ttn.t_t69')}}
				</view>
			</view>
			
<!-- 			<view class="isolation"></view> -->
			
			<view class="myOne_sty" style="padding: 0rpx;background-color: #1E253C;">
				<view v-show="headIndex==2 && rechargeRebateDate?.type!==0 " class="" style="font-size: 28rpx;justify-content: space-evenly;">
					<view class="center" style="box-sizing: border-box;padding: 20rpx;">
						<view style="width: 50%;text-align: center;">
							{{t('ttn.t_t70')}}
						</view>
						<view v-if="rechargeRebateDate?.type==1" style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.first_recharge?.module==1?rechargeRebateDate?.first_recharge?.amount.a:rechargeRebateDate?.first_recharge?.rate.a}}{{currency}}
						</view>
						<view v-else style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.other_recharge?.module==1?rechargeRebateDate?.other_recharge?.amount.a:rechargeRebateDate?.other_recharge?.rate.a}}%
						</view>
					</view>
					<view class="center" style="box-sizing: border-box;padding: 20rpx; background-color: #313951;">
						<view style="width: 50%;text-align: center;">
							{{t('ttn.t_t71')}}
						</view>
						<view v-if="rechargeRebateDate?.type==1" style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.first_recharge?.module==1?rechargeRebateDate?.first_recharge?.amount.b:rechargeRebateDate?.first_recharge?.rate.b}}{{currency}}
						</view>
						<view v-else style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.other_recharge?.module==1?rechargeRebateDate?.other_recharge?.amount.b:rechargeRebateDate?.other_recharge?.rate.b}}%
							
						</view>
					</view>
					<view class="center" style="box-sizing: border-box;padding: 20rpx;">
						<view style="width: 50%;text-align: center;">
							{{t('ttn.t_t72')}}
						</view>
						<view v-if="rechargeRebateDate?.type==1" style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.first_recharge?.module==1?rechargeRebateDate?.first_recharge?.amount.c:rechargeRebateDate?.first_recharge?.rate.c}}{{currency}}
						</view>
						<view v-else style="width: 50%;text-align: center;">
							{{rechargeRebateDate?.other_recharge?.module==1?rechargeRebateDate?.other_recharge?.amount.c:rechargeRebateDate?.other_recharge?.rate.c}}%
							
						</view>
					</view>
					
				</view>
			</view>
			
			
			<view class="myOne_sty" v-show="headIndex==1">
				<view  class="between " style="margin-bottom: 40rpx;"  v-for="(item,index) of inviteData">
					<view style="width: 15%;text-align: center;">
						{{index+1}}
					</view>
					<view class="bfb">
						{{item.get_num}}
					</view>
					<view class="bfb">
						{{item.price}} {{currency}}
					</view>
					<view style="width: 25%;text-align: center;">
						{{Number(item.get_num) * Number(item.price)}}{{currency}}
					</view>
					<view class="bfb">
						<view class="btn" v-show="item.check_status" @click="receive(item.id)">
							{{t('ttn.t_t73')}}
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
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
		t
	} = useI18n();

	const changeStyle = {
		color:'#14DBDD'
	}

	const goBack = () => {
		history.back()
	}
	
	
	const headIndex = ref(1)
	const  inviteData = ref([])
	
	const receive = (id) =>{
		request({
			url:'activity/inviteRechargeAward/receive',
			methods: 'post',
			data:{
				id
			}
		}).then(res=>{
			Toast.text(t('ttn.t_t74'))
			getData()
		})
	}
	
	const rechargeRebateDate = ref()
	const rechargeRebate = () =>{
		request({
			url:'setting/rebate',
			methods: 'get',
		}).then(res=>{
			rechargeRebateDate.value = res
		})
	}
	const choose = (ind) =>{
		headIndex.value = ind
		if(ind == 1){
			getData()
		}else{
			rechargeRebate()
		}
	}
	const getData = () =>{
		request({
			url: 'activity/inviteRechargeAward/list',
			methods: 'get',
		}).then(res=>{
			inviteData.value = res
		})
	}
	const currency = ref("")
	
	onLoad(()=>{
		getData()
		currency.value = uni.getStorageSync('currency')
		
	})

</script>

<style lang="scss" scoped>
	.myOne_sty{
		background: #1E253C;
		box-sizing: border-box;
		padding: 40rpx 0rpx;
	}
	.tab_head{
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 24rpx 24rpx 0rpx 0rpx;
	}
	.bfb{
		width: 20%;
		text-align: center;
	}
	.btn{
		background-color: #2E2E2E;
		border-radius: 16rpx;
		font-size: 24rpx;
		color: #B1ED71;
		box-sizing: border-box;
		padding: 7rpx 13rpx;
	}
	.rectangle{
		width: 100%;
		height: 6rpx;
		background-color: #000000;
		margin-top: 10rpx;
		margin-bottom: 32rpx;
	}
	.head{
		width: 100%;
		background-color: #1E253B;
		border-radius: 24rpx;
		.head_box{
			background-color: #2FEDEF;
			box-shadow: 0px 3px 10px 0px rgba(75,247,249,0.45);
			width: 100%;
			color: #000;
			// height: 100rpx;
			border-radius: 12rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 37rpx;
			align-items: center;
			font-size: 32rpx;
			
		}
		.rewards{
			margin-top: 24rpx;
			margin-bottom: 24rpx;
			display: flex;
			// justify-content: space-around;
			.font{
				font-size: 28rpx;
			}
		}
		.col{
			color: #A2A2A2;
			font-size: 24rpx;
		}
	}
	.isolation{
		background-color: #212121;
		height: 1px;
		width: 100%;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}
	
</style>
