<template>
	<view class="k-line-chart-container">
		<div id="indicator-k-line" class="k-line-chart" />
		<view class="k-line-chart-menu-container">
			<view class="flex col_center mr20">
				<text class="mr20">Line1</text>
				<view class="btns" v-for="(item,index) in mainIndicators " :key="index" @click="setMainIndicator(item)">
					{{item}}
				</view>
			</view>

			<view class="flex col_center">
				<text class="mr20">Line2</text>
				<view class="btns" v-for="(item,index) in subIndicators " :key="index" @click="setSubIndicator(item)">
					{{item}}
				</view>
			</view>
	<!-- 		<view class="btns"   @click="clearHandle()">
				Clean
			</view> -->
		
		</view>
	
	</view>
</template>

<script>
	import {
		dispose,
		init,
		registerIndicator
	} from "klinecharts";

	export default defineComponent({
		props: ['dataList1'],
		name: "ChartIndicator",
		setup(props, {
			emit
		}) {
			const mainIndicators = ["MA", "EMA", "SAR"]
			const subIndicators = ["VOL", "MACD", "KDJ"]

			const chart = ref(null)
			const paneId = ref(null)

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
			onMounted(() => {
				chart.value = init("indicator-k-line");
				paneId.value = chart.value.createIndicator("VOL");
				let data = changeDataType(props.dataList1)
				chart.value.applyNewData(data);
			})

			function timestampToDateTime(timestamp) {
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
			watch(props, (oldVal, newVal) => {
				let data = changeDataType(oldVal.dataList1)
				chart.value.updateData(data[data.length - 1]);
			})
			return {
				setMainIndicator,
				setSubIndicator,
				mainIndicators,
				subIndicators,
			}
		}
	})
</script>

<style scoped lang="scss">
	.k-line-chart-container {
		display: flex;
		flex-direction: column;
		margin: 15px 0;
		border-radius: 2px;
		width: 100%;
		height: 1040rpx;
		padding: 16rpx 10rpx;
		background-color: #fff;
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
</style>
