<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>

		<topNav :title="t('newAct.c_t1')"></topNav>
		<view class="pdlr45 mt70">
			<view class="color3">{{ t('newAct.c_t2') }}</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('newAct.c_t4')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="fromData.phone">
			</view>


			<view class="color3 mt50">{{ t('newAct.c_t5') }}</view>
			<view class="inputBox mt30">
				<input type="text" :placeholder="t('newAct.c_t6')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;color: #333;" v-model="fromData.amount">


				<view class="mt30 tips">
					{{ t('newAct.c_t7') }} <text>1000 {{ currency }}</text> {{ t('newAct.c_t8') }}
				</view>
				<view class="mt30 tips">
					{{ t('newAct.c_t10') }} <text>{{ minTransfer }} {{ currency }}</text> {{ t('newAct.c_t8') }}
				</view>
			</view>


			<view class="mt70">
				{{ t('withdraw.w_w5') }}
				<view class="settingInp mt30 flex between">
					<input :type="!showPassword ? 'text' : 'password'" :placeholder="t('withdraw.w_w5')"
						placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;color: #333;"
						v-model="fromData.password">

					<image src="../../static/themeNum1/l_icon/eyeOpen.png" style="width:29rpx ; height: 25rpx;"
						@click="showPassword = !showPassword" v-if="!showPassword"></image>
					<image src="../../static/themeNum1/l_icon/eyeClose.png" style="width:29rpx ; height: 25rpx;"
						@click="showPassword = !showPassword" v-if="showPassword"></image>
				</view>
			</view>
			<view class="inpBtn center " style="margin-top:180rpx" :style="{ background: store.$state.contentColor }"
				@click="tranferHandle">
				{{ t('all.a_c2') }}
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
const showLoading = ref(null)


const showPassword = ref(false)


const fromData = ref({
	amount: "",
	phone: "",
	password: ""
})
const tranferHandle = () => {
	if (Number(fromData.value.amount) < Number(minTransfer.value) && minTransfer.value !== 0) {
		Toast.text(t('newAct.c_t10') + minTransfer.value + currency)
		return false
	}
	showLoading.value.loading = true
	// api/transfer/index
	request({
		url: 'transfer/index',
		methods: 'post',
		data: fromData.value
	}).then(res => {
		showLoading.value.loading = false

		Toast.text(t('newAct.c_t9'))
		fromData.value.amount = ""
		fromData.value.phone = ""
		fromData.value.password = ""
	}).catch(err => {
		showLoading.value.loading = false
		Toast.text(err.message)
	})
}

const currency = uni.getStorageSync('currency')

const minTransfer = ref(0)
onLoad(e => {
	if (e.min) {
		minTransfer.value = e.min
	}
 
})
</script>

<style lang="scss" scoped>
.color3 {
	color: #333;
}

.inputBox {
	background-color: #fff;
	padding: 20rpx 30rpx;
	border-radius: 20rpx;

	input {
		border-bottom: 1rpx solid #ddd;
		padding: 20rpx;
	}

	.tips {
		font-size: 22rpx;
		background-color: #F0F9FC;
		border-radius: 10rpx;
		padding: 30rpx;

		text {
			color: #3B3DBF;
			font-weight: bold;
		}
	}
}
</style>
