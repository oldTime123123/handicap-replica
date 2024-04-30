<template>
	<view class="normalBg" style="background: #060D1F">
		<topNav :title="t('mine.m_t1')"></topNav>
		<view class="pdlr30 mt70">
			<view>
				<view class="flex between">
					<view class="topItem l_inpBg  flex-wrap">
						<view class="f24">{{t('mine.m_t2')}}</view>
						<view class="f40 text_bold mt27" style="color:#51FDFE ;">{{pageData.member_today_commission}}
						</view>
					</view>
					<view class="topItem l_inpBg  flex-wrap">
						<view class="f24">{{t('mine.m_t3')}}</view>
						<view class="f40 text_bold mt27" style="color:#51FDFE ;">{{pageData.member_commission}}</view>
					</view>
				</view>
				<view class="flex between mt35">
					<view class="topItem l_inpBg  flex-wrap">
						<view class="f24">{{t('mine.m_t4')}}</view>
						<view class="f40 text_bold mt27" style="color:#51FDFE ;">{{pageData.member}}</view>
					</view>
					<view class="topItem l_inpBg  flex-wrap">
						<view class="f24">
						<!-- {{t('mine.m_t5')}}  -->
						Team belonging</view>
						<view class="f40 text_bold mt27" style="color:#51FDFE ;">{{pageData.teamFirstName}}
						</view>
					</view>
				</view>
			</view>
			
		<!-- 	<view class="mt30">
				<image v-if="curLang =='ar' || curLang == 'fa'" src="/static/arTeam.jpg" mode="widthFix" style="width: 100%;"></image>
				<image v-else src="/static/teamIntro.jpg" mode="widthFix" style="width: 100%;"></image>
			</view> -->
		<!-- 	<view class="flex mt50">
				<view :style="{background:store.$state.contentColor}" class="text_white f26"
					style="padding:20rpx 30rpx ; border-radius: 50rpx;">{{t('mine.m_t6')}}</view>
			</view>
			<view class="mt40" style="position: relative;">
				<image src="../../static/themeNum1/img/comm.png" mode="widthFix" style="width: 100%; height: 346rpx;">
				</image>
				<view class="f32" style="position: absolute;top: 140rpx;left: 60rpx;">
					<view class="levelText">{{t('mine.m_t7')}}</view>
					<view class="mt25 levelText">{{t('mine.m_t8')}}</view>
					<view class="mt25  levelText">{{t('mine.m_t9')}}</view>
				</view>
			</view>

			<view class="mt60" style="background-color: #fff;border-radius: 30rpx;overflow: hidden; border: 1rpx solid;"
				:style="{'border-color':store.$state.contentColor}">
				<view class="table_head text_white" :style="{background:store.$state.contentColor}">
					<view> </view>
					<view>{{t('mine.m_t7')}}</view>
					<view>{{t('mine.m_t8')}}</view>
					<view>{{t('mine.m_t9')}}</view>
				</view>

				<view class="table_head ">
					<view class="f22" :style="{color:store.$state.contentColor}">{{t('mine.m_t10')}}</view>
					<view class="f25">{{botData.A.number}}</view>
					<view class="f25">{{botData.B.number}}</view>
					<view class="f25">{{botData.C.number}}</view>
				</view>
				<view class="table_head " style="border-bottom: 1rpx solid #eee;">
					<view class="f22" :style="{color:store.$state.contentColor}">{{t('mine.m_t11')}}</view>
					<view class="f25">{{botData.A.invest_amount}}</view>
					<view class="f25">{{botData.B.invest_amount}}</view>
					<view class="f25">{{botData.C.invest_amount}}</view>
				</view>

				<view class="flex mt16 mb18 mr31" style="flex-direction: row-reverse;"
					@click="jumpPage('./teamDetail')">
					<view :style="{background:store.$state.contentColor}" class="text_white f26 flex col_center"
						style="padding:14rpx 24rpx ; border-radius: 50rpx;">{{t('mine.m_t12')}} <view class="center ml10"
							style="background-color: #fff; width: 42rpx;height: 42rpx;border-radius: 50%;">
							<nut-icon name="right" :color="store.$state.contentColor" size="10"></nut-icon>
						</view>
					</view>
				</view>
			</view>

			<view class="mt59 linkEl between">
				<view style="width: 80%;">
					<view>{{t('mine.m_t13')}}:</view>
					<view class="mt20 textHiddenOne">{{inviteUrl}}</view>
				</view>
				<view :style="{background:store.$state.contentColor}" class="text_white f26"
					style="padding:18rpx 39rpx ; border-radius: 50rpx;" @tap="copyHandle(inviteUrl)">{{t('all.a_c3')}}</view>
			</view>
 -->
			<view style="height: 100rpx;"></view>
		</view>

	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
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
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const inviteUrl = ref("")
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_c4'))
		} catch (e) {
			console.error(e)
		}
	}
	const curLang = uni.getStorageSync('lang')
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}

	const pageData = ref({
		// member: 0, //团队人数
		// member_commission: 0.00, //总团队收益
		// member_today_commission: 0.00, //今日团队收益
		// member_invest_amount: 0, //团队建设金额
	})
	const botData = ref({
		A:{},
		B:{},
		C:{},
	})
	const inviteCode = ref("")
	const getData = () => {
		request({
			url: 'user/record/team/report',
			methods: 'get',
		}).then(res => {
			pageData.value = res
			botData.value = res.member_detail
		})

		request({
			url: 'user/index',
			methods: 'get',
			data: {}
		}).then(res => {
			inviteUrl.value = window.location.protocol + "//" + window.location.host +
				"/\#/\?code=" + res.invite_code
			// inviteUrl.value = window.location.protocol + "//wyf-pv.com/#/?code=" + res.invite_code
			// pageData.value = res
		})
	}

	// 终于可以用了
	onShow(() => {
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

<style lang="scss">
	.topItem {
		border-radius: 15rpx;
		width: 48%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 35rpx 0;
		height: 120rpx;
	}

	.levelText {
		font-family: PingFang SC;
		font-weight: 600;
		color: #6068FF;
		-webkit-text-stroke: 1rpx #FFFFFF;
		text-stroke: 1rpx #FFFFFF;
	}

	.table_head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 27rpx 21rpx;

		view {
			width: 25%;
			text-align: center;
			line-height: 100%;
		}
	}

	.linkEl {
		height: 88rpx;
		background: url('/static/themeNum1/img/inviteMask.png') no-repeat 100%/100%;
		color: #fff;
		// width: 100%;
		border-radius: 20rpx;
		padding: 44rpx 50rpx;
	}
</style>
