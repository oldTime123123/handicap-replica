<template>
	<view class="bgContent normalBg">
		<view class="between" style="height: 88rpx; padding: 0 31rpx;">
			<view style="width: 48rpx;height: 80rpx;" class="center">
				<IconFont name="left" color="#fff" @click="back"></IconFont>
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 500;width: 60%;height: 100%; ">
				{{ t('redE.g_g1') }}
			</view>

			<view style="width: 48rpx;height: 80rpx;" class="center">
				<image src="/static/act/record.png" mode="widthFix" style="width:48rpx;height: 34rpx;"
					@click="jumpPage('./goldEggRecord')"></image>
			</view>
		</view>
		<view class="pdlr45 mt50">
			<view class="flex topList">
				<view class="tabs" :style="{ background: store.$state.secondColro }">{{ t('newAct.l_l2') }}:
					{{ userData.num }}
				</view>
				<view class="tabs ml20" :style="{ background: store.$state.secondColro }">
					{{ t('newAct.l_l3') }}:
					{{ userData.did_num }}
				</view>
			</view>

			<view style="margin-top: 50rpx;" v-if="userData.num > 0">
				<nutbig-hiteggs :num="9" @click="eggClick"></nutbig-hiteggs>
			</view>
			<view class="mt50" v-else>
				<view class="between" style="flex-wrap: wrap;">
					<view v-for="item in 9" @click="eggClickNone" style="width: 200rpx;" class="center mb10">
						<image src="/static/act/egg.png" mode="widthFix" style="width: 160rpx;"></image>
					</view>
				</view>
			</view>
			<view class="desc mt50">
				<view v-html="hint"></view>
			</view>

		</view>

		<nut-overlay v-model:visible="popShow" :close-on-click-overlay="false">
			<view class="center flex-col" v-if="isWin">
				<view class="bgShowWin">
					<view class="text_center pt40 f34 text_bold" style="color: #ff5c2d;">{{ t('redE.g_g3') }}</view>
					<view class="center mt40 f40">

						<!-- <view  style="height: 300rpx;" class="center text_center">{{maskUrl.prizeName}}</view> -->
						<image :src="maskUrl.prizeImg" style="width: 300rpx;height: 300rpx;"></image>
					</view>
					<view class="close">
						<image src="/static/act/egg/close.png" mode="widthFix" style="width: 60rpx;height: 60rpx;"
							@click="closeMask"></image>
					</view>
				</view>
				<view class="pop-btn " @click="closeMask">{{ t('all.a_c2') }}</view>
			</view>

			<view class="center flex-col" v-else>
				<view class="bgShowFail">
					<view class="text_center pt40 f34 text_bold" style="color: #ff5c2d;">{{ t('redE.g_g2') }}</view>
					<view class="text_center f40 text_bold failWord" style="color: #ff5c2d;padding: 0 100rpx;">
						{{ t('redE.g_g4') }}
					</view>
					<view class="close">
						<image src="/static/act/egg/close.png" mode="widthFix" style="width: 60rpx;height: 60rpx;"
							@click="closeMask"></image>
					</view>
				</view>
				<view class="pop-btn " @click="closeMask">{{ t('all.a_c2') }}</view>
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
const back = () => {
	history.back()
}
const showLoading = ref(null);
const userData = ref({
	num: 0
});
const jumpPage = (url) => {
	uni.navigateTo({
		url
	})
}
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
const getData = () => {
	request({
		url: 'activity/lottery/info',
		methods: 'get',
		data: {
			type: 2
		}
	}).then((res) => {
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
				prizeImg: item.full_cover,
				type: item.type
			};
		});

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

// 转盘上要展示的奖品数据
const prizeList = ref([]);
const maskUrl = ref("")
let count = ref(0)
const isWin = ref(false)
const eggClick = () => {
	request({
		url: 'activity/lottery/lottery',
		methods: 'post',
		data: {
			type: 2
		}
	}).then(res => {
		let obj = prizeList.value.filter(item => {
			return item.id == res.prize_id
		})
		if (obj[0].type == 3) {
			isWin.value = false
		} else {
			isWin.value = true
			maskUrl.value = obj[0]
		}
		popShow.value = true
		// 
	}).catch(err => {
		uni.showToast({
			title: err.message,
			icon: 'none'
		})
	})
}

const eggClickNone = () => {
	Toast.text(t('redE.g_g6'))
}

const closeMask = () => {

	window.location.reload()

}
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
// .bgContent {
// 	background: url('/static/egg/bg.png') no-repeat 100%/100%;
// 	height: 100vh;
// 	width: 100vw;
// }

.bgShowWin {
	margin-top: 300rpx;
	background: url('/static/act/egg/success.png') no-repeat 100%/100%;
	height: 600rpx;
	width: 650rpx;
	position: relative;
}

.bgShowFail {
	margin-top: 300rpx;
	background: url('/static/act/egg/fail.png') no-repeat 100%/100%;
	height: 600rpx;
	width: 650rpx;
	position: relative;

	.failWord {
		position: absolute;
		bottom: 50rpx;
		padding: 0 20rpx;
		text-align: center;
	}
}

.close {
	position: absolute;
	top: 0;
	right: -10rpx;
}

.pop-btn {
	width: 300rpx;
	height: 100rpx;
	background: url('/static/act/egg/botBtn.png') no-repeat 100%/100%;
	color: #b7770e;
	text-align: center;
	line-height: 100rpx;
}

.topList {
	display: flex;
	align-items: center;
	justify-content: space-between;

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



.desc {
	background: #1c1c50;
	border-radius: 20rpx;
	padding: 40upx;
	color: #fff;
}
</style>
