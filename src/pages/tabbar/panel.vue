<template>
	<view style="background: #080F32;  position: relative;">
		<view
			style="width: 750rpx;height: 88rpx;background-color: #0C1526;text-align: center;line-height: 88rpx;font-weight: 600;font-size: 36rpx;color: #FFFFFF;">
			Market</view>

		<view class="main pdlr30">
			<view class="flex panelTitle">
				<view>Name</view>
				<view>Price</view>
				<view>24h chg%</view>
				<view></view>

			</view>
			<!--  -->
			<view class="tableHead between" v-for="item in lineData">
				<view class="flex col_center item" style="width: 30%;">
					<image :src="item.pro_img" style="width:52rpx ;height: 52rpx;"></image>
					<view class="mglr14 f28 text_bold">
						<text class="text_white" style="color: #fff;">
							{{ item.pro_name }}/{{ currency }}
						</text>

						<view class="f20">Vol:{{ item.vol }}</view>

					</view>
				</view>
				<view class="item" style="width: 25%;">
					<view class="f28" style="color: #fff;">{{ item.price }}</view>
				</view>
				<view class="item flex" style="flex-direction:row-reverse;width: 15%;">
					<view class=" downEl" v-if="item.is_rise == 1">
						-{{ item.rise_rate }}%
					</view>

					<view class="upEl" v-else>
						+{{ item.rise_rate }}%
					</view>
				</view>
				<view class="btcBtn" @click="jumpPage('../marks/index?id=' + item.id)">
					Follow orders
				</view>
			</view>
			<!--  -->
			<view class="panelbottom">-No more-</view>

			<Tabbar :activeIndex="1"></Tabbar>
			<Loading ref="showLoading"></Loading>
			<Loading2 ref="showLoading2"></Loading2>

		</view>

	</view>
</template>

<script setup>
import Tabbar from '@/components/botTabbar/botTabbar.vue';
import Loading2 from '@/components/loading/loading2.vue';
import request from '../../../comm/request.ts';
import { Locale } from '@nutui/nutui';
import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
import { userStore } from '@/store/themeNum.js';
import { Toast } from '@nutui/nutui';
import { onShow, onLoad, onHide } from '@dcloudio/uni-app';
import { onMounted } from 'vue';
const store = userStore();
import FullMask from "@/components/fullMask/fullMask";
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import io from 'socket.io-client'
const socket = io('https://gptrobotai.com', { transports: ['websocket'] })
const lineData = ref('')
socket.on('project', (data) => {
	lineData.value = data.list
	// 在这里可以对服务器返回的数据进行处理

});
socket.emit('project', { 'type': 1 })



const { t } = useI18n();

const currency = uni.getStorageSync('currency')

const jumpPage = (url) => {
	console.log(url);
	uni.navigateTo({
		url
	})
}
// 终于可以用了
onMounted(() => {

});



onHide(() => {

})


onLoad(() => {
	request({
		url: "/setting/currency",
		methods: "get",
	}).then((res) => {
		uni.setStorageSync("currency", res.currency);
	});
})


</script>

<style lang="scss" scoped>
.panelTitle {
	padding: 34rpx 0;

	view {
		width: 25%;
		text-align: center;
		font-weight: 400;
		font-size: 32rpx;
		color: #5B5E66;
	}
}

.tableHead {
	padding: 27rpx 0;
	background-color: #080F32;
}

.btcBtn {
	width: 158rpx;
	height: 64rpx;
	background: linear-gradient(308deg, #006BF4 0%, #04E1F4 100%);
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	font-weight: 400;
	font-size: 24rpx;
	color: #FFFFFF;
	line-height: 64rpx;
	padding: 0 12rpx;
}

.panelbottom {
	height: 340rpx;
	text-align: center;
	line-height: 150rpx;
}
</style>
