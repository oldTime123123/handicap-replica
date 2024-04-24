<template>
	<view style="background:  #060D1F;height: 100%;  position: relative;">
		<view class="flex between topNav">
			<view class="">
				lnvite
			</view>
			<view class="">

			</view>
			<view class="appTime" style="margin-right: 20rpx;">
				<image style="width:32rpx;height: 32rpx;margin-right: 10rpx;" src="../../static/biao.png" mode="">
				</image>
				EST-{{ servetTime }}
			</view>
		</view>
		<view class="main" style="background: #080F32">
			<view class="head"
				style="width: 686rpx; height: 1094rpx;margin: 32rpx auto;background-image: url('../../static/invite/invitebanner.png');background-repeat: no-repeat;background-size: 100% 100%;">
				<view class="head_box">
					<view class="invte">
						{{ t('new_xq.xq_a17') }}
					</view>
					<view class="text">
						{{ t('new_xq.xq_a18') }}
					</view>
				</view>

				<view class="InvCode mt106">
					<view class="InvTitle">
						Invitation Code:
					</view>
					<view class="flex  mt24">
						<view class="InvInput">
							{{ inviteCode }}
						</view>
						<view class="copyBtn textCenter88 ml24" @click="copyHandle(inviteCode)">
							Copy
						</view>
					</view>
					<view class="flex  mt24">
						<view class="InvInput" style="overflow: hidden;white-space: normal; text-overflow: ellipsis;">
							{{ codeUrl }}
						</view>
						<view class="copyBtn textCenter88 ml24" @click="copyHandle(codeUrl)">
							Copy
						</view>
					</view>
					<view class="qrcode ">
						<!-- <qrcode-vue :value="codeUrl" :size="" level="H" /> -->
						<vue-qr qid="qrid1" :callback="qrBack" :text="qrData" :size="163" :colorDark="colorValue" :logoSrc="logoSrc"></vue-qr>
					</view>
					<view class="down flex" @click="downQr">
						<view>
							SAVE THE QR CODE
						</view>
						<img class="ml24" src="../../static/invite/down.png" alt="">
					</view>
				</view>


				<view class="team">
					<view class="teamTitle mt68">
						My Team
					</view>
					<view class="teamHead flex mt24 teamRadiusT">
						<view></view>
						<view>Level 1</view>
						<view>Level 2</view>
						<view>Level 3</view>
					</view>
					<view class="fg">

					</view>
					<view class="teamHead flex teamRadiusD">
						<view>Amount</view>
						<view>0</view>
						<view>0</view>
						<view>0</view>
					</view>
				</view>
			</view>











			<view class="pdlr37 pt33" v-show="false">
				<!-- <view class="flex between topNav" >
				<image src="/static/themeNum1/icon/indexLang.png" style="width:80rpx;height:80rpx"
					@click="Jumplink('../mine/langSetting')"></image>
				<view style="width: 70%;">
					<nut-noticebar border-radius="40" :scrollable="true" :text="barText" color="#fff"
						left-icon="../../static/themeNum1/icon/laba.png">
					</nut-noticebar>
				</view>
				<image src="../../static/themeNum1/icon/kefu2.png" mode="widthFix" style="width:80rpx ; height: 80rpx;"
					@click="Jumplink('../mine/service')"></image>
			</view> -->

				<view class="head">
					<view class="head_box">
						<view class="invte">
							{{ t('new_xq.xq_a17') }}
						</view>
						<view class="text">
							{{ t('new_xq.xq_a18') }}
						</view>
					</view>

					<view class="details">
						<view class="" style="font-size:24rpx ;">
							{{ t('new_xq.xq_a19') }}
						</view>
						<view class="btn" @click="Jumplink('../mine/mission')">
							{{ t('new_xq.xq_a20') }}
						</view>
					</view>
				</view>

				<view class="mt40" @click="Jumplink('../mine/mission')">
					<view class="flex" style="justify-content: space-between;">
						<view style="font-size: 36rpx;">
							{{ t('new_xq.xq_a1') }}
						</view>
						<image style="width: 32rpx;height: 32rpx;" src="../../static/themeNum1/icon/go.png" mode="">
						</image>

					</view>
					<view class="team">
						<swiper :indicator-dots="false" :indicator-active-color="store.$state.contentColor"
							:autoplay="false" :interval="3000" :duration="1000" display-multiple-items="1"
							next-margin="50px" :circular="true" style="height: 222rpx">
							<swiper-item v-for="(item, index) in eventsList" :key="index">
								<view class="swiper_box2">
									<view class="flex" style="justify-content: space-between; align-items: center;">
										<view class="">
											<view class="" style="font-size: 24rpx;margin-top: 8rpx;">
												{{ t('new_xq.xq_a6') }} {{ item.invite_num }} {{ t('new_xq.xq_a60') }}
											</view>
											<view style="color: #14DBDD;margin-top: 8rpx;">
												{{ item.price }} USDT
											</view>
										</view>
										<image style="width: 48rpx;height: 48rpx;"
											src="../../static/themeNum1/icon/backGo.png" mode=""></image>
									</view>
									<view class="Dividing" style="margin-top: 10rpx;margin-bottom: 12rpx;">

									</view>
									<view class="Mission_text">
										{{ t('new_xq.xq_a7') }} {{ item.recharge_num }} {{ t('new_xq.xq_a8') }}
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>

				<!-- 	<view class="mt80 f40 text_center" style="margin-top: 150rpx;">
				{{t('mine.m_s1')}}
			</view> -->

				<!-- 	<view class="center">
				<view class="mt28 f24 topB">
					{{t('mine.m_s2')}}
				</view>
			</view> -->
				<view class="share">
					<view class="shareBox">
						<qrcode-vue :value="codeUrl" :size="163" level="H" />
						<view class="mt39 center">
							<view class="line" style="background:#fff"></view>
							<view class="mglr27 f24" style="color: #fff;">{{ t('act.m_m1') }}</view>
							<view class="line" style="background:#fff"></view>
						</view>
						<view class="mt37 f36" style="color:#4BF7F9">
							{{ inviteCode }}
						</view>
						<!-- <image src="../../static/mine/erweima.png" mode="widthFix" style="width: 400rpx;"></image> -->
					</view>

					<view class="btns" @click="copyHandle" style="background-color:#4BF7F9;">
						Copy
					</view>
				</view>
				<view style="height: 50rpx;"></view>

				<view class="center">
					<!-- <image src="../../static/themeNum1/shareB.png"  style="width: 402rpx;height: 341rpx;">
				</image> -->
					<!-- <nut-image src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" width="100" height="100"></nut-image> -->
				</view>
				<!-- <view style="height: 50rpx;"></view> -->
			</view>
		</view>
		<!-- <view style="height: 200rpx;">

		</view> -->

	</view>
	<Tabbar :activeIndex="3"></Tabbar>
	<Loading ref="showLoading"></Loading>
