<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('recharge.r_r1')"></topNav>
		<view class="pdlr45 mt70">

			<view class="mt55">
				<view class="topBox center flex-col">
					<view class="topItem f26">{{ t('all.b_b1') }}</view>
					<view class="mt35 f55" style="color: #fff;">{{ currency }} {{ user.balance }} </view>
				</view>

				<view class="mt40 inputItem">
					<text>{{ currency }}</text>
					<view class="pl35">
						<input type="number" :focus="true" :placeholder="t('recharge.r_r2')" placeholder-class="f30 plo"
							v-model="inpVal" @input="inpHandle">
					</view>
				</view>
				<view class="f20 mt30 " style="color: #fff;">
					*{{ t('recharge.r_r9') }}
					{{ bankNameList[nameInd] ? bankNameList[nameInd].min + "-" + bankNameList[nameInd].max : 0 }}
				</view>


				<view v-if="bankNameList.length > 0">
					<view class=" mt54 f34 " :style="{ color: store.$state.secondColor }">
						{{ t('recharge.r_r4') }}
					</view>

					<view class="mainBox mt40">
						<view class="chooseItem" v-for="(item, index) in bankNameList"
							:style="nameInd == index ? choStyle : noStyle" @click="nameInd = index">
							{{ item.alias }}
						</view>
					</view>
					<!-- nameInd >-1 -->
					<view v-if="false">
						<view class=" mt54 f34 " :style="{ color: store.$state.secondColor }">
							{{ t('recharge.r_r5') }}
						</view>

						<view class="mainBox mt35">
							<view class="chooseItem" v-for="(item, index) in bankNameList[nameInd].buttons"
								:style="numInd == index ? choStyle : noStyle" @click="changeInpVal(index, item)">
								{{ item }}
							</view>
						</view>
					</view>


					<view v-if="nameInd > -1 && bankNameList[nameInd].way.length > 0">
						<view class=" mt54 f34 " :style="{ color: store.$state.secondColor }">
							{{ t('recharge.r_r5') }}
						</view>

						<view class="mainBox mt35">
							<view class="chooseItem" v-for="(item, index) in bankNameList[nameInd].way"
								:style="wayInd == index ? choStyle : noStyle" @click="wayInd = index">
								{{ item.name }}
							</view>
						</view>
					</view>
				</view>

				<!-- <view class="btns" :style="inpVal>0 && nameInd>-1? choStyle:noStyle" @click="submitHandle">
					{{t('wr.r_r3')}}
				</view> -->

				<view class=" center l_inpS mt40 l_inpBg pdlr30 color0 f32" style="margin-top:114rpx"
					:style="{ background: store.$state.secondColor }" @click="submitHandle">
					{{ t('recharge.r_r6') }}
				</view>
				<view class='mt40' v-html='pageDatas?.other_txt'>

				</view>
			</view>
			<view style="height: 100rpx;"></view>
			<Loading ref="showLoading"></Loading>
		</view>
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

	const choStyle = {
		background: store.$state.secondColor,
		boxShadow: "none ",
		color: '#000'
	}
	const noStyle = {
		color: store.$state.contentColor
	}


	const showLoading = ref(null)
	const nameInd = ref(-1)
	const numInd = ref(-1)
	const wayInd = ref(-1)
	const bankNameList = ref([

	])
	const user = ref({})
	const pageData = ref({})
	const inpVal = ref("")



	const inpHandle = e => {

		if (nameInd.value == -1) {
			return false
		} else {
			bankNameList.value[nameInd.value].buttons.forEach((item, index) => {
				if (item !== e.detail.value) {
					numInd.value = -1
				}
			})
		}
	}
	const changeInpVal = (index, item) => {
		numInd.value = index
		inpVal.value = item
	}
	const pageDatas = ref()
	const getData = () => {
		request({
			url: 'finance/bank/recharge/index',
			methods: 'get',
		}).then(res => {
			bankNameList.value = res.channels
			user.value = res.user
			pageDatas.value = res
		})
	}


	const submitHandle = () => {


		showLoading.value.loading = true
		const formData = {
			amount: inpVal.value,
			balance_type: balance_type.value,
			channelId: bankNameList.value[nameInd.value]?.id,
			way: bankNameList.value[nameInd.value]?.way.length > 0 ? bankNameList.value[nameInd.value]?.way[wayInd
				.value]?.id : 0,

		}
		request({
			url: '/finance/bank/recharge/submit',
			methods: 'post',
			data: formData
		}).then(res => {
			showLoading.value.loading = false
			let data = res
			if (data.is_post == 0) {
				window.location.href = data.native_url;
			} else if (data.is_post == 1) {
				const div = document.createElement('div');
				let inputHtml = "";
				let params = data.params;
				for (let key in data.params) {
					inputHtml += `<input name="${key}" value="${params[key]}" type="hidden" />`;
				}
				let myHtml = `<form method="post" action='${native_url}'>
			 		                            ${inputHtml}
			 		                        </form>`;
				div.innerHTML = myHtml;
				document.body.appendChild(div);
				document.forms[0].submit();
			} else if (data.is_post == 2) {
				uni.navigateTo({
					url: "/pages/clabe/clabe?clabe=" + data.native_url + "&amount=" + data
						.verify_money
				})
			}

		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})

	}
	const currency = uni.getStorageSync('currency')

	const balance_type = ref()
	onLoad(e => {
		if (e.balance_type) {
			balance_type.value = e.balance_type
		}


	})
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.topBox {
		width: 100%;
		height: 350rpx;
		background: url('/static/themeNum1/img/balanceBg.png') no-repeat 100%/100%;
	}

	.topItem {
		padding: 0 34rpx;
		height: 60rpx;
		background: #fff;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		color: #000;
	}

	.inputItem {
		height: 115rpx;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #000;
		padding-left: 40rpx;
		// box-shadow: 0px 1px 51px 0px rgba(64,46,197,0.05);
	}

	.mainBox {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;

		.chooseItem {
			width: 90%;
			background-color: #262626;
			box-shadow: 0 0 10rpx 1rpx #ccc inset;
			height: 100rpx;
			border-radius: 15rpx;
			margin-bottom: 20rpx;
			text-align: center;
			line-height: 100rpx;
		}
	}

	.btns {
		margin-top: 100rpx;
		// box-shadow: 0px 11px 47px 4px rgba(247, 175, 64, 0.35);
		height: 120rpx;
		background-color: #fff;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}
</style>