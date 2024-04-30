<template>
	<view style="background: #060D1F">
		<view class="between" :style="{ background: store.$state.contentColor }" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 48rpx;height: 48rpx;">
				<IconFont name="rect-left" color="#fff" @click="back"></IconFont>
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">
				{{ t('newAct.r_r1') }}</view>
			<view style="width: 41rpx;height: 44rpx;">
				<image src="/static/themeNum1/icon/jifenRec.png" style="width: 100%;height: 100%;"
					@click="rightClickHandle('../record/redemRecod')"></image>
			</view>
		</view>
		<view class="topBg center">
			<view class=" mainBox text_white">
				<view class="text_center pt30">
					<view class="f26">{{ t('newAct.r_r2') }}</view>
					<view class="mt30 f60 text_bold">{{ pageData.allGet }}</view>
				</view>

				<view class="between mt30">
					<view class="text_center pdlr10 pt30" style="width:50%">
						<view class="f26 textHiddenTwo">{{ t('newAct.r_r3') }}</view>
						<view class=" f30 text_bold">{{ pageData.allMoney }}</view>
					</view>
					<view class="text_center pdlr10 pt30" style="width:50%">
						<view class="f26 textHiddenTwo">{{ t('newAct.r_r4') }}</view>
						<view class=" f30 text_bold">{{ pageData.integral }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class=" mt40">

			<view class="pdlr40">
				<view class="inputBox">
					<view>
						{{ t('newAct.r_r5') }}
					</view>

					<view class="pb20 borderB mt20">
						<input type="text" style="line-height: 100%; width: 100%;" class=" f40"
							:placeholder="t('newAct.r_r6')" placeholder-class="f30" v-model="inpVal">
					</view>

					<view class="mt20 f26">
						{{ t('newAct.r_r7') }} <text class="error">{{ pageData.config.x }}</text> {{ t('newAct.r_r8') }} <text
							class="error">{{ pageData.config.n }}</text> {{ currency }}.
					</view>
				</view>

				<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32 mt30"
					:style="{ background: store.$state.contentColor }" @click="submitHandle">
					{{ t('newAct.r_r9') }}
				</view>

				<view class="mt80 desc">
					<view class="center">
						<view class="text_white" style="padding: 16rpx 90rpx; background: linear-gradient(0deg, #FFA115 0%, #F5A04E 100%);
border-radius: 38rpx;">{{ t('newAct.r_r10') }}</view>
					</view>

					<view class="mt20" v-html="pageData.config.rules"></view>
				</view>
			</view>


		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import COUNTRY from '../../../setting.js'
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
const back = () => {
	history.back()
}

const showLoading = ref(null)

const rightClickHandle = url => {
	uni.navigateTo({
		url
	})
}
const inpVal = ref("")
const submitHandle = () => {
	if (inpVal.value < pageData.value.config.min) {
		Toast.text(t('newAct.r_r11') + pageData.value.config.min + t('newAct.r_r12'))
		return false
	}
	showLoading.value.loading = true
	request({
		url: 'activity/integral/submit',
		methods: "post",
		data: {
			num: inpVal.value
		}
	}).then(res => {
		Toast.text(t('newAct.r_r13'))
		inpVal.value = ""
		getData()
	}).catch(e => {
		showLoading.value.loading = false
		Toast.text(e.message)
	})
}

const pageData = ref({
	integral: 0,
	config: {
		min: 1,
		rules: "",
		n: 10,
		x: 1
	}
})
const getData = () => {
	request({
		url: 'activity/integral/info'
	}).then(res => {
		showLoading.value.loading = false
		pageData.value = res
	})
}
const currency = uni.getStorageSync('currency')
// 终于可以用了
onMounted(() => {
	showLoading.value.loading = true
	getData()
})
onLoad(() => {
	if (localStorage.getItem('token')) {

	} else {
		uni.navigateTo(
			{
				url: '../login/login'
			}
		)
	}
})
</script>

<style lang="scss" scoped>
.desc {
	background-color: #fff;
	padding: 30rpx 40rpx;

	border-radius: 20rpx;
	min-height: 400rpx;
}

.l_inpBg {
	border-radius: 50rpx;
}

.inputBox {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 50rpx;
	box-shadow: 0 0 20rpx 1rpx #c6c6c6;
}

.topBg {
	background: url('/static/themeNum1/img/jifenBg.png') no-repeat 100%/100%;
	width: 100%;
	height: 440rpx;

	.mainBox {
		background: rgba(255, 255, 255, 0.4);
		width: calc(100% - 80rpx);
		// height: 360rpx;
		padding-bottom: 40rpx;
		border-radius: 20rpx;
	}
}

.textHiddenTwo {
	height: 50rpx;
}
</style>
