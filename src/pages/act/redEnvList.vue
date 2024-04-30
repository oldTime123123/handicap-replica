<template>
	<view
		style="height: calc(100vh ) !important;overflow: hidden;background: url('static/redElove/listBg1.png') no-repeat 100%/100%;">


		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 48rpx;height: 80rpx;" class="center">
				<IconFont name="left" color="#fff" @click="back"></IconFont>
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">
				{{ t('redE.r_r1') }}
			</view>

			<view style="width: 48rpx;height: 80rpx;" class="center">

			</view>
		</view>
		<view class="pdlr30 mt70 ">
			<view class="kefuItem flex col_center" v-for="item in dataList" @click="changePage(item)">
				<image src="/static/actIcon/redElove/hList.png" mode="widthFix" style="width: 80rpx;height: 80rpx;">
				</image>
				<view class="mglr40 f34">
					{{ item.title }}
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import topNav from "@/components/topNav/topNav.vue"
import request from '../../../comm/request.ts';
import {
	userStore
} from "@/store/themeNum.js";

import {
	onShow,
	onLoad
} from "@dcloudio/uni-app";
import {
	onMounted
} from "vue";
const store = userStore();

import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();


const dataList = ref([])
const getData = () => {
	request({
		url: 'activity/prizePackage/list',
		methods: 'get'
	}).then(res => {
		dataList.value = res
	})
}
const changePage = (item) => {
	uni.navigateTo({
		url: './redEnvelope?id=' + item.id
	})
}
const back = () => {
	history.back()
}
const showLoading = ref(null)
// 终于可以用了
onMounted(() => {
	getData()
	showLoading.value.loading = true
	setTimeout(() => {
		showLoading.value.loading = false
	}, 1000)
})
onLoad(() => {
 
})
</script>

<style lang="scss" scoped>
.mainBox {
	background-color: #fff;
	border-radius: 20px;
	padding: 50rpx;
	line-height: 40rpx;
	word-spacing: 0.1rem;
}

.kefuItem {
	background-color: #fff;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	padding: 30rpx;
}
</style>
