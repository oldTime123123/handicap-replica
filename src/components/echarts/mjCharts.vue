<template>
	<view>
		<div class="" ref="chartDom" style="width: 100%;height: 400rpx; position: absolute;left: 0;"></div>
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
				let xData = rowData.x
				let yData = rowData.y
				let option = {
					// Make gradient line here

					color: ['#339ef4'],
					xAxis: {
						type: 'category',
						boundaryGap: false,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#DCDCDC',
								width: 1,
								type: 'dashed'
							}
						},
						data: xData
					},
					tooltip: {
						show: true,
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
					},
					yAxis: {
						position: 'right',
						min: findMinimum(yData)
					},
					grid: {
						show: true,
						widht: '100%',
						left: '0',
						right:'20%',
						height: '80%',
						top: 10,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#DCDCDC',
								width: 1,
								type: 'dashed'
							}
						},
					},
					series: [{
						type: 'line',
						showSymbol: false,
						data: yData,
						areaStyle: {
							opacity: 1,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#dbeefd',
								},
								{
									offset: 1,
									color: '#ebffff'
								}
							])
						},
					}, ]
				};
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
function findMinimum(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}
	function splitData(rawData) {
		// 重新定义修改后的data
		let categoryData = [];
		let values = [];
		let volumes = [];
		for (let i = 0; i < rawData.length; i++) {
			categoryData.push(timestampToDateTime(rawData[i].id));
			values.push(rawData[i].close);
		}
		return {
			x: categoryData,
			y: values,
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
		return ` ${hours}:${minutes}:${seconds}`;
	}
</script>
