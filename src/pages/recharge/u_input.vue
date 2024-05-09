<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('recharge.r_r1')"></topNav>
		<view class="pdlr45 mt70">
			<view class="f28">
				{{ t('recharge.r_r8') }}
			</view>

			<view class="inpBox mt34">
				<view class="flex pb30 col_center" style="border-bottom: 1rpx solid #eee;">
					<view class="text_center" style="width: 100rpx;">{{ currency }}</view>
					<input class="ml90 f36" type="number" placeholder="0" v-model="inputNum">
				</view>

				<view class="flex pb30 mt78 col_center" style="border-bottom: 1rpx solid #eee;">
					<view class="text_center" style="width: 100rpx;">USDT</view>
					<!-- <input class="ml90 f36" type="number" disabled style="color: #F65E5E;" v-model="numRate"> -->
					<view class="ml90 f36" style="color: #F65E5E;">
						{{ rateNum }}
					</view>
				</view>

				<view class="flex  mt44   f20">
					<view class="pdlr35 pdtb22 textHiddenOne"
						style="background:linear-gradient(90deg, #0A6FD8 0%, #0AD7B9 100%); color:#fff ; border-radius: 10rpx;">
						{{ t('recharge.r_r9') }} : {{ pageData.min + currency }} - {{ pageData.max + currency }}
					</view>
				</view>
			</view>


			<view class=" center l_inpS mt40 l_inpBg pdlr30 color0 f32" style="margin-top:214rpx"
				:style="{ background: store.$state.secondColor }" @click="goOrder">
				{{ t('all.a_c1') }}
			</view>

			<view class='mt40' v-html='pageData?.u_text'>

			</view>
		</view>
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
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const numRate = ref(0)
	const inputNum = ref("")
	const goOrder = () => {
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(`${t('mark.a6')}: ${pageData.value.min} - ${pageData.value.max}`)
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			goOrder1()
		}, 2000)
	}
	const goOrder1 = () => {
		showLoading.value.loading = true
		const data = {
			amount: inputNum.value,
			balance_type: balance_type.value
		}
		request({
			url: 'finance/usdt/recharge/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false


			if (pageData.value.recharge_count == 0) {
				try {
					window.AndroidEM.onEvent('first_recharge')
				} catch (e) {}
			} else {
				try {
					window.AndroidEM.onEvent('repeatedly_recharge')
				} catch (e) {}
			}
			uni.navigateTo({
				url: './usdtOrder?balance_type=' + balance_type.value
			})
		}).catch(err => {
			showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
	const rateNum = computed(() => ((inputNum.value ? inputNum.value : 0) * pageData.value.rate).toFixed(2))
	const showLoading = ref(null)
	const pageData = ref({
		rate: 1,
		min: 0,
		max: 0
	})
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (res.order) {
				uni.navigateTo({
					url: './usdtOrder'
				})
				return false
			}
			pageData.value = res
		})
	}
	const currency = ref("")

	const balance_type = ref()
	onLoad(e => {
		if (e.balance_type) {
			balance_type.value = e.balance_type
		}


	})
	// 终于可以用了
	onShow(() => {
		getData()
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.inpBox {
		padding: 76rpx 70rpx 50rpx 70rpx;
		background-color: #262626;
		border-radius: 20rpx;
	}
</style>