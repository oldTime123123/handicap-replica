<template>
	<view class="share" style="background: #060D1F">
		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 32rpx;height: 30rpx;">
				<image :src="store.$state.imgObj.backIcon" style="width: 100%;height: 100%;" @click="back"></image>
			</view>
			<view class="f36  text_white" style="font-weight: 500;">{{t('newAct.c_c12')}}</view>
			<view style="width: 30rpx;"></view>
		</view>
		<view class="pdlr45 mt70">
			<view class="pdlr45 f60 text_center  waiEl">
				<view class="liWord  ">
					{{t('newAct.c_c1')}}
				</view>
			</view>


		</view>
		<view class="pdlr30">
			<view class="shareBox  flex-col mt53">
				<view class="pt53 pl20" style="flex-direction: row; text-align: left;flex: 1;">
					<view class="f30 flex col_center">
							{{t('newAct.c_c2')}}: <text class="pl20 text_bold  f40" style="color: #F24837;">
							{{pageData.total_welfare}} {{currency}}
						</text>

					</view>
					<view class="f30 flex col_center mt10">
							{{t('newAct.c_c2')}}: <text class="pl20 text_bold  f40" style="color: #F24837;">
							{{pageData.total_welfare}} 
						</text>

					</view>
					<!-- 		<view class="f30 flex row_center">Total Donation Amount <text class=" text_bold "
							style="color: #F24837;">
							{{pageData.total_welfare}} {{currency}}
						</text></view> -->
				</view>
				<view class="flex mt39">
					<view class="text_white  donateBtn" @click="investMask = true">	{{t('newAct.c_c4')}}
					</view>
				</view>
			</view>
		</view>

		<view class=" mt70">
			<view class="invite_list">
				<view class="flex">
					<view class="label">
							{{t('newAct.c_c5')}}
					</view>
				</view>
				<view class="tableHead mt37 f26">
					<view class="head head_left">
							{{t('newAct.c_c6')}}
					</view>
					<view class="head">
							{{t('newAct.c_c7')}}
					</view>
					<view class="head head_right">
							{{t('newAct.c_c8')}}
					</view>
				</view>
				<scroll-view scroll-y="true" class="list_warp" style="margin-top: 10rpx; ">
					<view class="list_box" v-for="(item, index) of pageData.log" :key='index'>
						<view class=" head_left">
							{{item.phone}}
						</view>
						<view class="">
							{{item.money}}
						</view>
						<view class=" head_right">
							{{item.createTime}}
						</view>
					</view>
				</scroll-view>
			</view>


		</view>
		<!-- input mask -->
		<nut-overlay v-model:visible="investMask" :close-on-click-overlay="false">
			<div class="wrapper">
				<view style="width: 100%;">
					<div class="content ">

						<view class="pl30 f34">
							{{t('newAct.c_c9')}}
						</view>
						<input type="number" class="donaInput" :placeholder="t('newAct.c_c9')"
							placeholder-class="f26" v-model="inputMoney">
							
							<input type="password" class="donaInput" :placeholder="t('withdraw.w_w5')"
							placeholder-class="f26" v-model="password">
						<view class="between mt20">
							<view style="border: 1rpx solid;"
								:style="{'border-color':store.$state.contentColor,color:store.$state.contentColor}"
								@click="investMask = false">{{t('all.a_c1')}}
							</view>
							<view class="text_white" :style="{background:store.$state.contentColor}"
								@click="confirmHandle">
								{{t('all.a_c2')}}
							</view>
						</view>
					</div>
				</view>
			</div>
		</nut-overlay>
		<view class=" pdlr30">
			<view class=" botBoxEl pdlr30 pdtb30">
				<!-- <view>{{t('newAct.c_c11')}}</view> -->
				<view class="desc">
					<view v-html="pageData.content"></view>
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
	const back = () => {
		history.back()
	}
	const pageData = ref({})
	const investMask = ref(false)
	const inviteUrl = ref("")
	const inveCode = ref("")
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_c4'))
		} catch (e) {
			Toast.text(e)
		}
	}

	const invite_list = ref([])
	const pages = ref({
		page: 1,
		size: 10
	})

	const getData = () => {
		request({
			url: 'home/welfare',
			methods: 'get',
			data: {}
		}).then(res => {
			pageData.value = res
		})
	}

	const currency = uni.getStorageSync('currency')
	// 终于可以用了
	onMounted(() => {
		getData()
	})

	const inputMoney = ref("")
	const password = ref("")
	const confirmHandle = () => {
		uni.showLoading()
		request({
			url: 'home/welfare',
			methods: 'post',
			data: {
				money: inputMoney.value,
				password: password.value,
			}
		}).then(res => {
			Toast.text(t('newAct.c_c10'))
			getData()
			uni.hideLoading()
			inputMoney.value = ""
			password.value = ""
			investMask.value = false
		}).catch(err => {
			uni.hideLoading()
			Toast.text(err.message)
		})
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		color: #000;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		padding: 0 50rpx;

		.content {
			display: flex;
			width: calc(100% - 100rpx);
			height:450rpx;
			background: #fff;
			border-radius: 20rpx;
			flex-direction: column;
			// justify-content: center;
			padding: 50rpx 40rpx 20rpx 40rpx;
			position: relative;
			overflow: hidden;

			.donaInput {
				margin-top: 50rpx;
				height: 80rpx;
				border-bottom: 1rpx solid #ccc;
				padding: 0 0 0 30rpx;
				font-size: 34rpx;
				color: #333;
			}

			.between {
				width: 100%;
				// padding: 0 30rpx 40rpx;
				margin-top: 50rpx;

				view {
					width: 48%;
					height: 96rpx;
					text-align: center;
					line-height: 96rpx;
					font-size: 30rpx;
					border-radius: 15rpx
				}
			}
		}
	}

	.donateBtn {
		background: linear-gradient(0deg, #F14536 0%, #FD704A 100%);
		box-shadow: 0rpx 3rpx 33rpx 2rpx rgba(227, 0, 1, 0.33);
		border-radius: 45rpx;
		font-size: 34rpx;
		padding: 30rpx 100rpx;
		margin: 0 auto;
	}

	.waiEl {
		line-height: 80rpx;
		font-family: Superclarendon;
		margin-top: 400rpx;
		background: linear-gradient(96deg, #FFD7A8 0%, #DD1CE2 0%, #FFFFFF 0%, #FEFBDA 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		.liWord {
			font-weight: bold !important;

		}
	}

	.share {
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
		background: url('/static/themeNum1/img/chartyBg.png') no-repeat 100%/100%;
		background-position: top;
		background-color: #f4f5f7;
	}

	.shareBox {
		width: 100%;
		height: 357rpx;
		background-color: #fff;
		background: url('/static/themeNum1/img/chartyBox.png') no-repeat 100%/100%;
	}

	.invite_list {
		margin: 25rpx 27rpx 0;
		height: 430rpx;
		background: #FFFFFF;
		border-radius: 30rpx;

		.label {
			font-size: 28rpx;
			font-weight: 400;
			// width: 310rpx;
			background: #FFEEEB;
			color: #FF604A;
			margin: 0 auto;
			text-align: center;
			border-radius: 0px 0px 40rpx 40rpx;
			padding: 16rpx 59rpx;
		}

		.list_warp {
			margin-top: 43rpx;
			padding-left: 0;
			// background-color: #ccc;
			height: 200rpx;
			overflow: scroll;

			.list_box {
				color: #000000;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				text-align: center;
				font-size: 20rpx;
				font-weight: 400;
				color: #333333;
				line-height: 68rpx;
				height: 68rpx;

				.head_left {
					border-right: 1rpx solid #FFEECE;
				}

				.head_right {
					border-left: 1rpx solid #FFEECE;
				}

				.left {
					border-right: 1rpx solid #FFEECE;
					border-bottom: 1rpx solid #FFEECE;
				}

				.center {
					border-bottom: 1rpx solid #FFEECE;
				}

				.right {
					border-left: 1rpx solid #FFEECE;
					border-bottom: 1rpx solid #FFEECE;
				}
			}

		}
	}

	.tableHead {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		text-align: center;
		font-weight: 400;
		color: #333333;
		height: 72rpx;

		.head {
			text-align: center;
			padding: 10rpx 30rpx;
		}
	}

	.botBoxEl {
		height: 430rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		margin-top: 40rpx;

		overflow: scroll;
	}
</style>
