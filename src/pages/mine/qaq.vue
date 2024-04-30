<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('add3.a_a2')"></topNav>
		<view class="pdlr45">
			<view class="  fqBg text_white">
				<view class="cTitle">
					{{ t('vance.t_t1') }}
				</view>
				<view class="mainItem" style="display: flex; flex-direction: column-reverse;">
					<view class="mt10 ">
						<span>{{ t('vance.t_t2') }}</span> : <span :style="{ color: store.$state.contentColor }">
							《{{ pageData.recruit1 }}》<span v-if="pageData.recruit1_wages"> --> {{ pageData.recruit1_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span> {{ t('vance.t_t3') }}</span> : <span :style="{ color: store.$state.contentColor }">
							《{{ pageData.recruit2 }} 》 <span v-if="pageData.recruit2_wages"> -->
								{{ pageData.recruit2_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t14') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit3 }}》
							<span v-if="pageData.recruit3_wages"> -->{{ pageData.recruit3_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span> {{ t('vance.t_t15') }} </span>: <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit4 }}》
							<span v-if="pageData.recruit4_wages">--> {{ pageData.recruit4_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t16') }}</span> : <span :style="{ color: store.$state.contentColor }">
							《{{ pageData.recruit5 }}》<span v-if="pageData.recruit5_wages">--> {{ pageData.recruit5_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t4') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit6 }}》<span v-if="pageData.recruit6_wages">--> {{ pageData.recruit6_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t5') }}</span> : <span :style="{ color: store.$state.contentColor }">


							《{{ pageData.recruit7 }}》<span v-if="pageData.recruit7_wages">--> {{ pageData.recruit7_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t6') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit8 }}》 <span v-if="pageData.recruit8_wages"> -->
								{{ pageData.recruit8_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t7') }} </span>: <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit9 }}》<span v-if="pageData.recruit9_wages">--> {{ pageData.recruit9_wages }}
								{{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t8') }} </span>: <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit10 }}》<span v-if="pageData.recruit10_wages">-->
								{{ pageData.recruit10_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t9') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit11 }}》<span v-if="pageData.recruit11_wages">-->
								{{ pageData.recruit11_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t10') }}</span> : <span :style="{ color: store.$state.contentColor }">
							《{{ pageData.recruit12 }}》<span v-if="pageData.recruit12_wages">-->
								{{ pageData.recruit12_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t11') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit13 }}》<span v-if="pageData.recruit13_wages">-->
								{{ pageData.recruit13_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t12') }} </span>: <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit14 }}》<span v-if="pageData.recruit14_wages">-->
								{{ pageData.recruit14_wages }} {{ currency }}</span></span>
					</view>
					<view class="mt10 ">
						<span>{{ t('vance.t_t13') }}</span> : <span :style="{ color: store.$state.contentColor }">

							《{{ pageData.recruit15 }}》 <span v-if="pageData.recruit15_wages">-->
								{{ pageData.recruit15_wages }} {{ currency }}</span></span>
					</view>
				</view>
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
// import {
// 	Toast
// } from '@nutui/nutui';
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


const showLoading = ref(null)
const currency = uni.getStorageSync('currency')
const pageData = ref({})
const getData = () => {
	showLoading.value.loading = true
	request({
		url: 'home/other',
		methods: 'get',
	}).then(res => {
		showLoading.value.loading = false
		pageData.value = res.platformData
	}).catch(e => {
		showLoading.value.loading = false
	})

}

// 终于可以用了
onMounted(() => {
	showLoading.value.loading = true
	getData()
})
onLoad(() => {
 
})
</script>

<style lang="scss">
.fqBg {
	background: url('/static/themeNum1/img/van.png') no-repeat 100%/100%;
	height: 100vh;
	background-color: #000;
	background-position: top;
	// margin-top: 50rpx;
	padding: 30rpx;

	.cTitle {
		margin-top: 20rpx;
		background: linear-gradient(90deg, #F9C976 0%, #FFECC5 49%, #FED794 100%);
		padding: 10rpx 20rpx;
		text-align: center;
		color: #000;
		border-radius: 10rpx;
		font-weight: bold;
	}
}

.mainItem {
	span:nth-child(1) {
		border-bottom: 4rpx solid #ccc;
	}

	span:nth-child(2) {
		font-weight: bold;
		// font-size: 40rpx;
	}
}
</style>
