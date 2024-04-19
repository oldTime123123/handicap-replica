<template>
	<view>
		<van-sticky :offset-top="0" position="top" @change="fixedHandle">
			<view class="topNavTrade between" :style="isFixed ? noFixedStyle : noFixedStyle">
				<view class="image-wrap pl28">
					<image src="/static/back.png" style="width: 40upx;height:40upx;" mode="aspectFit"
						@click.stop="back"></image>

					<image class="ml10" src="/src/static/menu.png" mode="aspectFit" style="width: 60upx; height: 60upx;"
						@click="showLeftMask = true">
					</image>
					<text class="pl20  f36"> {{ proGoodsList[nowNameInd]?.pro_name }}/USDT</text>
				</view>


			</view>
		</van-sticky>

		<view class="pdlr20 mt20">

			<view class="heads">
				<view class="head-left head-item">
					<view class="" style="font-size: 42upx; color:#ED3B5D">{{ topData.close }}</view>
					<view class="" style="font-size: 23upx;">
						<!-- 	<text style="color: #999999;margin-right: 20upx;">≈24356.98USDT</text>
						<text style="color: #ED3B5D;">-0.90%</text> -->
					</view>
					<view style="font-size: 23upx;">{{ $t('mark.a1') }}:{{ topData.close }}</view>
				</view>
				<view class="head-right head-item">
					<view class="right-row">
						<view class="right-item">
							<view style="color: #999999;">{{ $t('mark.a2') }}</view>
							<view>{{ topData.high }}</view>
						</view>
						<view class="right-item" style="text-align:right;">
							<view style="color: #999999;">{{ $t('mark.a3') }}</view>
							<view>{{ topData.low }}</view>
						</view>
					</view>
					<view class="right-row">
						<view class="right-item">
							<view style="color: #999999;">{{ $t('mark.a4') }}</view>
							<view>{{ topData.close }}</view>
						</view>
						<view class="right-item" style="text-align:right;">
							<view style="color: #999999;">Vol</view>
							<view>{{ Number(topData.vol).toFixed(2) }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="mainBox  mt32">
			<view class="k-line-chart-container">
				<div id="indicator-k-line" class="k-line-chart" />

			</view>
		</view>



		<view style="height: 200rpx;"></view>
		<view class="floor-btnrow" style=" z-index: 99;">
			<!-- <view class="buy-btn btn" @click="jumpPage('../Euteres/BTCSecFutures?id='+proGoodsList[nowNameInd].id)">{{$t('all.a7')}}</view>
			<view class="Sell-btn btn" @click="jumpPage('../Euteres/BTCSecFutures?id='+proGoodsList[nowNameInd].id)">{{$t('all.a8')}}</view> -->
			<view class="buyBtn" @click="buyTost(true)">
				Miner Robots
			</view>
		</view>
		<!-- jumpPage('/pages/Euteres/BTCSecFutures?type=2&id='+proGoodsList[nowNameInd].id) -->
		<div class="maskContent animate__animated animate__fadeIn sade" v-if="showLeftMask"
			@click="showLeftMask = false">
			<view class="maskMainContent  " @click.stop>
				<view style="height: 100rpx;"></view>
				<view class="goodsItem " v-for="(item, index) in proGoodsList" @click="chooseNowData(item.id)"
					:class="item.id == proGoodsList[nowNameInd]?.id ? 'nowChoosed' : ''">
					<view class="between">

						<view><text class="f40 text_bold">{{ item.pro_name }}</text> /USDT</view>
						<view class="text_bold" :class="item.is_rise == 2 ? 'colorUp' : 'colorDown'">{{ item.price }}
						</view>
					</view>
					<view class="between mt10">
						<view class="f24">24H {{ item.vol }}</view>
						<view :class="item.is_rise == 2 ? 'colorUp' : 'colorDown'"> {{ item.is_rise == 1 ? '-' : '+' }}
							{{ item.rise_rate }}%
						</view>
					</view>
				</view>
			</view>
		</div>


		<view class="buyTost" v-show="buyTostShow">
			<view class="buyCard">
				<view class="flex mt48 mr32" style="text-align: center;justify-content: right;">
					<view>Confirm Order</view>
					<img src="../../static/themeNum1/l_icon/down.png" alt="" class="ml176" @click="buyTost(false)">
				</view>
				<view class="paddingLR30 mt32">BTC/USDT</view>
				<view class="paddingLR30 mt32">Buy amount (min: 1000 USDT)</view>
				<input class="moenyIn mt16 ml32" type="text" placeholder="Please enter amount">
				<view class="paddingLR30 mt16 PlaceAbet flex">
					<view>1000</view>
					<view>2000</view>
					<view>3000</view>
					<view>ALL</view>
				</view>
				<view class="paddingLR30 mt24 flex"
					style="justify-content: space-between;font-weight: 400;font-size: 32rpx;color: #FFFFFF;">
					<view>balance: 0.00</view>
					<view>Lock Time: 1H</view>
				</view>
				<view class="mt16 paddingLR30" style="font-weight: 400;font-size: 32rpx;color: #04E1F4;">pending
					incomes: $1000.00</view>
				<view class="confirmBtn">
					Confirm
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import request from '../../../comm/request.ts'

import {
	onHide,
	onLoad
} from "@dcloudio/uni-app";
import {
	dispose,
	init,
	registerIndicator
} from "klinecharts";

const isFixed = ref(false)
const buyTostShow = ref(false)
const buyTost = (falg) => {
	buyTostShow.value = falg
}
const fixedStyle = {
	background: "#fff",
	transition: '.1s linear all',
}
const noFixedStyle = {
	background: "linear-gradient(90deg, #8670FF 0%, #4D34FF 100%)",
	transition: '.1s linear all',
	color: "#fff",
	width: '100vw'
}
const fixedHandle = (type) => {
	isFixed.value = type
}
const jumpPage = url => {
	uni.navigateTo({
		url
	})
}
const showLeftMask = ref(false)
const nowNameInd = ref(0)
const topData = ref({})
const proGoodsList = ref([])
const getKlineProData = (id) => {
	request({
		url: 'trade/productList',
		methods: 'post'
	}).then(res => {
		proGoodsList.value = res
		proGoodsList.value.forEach((item, index) => {
			if (item.id == id) {
				nowNameInd.value = index
			}
		})
		getKlineData()
	})
}
const back = () => {
	if (timer.value) {
		clearInterval()
	}
	history.back()
}

const changeTime = (item, index) => {
	if (timer.value) {
		clearInterval(timer.value)
	}
	startTime()
	if (item == '1H') {
		pageData.value.interval = '60'
	} else if (item == '1D') {
		pageData.value.interval = 'd'
	} else {
		pageData.value.interval = parseInt(item)
	}
	timeActInd.value = index
	getKlineData()

}

const timeActInd = ref(0) //时间选择下标
const timeList = ['1M', '5M', '15M', '30M', '1H', '1D']
let chartData = ref([])
const timer = ref(null)
const startTime = () => {
	timer.value = setInterval(() => {
		getKlineData()
	}, 5000)
}

const pageData = ref({
	// num: 100,
	// pid: 0,
	// interval: 1 ,//1:1分钟 5：5分钟 15：15分钟 30:30分钟 60:60分钟 d:一天

	period: '30min',
	size: 100,
	symbol: ""
})

const getKlineData = () => {
	if (proGoodsList.value[nowNameInd.value]) {
		let sym = proGoodsList.value[nowNameInd.value].pro_name
		pageData.value.symbol = (proGoodsList.value[nowNameInd.value].pro_name + 'usdt').toLowerCase()
		uni.request({
			url: 'https://api.huobi.pro/market/history/kline',
			data: pageData.value,
			method: 'get'
		}).then(res => {
			topData.value = res.data.data[0]
			chartData.value = res.data.data.reverse()


			applyChartData()
		})
	}
	return

}

const chooseNowData = id => {
	pageData.value.pid = id
	showLeftMask.value = false
	clearInterval(timer.value)
	getKlineProData(id)
	getKlineData()

}

// -=========================chart
const mainIndicators = ["MA", "EMA", "SAR"]
const subIndicators = ["VOL", "MACD", "KDJ"]

const chart = ref("")
const paneId = ref(null)

const applyChartData = () => {

	if (!chart.value) {

		chart.value = init("indicator-k-line");
		paneId.value = chart.value.createIndicator("VOL");



		// 设置MACD指标图的高度为300
		let macdPaneId = chart.value.createIndicator("MACD", [12, 26, 9], paneId.value);
		chart.value.setPaneOptions({
			id: macdPaneId,
			height: 140
		});

		chart.value.createIndicator('EMA', false, {
			id: "candle_pane"
		});

		// 设置VOL指标图的高度为150
		chart.value.setPaneOptions({
			id: paneId.value,
			height: 100
		});

		let data = changeDataType(chartData.value)
		chart.value.applyNewData(data);
		chart.value.setBarSpace(5);

	} else if (chart.value.getDataList().length == 0) {
		let data = changeDataType(chartData.value)
		chart.value.applyNewData([], true)
		chart.value.applyNewData(data);
	} else {
		let data = changeDataType([chartData.value[chartData.value.length - 1]])
		chart.value.applyNewData([], true)
		chart.value.updateData(data);
	}

	if (chartData.value[0].close < 1) {
		chart.value.setPriceVolumePrecision(5, 0)
	} else {
		chart.value.setPriceVolumePrecision(2, 2)
	}

}

//================================chart end

onLoad(e => {
	if (e.id) {
		pageData.value.pid = e.id
		getKlineProData(e.id)

		startTime()

	}
	// getKlineData2()
})

onUnmounted(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})
onHide(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}

})


