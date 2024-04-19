<template>
	<view>
		<topNav title="Lottery"></topNav>
		<view class="pdlr45  mt80">

			<view class="flex topList" style="margin: 100rpx 0;">
				<view class="tabs " :style="{background:store.$state.contentColor}"> Available: {{ userData.num }}
				</view>
				<view class="tabs mglr30" :style="{background:store.$state.contentColor}">Completed:
					{{ userData.did_num }}
				</view>
			</view>
			<view v-if="userData.num > 0">
				<nutbig-marquee :prize-list="prizeList3" :prize-index="prizeIndex" :speed="100" :circle="40"
					@start-turns="startTurns3" @end-turns="endTurns">
				</nutbig-marquee>
			</view>

			<view class="mt50">
				<view class="withdraw_record_warp">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="1500" :duration="800"
						:vertical="true" display-multiple-items="4" style=" width: 100% !important;"
						:disable-touch="true">
						<swiper-item class="record_box" v-for="(item,index) of logs" :key='index'>
							<view class="phone">
								{{item.user?.phone}}
							</view>

							<view class="status textHiddenOne">
								Get
							</view>
							<view class="amount">
								{{item.gift?.name}} {{currency}}
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>
			<view class="desc mt50">
				<view v-html="hint"></view>
			</view>
		</view>


		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import topNav from "@/components/topNav/topNav.vue"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		onMounted
	} from "vue";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const showLoading = ref(null)
	const userData = ref({
		num: 0
	})
	const hint = ref("")
	const logs = ref([])
	const prizeList3 = ref([
	]);
	// lottery 3
	const getData = () => {
		request({
			url: 'activity/lottery/info',
			methods: 'get'
		}).then(res => {
			// prizeList3.value
			let arr = res.lottery.gift.map(item => {
				return {
					id: item.id,
					prizeName: item.name,
					prizeImg: item.full_cover
				}
			})
			prizeList3.value = arr
			logs.value = res.result
			userData.value = res.chance
			hint.value = res.lottery.rule
		})
	}

	// 转盘样式的选项
	const styleOpt3 = reactive({
		prizeItem: {},
	
		contentBg: {
			background: "rgb(255, 231, 149)",
		},
	});
	// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
	const prizeIndex = ref(-1);
	const circleNum = ref(40)
	const speedS = ref(100)
	const startTurns3 =  () => {
		request({
			url: 'activity/lottery/lottery',
			methods: 'post'
		}).then(res => {
			setTimeout(() => {
				prizeIndex.value = Number(res.prize_id);
				console.log(prizeIndex.value, "ssssss");
				speedS.value = 0
				circleNum.value = 0
			}, 1000)
			// prizeIndex.value = 3;
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	};
	const endTurns = () => {
		console.log(prizeIndex.value, "eeeeeeee");
		uni.showToast({
			title: prizeList3.value[prizeIndex.value].prizeName,
			icon: 'none'
		});
	};
	const currency = uni.getStorageSync('currency')
	onMounted(() => {
		getData()
	})
</script>

<style lang="scss" scoped>
	.topList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 50rpx;

		.tabs {
			padding: 25rpx 10rpx;
			border-radius: 20rpx;
			color: #fff;
			border: 1rpx solid #fff;
			width: 45%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
	}

	.withdraw_record_warp {
		// height: 240rpx;

		background: #fff;
		border-radius: 20rpx;
		padding: 40rpx 50rpx 0 50rpx;
		color: #000;

		.record_box {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-column-gap: 10rpx;
			margin-bottom: 40rpx;
			font-size: 22rpx;
			text-align: center;

			.phone {
				text-align: left;
			}

			.status {
				text-align: center;
			}

			.amount {
				text-align: right;
			}
		}
	}
</style>
