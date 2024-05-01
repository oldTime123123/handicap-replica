<template>
	<view style="background-color: #121212;min-height: 100%;">
		<kefu></kefu>
		<view class="pdlr30 pt33 main">
			<view class="between">
				<view class="flex between">
					<nut-icon name="left" @click="goBack"></nut-icon>
				</view>
				<view class="f34">
					{{t('new_xq.xq_a28')}}
				</view>
				<view style="width: 30rpx;"></view>
			</view>
			
			<view class="box1">
				<view class="text">
					<view class="">
						{{t('ttn.t_t41')}}
					</view>
					<view class="" style="text-align: right;">
						{{detailData?.title}}
					</view>
				</view>
				<view class="text">
					<view class="">
						{{t('ttn.t_t46')}}
					</view>
					<view class="" style="margin-top: 30rpx;">
						{{parseInt(detailData?.min_num)}} {{currency}}
					</view>
				</view>
				<view class="text">
					<view class="">
						 {{t('new_xq.xq_a30')}}
					</view>
					<view class="">
						{{detailData?.limit==0?'No limit on purchase quantity':detailData?.limit==-1?0:detailData?.limit}}({{t('ttn.t_t47')}}: {{ detailData?.buy_num }} )
					</view>
				</view>
				<view class="text" >
					<view class="">
						 {{t('ttn.t_t45')}}
					</view>
					<view class="flex">
						<view class="bigT" @click="reduce" style="border-radius: 10rpx 0rpx 0rpx 10rpx;">
							-
						</view>
						<view class="bigT" >
							{{number}}
						</view>
						<view class="bigT" @click="add" style="border-radius: 0rpx 10rpx 10rpx 0rpx;" >
							+
						</view>
					</view>
				
				</view>
				<view class="text">
					<view class="">
						  {{t('new_xq.xq_a31')}}
					</view>
					<view class="">
						{{detailData?.day}}
					</view>
				</view>
				<view class="text">
					<view class="">
						 {{t('ttn.t_t43')}}
					</view>
					<view class="">
						{{(detailData?.rate*100).toFixed(2)}}%
					</view>
				</view>


				<!-- <view class="text">
					<view class="">
						{{t('ttn.t_t42')}}
					</view>
					<view class="">
						{{detailData?.user_amount}}
					</view>
				</view>
				
				<view class="text">
					<view class="">
						  {{t('ttn.t_t44')}}111
					</view>
					<view class="">
						{{detailData?.max_buy_num}}
					</view>
				</view> -->
				
				
				
				
				
				<!-- <view class="text">
					<view class="">
						{{t('ttn.t_t47')}}
					</view>
					<view class="">
						{{}}
					</view>
				</view> -->
				
				<view class="btn" @click="invest">
					 {{t('new_xq.xq_a33')}}
				</view>
				
				
			</view>
			

			<view class="box1">
				<view class="text">
					<view class="">
						{{t('ttn.t_t48')}}
					</view>
				</view>
				
				<view class="text">
					<view class="">
						 {{t('ttn.t_t49')}}
					</view>
					<view class="">
						{{detailData?.type==1?'One-time return of principal and interest upon maturity':'Daily rebate'}}
					</view>
				</view>
				<!-- <view class="text">
					<view class="">
						investment range
					</view>
					<view class="">
						{{detailData?.min_num}}USDT~{{detailData?.max_num}}USDT
					</view>
				</view> -->

				<view class="text">
					<view class="">
						{{t('ttn.t_t46')}}
					</view>
					<view class="" style="margin-top: 30rpx;">
						{{parseInt(detailData?.min_num)}} {{ currency }}
					</view>
				</view>



				<view class="text">
					<view class="">
						 {{t('ttn.t_t50')}}
					</view>
					<view class="">
						{{number}}
					</view>
				</view>

				<view class="text">
					<view class="">
						 {{t('ttn.t_t43')}}
					</view>
					<view class="">
						{{(detailData?.rate*100).toFixed(2)}}%
					</view>
				</view>
				<view class="text">
					<view class="">
						 {{t('ttn.t_t51')}}
					</view>
					<view class="">
						{{detailData?.day}} day
					</view>
				</view>
				<view class="text">
					<view class="">
						 {{t('ttn.t_t52')}}
					</view>
					<view  class="" style="font-size: 26rpx;text-align: right;">
						{{detailData?.min_num}}*{{number}}*{{(detailData?.rate*100).toFixed(2)}}%*{{detailData?.day}} day  = {{t('ttn.t_t55')}} {{(Number(detailData?.min_num)*Number(detailData?.day)*Number(detailData?.rate)*Number(number).toFixed(2))+(Number(detailData?.min_num)*number)}} {{ currency }}
					</view>
					
				</view>
			</view>
			
			<view class="box1">
				<view class="text">
					<view class="">
						 {{t('ttn.t_t53')}}
					</view>
				</view>
				
				<view v-html="detailData?.content" class="text_box">
					
				</view>
			</view>
		</view>
		
		<view style="height: 100rpx;">
			
		</view>
		<Loading ref="showLoading"></Loading>
		
		
		
	</view>
