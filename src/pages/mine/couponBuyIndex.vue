<template>
	<view style="background: #060D1F">
		<topNav :title="t('construct.c_s8')"></topNav>
		<view class="pdlr30 mt50">
			<view class="topBox">
				<view class="f26">{{ pageData.title }}</view>

				<nut-image width="100%" height="150" :src="pageData.full_banner" style="border-radius: 20rpx;"
					showLoading>
					<template #loading>
						<nut-icon name="loading"></nut-icon>
					</template>
				</nut-image>

				<view class="mt27 center" style="color: #FE6260;line-height: 35rpx;"
					v-if="isPre && pageData.hasStart == 1">
					<view class="f26">{{ t('construct.c_c1') }}:</view>
					<view class="f40">
						{{ showTime }}

					</view>
				</view>
				<view class="mt27 center" style="color: #FE6260;line-height: 35rpx;"
					v-if="isPre && pageData.hasStart == 2">
					<view class="f26">{{ t('construct.c_c2') }}:</view>
					<view class="f40">
						{{ showTime }}
					</view>
				</view>

				<view style="width:100% ; " class="mt29 flex col_center pdlr" v-if="!isPre">
					<view style="width:400rpx">
						<nut-progress style="height: 28rpx;"
							:percentage="Number(((pageData.sale_panel > pageData.total_panel ? pageData.total_panel : pageData.sale_panel) / pageData.total_panel * 100).toFixed(2))"
							:is-show-percentage="true" :text-inside="false" :text-color="store.$state.contentColor"
							:stroke-color="store.$state.contentColor" />
					</view>
					<view class="f20 mglr23">
						{{ (pageData.sale_panel > pageData.total_panel) ? pageData.total_panel : pageData.sale_panel
						}}/{{ pageData.total_panel }}
					</view>
				</view>
				<view class="mt26 pt34" style="border-top: 1rpx solid #eee;">
					<view class="between">
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.profit_per }}</view>
							<view class=" color9 f24 textHiddenOne">{{ t('construct.c_c3') }}</view>
						</view>
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.period }}</view>
							<view class=" color9 f24 textHiddenOne">
								{{ pageData.is_experience == 1 ? t('construct.c_c4') : t('construct.c_c5') }}
							</view>
						</view>
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.price }}</view>
							<view class=" color9 f24 textHiddenOne">{{ t('construct.c_c6') }}</view>
						</view>
					</view>
					<view class="between mt23">
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.per_panel }}</view>
							<view class=" color9 f24 textHiddenOne">{{ t('construct.c_c7') }}</view>
						</view>
						<view class="center flex_col">
							<view class="text_bold f28 textHiddenOne" style="width: 100%;">
								{{ pageData.is_experience == 1 ? t('construct.c_c8') : t('construct.c_c9') }}
							</view>
							<view class=" color9 f24 textHiddenOne">{{ t('construct.c_c10') }}

							</view>
						</view>
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.max_invest_per }}</view>
							<view class=" color9 f24  textHiddenOne">{{ t('construct.c_c11') }}</view>
						</view>
					</view>
				</view>

			</view>

			<!--  -->
			<view class="botBox mt60">
				<view class="title">{{ t('construct.c_c12') }}</view>
				<view class="botIntro desc">
					<view v-html="pageData.content"></view>
				</view>
			</view>

			<!-- Coupon -->
			<view class="mt30">
				<view class="text_bold">{{ t('newAct.c_l10') }}</view>
				<view class="between" style="flex-wrap: wrap;word-break: normal;">
					<view class="couponItem between mt30" v-for="(item, index) in myCouponList" :key="index"
						:class="item.isUsed ? 'couponItemCho' : ''" @click="changeItemCouponUseStatus(item, index)">
						<view class="pl30">
							<view class="">{{ t('newAct.c_l3') }} <text style="color: #E93337;">{{ item.price }}:
									{{ currency }}</text>
							</view>

						</view>
						<view class="pr30" style="width:60rpx;height: 60rpx;position: absolute;right:0;bottom:-10rpx;"
							size="30">
							<IconFont name="Check" v-if="item.isUsed" color="#E93337"></IconFont>
						</view>
					</view>
				</view>
			</view>

			<view class="botBtn">


				<view class="btns paid text_white"
					:style="youhuiNum == 0 ? { background: store.$state.contentColor } : { background: '#ccc' }"
					@click="showMaskHandle">
					{{ t('construct.c_c15') }}

					<text style="color:#FFA115">{{ youhuiNum }} {{ currency }}</text>
				</view>
			</view>

		</view>

		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{ t('all.a_t1') }}</view>
					<view class="f30 mt20">
						{{ t('construct.c_c16') }}
					</view>

					<view class="between">
						<view style="border: 1rpx solid;"
							:style="{ 'border-color': store.$state.contentColor, color: store.$state.contentColor }"
							@click="loginOutMask = false">{{ t('all.a_c1') }}
						</view>
						<view class="text_white" :style="{ background: store.$state.contentColor }" @click="confirmHandle">
							{{ t('all.a_c2') }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>



		<view style="height: 200rpx;"></view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import topNav from "@/components/topNav/topNav.vue"
import request from '../../../comm/request.ts';
import {
	userStore
} from "@/store/themeNum.js";
// import {
// 	Toast
// } from '@nutui/nutui';
import {
	onShow,
	onLoad,
	onHide
} from "@dcloudio/uni-app";
import {
	computed,
	onMounted
} from "vue";
import {
	Toast
} from "@nutui/nutui";
const store = userStore();

import {
	useI18n
} from "vue-i18n";

const {
	t
} = useI18n();

const showLoading = ref(null)
const loginOutMask = ref(false)



const jumpPage = url => {
	uni.navigateTo({
		url
	})
}

const showMaskHandle = () => {
	if (pageData.value.max_invest_per == 0) {
		Toast.text(t('add1.a_a3'))
		return false
	}
	if (youhuiNum.value !== 0) {
		return false
	}
	loginOutMask.value = true
}

const confirmHandle = () => {
	let str = ""
	let useCouponList = []
	useCouponList = chooseNumlist.value.map(item => {
		return item.id
	})

	useCouponList = useCouponList.join(",")
	showLoading.value.loading = true
	request({
		url: 'invest/invest',
		methods: 'post',
		data: {
			projectId: infoId.value,
			num: 1,
			coupon: useCouponList
		}
	}).then(res => {
		Toast.text(t('construct.c_d1'))
		if (pageData.value.sign_type == 2) {
			uni.navigateTo({
				url: '../tabbar/panel'
			})
			return
		}
		uni.navigateTo({
			url: './sign?id=' + res.id
		})
	}).catch(e => {
		Toast.text(e.message)
		showLoading.value.loading = false
	})
	useCouponList = []
	getData()
}

const infoId = ref(0)
const pageData = ref({
	sale_panel: 0,
	total_panel: 1,
})
const isPre = ref(null) //是预购项目
const canBuy = ref(false) //是否可以购买

const timestamp = ref(0)
const timer = ref(null)
const showTime = ref("")
const userData = ref({}) //用户信息

const getData = () => {


	showLoading.value.loading = true
	request({
		url: 'invest/projectDetail',
		methods: 'get',
		data: {
			id: infoId.value
		}
	}).then(res => {
		showLoading.value.loading = false
		pageData.value = res.project
	}).catch(e => {
		showLoading.value.loading = false
	})

	request({
		url: 'user/index',
		methods: 'get',

	}).then(res => {
		userData.value = res
	}).catch(e => { })


	request({
		url: 'invest/couponLog',
		methods: 'get',

	}).then(res => {
		// myCouponList.value = res.data
		let data = res.data

		data.forEach(item => {
			item.isUsed = false
		})
		myCouponList.value = data
	}).catch(e => { })
}
const startTimer = () => {
	timer.value = setInterval(() => {
		if (timestamp.value === 0) {
			clearInterval(timer.value);
			getData()
		}
		timestamp.value--;
		const hours = Math.floor(timestamp.value / 3600);
		const minutes = Math.floor((timestamp.value % 3600) / 60);
		const seconds = timestamp.value % 60;
		showTime.value =
			`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}, 1000);
}

const chooseNumlist = ref([])
const youhuiNum = computed(() => {
	let num = 0
	chooseNumlist.value.forEach(item => {
		num += Number(item.price)
	})
	return pageData.value.price - num < 0 ? 0 : pageData.value.price - num
})
const myCouponList = ref([])
const changeItemCouponUseStatus = (item, index) => {
	if (chooseNumlist.value.indexOf(item) == -1) {
		chooseNumlist.value.push(item)
	} else {
		chooseNumlist.value.splice(chooseNumlist.value.indexOf(item), 1)
	}
	item.isUsed = !item.isUsed
}



onMounted(() => {
	getData()
})
const currency = ref("")
onLoad(e => {
	currency.value = uni.getStorageSync('currency')
	if (e.id) {
		infoId.value = e.id
		e.pre == 1 ? isPre.value = true : isPre.value = false
	} else {
		history.back()
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
onHide(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})
</script>

<style lang="scss" scoped>
.choosedCoupon {
	border: 3rpx solid #f04547;
}

.couponItem {
	width: 46%;
	height: 104rpx;
	border-radius: 30rpx;
	background-color: #ccc;
	// background: url('/src/static/coupon.png') no-repeat 100%/100%;
}

.couponItemCho {
	background-color: #e7fce1;
	position: relative;
}

.botBtn {
	position: fixed;
	bottom: 40rpx;
	width: 90%;
	left: 5%;
}

.flex_col {
	.text_bold {
		height: 60rpx;
	}

	.color9 {
		height: 60rpx;
	}
}

.wrapper {
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: 0 50rpx;

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 350rpx;
		background: #fff;
		border-radius: 20rpx;
		// justify-content: center;
		padding-top: 50rpx;
		position: relative;
		overflow: hidden;

		.between {
			position: absolute;
			bottom: 0;
			width: calc(100% - 80rpx);
			padding: 0 30rpx 40rpx;

			view {
				width: 48%;
				height: 96rpx;
				text-align: center;
				line-height: 96rpx;
				font-size: 30rpx;
				border-radius: 15rpx
			}
		}
	}
}

.topBox {
	padding: 30rpx 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	text-align: center;
}

.color9 {
	color: #999;
}

.between {
	.center {
		width: 33%;
	}
}

.botBox {
	text-align: center;

	.title {
		background: #E7FCE1;
		color: #7fc3dc;
		text-align: center;
		padding: 30rpx 0;
		border-radius: 20rpx 20rpx 0 0;
	}

	.botIntro {
		background-color: #fff;
		border-radius: 0 0 20rpx 20rpx;
		padding: 28rpx 40rpx;
		font-size: 22rpx;
		line-height: 42rpx;
		height: 400rpx;
		overflow: scroll;
		font-weight: 400;
	}
}

.btns {
	height: 110rpx;
	background: #FFA115;
	box-shadow: 0rpx 1rpx 8rpx 0rpx rgba(197, 197, 197, 0.35);
	border-radius: 55rpx;
	text-align: center;
	line-height: 110rpx;
	font-size: 30rpx;
}

.paid {
	background-color: #FFA115;
}
</style>
