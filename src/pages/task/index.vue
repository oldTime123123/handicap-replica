<template>
	<view class="normalBg" style="background: #060D1F">
		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 32rpx;height: 30rpx;">
				<image :src="store.$state.imgObj.backIcon" style="width: 100%;height: 100%;" @click="back"
					v-if="curLang !== 'ar'"></image>
				<IconFont v-else name="rect-right" color="#fff" @click="back"></IconFont>
			</view>
			<view class="f40  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">Task
			</view>
			<view style="width: 45rpx;height: 45rpx;">

			</view>
		</view>
		<view class="pdlr30 mt40">
			<view class="listBox ">
				<view v-for="(item, index) in picList" class=" mb30">
					<view class="mb20">{{ index + 1 }} : Please mark on the picture</view>
					<view class="tpItem" style="width: 100%;height: 800rpx;">
						<!-- <image :src="item.url" style="width: 100%;height: 700rpx;"></image> -->
						<canvasC :canId="'canvas-' + index" :canvasRefP="'canvasRef' + index" :listInd="index"
							:bgImg="'url(' + item.url + ')'"> </canvasC>
					</view>

				</view>
			</view>
		</view>
		<view class="pdlr60">
			<view class=" center l_inpS mt40  pdlr30 color3 f32" style="margin-top:214rpx;color:#000"
				:style="{ background: store.$state.secondColor }" @click="submitHandle">
				Submit
			</view>
		</view>
		<view style="height: 100rpx;">

		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import foundCanvas from "../../../comm/canvas.js";
import request from '../../../comm/request.ts';
import canvasC from '../../components/canvas/canvasC.vue';
import {
	userStore
} from "@/store/themeNum.js";
import {
	useI18n
} from "vue-i18n";
import {
	onShow,
	onLoad
} from "@dcloudio/uni-app";
import {
	onMounted
} from "vue";
const store = userStore();


const page = ref(1)
const pageChange = index => {
	console.log(index);
}
const tabsList = ref([])
const preShow = ref(true)
const actInd = ref(-1)
const showLoading = ref(null)
const {
	t
} = useI18n()
// 点击pre

onMounted(() => {
	showLoading.value.loading = true
	setTimeout(() => {
		showLoading.value.loading = false
	}, 1500)
})
const back = () => {
	history.back()
}
const currency = uni.getStorageSync('currency')
const curLang = uni.getStorageSync('lang')
const picList = ref([])
const getData = () => {
	request({
		url: 'invest/getAiTask',
		methods: 'post',
		data: {
			investId: id.value
		}
	}).then(res => {
		picList.value = res

		// picList.value = [
		// 	{
		// 		url:'/static/1.jpg'
		// 	},
		// 	{
		// 		url:'/static/1.jpg'
		// 	},
		// ]
	})
}
const submitHandle = () => {
	showLoading.value = true
	request({
		url: 'invest/submitAiTask',
		methods: 'post',
		data: {
			investId: id.value
		}
	}).then(res => {

		showLoading.value = false
		uni.showToast({
			title: 'Submie Success',
			icon: 'none',
			duration: 2500
		});
		setTimeout(() => {
			uni.navigateTo({
				url: "../tabbar/panel"
			})
		}, 3000)
	}).catch(e => {
		showLoading.value = false
		uni.showToast({
			title: e.message,
			icon: 'none'
		});
	})
}
const id = ref("")
onLoad((e) => {
	if (e.id) {
		id.value = e.id
		getData()
	}
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
.listBox {
	padding: 20rpx 30rpx;
	background-color: #262626;
	border-radius: 20rpx;

	.tpList {
		// display: grid;
		// grid-template-columns: repeat(3, 1fr);
		// grid-gap: 20rpx 20rpx;
		// margin-bottom: 40rpx;

		.tpItem {
			position: relative;


		}
	}
}
</style>
