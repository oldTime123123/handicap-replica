<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>

		<topNav :title="t('construct.c_s8')"></topNav>
		<view class="pdlr30 mt50">
			<view class="topBox">
				<view class="f26">{{ pageData.title }}</view>

				<view class="mt20">
					<nut-image width="100%" height="150" :src="pageData.full_banner" style="border-radius: 20rpx;"
						showLoading>
						<template #loading>
							<nut-icon name="loading"></nut-icon>
						</template>
					</nut-image>
				</view>

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

				<view style="width:100% ; " class="mt29 flex col_center pdlr"
					v-if="!isPre && pageData.is_progress == 1">
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
							<view class=" color9 f24 textHiddenOne">{{ t('add3.a_a14') }}</view>
						</view>
					</view>
					<view class="between mt23">
						<view class="center flex_col">
							<view class="text_bold f28">{{ pageData.per_panel }}</view>
							<view class=" color9 f24 textHiddenOne">{{ t('add3.a_a14') }}</view>
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

			<view class="botBtn color0" v-if="isPre">

				<view class="btns paid " :style="{ background: store.$state.secondColor }" @click="showMaskHandle"
					v-if="canBuy">
					{{ t('construct.c_c13') }} <text style="color:#000">{{ pageData.price_per }} {{ currency }}</text>
				</view>
				<view class="btns paid " v-else>
					{{ t('construct.c_c14') }} {{ pageData.price_per }} {{ currency }}
				</view>


			</view>
			<view v-else class="botBtn color0">

				<view class="btns paid color0" v-if="pageData.status == 3">
					{{ t('construct.c_c14') }} {{ pageData.price }} {{ currency }}
				</view>

				<view class="btns paid " :style="{ background: store.$state.secondColor }" @click="showMaskHandle" v-else>
					{{ t('construct.c_c15') }}

					<text style="color:#000">{{ pageData.price }} {{ currency }}</text>
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
						<view class="" :style="{ background: store.$state.secondColor, color: '#000' }"
							@click="confirmHandle">
							{{ t('all.a_c2') }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>


		<nut-overlay v-model:visible="showGorecharge">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{ t('all.a_t1') }}</view>
					<view class="f30 mt20 text_center textHiddenTwo" style="line-height: 45rpx;">
						{{ t('construct.c_c17') }}
					</view>

					<view class="between">
						<view style="border: 1rpx solid;"
							:style="{ 'border-color': store.$state.contentColor, color: store.$state.contentColor }"
							@click="showGorecharge = false">

							{{ t('all.a_c1') }}


						</view>
						<view class="" :style="{ background: store.$state.secondColor, color: '#000' }"
							@click="jumpPage('../recharge/index')">
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
import kefu from "@/components/kefu/kefu.vue"

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

const showGorecharge = ref(false)
const showMaskHandle = () => {
	if (isPre.value) {
		if ((userData.value.balance - 0) < (pageData.value.price_per - 0)) {
			showGorecharge.value = true
			return false
		}
		loginOutMask.value = true

	} else {
		if (pageData.value.max_invest_per == 0) {
			Toast.text(t('add1.a_a3'))
			return false
		}
		if ((userData.value.balance - 0) < (pageData.value.price - 0)) {
			showGorecharge.value = true
			return false
		}
		loginOutMask.value = true
	}
}
const confirmHandle = () => {
	// sign_type

	if (isPre.value) {

		// 预购项目
		try {
			showLoading.value.loading = true
			request({
				url: 'invest/investPre',
				methods: 'post',
				data: {
					projectId: infoId.value,
					num: 1
				}
			}).then(res => {
				showLoading.value.loading = false
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
				showLoading.value.loading = false
				Toast.text(e.message)
			})
		} catch (e) {
			//TODO handle the exception
		}
	} else {

		// 非预购项目
		// isPre
		try {
			showLoading.value.loading = true
			request({
				url: 'invest/invest',
				methods: 'post',
				data: {
					projectId: infoId.value,
					num: 1
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
		} catch (e) {
		}
	}
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

	if (isPre.value) {
		// 预购项目
		try {
			showLoading.value.loading = true
			request({
				url: 'invest/projectPreDetail',
				methods: 'get',
				data: {
					id: infoId.value
				}
			}).then(res => {
				showLoading.value.loading = false
				pageData.value = res.project.project
				pageData.value.price_per = res.project.price_per

				res.is_buy == 0 ? canBuy.value = true : canBuy.value = false
				if (res.time < res.project.start_time) {
					// 未开始
					pageData.value.hasStart = 2
					timestamp.value = res.project.start_time - res.time
					startTimer()
				} else if (res.time > res.project.start_time) {
					// 进行中
					pageData.value.hasStart = 1
					timestamp.value = res.project.end_time - res.time
					startTimer()
				}
			}).catch(e => {
				showLoading.value.loading = false
			})
		} catch (e) {
			//TODO handle the exception
		}
	} else {
		// 非预购项目
		// isPre
		try {
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
		} catch (e) {
			//TODO handle the exception
		}


	}
	request({
		url: 'user/index',
		methods: 'get',

	}).then(res => {
		userData.value = res
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
 
})
onHide(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})
</script>

<style lang="scss" scoped>
.f28 {
	color: #51fcfe;
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
	padding: 0 50rpx;

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 350rpx;
		// background: #fff;
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
	background-color: #262626;
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
		background: #51fcfe;
		color: #000;
		text-align: center;
		padding: 30rpx 0;
		border-radius: 20rpx 20rpx 0 0;
	}

	.botIntro {
		background-color: #262626;
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
	background: #FD6260;
	border-radius: 55rpx;
	text-align: center;
	line-height: 110rpx;
	margin-top: 120rpx;
	font-size: 30rpx;
}

.paid {
	background-color: #50FDFF;
}
</style>
