<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('withdraw.w_w1')"></topNav>
		<view class="pdlr45 mt70">

			<view class="mt55">
				<view class="topBox center flex-col">
					<view class="topItem f26">{{ t('all.b_b1') }}</view>
					<view class="mt35 f55" style="color: #fff;">{{ currency }} {{ pageData.balance_max }} </view>
				</view>
				<view class="mt40" style="text-align: center;">
					{{ currency }}: {{ inpVal }} = {{ (inpVal*kurs).toFixed(2) }} USDT
				</view>
				<view class="mt40 inputItem">
					<text>{{ currency }}</text>
					<view class="pl35">
						<input type="number" :focus="true" :placeholder="t('recharge.r_r2')" placeholder-class="f30 plo"
							v-model="inpVal">
					</view>
				</view>
				<view class="f20 mt30 " style="color: #fff;">
					handling fee:{{Number(inpVal)>Number(pageData.no_fee)?0:pageData?.fee}}
				</view>
				<view class="f20 mt30 " style="color: #fff;">
					*{{ t('withdraw.w_w2') }}
					{{ pageData?.min + "-" + pageData?.max }}
				</view>

				<view class="mt68 info l_inpBg">
					<view class="between" @click="jumpPage('../setting/set2')">
						<view style="width: 80%;">
							{{ pageData?.bankcard?`${pageData?.bankcard?.bank?.name}:${pageData?.bankcard?.bank_num}`:t('pk.p_w1')  }}
						</view>
						<image :src="store.$state.imgObj.left" mode="widthFix" style="width: 23rpx;height: 39rpx;">
						</image>
					</view>
				</view>

				<view class="mt70  " v-if="showBindPwd">
					<!-- 					{{ t('withdraw.w_w3') }} -->
					<view class="mt38 info l_inpBg" style="position: relative;">
						<view class="flex col_center between">
							<input class="uni-input" :placeholder="t('withdraw.w_w4')" :password="showPassword"
								style="width: 100%;" disabled />
							<view class="bindAdd" @click="jumpPage('../setting/set3')" v-if="showBindPwd">Bind</view>
						</view>
					</view>
				</view>


				<view class="mt70" v-else>
					<!-- 					{{ t('withdraw.w_w5') }} -->
					<view class="mt38 info l_inpBg">
						<view class="flex col_center between">
							<input class="uni-input" :placeholder="t('withdraw.w_w5')" :password="showPassword"
								style="width: 100%;" v-model="fundPwd" />
							<image src="../../static/themeNum1/l_icon/eyeOpen.png" style="width:29rpx ; height: 25rpx;"
								@click="changePassword" v-if="!showPassword"></image>
							<image src="../../static/themeNum1/l_icon/eyeClose.png" style="width:29rpx ; height: 25rpx;"
								@click="changePassword" v-if="showPassword"></image>
						</view>
					</view>
				</view>

				<view class=" center l_inpS mt40  pdlr30  f32" style="margin-top:114rpx;color: #000;"
					:style="{ background: store.$state.secondColor }" @click="submitHandle">
					{{ t('add3.a_a4') }}
				</view>
			</view>

			<!-- <view style="height: 100rpx;"></view> -->
			<view class="desc pdtb50">
				<view v-html="pageData.description"></view>
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import kefu from "@/components/kefu/kefu.vue"

	import topNav from "@/components/topNav/topNav.vue"
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

	const choStyle = {
		background: store.$state.contentColor,
		boxShadow: "none ",
		color: '#fff'
	}
	const noStyle = {
		color: store.$state.contentColor
	}
	const kurs = ref()
	const user = ref({})
	const inpVal = ref("")
	const fundPwd = ref("")
	const showLoading = ref(null)
	const pageData = ref({})
	const showPassword = ref(false)
	const changePassword = () => {
		showPassword.value = !showPassword.value
	}
	const showBindPwd = ref(false)
	const getData = () => {
		//获取汇率
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			kurs.value = res.rate
		})
		request({
			url: 'finance/bank/withdraw/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			if (!res.user.payment_password) {
				showBindPwd.value = true
			} else {
				showBindPwd.value = false
			}
		})
	}

	const submitHandle = () => {
		if (pageData.value.check.status == 1) {
			Toast.text(pageData.value.check.message)
			return
		}

		if ((inpVal.value - 0) < (pageData.value.min - 0) || (inpVal.value - 0) > (pageData.value.max - 0)) {
			Toast.text(`${t('mark.a7')}: ${pageData.value.min} - ${pageData.value.max}`)

			return false
		}

		showLoading.value.loading = true
		setTimeout(() => {
			submitHandle1()
		}, 2000)
	}
	const submitHandle1 = () => {
		const data = {
			amount: inpVal.value,
			password: fundPwd.value,
			balance_type: balance_type.value
		}

		request({
			url: 'finance/bank/withdraw/submit',
			methods: 'post',
			data: data
		}).then(res => {
			getData();
			showLoading.value.loading = false
			Toast.text('submit success')
			inpVal.value = ""
			fundPwd.value = ""
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	const jumpPage = (url) => {
		uni.navigateTo({
			url
		})
	}
	const currency = uni.getStorageSync('currency')

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
	.topBox {
		height: 350rpx;
		background: url('/static/themeNum1/img/balanceBg.png') no-repeat 100%/100%;
	}

	.bindAdd {
		position: absolute;
		// left: 20rpx;
		right: 40rpx;
		top: 50%;
		font-size: 20rpx;
		transform: translateY(-50%);
		// width: 60rpx;
		padding: 0 10rpx;
		height: 60rpx;
		background: linear-gradient(90deg, #0A6ED8 0%, #E827FF 100%);

		border-radius: 10rpx;
		color: #fff;
		text-align: center;
		line-height: 60rpx;
	}

	.info {
		background-color: #262626;
		border-radius: 20rpx;
		padding: 30rpx 33rpx;
		color: #fff;
	}

	.topItem {
		padding: 0 34rpx;
		height: 60rpx;
		background: #fff;
		border-radius: 30rpx;
		text-align: center;
		color: #000;
		line-height: 60rpx;
	}

	.inputItem {
		height: 115rpx;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #000;
		padding-left: 40rpx;

		// box-shadow: 0px 1px 51px 0px rgba(64,46,197,0.05);
	}


	.btns {
		margin-top: 100rpx;
		// box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		background-color: #fff;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}
</style>