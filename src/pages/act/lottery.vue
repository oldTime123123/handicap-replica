<template>
	<view>
		<topNav :title="t('newAct.l_l1')" rightIcon="/static/act/record.png" rightUrl="./lottery-record"></topNav>

		<view class="pdlr45 mt20" style="position: relative;">
			<view class="flex topList">
				<view class="tabs" :style="{ background: store.$state.contentColor }">{{ t('newAct.l_l2') }}:
					{{ userData.num }}
				</view>
				<view class="tabs ml20" :style="{ background: store.$state.contentColor }">
					{{ t('newAct.l_l3') }}:
					{{ userData.did_num }}
				</view>
				<!-- <view class="tabs ml20" :style="{ background: store.$state.contentColor }"
					@click="jump('/pages/act/lottery-record')">record</view> -->
			</view>
			<nutbig-turntable class="turntable" ref="turntable" :width="luckWidth" :height="luckheight"
				:prize-list="prizeList" :turns-number="turnsNumber" :turns-time="turnsTime" :prize-index="prizeIndex"
				:style-opt="styleOpt" :pointer-style="pointerStyle" @start-turns="startTurns" @end-turns="endTurns">
			</nutbig-turntable>
			<!-- <gb-choujiang nImg="" :AwardList="prizeList3" @updateMoney="showPop" :canuse="canuse"></gb-choujiang> -->

			<view style="position: absolute;top:800rpx; left :0;width:calc( 100% - 90rpx);padding: 0 45rpx;">
				<!-- 				<view class="withdraw_record_warp">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="1500" :duration="800"
						:vertical="true" display-multiple-items="4" style="width: 100% !important"
						:disable-touch="true">
						<swiper-item class="record_box" v-for="(item, index) of logs" :key="index">
							<view class="phone">
								{{ item.user?.phone }}
							</view>

							<view class="status textHiddenOne">Get</view>
							<view class="amount">{{ item.gift?.name }} {{ currency }}</view>
						</swiper-item>
					</swiper>
				</view> -->
				<view class="desc mt50">
					<view v-html="hint"></view>
				</view>
			</view>

		</view>

		<nut-overlay v-model:visible="popShow">
			<view class="center flex-col  ">
				<view class="bgShow">

				</view>
				<text class="mt20" style="color: #fff">{{ popText }} </text>

				<view class="pop-btn mt20" @click="popShow = false">{{ t('all.a_c2') }}</view>
			</view>
		</nut-overlay>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import topNav from '@/components/topNav/topNav.vue';
import request from '../../../comm/request.ts';
import gbChoujiang from '../../components/gb-choujiang/gb-choujiang';
import {
	userStore
} from '@/store/themeNum.js';
import {
	Toast
} from '@nutui/nutui';
import {
	onShow,
	onLoad
} from '@dcloudio/uni-app';
import {
	onMounted
} from 'vue';
const store = userStore();

import {
	useI18n
} from 'vue-i18n';

const {
	t
} = useI18n();
const showLoading = ref(null);
const userData = ref({
	num: 0
});
const hint = ref('');
const logs = ref([]);
const canuse = ref(false);
const prizeList3 = ref([

]);

function jump(url) {
	uni.navigateTo({
		url
	})
}

// lottery 3
let popShow = ref(false);
let popText = ref('');

const showPop = (e) => {
	popText.value = e;
	popShow.value = true;
	getData();
};

const getData = () => {
	request({
		url: 'activity/lottery/info',
		methods: 'get'
	}).then((res) => {
		// prizeList3.value
		let arr = res.lottery.gift.map((item) => {
			return {
				id: item.id,
				prizeName: item.name,
				prizeImg: item.full_cover
			};
		});
		let arr2 = res.lottery.gift
		prizeList.value = res.lottery.gift.map((item) => {
			return {
				id: item.id,
				prizeName: item.name,
				prizeImg: item.full_cover
			};
		});

		prizeList3.value = arr;
		prizeList3.value.splice(4, 0, '');
		logs.value = res.result;
		userData.value = res.chance;
		hint.value = res.lottery.rule;
		userData.value.num > 0 ? (canuse.value = true) : (canuse.value = false);
	});
};

