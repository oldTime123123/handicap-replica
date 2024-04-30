<template>
	<view style="background: #060D1F">
		<topNav :title="t('newAct.c_l1')"></topNav>



		<view class="pdlr30 mt48">
			<view class="tabs">
				<view class="tabsItem" v-for="(item, index) in tabsList" :class="tabsInd == index ? 'tabAct' : ''"
					@click="tabsInd = index"> {{ item }}</view>
			</view>

			<div class="" v-if="tabsInd == 0" dir="ltr">
				<view class="mt50 mb50 text_center f34 	">
					{{ t('newAct.c_l2') }}: <text style="color: #E93337; font-weight:bold">{{ myInvite }}</text>
				</view>
				<view class="couponItem between" v-for="item in couponList">
					<view style="width: 30%;word-break: break-all;" class="pdlr20 center text_white">{{ item.name }}
					</view>
					<view style="flex: 1;">
						<view class="f26"> {{ t('newAct.c_l3') }} <text style="color: #E93337;">{{ item.price }}:
								{{ currency }}</text>
						</view>
						<view class="f26 mt10">{{ t('newAct.c_l4') }}:<text style="color: #E93337;">{{ item.number }}</text>
						</view>
						<view class="mt30 recBtn" v-if="item.status == 1">{{ t('redE.p_p1') }}</view>
						<view class="mt30 recBtn" v-if="item.status == 2" @click="ReceiveHandle(item)">
							{{ t('newAct.c_l5') }}</view>
						<view class="mt30 recBtn" v-if="item.status == 3" @click="tabsInd = 1">{{ t('redE.p_p2') }}</view>
						<view class="mt30 recBtn" v-if="item.status == 4">{{ t('redE.p_p3') }}</view>
					</view>
				</view>
			</div>

			<view class="mt30" v-if="tabsInd == 1">

				<couRecord ref="couRecordRef"></couRecord>
			</view>
		</view>


		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import topNav from "@/components/topNav/topNav.vue"
import request from '../../../comm/request.ts';
import couRecord from '@/components/couRecord/couRecord.vue'
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
const store = userStore();
import {
	useI18n
} from 'vue-i18n'

const {
	t
} = useI18n()

const currency = uni.getStorageSync('currency')

const tabsList = [
	t('newAct.c_l7'),
	t('newAct.c_l8'),
]
const tabsInd = ref(0)


const showLoading = ref(null)
const recordsList = ref([])


const ReceiveHandle = (item) => {

	let data = {
		configId: item.id
	}
	request({
		url: 'invest/coupon',
		methods: 'post',
		data
	}).then(res => {
		// console.log(res);
		Toast.text(t('newAct.c_l9'))
		getCouponList()
	}).catch(err => {
		Toast.text(err.message)
	})
}

const couponList = ref([])
const myInvite = ref(0)


const getCouponList = () => {
	request({
		url: 'invest/couponList',
		methods: 'get',
	}).then(res => {
		myInvite.value = res.invite_count
		couponList.value = res.list.data
	}).catch(err => {
		Toast.text(err.message)
	})
}

// 终于可以用了
onMounted((e) => {
	getCouponList()
})
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
.pass {
	color: #60B661;
}

.couponItem {
	width: 100%;
	height: 234rpx;
	background: url('/static/coupon.png') no-repeat 100%/100%;
}

.topBox {
	padding: 30rpx 40rpx;
	background-color: #8dc68c;
	border-radius: 20rpx;
	margin-bottom: 50rpx;
	color: #fff;

	.topItem {
		width: calc(45% - 40rpx);
		background-color: #fff;
		height: 90rpx;
		border-radius: 20rpx;
		color: #000;
		padding: 30rpx 20rpx;

		.textHiddenTwo {
			height: 60rpx;
			text-align: center;
		}

		.value {
			color: #60B661;
		}
	}
}

.tabs {
	display: flex;

	.tabsItem {
		padding: 20rpx 0;
		background-color: #fff;
		width: 50%;
		text-align: center;
	}

	.tabAct {
		background-color: #16b739;
		color: #fff;

	}
}

.recBtn {
	background: linear-gradient(0deg, #E93337 0%, #FE6B6B 100%);
	text-align: center;
	width: 90%;
	padding: 10rpx 0;
	color: #fff;
	border-radius: 10rpx;
}

.toUse {
	border: 1rpx solid #E93337;
	text-align: center;
	width: 90%;
	padding: 10rpx 0;
	color: #fff;
	border-radius: 10rpx;
	color: #E93337;
}
</style>
