<template>
	<view class="normalBg" style="background: #060D1F">
	<!-- 	<view class="nav between pdlr30 pdtb20">
			<image src="/static/images/back.png" mode="widthFix" style="width: 38rpx;height: 36rpx;"
				@click="methods.back">
			</image>
			<view class="center text_white f40">
				Red envelope record
			</view>
			<view></view>
		</view> -->
		
		<topNav :title="t('redE.r_r9')"></topNav>
		<!-- <view :style="store.$state.imgObj.loginBg"> -->
		<view class="mglr33 pt33">

			<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="true"
				:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-show-back-to-top="true"
				:safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
				:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
				:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
				:loading-more-fail-text="t('rec.r_a4')" style="margin-top: 120rpx;width: 94%;margin-left: 3%; ">

				<view v-for="(item, index) in recordsList" :key="index">
					<view class="listItem">
						<view class="vvItem">
							<view class="f26"> {{t('redE.r_r10')}}</view>
							<view class="" :style="{color:'#ef3c36'}">{{ item.price }} {{currency}}
							</view>
						</view>

						<view class="vvItem">
							<view class="f26">{{t('add1.a_a4')}}</view>
							<view class="" :style="{color:'#ef3c36'}">
								{{ item.create_time }}
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script setup>
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
		getStorageSync
	} from '@dcloudio/uni-h5';
	const store = userStore();
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const methods = {
		back() {
			history.back()
		},

	};
	const recordsList = ref([])
	const paging = ref(null)
	const pages = ref({
		page: 1,
		size: 10
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'activity/prizePackage/log',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
	const currency = ref("")
	// 终于可以用了
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.listItem {
		background: #fff;
		border-radius: 20rpx;
		padding: 4rpx 45rpx 34rpx 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		width: 600rpx;
		margin: 30rpx auto;

		.vvItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 29rpx;
		}

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancle {
			color: #AFAFAF;
		}
	}
</style>
