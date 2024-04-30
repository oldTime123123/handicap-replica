<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="'USDT binding'"></topNav>
		<view class="pdlr45 mt70">
			<view>
				{{ t('setting.s_s2') }}
			</view>
			<view class="settingInp mt30">
				<input type="text" :placeholder="t('setting.s_s2')" placeholder-class="inpPlaceholder"
					style="height: 100%;width: 100%;" v-model="formData.address">
			</view>


			<view class="inpBtn center " style="margin-top:180rpx" :style="{ background: store.$state.secondColor }"
				@click="saveHandle">
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
function isTRC20Address(address) {
	return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
}
const showLoading = ref(null)
const formData = ref({
	address: ''
})
const getData = () => {
	request({
		methods: 'get',
		url: 'user/attribute/wallet',
	}).then(res => {
		if (res.address) {
			formData.value.address = res.address
		}
	})
}

const saveHandle = () => {

	if (!isTRC20Address(formData.value.address)) {
		uni.showToast({
			title: 'Please enter the wallet address of the correct TRON address!',
			icon: 'none',
			duration: 3000
		})
		return false
	}
	showLoading.value.loading = true
	request({
		methods: 'post',
		url: 'user/attribute/wallet',
		data: {
			address: formData.value.address
		}
	}).then(res => {
		showLoading.value.loading = false
		Toast.text(t('setting.s_s3'));
		history.back()
	}).catch(err => {
		showLoading.value.loading = false
		Toast.text(err.message);
	})
	showLoading.value.loading = false
}
// 终于可以用了
onShow(() => {
	getData()
})
onLoad(() => {
 
})
</script>

<style lang="scss"></style>
