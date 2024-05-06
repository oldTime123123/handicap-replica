<template>
	<view style="background: rgb(8, 15, 50);height: 150vh;  position: relative;">
		<nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
			<img class="kefu" type="primary" src="../../static/kefu.png" alt="" @click="Jumplink('../mine/service')">
		</nut-drag>
		<view class="flex between topNav">
			<view class="">
				{{ t('pk.t_c1') }}
			</view>
			<view class="">

			</view>

			<view class="flex" style="align-items: center;">
				<view class="appTime" style="margin-right: 20rpx;">
					<image style="width:32rpx;height: 32rpx;margin-right: 10rpx;" src="../../static/biao.png" mode="">
					</image>
					UTC+7-{{ servetTime }}

				</view>
				<image src="/static/themeNum1/icon/indexlang1.png" style="width:52rpx;height:52rpx"
					@click="Jumplink('../mine/langSetting')"></image>
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
						{{ t('pk.t_c2') }}:
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
						<view class="InvInput1" style="overflow: hidden;white-space: normal; text-overflow: ellipsis;">
							{{ codeUrl }}
						</view>
						<view class="copyBtn textCenter88 ml24" @click="copyHandle(codeUrl)">
							{{ t('pk.t_c3') }}
						</view>
					</view>
					<view class="qrcode ">
						<!-- <qrcode-vue :value="codeUrl" :size="" level="H" /> -->
						<vue-qr qid="qrid1" :callback="qrBack" :text="qrData" :size="163" :colorDark="colorValue"
							:logoSrc="logoSrc"></vue-qr>
					</view>
					<view class="down flex" @click="downQr">
						<view>
							{{ t('pk.t_c4') }}
						</view>
						<img class="ml24" src="../../static/invite/down.png" alt="">
					</view>
				</view>
				<view class="mt120">
					<img @click="getImg(1)" style="width: 100%;" :src="nowlang == 'id' ? bannerList[2] : bannerList[0]"
						alt="">
				</view>

				<view class="team">
					<view class="teamTitle mt20 flex">
						<view>{{ t('pk.t_c5') }}</view> 
					</view>
					<view class="teamHead flex mt24 teamRadiusT">
						<view></view>
						<view style="font-size: 24rpx;">{{ t('pk.t_c6') }} 1</view>
						<view style="font-size: 24rpx;">{{ t('pk.t_c6') }} 2</view>
						<view style="font-size: 24rpx;">{{ t('pk.t_c6') }} 3</view>
					</view>
					<view class="fg">

					</view>
					<view style="font-size: 24rpx;" class="teamHead flex teamRadiusD">
						<view>{{ t('pk.t_c7') }}</view>
						<view>{{ team.level }}</view>
						<view>{{ team.level2 }}</view>
						<view>{{ team.level3 }}</view>
					</view>
				</view>
				
				<view class="teamstyle" style="text-align: center;margin-top: 30rpx;" @click="Jumplink('../mine/teamDetail')">{{ t('pk.t_c8') }}</View>

				<view class="mt40 pb160">
					<img @click="getImg(2)" style="width: 100%;" :src="nowlang == 'id' ? bannerList[3] : bannerList[1]"
						alt="">
				</view>
			</view>


		</view>
		<!-- <view style="height: 200rpx;">

		</view> -->
		<view class="showimg" :style="showViewer" @click="closeimg">
			<img :src="imgurl" alt="" style="width: 100%;">
		</view>
	</view>
	<Tabbar :activeIndex="3"></Tabbar>
	<Loading ref="showLoading"></Loading>
</template>

<script setup>
import Tabbar from '@/components/botTabbar/botTabbar.vue'
import request from '../../../comm/request.ts';
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
const showViewer = ref("display: none;");
const imgurl = ref('')
const getImg = (url) => {
	console.log(111111);
	if (url == 1 && nowlang.value == 'id') {
		imgurl.value = bannerList[2]
	} else if (url == 1 && nowlang.value != 'id') {
		imgurl.value = bannerList[0]
	} else if (url == 2 && nowlang.value == 'id') {
		imgurl.value = bannerList[3]
	} else if (url == 2 && nowlang.value != 'id') {
		imgurl.value = bannerList[1]
	}
	showViewer.value = "display:block;";

}
const closeimg = () => {
	showViewer.value = "display:none;";

}


const nowlang = ref('')
const bannerList = [
	'../../static/inbanner1.jpg',
	'../../static/inbanner2.jpg',
	'../../static/inbanner3.jpg',
	'../../static/inbanner4.jpg'

]
const getlang = () => {
	nowlang.value = localStorage.getItem('lang')
	console.log(nowlang.value);
}
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
const team = ref('')
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
	//获取团队

	request({
		url: 'user/record/team/report',
		methods: 'get',
	}).then(res => {
		team.value = res

	})
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
onLoad(() => {
	getlang()

})
const inviteCode = ref("")
const codeUrl = ref("")
</script>

<style lang="scss">
	.teamstyle{
		background-color: #006BF4;
		box-sizing: border-box;
		padding: 25rpx;
		border-radius: 25rpx;
	}
.showimg {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, .7);
	line-height: 100vh;

	img {
		vertical-align: middle;
	}
}

.kefu {
	width: 100rpx;
	height: 100rpx;
}

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
	height: 2400rpx;

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
	// height: 350rpx;
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

.InvInput1 {
	width: 394rpx;
	padding-left: 24rpx;
	font-size: 24rpx;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	border: 2rpx solid #004284;
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
	// width: 480rpx;
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
		justify-content: space-between;
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