</template>

<script setup>
import Tabbar from '@/components/botTabbar/botTabbar.vue'
import request from '../../../comm/request.ts';
import vueQr from 'vue-qr/src/packages/vue-qr.vue'

const downQr = () => {
	Toast.text('Download completed')
	let name = new Date().getTime();
	let a = document.createElement("a");
	a.style.display = "none";
	a.download = name;
	a.href = qrData.value;
	document.body.appendChild(a);
	a.click();
}
const qrData = ref("");
//qr的回调，每次变动后把二维码的数据保存下来，供下载用
const qrBack = (dataUrl, id) => {
	//console.log('qrback:');
	console.log(id);
	qrData.value = dataUrl;
}
// import clipboardfrom from "/comm/copy.js"
import useClipboard from 'vue-clipboard3'
import {
	userStore
} from "@/store/themeNum.js";
import QrcodeVue from 'qrcode.vue'
import {
	Toast
} from '@nutui/nutui';
import {
	onShow,
	onLoad,
	onHide
} from "@dcloudio/uni-app";

import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();
const eventsList = ref([])

const barText = ref("") //跑马灯

const store = userStore();
const {
	toClipboard
} = useClipboard()
const modal_qr = ref(false)
// 　const { t } = useI18n()
const methods = {
	back() {
		history.back()
	},

};
const showTIme = setInterval(() => {
	getEasternTime()
}, 1000)
const servetTime = ref()
function getEasternTime() {

	const time = new Date().toLocaleString("en-US", {
		timeZone: "America/New_York",
		hour12: false,
	});
	servetTime.value = time.split(',')[1];
}
const Jumplink = url => {
	uni.navigateTo({
		url: url
	})
}
const copyHandle = async (text) => {
	try {
		await toClipboard(text)
		Toast.text('Copy' + " " + 'Status')
	} catch (e) {
		console.error(e)
	}
}
const getData = () => {

	request({
		url: 'activity/inviteRechargeAward/list',
		methods: 'get',
	}).then(res => {

		eventsList.value = res
	})

	request({
		url: 'user/index',
		methods: 'get',
	}).then(res => {
		// let str = "+55"
		res.country_code = res.country_code.replace("+", "")

		inviteCode.value = res.invite_code
		codeUrl.value = window.location.protocol + "//" + window.location.host +
			"/\#/pages/login/register\?code=" + res.invite_code + "&country=" + res.country_code
		qrData.value = window.location.protocol + "//" + window.location.host +
			"/\#/pages/login/register\?code=" + res.invite_code + "&country=" + res.country_code
	})

	request({
		url: 'home/marquee',
		methods: 'get'
	}).then(res => {
		// res.status == 1 ? showBar.value = true : showBar.value = false
		barText.value = res.content
	})
}
// 终于可以用了
onShow(() => {
	getData()
})
onHide(() => {
	clearInterval(showTIme.value)
})

