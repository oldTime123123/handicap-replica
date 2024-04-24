<template>
	<view>
		<div class="" ref="chartDom" style="width: 100%;height: 800rpx; position: absolute;left: 0;"></div>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import {
		defineComponent,
		ref,
		onMounted
	} from 'vue';
	export default defineComponent({
		props: ['dataList1'],
		name: "kLine",
		setup(props, {
			emit
		}) {
			const chartDom = ref("")
			const myChart = ref("")
			onMounted(() => {
				myChart.value = echarts.init(chartDom.value);
				updateData(splitData(props.dataList1))
			})
			const upColor = '#02ad90';
			const downColor = '#eb2650';
			const updateData = (rowData) => {

				let option = {
					animation: false,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						borderWidth: 1,
						borderColor: '#ccc',
						padding: 10,
						textStyle: {
							color: '#000'
						},
						position: function(pos, params, el, elRect, size) {
							const obj = {
								top: 10
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
							return obj;
						},

						formatter: function(param) {
							param = param[0];
							return [
								`<div class='between f22'> <text>Time</text>   <text  class="pl20">${param.axisValue}</text> </div>	`,
								`<div class='between f22'> <text>Open</text>   <text>${param.data[1]}</text> </div>	`,
								`<div class='between f22'> <text>Close</text>   <text>${param.data[2]}</text> </div>	`,
								`<div class='between f22'> <text>High</text>   <text>${param.data[3]}</text> </div>	`,
								`<div class='between f22'> <text>Low</text>   <text>${param.data[4]}</text> </div>	`,
							].join('');
						}
					},
					axisPointer: {
						link: [{
							xAxisIndex: 'all'
						}],
						label: {
							backgroundColor: '#777'
						}
					},

					grid: [{
							left: '2%',
							right: '15%',
							height: '60%',
							z: 3,
							top: 10,
							show: true,
							borderWidth: 0.5,
							borderColor: '#ccc',
							containLabel: false,
							textStyle: {
								color: '#333',
								fontSize: '12'
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: '#DCDCDC',
									width: 1,
									type: 'dashed'
								}
							},
						},
						{
							left: '2%',
							right: '15%',
							top: '65%',
							height: '16%',
							bottom: 0
						}
					],
					xAxis: [{
							show: false,
							type: 'category',
							data: rowData.categoryData,
							axisLine: {
								onZero: false
							},
							splitLine: {
								show: false
							},
							axisTick: {
								show: false // 隐藏坐标轴刻度线
							},
							axisLabel: {
								show: false // 隐藏坐标轴刻度点
							},
							min: 'dataMin',
							max: 'dataMax',
							axisPointer: {
								z: 100
							},
							show: true,
						},
						{
							type: 'category',
							gridIndex: 1,
							data: rowData.categoryData,
							axisLine: {
								onZero: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							show: true,
							min: 'dataMin',
							max: 'dataMax'
						}
					],
					yAxis: [{
							scale: true,
							splitArea: {
								show: true
							},
							position: 'right'
						},
						{
							scale: true,
							gridIndex: 1,
							splitNumber: 2,
							axisLabel: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							}
						}
					],
					dataZoom: [{
							type: 'inside',
							xAxisIndex: [0, 1],
							start: 0,
							end: 100
						},
						{
							show: false,
							xAxisIndex: [0, 1],
							type: 'slider',
							top: '85%',
							start: 0,
							end: 100
						}
					],
					series: [{
							type: 'candlestick',
							data: rowData.values,
							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: undefined,
								borderColor0: undefined,
								borderWidth: 0
							},

						},
						{
							name: 'Volume',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: rowData.volumes,
							itemStyle: {
								color: function(params) {
									if (params.data[2] > 0) {
										return upColor; // 上涨用 upColor
									} else {
										return downColor; // 下跌用 downColor
									}
								}
							},
						}
					]
				}

				myChart.value.setOption(option);
			}
			watch(props, (oldVal, newVal) => {

				updateData(splitData(oldVal.dataList1)) //更新数据
			})
			return {
				chartDom,
			}
		}

	})

	// `<div class='between f22'> <text>Open</text>   <text>${param.data[1]}</text> </div>	`,
	// 							`<div class='between f22'> <text>Close</text>   <text>${param.data[2]}</text> </div>	`,
	// 							`<div class='between f22'> <text>High</text>   <text>${param.data[3]}</text> </div>	`,
	// 							`<div class='between f22'> <text>Low</text>   <text>${param.data[4]}</text> </div>	`,

	function splitData(rawData) {
		// 重新定义修改后的data
		let categoryData = [];
		let values = [];
		let volumes = [];
		for (let i = 0; i < rawData.length; i++) {
			categoryData.push(timestampToDateTime(rawData[i].id));
			values.push([rawData[i].open, rawData[i].close, rawData[i].high, rawData[i].low]);
			volumes.push([i, rawData[i].vol, rawData[i].close > rawData[i].open ? 1 : -1]);
		}
		return {
			categoryData: categoryData,
			values: values,
			volumes: volumes
		};
	}




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
</script>