const setTooltip = chart => {
	chart.applyOptions({
		priceScale: {
			position: 'right',
		},
		timeScale: {
			timeVisible: true,
		},
	});

	chart.addCandlestickSeries({
		upColor: '#00ff00',
		downColor: '#ff0000',
		borderDownColor: '#ff0000',
		borderUpColor: '#00ff00',
		wickDownColor: '#ff0000',
		wickUpColor: '#00ff00',
	});

	chart.applyOptions({
		layout: {
			backgroundColor: '#253248',
			textColor: 'rgba(255, 255, 255, 0.9)',
		},
		grid: {
			vertLines: {
				color: '#334158',
			},
			horzLines: {
				color: '#334158',
			},
		},
	});

	chart.subscribeCrosshairMove((param) => {
		if (param.time) {
			const price = param.seriesPrices.get(chart.series()[0]);
			const tooltipContent = document.createElement('div');

			tooltipContent.innerHTML = `
		            <div class="custom-tooltip">
		                <div>Time: ${param.time}</div>
		                <div>Price: ${price}</div>
		            </div>
		        `;

			tooltipContent.style.padding = '4px 8px';
			tooltipContent.style.backgroundColor = '#253248';
			tooltipContent.style.color = 'white';
			tooltipContent.style.fontSize = '14px';

			chart.applyOptions({
				crosshair: {
					horzLine: {
						visible: false,
					},
					vertLine: {
						color: '#6A5ACD',
						style: 1,
						visible: true,
						width: 1,
					},
				},
				tooltip: {
					position: param.point,
					formatter: () => {
						return tooltipContent.outerHTML;
					},
				},
			});
		} else {
			chart.applyOptions({
				crosshair: {
					horzLine: {
						visible: true,
					},
					vertLine: {
						visible: false,
					},
				},
				tooltip: {
					visible: false,
				},
			});
		}
	});
}