const currency = uni.getStorageSync('currency');
onMounted(() => {
	getData();
});

// lottery 2

const turntable = ref(null);
// 转盘大小
const luckWidth = ref("300px");
const luckheight = ref("300px");
// 转盘指针图片样式
const pointerStyle = {
	width: "80px",
	height: "80px",
	backgroundImage: 'url("/static/act/go.png")',
	backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
};
// 转盘上要展示的奖品数据
const prizeList = ref([

]);
// 转动圈数
const turnsNumber = ref(5);
// 转动需要持续的时间(秒)
const turnsTime = ref(5);
// 转盘样式的选项
const styleOpt = reactive({
	// 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
	prizeBgColors: [
		"rgb(255, 231, 149)",
		"rgb(255, 247, 223)",
		"rgb(255, 231, 149)",
		"rgb(255, 247, 223)",
		"rgb(255, 231, 149)",
		"rgb(255, 247, 223)",
		"rgb(255, 231, 149)",
		"rgb(255, 247, 223)",
	],
	// 每一个扇形的外边框颜色
	borderColor: "#ff9800",
});
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1);
// 剩余抽奖次数
const num = ref(5);
const startTurns = () => {


	request({
		url: 'activity/lottery/lottery',
		methods: 'post'
	}).then(res => {
		prizeIndex.value = prizeList.value.findIndex(item => item.id == res.prize_id);
		turntable.value.rotateTurn();
	}).catch(err => {
		uni.showToast({
			title: err.message,
			icon: 'none'
		})
	})
};
const endTurns = () => {
	popText.value = t('newAct.l_l4') + ' :' + prizeList.value[prizeIndex.value].prizeName
	popShow.value = true
};
onLoad(() => {
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

<style lang="scss" scoped>
.bgShow {
	background: url('/static/act/res.png') no-repeat 100%/100%;
	height: 600rpx;
	width: 650rpx;
}

/* 抽奖 */
.luck-list {
	/* padding: 14rpx 25rpx; */
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 10px;
	/* 可选，用于设置网格项之间的间距 */
	height: 560rpx;
	width: 600rpx;
	padding: 40rpx 20rpx;
	/* 		height: 794rpx;
		width: 750rpx;
			padding: 180rpx 104rpx 80rpx 104rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: space-around;
		justify-content: space-around; */
	/* flex-wrap: wrap; */
}

.changeIcon {
	background-color: blue;
	color: #fff;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 80rpx;
	font-weight: bold;
}

.cell-item {
	width: 180rpx;
	height: 180rpx;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	margin-top: -4rpx;
	margin-left: 4rpx;
	/* border-radius: 10rpx; */
	/* margin: 0 8rpx 0 0; */
}

.cell-content {
	/* margin: 5rpx 10rpx; */
	width: 100%;
	height: 100%;
	/* border-radius: 30rpx; */
	display: flex;
	align-items: center;
	justify-content: center;
	/* background-color: #d6d6d6; */
	/* padding-left: 10rpx; */
}

.w {
	/* background-color: #fdf2ee; */
}

.w-b {
	/* margin-top: 3rpx; */
	/* background-color: #f8d0c3; */
}

.y {
	background-color: #ff6969;
	margin-left: 0 !important;
	/* border-radius: 10rpx; */
}

/*  .y::after {
	   position: absolute;
	   content: "";
	   display: block;
	   width: 100%;
	   height: 100%;
	   border-radius: 10rpx;
	   z-index: 9;
	   left: 0;
	   top: 0;
		background-color: rgba(255, 140, 25, 0.4) !important;
		border-radius: 10rpx;
	} */

.y-b {
	/* background-color: #EFCD22; */
}

.topList {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	width: calc(100% - 50rpx);
	top: 20rpx;

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

.pop-btn {
	width: 160px;
	height: 40px;
	border-radius: 20px;
	background-color: #fce256;
	color: #b7770e;
	text-align: center;
	line-height: 40px;
}

.desc {
	background: #fff;
	border-radius: 20rpx;
	padding: 40upx;
	color: #000;
}
</style>
