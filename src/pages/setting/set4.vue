<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('setting.s_p8')"></topNav>
		<view class="pdlr45 mt70">
			<view>
				<view class="">
					{{ t('setting.s_p2') }}
				</view>
				<view class="settingInp mt30 between">

					<input :type="showPwd ? 'password' : 'text'" :placeholder="t('setting.s_p2')"
						placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;"
						v-model="formData.old_password">
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>
			</view>
			<view class="mt55">
				{{ t('setting.s_p4') }}
			</view>
			<view class="settingInp mt30 between">
				<input :type="showPwd ? 'password' : 'text'" :placeholder="t('setting.s_p4')"
					placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;" v-model="formData.password">

				<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="!showPwd"></image>
				<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="showPwd"></image>
			</view>

			<view class="mt55">
				{{ t('setting.s_p5') }}
			</view>
			<view class="settingInp mt30 between">
				<input :type="showPwd ? 'password' : 'text'" :placeholder="t('setting.s_p5')" v-model="formData.password2"
					placeholder-class="inpPlaceholder" style="height: 100%;width: 100%;">
				<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="!showPwd"></image>
				<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
					@click="showPwd = !showPwd" v-if="showPwd"></image>
			</view>

			<view class="inpBtn center" style="margin-top:180rpx" :style="{ background: store.$state.secondColor }"
				@click="saveHandle">
				{{ t('all.a_c1') }}
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

const showPwd = ref(true)
const {
	t
} = useI18n();

const showLoading = ref(null)
const formData = ref({
	old_password: '',
	password: '',
	password2: '',
	type: 0
})
// 

const saveHandle = () => {
	if (!formData.value.old_password) {
		Toast.text(t('setting.s_p2'));
		return false
	}
	if (formData.value.password.length < 6 || formData.value.password.length > 24) {
		Toast.text(t('setting.s_p6'));
		return false
	}

	if (formData.value.password !== formData.value.password2) {
		Toast.text(t('setting.s_p7'));
		return false
	}
	showLoading.value.loading = true
	setTimeout(() => {
		saveHandle1()
	}, 1500)
}
const saveHandle1 = () => {
	request({
		methods: 'post',
		url: 'user/attribute/password',
		data: formData.value
	}).then(res => {
		showLoading.value.loading = false
		Toast.text(t('setting.s_s3'));
		history.back()

	}).catch(err => {
		showLoading.value.loading = false
		Toast.text(err.message);
	})
}
onLoad(() => {
 
})
</script>

<style lang="scss" scoped>
.between {
	padding-right: 30rpx;
}
</style>