const setMainIndicator = (name) => {
	chart.value.createIndicator(name, false, {
		id: "candle_pane"
	});
}
const setSubIndicator = (name) => {
	chart.value.createIndicator(name, false, {
		id: paneId.value
	});
}

const timestampToDateTime = (timestamp) => {
	// 时间戳转时间
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);
	const hours = ("0" + date.getHours()).slice(-2);
	const minutes = ("0" + date.getMinutes()).slice(-2);
	const seconds = ("0" + date.getSeconds()).slice(-2);
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const changeDataType = Arr => {
	const newArr = Arr.map(item => {
		return item = {
			timestamp: timestampToDateTime(item.id),
			open: item.open,
			low: item.low,
			high: item.high,
			close: item.close,
			volume: item.vol
		}
	})
	return newArr
}
</script>


<style lang="scss" scoped>
.topNavTrade {
	padding: 28rpx 0;

	.image-wrap {
		display: flex;
		align-items: center;
	}
}

.nowChoosed {
	position: relative;
}

page {
	overflow: hidden;
	width: 100vw;
}

.nowChoosed::after {
	position: absolute;
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.1);
}

.goodsItem {
	padding: 40rpx 20rpx;
	border-bottom: 1rpx solid #ccc;
	// flex-direction: column;
	line-height: normal;
	background-color: #000;
}

