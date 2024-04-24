<template>
	<view class="normalBg" style="background: #060D1F">
		<topNav :title="t('mine.m_c2')"></topNav>
		<!-- <header class="header">
			<div class="logo">
				<img src="../../static/DeFi_files/right.jpg" alt="">
				<span>DeFi</span>
			</div>
			<img src="../../static/DeFi_files/top_right.png" alt="">
		</header> -->
		<div class="prod-title">
			<img src="../../static/defi.png" alt="">
			<div>
				<div class="title">DeFi India official platform</div>
				<div class="subtitle">DEFI</div>
			</div>
		</div>
		<div class="down-st">
			<div class="down-l">
				<p>10K+</p>
				<p>Downloads</p>
			</div>
			<div class="down-fit">
				<img src="../../static/DeFi_files/unnamed.png" alt="">
				<p>Everyone<img src="../../static/DeFi_files/copyright.png" alt=""></p>
			</div>
		</div>
		<div class="download">
			<div class="btn" @click="downApp(0)">Android</div>
			<!-- <div class="btn" onclick="downApp(1)">iPhone</div> -->
		</div>
		<div class="share">
			<p>
				<img src="../../static/DeFi_files/share.png" alt="">
				<span>Share</span>
			</p>
			<p>
				<img src="../../static/DeFi_files/add.png" alt="">
				<span>Add to wishlist</span>
			</p>
		</div>
		<p class="dev"><img src="../../static/DeFi_files/dev.png" alt="">You don't have devices</p>
		<div class="banner">
			<img src="../../static/DeFi_files/banner01.png" alt="">
			<img src="../../static/DeFi_files/banner02.png" alt="">
			<img src="../../static/DeFi_files/banner03.png" alt="">
			<img src="../../static/DeFi_files/banner04.png" alt="">
			<img src="../../static/DeFi_files/banner05.png" alt="">
		</div>
		<p class="about">
			<span>About this app</span>
			<img src="../../static/DeFi_files/arrow.png" alt="">
		</p>
		<p class="exp">DeFi India official platform</p>
		<p class="exp">DeFi is a Seychelles-based company with its offices in Victoria. The company is authorized and
			supervised by the
			Seychelles Financial Services Authority (FSA) with license number SD039 and provides Contracts for
			Difference (CFD) on
			various basic products. The company is a rapidly growing CFD provider that currently offers a portfolio of
			over 2,800
			financial instruments. DeFi has been listed on the main market of the London Stock Exchange and is currently
			fully
			developing the Indian market.</p>
	</view>
</template>

<script setup>
import COUNTRY from '../../../setting.js'
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
const store = userStore();

import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();
const dataList = [
	"/static/dowload/1.png",
	"/static/dowload/2.png",
	"/static/dowload/3.png",
	"/static/dowload/4.png",
]
const downApp = (t) => {
	if (t) {
		window.location.href = ''
	} else {
		window.location.href = ''
	}
}
// 终于可以用了
onShow(() => { })
</script>

<style lang="scss">
.content_box {
	padding: 31rpx 35rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.item {
	width: 48%;
	margin-bottom: 20rpx;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
	background-color: #fff;
	z-index: 100;
}

.header .logo {
	display: flex;
	align-items: center;
}

.header .logo img {
	width: 40px;
	height: auto;
}

.header .logo span {
	font-size: 20px;
	font-weight: 900;
}

.header img {
	height: 56px;
}

.prod-title {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	padding: 20px;
}

.prod-title img {
	width: 90px;
	height: auto;
	border-radius: 10px;
	// border: 1px solid #EEE;
	box-shadow: 0 1px 2px 0 rgba(159, 162, 165, 0.3), 0 1px 3px 1px rgba(104, 107, 109, 0.15);
	margin-right: 24px;
}

.prod-title .title {
	font-family: "Google Sans", "Roboto", "Arial", "sans-serif";
	font-size: 1.5rem;
	font-weight: 510;
	color: #ffffff;
	margin-bottom: 5px;
}

.prod-title .subtitle {
	color: #01875f;
	font-size: .9rem;
}

.down-st {
	display: flex;
}

.down-st>div {
	position: relative;
	width: 150px;
	margin: 10px 0;
	text-align: center;
}

.down-l::after {
	position: absolute;
	top: 10px;
	bottom: 10px;
	width: 1px;
	right: 0;
	background-color: #d1d1d1;
	content: "";
}

.down-fit img {
	width: 16px;
}

.down-l>p:last-child {
	color: #ffffff;
}

.down-fit>p {
	color: #ffffff;
}

.down-fit>p>img {
	width: 12px;
	height: 12px;
	margin-left: 3px;
}

.download {
	display: flex;
}

.btn {
	flex: 1;
	margin: 30px 20px 20px;
	background: #01875f;
	color: #fff;
	text-align: center;
	height: 40px;
	line-height: 40px;
	border-radius: 5px;
}

.share {
	display: flex;
	margin-bottom: 30px;
	align-items: center;
	justify-content: center;
}

.share>p {
	margin: 0 20px;
	font-size: 14px;
	color: #01875f;
}

.share>p>img {
	width: 20px;
	margin-right: 5px;
	vertical-align: middle;
}

.dev {
	margin: 20px;
	color: #ffffff;
	font-size: 14px;
}

.dev>img {
	height: 16px;
	margin-right: 5px;
	vertical-align: middle;
}

.banner {
	display: flex;
	overflow-y: auto;
	align-items: center;
	justify-content: space-between;
	margin: 10px;
}

.banner>img {
	width: 115px;
	margin: 0 8px;
	border-radius: 6px;
}

.about {
	margin: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
	font-weight: 900;
}

.about>img {
	height: 20px;
}

.exp {
	color: #b4b4b4;
	margin: 20px;
	font-size: 14px;
	padding-bottom: 20px;
}
</style>
