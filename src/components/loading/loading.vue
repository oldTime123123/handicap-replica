<template>
	<div class="loader" v-if="loading" dir="ltr">
		<div class="cssload-loader">
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
			<div class="cssload-side"></div>
		</div>
	</div>
</template>

<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app';
	import request from '../../../comm/request.ts';
	const loading = ref(false)
	defineExpose({
		loading
	})
	const getActStatus = () => {
		request({
			url: 'user/record/recharge',
			methods: 'post'
		}).then(res => {
			if (res.message.num > 0) {
				fbq('track', 'Purchase', {
					value: 80000,
					currency: 'IDR'
				});
			}
			if (res.message.is_first > 0) {
				fbq('track', 'FirstRecharge');
			}
		})
	}
	onShow(() => {
		if (uni.getStorageSync('token')) {
			const timestamp = new Date().getTime();
			let localTime = uni.getStorageSync('floatMaskTime')
			if (!localTime || timestamp > localTime + 1000) {
				console.log('123')
				getActStatus()
				uni.setStorageSync('floatMaskTime', timestamp)
			}
		}
	})
</script>

<style lang="scss">
	.loader {
		background: rgba(0, 0, 0, 0.6);
		bottom: 0;
		left: 0;
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		// justify-content: center;
	}

	.cssload-loader {
		position: absolute;
		left: 50%;
		width: 47.284271247462px;
		height: 47.284271247462px;
		margin-left: -23.142135623731px;
		margin-top: -23.142135623731px;
		border-radius: 100%;
		animation-name: cssload-loader;
		-o-animation-name: cssload-loader;
		-ms-animation-name: cssload-loader;
		-webkit-animation-name: cssload-loader;
		-moz-animation-name: cssload-loader;
		animation-iteration-count: infinite;
		-o-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		animation-timing-function: linear;
		-o-animation-timing-function: linear;
		-ms-animation-timing-function: linear;
		-webkit-animation-timing-function: linear;
		-moz-animation-timing-function: linear;
		animation-duration: 4.6s;
		-o-animation-duration: 4.6s;
		-ms-animation-duration: 4.6s;
		-webkit-animation-duration: 4.6s;
		-moz-animation-duration: 4.6s;
	}

	.cssload-loader .cssload-side {
		display: block;
		width: 6px;
		height: 19px;
		background-color: rgb(4, 99, 128);
		margin: 2px;
		position: absolute;
		border-radius: 50%;
		animation-duration: 1.73s;
		-o-animation-duration: 1.73s;
		-ms-animation-duration: 1.73s;
		-webkit-animation-duration: 1.73s;
		-moz-animation-duration: 1.73s;
		animation-iteration-count: infinite;
		-o-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		animation-timing-function: ease;
		-o-animation-timing-function: ease;
		-ms-animation-timing-function: ease;
		-webkit-animation-timing-function: ease;
		-moz-animation-timing-function: ease;
	}

	.cssload-loader .cssload-side:nth-child(1),
	.cssload-loader .cssload-side:nth-child(5) {
		transform: rotate(0deg);
		-o-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		animation-name: cssload-rotate0;
		-o-animation-name: cssload-rotate0;
		-ms-animation-name: cssload-rotate0;
		-webkit-animation-name: cssload-rotate0;
		-moz-animation-name: cssload-rotate0;
	}

	.cssload-loader .cssload-side:nth-child(3),
	.cssload-loader .cssload-side:nth-child(7) {
		transform: rotate(90deg);
		-o-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		animation-name: cssload-rotate90;
		-o-animation-name: cssload-rotate90;
		-ms-animation-name: cssload-rotate90;
		-webkit-animation-name: cssload-rotate90;
		-moz-animation-name: cssload-rotate90;
	}

	.cssload-loader .cssload-side:nth-child(2),
	.cssload-loader .cssload-side:nth-child(6) {
		transform: rotate(45deg);
		-o-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		animation-name: cssload-rotate45;
		-o-animation-name: cssload-rotate45;
		-ms-animation-name: cssload-rotate45;
		-webkit-animation-name: cssload-rotate45;
		-moz-animation-name: cssload-rotate45;
	}

	.cssload-loader .cssload-side:nth-child(4),
	.cssload-loader .cssload-side:nth-child(8) {
		transform: rotate(135deg);
		-o-transform: rotate(135deg);
		-ms-transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
		-moz-transform: rotate(135deg);
		animation-name: cssload-rotate135;
		-o-animation-name: cssload-rotate135;
		-ms-animation-name: cssload-rotate135;
		-webkit-animation-name: cssload-rotate135;
		-moz-animation-name: cssload-rotate135;
	}

	.cssload-loader .cssload-side:nth-child(1) {
		top: 23.142135623731px;
		left: 47.284271247462px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(2) {
		top: 40.213203431093px;
		left: 40.213203431093px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(3) {
		top: 47.284271247462px;
		left: 23.142135623731px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(4) {
		top: 40.213203431093px;
		left: 7.0710678163691px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(5) {
		top: 23.142135623731px;
		left: 0px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(6) {
		top: 7.0710678163691px;
		left: 7.0710678163691px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(7) {
		top: 0px;
		left: 23.142135623731px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}

	.cssload-loader .cssload-side:nth-child(8) {
		top: 7.0710678163691px;
		left: 40.213203431093px;
		margin-left: -3px;
		margin-top: -10px;
		animation-delay: 0;
		-o-animation-delay: 0;
		-ms-animation-delay: 0;
		-webkit-animation-delay: 0;
		-moz-animation-delay: 0;
	}










	@keyframes cssload-rotate0 {
		0% {
			transform: rotate(0deg);
		}

		60% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(180deg);
		}
	}

	@-o-keyframes cssload-rotate0 {
		0% {
			-o-transform: rotate(0deg);
		}

		60% {
			-o-transform: rotate(180deg);
		}

		100% {
			-o-transform: rotate(180deg);
		}
	}

	@-ms-keyframes cssload-rotate0 {
		0% {
			-ms-transform: rotate(0deg);
		}

		60% {
			-ms-transform: rotate(180deg);
		}

		100% {
			-ms-transform: rotate(180deg);
		}
	}

	@-webkit-keyframes cssload-rotate0 {
		0% {
			-webkit-transform: rotate(0deg);
		}

		60% {
			-webkit-transform: rotate(180deg);
		}

		100% {
			-webkit-transform: rotate(180deg);
		}
	}

	@-moz-keyframes cssload-rotate0 {
		0% {
			-moz-transform: rotate(0deg);
		}

		60% {
			-moz-transform: rotate(180deg);
		}

		100% {
			-moz-transform: rotate(180deg);
		}
	}

	@keyframes cssload-rotate90 {
		0% {
			transform: rotate(90deg);
			transform: rotate(90deg);
		}

		60% {
			transform: rotate(270deg);
			transform: rotate(270deg);
		}

		100% {
			transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@-o-keyframes cssload-rotate90 {
		0% {
			-o-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		60% {
			-o-transform: rotate(270deg);
			transform: rotate(270deg);
		}

		100% {
			-o-transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@-ms-keyframes cssload-rotate90 {
		0% {
			-ms-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		60% {
			-ms-transform: rotate(270deg);
			transform: rotate(270deg);
		}

		100% {
			-ms-transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@-webkit-keyframes cssload-rotate90 {
		0% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		60% {
			-webkit-transform: rotate(270deg);
			transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@-moz-keyframes cssload-rotate90 {
		0% {
			-moz-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		60% {
			-moz-transform: rotate(270deg);
			transform: rotate(270deg);
		}

		100% {
			-moz-transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@keyframes cssload-rotate45 {
		0% {
			transform: rotate(45deg);
			transform: rotate(45deg);
		}

		60% {
			transform: rotate(225deg);
			transform: rotate(225deg);
		}

		100% {
			transform: rotate(225deg);
			transform: rotate(225deg);
		}
	}

	@-o-keyframes cssload-rotate45 {
		0% {
			-o-transform: rotate(45deg);
			transform: rotate(45deg);
		}

		60% {
			-o-transform: rotate(225deg);
			transform: rotate(225deg);
		}

		100% {
			-o-transform: rotate(225deg);
			transform: rotate(225deg);
		}
	}

	@-ms-keyframes cssload-rotate45 {
		0% {
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
		}

		60% {
			-ms-transform: rotate(225deg);
			transform: rotate(225deg);
		}

		100% {
			-ms-transform: rotate(225deg);
			transform: rotate(225deg);
		}
	}

	@-webkit-keyframes cssload-rotate45 {
		0% {
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
		}

		60% {
			-webkit-transform: rotate(225deg);
			transform: rotate(225deg);
		}

		100% {
			-webkit-transform: rotate(225deg);
			transform: rotate(225deg);
		}
	}

	@-moz-keyframes cssload-rotate45 {
		0% {
			-moz-transform: rotate(45deg);
			transform: rotate(45deg);
		}

		60% {
			-moz-transform: rotate(225deg);
			transform: rotate(225deg);
		}

		100% {
			-moz-transform: rotate(225deg);
			transform: rotate(225deg);
		}
	}

	@keyframes cssload-rotate135 {
		0% {
			transform: rotate(135deg);
			transform: rotate(135deg);
		}

		60% {
			transform: rotate(315deg);
			transform: rotate(315deg);
		}

		100% {
			transform: rotate(315deg);
			transform: rotate(315deg);
		}
	}

	@-o-keyframes cssload-rotate135 {
		0% {
			-o-transform: rotate(135deg);
			transform: rotate(135deg);
		}

		60% {
			-o-transform: rotate(315deg);
			transform: rotate(315deg);
		}

		100% {
			-o-transform: rotate(315deg);
			transform: rotate(315deg);
		}
	}

	@-ms-keyframes cssload-rotate135 {
		0% {
			-ms-transform: rotate(135deg);
			transform: rotate(135deg);
		}

		60% {
			-ms-transform: rotate(315deg);
			transform: rotate(315deg);
		}

		100% {
			-ms-transform: rotate(315deg);
			transform: rotate(315deg);
		}
	}

	@-webkit-keyframes cssload-rotate135 {
		0% {
			-webkit-transform: rotate(135deg);
			transform: rotate(135deg);
		}

		60% {
			-webkit-transform: rotate(315deg);
			transform: rotate(315deg);
		}

		100% {
			-webkit-transform: rotate(315deg);
			transform: rotate(315deg);
		}
	}

	@-moz-keyframes cssload-rotate135 {
		0% {
			-moz-transform: rotate(135deg);
			transform: rotate(135deg);
		}

		60% {
			-moz-transform: rotate(315deg);
			transform: rotate(315deg);
		}

		100% {
			-moz-transform: rotate(315deg);
			transform: rotate(315deg);
		}
	}

	@keyframes cssload-loader {
		0% {
			transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-o-keyframes cssload-loader {
		0% {
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-ms-keyframes cssload-loader {
		0% {
			-ms-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-ms-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes cssload-loader {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-moz-keyframes cssload-loader {
		0% {
			-moz-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-moz-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>