</template>

<script setup>
	import kefu from "@/components/kefu/kefu.vue"

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

	const reduce = () =>{
		if(number.value == 1){
			return false
		}else{
			number.value--
		}
	}
	const add = () =>{
		if(detailData.value.limit == 0){
			number.value++
		}else if(detailData.value.limit == -1){
			return Toast.text('Unlimited purchase quantity')
		}else if(detailData.value.limit == number.value){
			return Toast.text('Cannot exceed the purchase limit')
		}else{
			number.value++
		}
		
	}
	const changeStyle = {
		color:'#B1ED71'
	}
	const number = ref(1)
	const detailData = ref()
	const num = ref()
	const showLoading = ref(false)
	const invest = () =>{

		console.log(num.value,id.value,number.value);
		if(detailData.value.buy_status == 0){
			return Toast.text('Not available for purchase at the moment')
		}
		showLoading.value.loading = true
		

		request({
			url:'lixibao/invest',
			methods:'post',
			data:{
				amount:num.value,
				id:id.value,
				num:number.value
			}
		}).then(res=>{
			setTimeout(()=>{
				Toast.text('success')
				
				showLoading.value.loading = false
				uni.navigateTo({
					url:'../tabbar/index'
				})
			},1000)
			
		}).catch((err) => {
			setTimeout(()=>{
				showLoading.value.loading = false
				Toast.text(err.message);
			},1000)
			
      });
	}
	const detail = (id) =>{
		request({
			url:'lixibao/detail',
			methods:'post',
			data:{
				id
			}
		}).then(res=>{
			detailData.value = res
			num.value = detailData.value.min_num
		})
	}

	const goBack = () => {
		history.back()
	}
	
	const headIndex = ref(1)
	const currency = ref('')
	const id = ref()
	onLoad((e)=>{
		if(e.id){
			id.value = e.id
			detail(e.id)
		}
		// 获取货币符号
		request({
			url: "/setting/currency",
			methods: "get",
		}).then((res) => {
			uni.setStorageSync("currency", res.currency);
			currency.value = res.currency
		});
	})
</script>

<style lang="scss" scoped>
	.text_box{
		width: 100%;
		overflow: hidden;
		word-break: break-all;
	}
	.bigT{
		width: 50rpx;
		height: 50rpx;
		color: #000;
		background-color: #f7f8fa;
		text-align: center;
		margin-left: 10rpx;
		
	}
	.main{
		background: url('../../static/back.png') no-repeat;
		background-size: 100% 100%;
		height: 100%;
	}
	.inps{
		background: #242424;
		height: 80rpx;
		border-radius: 16rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0rpx 20rpx;
		border: 1px solid #676767;
	}
	.box2{
		width: 100%;
		box-sizing: border-box;
		padding: 40rpx 32rpx;
		background-color: #242424;
		border-radius: 32rpx;
		margin-top: 44rpx;
		.text{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			
		}
	}
	.btn{
		background-color: #14DBDD;
		border-radius: 44rpx;
		box-sizing: border-box;
		padding: 26rpx 126rpx;
		margin-top: 56rpx;
		text-align: center;
	}
	.box1{
		width: 100%;
		box-sizing: border-box;
		padding: 40rpx 32rpx;
		background-color: #1E253B;
		border-radius: 32rpx;
		margin-top: 44rpx;
		
		.text{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			box-sizing: border-box;
			padding: 15rpx 10rpx;
			border-bottom: 1px solid #3F4A64;
			
			.btn{
				background-color: #92CC53;
				color: #fff;
				text-align: center;
			}
		}
	}
	.num{
		display: flex;
		.undis{
			width: 20rpx;
			height: 20rpx;
		}
	}
	
</style>