.maskMainContent {
	background-color: #000;
	width: 400rpx;

}

.tabsList {
	margin-top: 30rpx;
	display: flex;
	align-items: center;

	.tabsItem {
		margin: 0 10rpx;
		padding: 10rpx 20rpx;
	}

	.timeAct {
		color: #1a73e8;
		position: relative;
	}

	.timeAct::after {
		position: absolute;
		content: '';
		display: block;
		width: 80%;
		background-color: #1a73e8;
		height: 3rpx;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
}

.downColor {
	color: #eb2650
}

.upColor {
	color: #02ad90
}

.color6 {
	color: #666
}

.topBox {
	justify-content: space-between;
}

.heads {
	display: flex;
	justify-content: space-between;

	.head-item {
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.right-row {
		font-size: 22upx;
		width: 220upx;
		display: flex;
		justify-content: space-between;

		.right-item {
			width: 50%;
		}
	}
}


.floor-btnrow {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 750upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #000;
	padding: 28upx 0;
	box-shadow: 0rpx 1rpx 19rpx 1rpx rgba(116, 116, 116, 0.35);

	.btn {
		height: 90upx;
		width: 317rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 90upx;
		color: #fff;
	}

	.buy-btn {
		background-color: #05A489;
	}

	.Sell-btn {
		background-color: #E2244D;
	}
}


.k-line-chart-container {
	display: flex;
	flex-direction: column;
	margin: 15px 0;
	border-radius: 2px;
	width: 100%;
	height: 1240rpx;
	padding: 16rpx 10rpx;
	background-color: #000;
}

.k-line-chart-title {
	margin: 0;
	color: #252525;
	padding-bottom: 10px;
}

.k-line-chart {
	display: flex;
	flex: 1;
}

.k-line-chart-menu-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
	font-size: 12px;
	color: #606060;
}

.k-line-chart-menu-container .btns {
	cursor: pointer;
	background-color: #1677ff;
	border-radius: 2px;
	margin-right: 8px;
	height: 24px;
	line-height: 26px;
	padding: 0 6px;
	font-size: 12px;
	color: #fff;
	border: none;
	outline: none;
}

.buyBtn {
	width: 686rpx;
	height: 88rpx;
	background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	line-height: 88rpx;
	text-align: center;
}

.buyTost {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.50);
	position: fixed;
	top: 0;
	z-index: 99;

}

.buyCard {
	width: 750rpx;
	height: 824rpx;
	background-color: rgba(0, 38, 76, 1);
	overflow: hidden;
	position: fixed;
	bottom: 0;
}

.paddingLR30 {
	padding: 0 30rpx;
}

.moenyIn {
	width: 638rpx;
	padding: 0 24rpx;
	height: 96rpx;
	background: #004284;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
}

.PlaceAbet {
	justify-content: space-between;
	line-height: 96rpx;
	text-align: center;

	view {
		width: 160rpx;
		height: 96rpx;
		background: #004284;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
	}
}

.confirmBtn {
	width: 686rpx;
	height: 88rpx;
	background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	line-height: 88rpx;
	text-align: center;
	margin: 56rpx auto 0;
}
</style>
