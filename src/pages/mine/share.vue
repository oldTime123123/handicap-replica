<template>
	<view class="normalBg" style="background: #060D1F">
		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 32rpx;height: 30rpx;">
				<image :src="store.$state.imgObj.backIcon" style="width: 100%;height: 100%;" @click="back"></image>
			</view>
			<view class="f36  text_white" style="font-weight: 500;">{{t('mine.m_s1')}}</view>
			<view></view>
		</view>
		<view class="pdlr45 mt70">
			<view class="pdlr45 f45 text_center text_bold" style="color: #51FDFE;">
				{{t('add3.a_a3')}}
			</view>


		</view>
		<view class="pdlr45">
			<view class="shareBox center flex-col">

				<qrcode-vue :value="inviteUrl" v-if="inviteUrl" :size="163" level="H" />
				<view class="mt23 text_center" :style="{color:store.$state.contentColor}">
					<view class="f24">{{t('mine.m_s3')}}</view>
					<view class="mt14 f40" :style="{color:'#52fdff'}">
						{{inveCode}}
					</view>
				</view>
				<view class="flex mt30">
					<view :style="{background:store.$state.secondColor}" class="color0 f38"
						style="padding:23rpx 134rpx ; border-radius: 50rpx;" @click="copyHandle(inviteUrl)">
						{{t('all.a_c3')}}</view>
				</view>
			</view>
		</view>

		<view class="pdlr45 mt70">
			<view class="invite_list">
				<view class="flex">
					<view class="label">
						{{t('mine.m_s4')}}
					</view>
				</view>
				<view class="tableHead mt17">
					<view class="head ">
						{{t('mine.m_s4')}}
					</view>
					<view class="head ">
						{{t('mine.m_s6')}}
					</view>
				</view>
				<scroll-view scroll-y="true" class="list_warp" style="margin-top:30rpx; " @scrolltolower="lower">
					<view class="list_box" v-for="(item, index) of invite_list" :key='index'>
						<view class=" head_left">
							{{item.filter_phone}}
						</view>
					
						<view class=" head_right">
							{{item.create_time_simple_format}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
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
			url: 'user/index',
			methods: 'get',
			data: {}
		}).then(res => {
			inviteUrl.value = window.location.protocol + "//" + window.location.host +
				"/\#/\?code=" + res.invite_code
			inveCode.value = res.invite_code
		})

		request({
			url: 'user/record/team/redirectUser',
			methods: 'get',
			data: pages.value
		}).then(res => {
			invite_list.value = res.data
		})
	}
	const canLoad = ref(true)
	const lower = () => {
		if (!canLoad.value) {
			return false
		}
		pages.value.page += 1
		request({
			url: 'user/record/team/redirectUser',
			methods: 'get',
			data: pages.value
		}).then(res => {

			invite_list.value.push(...res.data)
			if (res.data.length < 10) {
				canLoad.value = false
			}
		})

	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.shareBox {
		width: 100%;
		height: 783rpx;
		padding-top: 50rpx;
		background: url('../../static/themeNum1/img/shareBox.png') no-repeat 100%/100%;

	}

	.invite_list {
		// margin: 25rpx 27rpx 0;
		height: 430rpx;
		background: #262626;
		border-radius: 30rpx;

		.label {
			font-size: 28rpx;
			font-weight: 400;
			color: #000;
			// width: 310rpx;
			background:#51FDFE;
			margin: 0 auto;
			text-align: center;
			border-radius: 0px 0px 20rpx 20rpx;
			padding: 22rpx 27rpx;
		}

		.list_warp {
			margin-top: 43rpx;
			padding-left: 0;
			// background-color: #ccc;
			height: 200rpx;
			overflow: scroll;
			.list_box {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				text-align: center;
				font-size: 20rpx;
				font-weight: 400;
				color: #fff;
				line-height: 68rpx;
				height: 68rpx;

				.head_left {
					border-right: 1rpx solid #fff;
				}

				.head_right {
					border-left: 1rpx solid #fff;
				}

				.left {
					border-right: 1rpx solid #fff;
					border-bottom: 1rpx solid #fff;
				}

				.center {
					border-bottom: 1rpx solid #fff;
				}

				.right {
					border-left: 1rpx solid #fff;
					border-bottom: 1rpx solid #fff;
				}
			}

		}
	}

	.tableHead {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		text-align: center;
		font-size: 20rpx;
		font-weight: 400;
		color: #fff;
		height: 72rpx;
		line-height: 72rpx;
		.head {
			background-color: #5d5a55;
			text-align: center;
			padding: 10rpx 30rpx;
		}
	}
</style>
