<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
	<view class="tqb-tabbar ">
		<view class="tqb-tabbar-body animate__fadeInUp animate__animated" style="animation-duration:.3s">
			<view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index"
				@click="switchClick(item, index)">
				<view  class="tabbar-item-body">
					<view class="tabbar-item-icon">
						<image :src="index===activeIndex ?item.selectPath:item.iconPath"
							style="width:45rpx; height: 45rpx;"></image>
					</view>
					<view class='tab-bar-text' :class="index===activeIndex ? 'actCho': ''">{{ item.text }}
					</view>
					<!-- <view v-if="index == 1 && showMore" class="redDor">

					</view> -->
				</view>

			<!-- 	<view v-else class="add-icon">
					<image :src="item.iconPath" style="width: 115rpx; height: 115rpx;"></image>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';
	import request from '../../../comm/request.ts';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow
	} from '@dcloudio/uni-app';
	export default defineComponent({
		props: ["activeIndex"],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const activeIndex = ref(props.activeIndex)
			const tabBarList = ref([{
				text: t('add2.t_t1'),
				iconPath: '/static/tabbar/home2.png',
				selectPath: "/static/tabbar/home1.png",
				pagePath: '/pages/tabbar/index',
			}, {
				text: 'TXN',
				iconPath: '/static/tabbar/qmt1.png',
				selectPath: "/static/tabbar/qmt2.png",
				pagePath: '/pages/tabbar/panel',
			}, {
				text: 'INV',
				iconPath: '/static/tabbar/team2.png',
				selectPath: "/static/tabbar/team1.png",
				pagePath: '/pages/tabbar/news',
			}, {
				text: t('add2.t_t3'),
				iconPath: '/static/tabbar/service2.png',
				selectPath: "/static/tabbar/service1.png",
				pagePath: '/pages/tabbar/construct',
			}, {
				text: t('add2.t_t4'),
				iconPath: '/static/tabbar/mine1.png',
				selectPath: "/static/tabbar/mine2.png",
				pagePath: '/pages/tabbar/mine',
			}])

			const showMore = ref(false)


			const switchClick = (data, index) => {
				if (index == activeIndex.value) {
					return;
				}
				activeIndex.value == index;
				uni.navigateTo({
					url: data.pagePath
				});
			}

			return {
				tabBarList,
				showMore,
				switchClick,
				activeIndex
			}
			// const tabBarList = ref([{
			// 	text: t('newTab.n_n1'),
			// 	iconPath: '/static/themeNum1/tqb-tabbar/home.png',
			// 	selectPath: "/static/themeNum1/tqb-tabbar/home1.png",
			// 	pagePath: '/',
			// }, {
			// 	text: t('newTab.n_n2'),
			// 	iconPath: '/static/themeNum1/tqb-tabbar/invest.png',
			// 	selectPath: "/static/themeNum1/tqb-tabbar/invest1.png",
			// 	pagePath: '/pages/tabbar/news',
			// }, {
			// 	text: '',
			// 	iconPath: '/static/themeNum1/tqb-tabbar/add.png',
			// 	pagePath: '/pages/tabbar/panel'
			// }, {
			// 	text: t('newTab.n_n3'),
			// 	iconPath: '/static/themeNum1/tqb-tabbar/news.png',
			// 	selectPath: "/static/themeNum1/tqb-tabbar/news1.png",
			// 	pagePath: '/pages/tabbar/construct',
			// }, {
			// 	text: t('newTab.n_n4'),
			// 	iconPath: '/static/themeNum1/tqb-tabbar/mine.png',
			// 	selectPath: "/static/themeNum1/tqb-tabbar/mine1.png",
			// 	pagePath: '/pages/tabbar/mine',
			// }])

			// const showMore = ref(false)
			// const getData = () => {
			// 	request({
			// 		url: 'page/article/unread',
			// 		methods: 'get',
			// 		data: {
			// 			pos: 2
			// 		}
			// 	}).then(res => {
			// 		res > 0 ? showMore.value = true : showMore.value = false
			// 	}).catch(err => {
			// 		Toast.text(err.message)
			// 	})
			// }

			// const switchClick = (data, index) => {
			// 	if (index == activeIndex.value) {
			// 		return;
			// 	}
			// 	activeIndex.value == index;
			// 	uni.navigateTo({
			// 		url: data.pagePath
			// 	});
			// }
			// onShow(() => {
			// 	getData()
			// })
			// return {
			// 	tabBarList,
			// 	showMore,
			// 	switchClick,
			// 	activeIndex
			// }
		},
	})
</script>

<style lang="scss" scoped>
	.tqb-tabbar-body {
		// border-top: 2px solid #e1e1e1;
		background: #191919;
		height: 76rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 22rpx 0;
		margin: 0 auto;
		border-top: 1rpx solid #51FDFE;
		max-width: 790rpx;

		.tqb-tabbar-item {
			flex: 1;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			position: relative;

			// width: 18%;
			.tabbar-item-body {}

			.tabbar-item-icon {
				display: flex;
				justify-content: center;
				transition: all 0.6s ease;

			}

			.tab-bar-text {
				font-size: 20rpx;
				font-weight: 400;
				margin-top: 10rpx;
				color: #dddddd;
			}


			.add-icon {
				// width: 230rpx;
				// height: 230rpx;
				position: relative;
				top: -25rpx;
			}


		}
	}

	.actCho {
		color: #52FDFE !important;
	}

	.redDor {
		position: absolute;
		width: 15rpx;
		height: 15rpx;
		background-color: red;
		border-radius: 50%;
		top: -10rpx;
		right: 30%;
	}

	// .tqb-tabbar-popup {
	// 	position: fixed;
	// 	bottom: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.49) 32%, rgba(0, 0, 0, 0.66) 100%);
	// 	height: 660rpx;

	// 	.mask-close {
	// 		position: absolute;
	// 		top: 32rpx;
	// 		right: 32rpx;
	// 	}

	// 	.popup-body {
	// 		display: flex;
	// 		flex-wrap: wrap;
	// 		position: absolute;
	// 		top: 142rpx;
	// 		width: 100%;

	// 		.popup-item {
	// 			width: 20%;
	// 			margin-bottom: 20rpx;
	// 			text-align: center;

	// 			.popup-item-icon {
	// 				display: flex;
	// 				justify-content: center;
	// 			}

	// 			.popup-item-text {
	// 				font-size: 24rpx;
	// 				color: #fff;
	// 			}
	// 		}
	// 	}
	// }
</style>