const inviteCode = ref("")
const codeUrl = ref("")
</script>

<style lang="scss">
.topNav {

	width: 100%;
	background-color: #0C1526;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 16rpx 32rpx;
	z-index: 99;
}

.flex {
	display: flex;
}

.textCenter88 {
	text-align: center;
	line-height: 88rpx;
}

.Mission_text {
	font-size: 22rpx;
	color: #A2A2A2;
}

.team {
	box-sizing: border-box;
	// padding-left: 32rpx;
	margin-top: 28rpx;
}

.swiper_box2 {
	width: 562rpx;
	height: 100%;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
	opacity: 1;
	position: relative;
	background-color: #242424;
	box-sizing: border-box;
	padding: 24rpx;

	.box {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -52rpx;
		//    margin-left: -51rpx;
	}
}

.main {
	background: url('../../static/back.png') no-repeat;
	background-size: 100% 100%;
	height: 1600rpx;

}

.share {
	width: 100%;
	height: 840rpx;
	background: url('../../static/egg/share_back.png') no-repeat;
	background-size: 100% 100%;
	margin-top: 24rpx;
}

.head {
	background: url('../../static/egg/share_head.png') no-repeat;
	background-size: 100% 100%;
	width: 100%;
	height: 350rpx;
	margin-top: 44rpx;
	box-sizing: border-box;
	padding: 0rpx 32rpx;

	.head_box {
		width: 356rpx;
		padding-top: 54rpx;

		.invte {
			font-size: 40rpx;
			color: #fff;
			line-height: 46rpx;
			font-weight: 600;
		}

		.text {
			margin-top: 18rpx;
			font-weight: 400;
			font-size: 26rpx;
			color: #E3E3E3;
			line-height: 30rpx;
		}
	}

	.details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 100rpx;

		.btn {
			width: 138rpx;
			height: 56rpx;
			border-radius: 32rpx;
			border: 1px solid #4BF7F9;
			line-height: 56rpx;
			text-align: center;
			color: #4BF7F9;


		}
	}
}

.shareBg {
	background-color: #121212;
	min-height: 100vh;
	background-position: top;
	text-transform: none;
	background-attachment: fixed;
	background-size: cover;
}

.topB {
	// color: ;
	background-color: #818181;
	text-align: center;
	padding: 19rpx 40rpx;
	border-radius: 30rpx;

}

// 42,048,000
.shareBox {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// background: url('../../static/themeNum1/shareBox.png') no-repeat 100%/100%;
	height: 700rpx;
	width: 100%;
	color: #1777ff;
}

.line {
	width: 44rpx;
	height: 2rpx;
}

.btns {
	width: 570rpx;
	height: 100rpx;
	border-radius: 30rpx;
	margin: -50rpx auto;
	text-align: center;
	line-height: 100rpx;
	color: #fff;
}

.InvTitle {
	font-weight: 400;
	font-size: 32rpx;
	color: #FFFFFF;
	line-height: 38rpx;
}

.InvInput {
	width: 394rpx;
	height: 88rpx;
	padding-left: 24rpx;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	border: 2rpx solid #004284;
	line-height: 88rpx;
	font-weight: 400;
	font-size: 28rpx;
	color: #FFFFFF;
}

.copyBtn {
	width: 176rpx;
	height: 88rpx;
	background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	font-weight: 400;
	font-size: 32rpx;
	color: #FFFFFF
}

.qrcode {
	width: 320rpx;
	height: 320rpx;
	margin: 64rpx auto 0;
}

.down {
	width: 480rpx;
	height: 82rpx;
	background: #004284;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	font-weight: 400;
	font-size: 32rpx;
	color: #FFFFFF;
	justify-content: center;
	align-items: center;
	margin: 32rpx auto 0;

	img {
		width: 48rpx;
		height: 48rpx;

	}
}

.team {
	overflow: hidden;

	.teamTitle {
		font-weight: 500;
		font-size: 36rpx;
		color: #FFFFFF;
	}
}

.teamHead {
	background-color: #042659;
	justify-content: space-between;
	text-align: center;
	line-height: 90rpx;

	view {
		width: 20%;
		height: 90rpx;
		padding: 0 24rpx;
	}
}

.teamRadiusT {
	border-radius: 24rpx 24rpx 0 0;
}

.teamRadiusD {
	border-radius: 0 0 24rpx 24rpx;
}

.fg {
	width: 684rpx;
	height: 0rpx;
	border-radius: 2rpx 2rpx 2rpx 2rpx;
	border: 2rpx solid #0B3B6B;
}
</style>
