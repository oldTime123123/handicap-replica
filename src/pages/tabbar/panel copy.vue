<template>
	<view class="pinelBg">
		<view class="flex between topNav">
			<view style="width: 44rpx;">
			</view>
			<view class="f36 text_white" style="font-weight: 500;">
				{{t('add3.a_a13')}}
			</view>
			<view>
			
			</view>
		</view>
		<view class="pdlr50 pt3">

			<view class="commBox">
				<view class="center commItem" style="border-right: 1rpx solid #eee;">
					<image src="/static/themeNum1/icon/p_2.png" mode="widthFix"
						style="width:50rpx ; height: 50rpx;"></image>
					<view class="mglr27 " style="text-align: left;">
						<view class="f20">{{t('other.o_p2')}}</view>
						<view class="mt15  f35 text_bold" :style="{color:store.$state.contentColor}">
							{{profitData.today_profit}}
						</view>
					</view>
				</view>
				<view class="center  commItem">
					<image src="/static/themeNum1/icon/p_1.png" mode="widthFix"
						style="width:50rpx ; height: 50rpx;"></image>
					<view class="mglr27 " style="text-align: left;">
						<view class="f20">{{t('other.o_p3')}}</view>
						<view class="mt15  f35 text_bold" :style="{color:store.$state.contentColor}">
							{{profitData.total_profit}}
						</view>
					</view>
				</view>
			</view>


		</view>

		<view class="  botList" style="margin-top:300rpx">
			<view class=" ">
				<z-paging class="" ref="paging" v-model="recordsList" @query="getBotList" width="100%" :fixed="false"
					:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
					:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('rec.r_a1')"
					:loading-more-no-more-text="t('rec.r_a1')" :empty-view-reload-text="t('rec.r_a2')"
					:loading-more-default-text="t('rec.r_a2')" :loading-more-loading-text="t('rec.r_a3')"
					:loading-more-fail-text="t('rec.r_a4')">
					<view class="proItem mb40 l_inpBg" v-for="(item,index) in recordsList"
						:class="item.status == 1?'p_normal':item.status == 2 || item == 4?'p_frozen':'p_fix'">
						<view class="flex">
							<view style="height: 220rpx;width: 220rpx; border-radius: 20rpx;" class="center">
								<image :src="item.project.poster"
									style="width: 220rpx; height:220rpx;border-radius:20rpx"></image>
								<!-- poster -->
								<!-- {{item.project?.title}} -->
							</view>
							<view class="mglr21" style="flex: 1;">
								<view class="textHiddenThree text_white" style="width: 100%;word-break: break-all;">
									{{item.project?.title}}
									<!-- 2ashdkasdasdasdajklsdhajklsdhkjajdklajsdla;jsd;lkajskld;ajsjashdkjashdkasjdhakjasdasdsdjkdh -->
								</view>
							<!-- 	<view v-if="item.project?.sign_type== 1">
								<view class="mt30 f28" style="display: flex; flex-direction: row-reverse;">
									<view v-if="item.status == 1 "
										@click.stop="handleToPage('../construct/sign?id='+item.id)"
										style="background-color: #f6dc98;color: #000;padding: 5rpx 30rpx;border-radius: 10rpx;">
										{{t('other.o_p9')}}
									</view>

									<view v-else @click.stop="handleToPage('../construct/sign?url='+item.contract)"
										style="background-color: #f6dc98;color: #000;padding: 5rpx 30rpx;border-radius: 10rpx;">
										{{t('other.o_p10')}}
									</view>
								</view> -->
								
								<view v-if="item.project.sign_type == 1 ">
									<view class="flex" v-if="item.status == 1">
										<view class="mt44   " v-if="!item.contract"  style="background-color: #51FDFE;color: #000;padding: 5rpx 30rpx;border-radius: 10rpx;"
											@click.stop="handleToPage('../construct/sign?id='+item.id)">
											{{t('other.o_p9')}}
										</view>
										<view class="mt44   " v-else  style="background-color: #51FDFE;color: #000;padding: 5rpx 30rpx;border-radius: 10rpx;"
											@click.stop="handleToPage('../construct/sign?url='+item.contract)">
											{{t('other.o_p10')}}
										</view>
									</view>
								</view>
								</view>

							</view>
						<!-- </view> -->


						<view class="text_white">
							<view class="mt30 between f22">
								<view> {{t('add3.a_a12')}}</view>
								<view>Graphics </view>
							</view>

							<view class="mt30 between f22">
								<view> ID</view>
								<view>{{item.order_no}}</view>
							</view>

							<view class="mt30 between f22">
								<view> {{t('add3.a_a11')}}</view>
								<view>{{item.createTime}}</view>
							</view>

							<view class="mt30 between f22">
								<view> {{t('add3.a_a10')}}</view>
								<view>{{item.size}}</view>
							</view>
						</view>
						<view v-if="item.status == 1">
							<view v-if=" item.task_status !== 3" class="mt30">
								<view class="lightBtn" @click="showBuyAi = true"
									style="width: 100%;height: 60rpx;line-height: 60rpx;">
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									{{t('add3.a_a9')}}
									<!--  need buy  -->
								</view>
							</view>
							<!--  -->
							<view v-if=" item.task_status !== 3">
								<view class=" center l_inpS  l_inpBg pdlr30  f32 mt30"
									:style="{background:store.$state.secondColor,color:'#000'}"
									@click="handleToPage('../task/index?id='+item.id)">
									{{t('add3.a_a8')}}
									<!-- no buy  shou dong  task_status  0 2  待完成  1 待审核  3 已完成 -->
								</view>
							</view>
							
							<view style="width: 100%;" class="mt30 l_inpBg" v-if=" item.task_status !== 3">
								<view class="lightBtn" style="width: 100%;height: 60rpx;line-height: 60rpx;">
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									<span class="light"></span>
									{{t('add3.a_a7')}}
									<!-- buy  and  task can't receive' -->
								</view>
							</view>
							<!-- 0未领取  1已领取 -->
							<view class="custom-btn btn-15" v-if="item.task_status ==3 && item.get_profit_status == 1 && item.receive_status == 0 "
							 @click="receiveHandle(item)">
										{{t('other.o_p5')}}
							</view>
						</view>
					</view>
				</z-paging>
			</view>

		</view>

		<!-- 弹窗 -->
		<nut-overlay v-model:visible="show" :overlay-style="{background:'rgba(0,0,0,0.3)'}"
			:close-on-click-overlay="false">
			<div class="wrapper">
				<img src="https://api.ai-crown.com/upload/1.gif" mode="widthFix" style="width: 710rpx;" />
				<view class=" center l_inpS  l_inpBg pdlr30 text_white f32"
					:style="{background:store.$state.secondColor,color:'#000'}" @click="closeHandle">
					{{t('other.o_a6')}}
				</view>
			</div>

			<div class="wrapper">
				<!-- <image src="../../static/themeNum1/img/shouyeMask.png" mode="widthFix" style="width: 710rpx;"></image> -->
				<view class=" center l_inpS  l_inpBg pdlr30 text_white f32"
					:style="{background:store.$state.secondColor,color:'#000'}" @click="closeHandle">
					{{t('other.o_a6')}}
				</view>
			</div>
		</nut-overlay>
		<tqbTabbar :activeIndex="2"></tqbTabbar>
		<Loading ref="showLoading"></Loading>



	</view>
</template>

<script setup>
	import tqbTabbar from "@/components/botTabbar/botTabbar.vue"
	import request from '../../../comm/request.ts';
	import Charts from '@/components/charts/charts.vue'
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
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
	import {
		Toast
	} from "@nutui/nutui";
	const store = userStore();

	const {
		t
	} = useI18n()

	const statusInd = ref(0)
	const canBuy = ref(null)
	const statusList = ref([
		'ALL',
		'Uncompleted',
		'Pending',
		'Completed',
	])
	const changeStatusHandle = ind => {
		statusInd.value = ind
	}

	const showBuyAi = ref(false)
	const show = ref(false)
	const showLoading = ref(null)

	const tableData = ref([])
	const xZuo = ref([])

	const handleToPage = (url) => {
		uni.navigateTo({
			url
		})
	}

	const goInfo = (id) => {
		uni.navigateTo({
			url: '../record/investRecord?id=' + id
		})
	}

	const profitData = ref({})
	const machineData = ref({})
	const recordsList = ref([])
	const canGetFit = ref(false) //是否可以领取收益
	const shouyiTime = ref("") //是否可以领取收益
	const aiInfo = ref({})
	const getData = () => {
		// 矿机信息
		request({
			url: 'machine/index',
			methods: 'get',
			data: {}
		}).then(res => {
			shouyiTime.value = res.daily_refresh
			profitData.value = res.profit
			machineData.value = res.machine
			res.get_profit_status == 1 ? canGetFit.value = true : canGetFit.value = false
		})
		// 矿机信息
		request({
			url: 'user/aiInfo',
			methods: 'get',
			data: {}
		}).then(res => {
			aiInfo.value = res
		})
	}
	const pages = ref({
		page: 1,
		size: 10
	})
	const closeHandle = () => {
		window.location.reload()
	}
	const paging = ref(null)
	const getBotList = (page) => {
		pages.value.page = page
		request({
			url: 'machine/list',
			methods: 'get',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.list.data);
			pages.value.page += 1
		})
	}
	const receiveHandle = (item) => {
		showLoading.value.loading = true
		request({
			url: '/invest/getProfit',
			methods: 'post',
			data: {
				investId: item.id
			}
		}).then(res => {
			showLoading.value.loading = false
			show.value = true
		}).catch(e => {
			Toast.text(e.message)
			showLoading.value.loading = false
		})
	}

	const buyAiHandle = () => {
		showLoading.value.loading = true
		request({
			url: 'user/buyAi',
			methods: 'post',
		}).then(res => {
			Toast.text(t('add3.a_a6'))
			showBuyAi.value = false
			showLoading.value.loading = false
			getData()
			paging.value.clean()
			getBotList(1)
		}).catch(e => {
			Toast.text(e.message)
			showLoading.value.loading = false
		})
	}
	onShow(() => {
		// show.value = true
		getData()
	})
	const currency = uni.getStorageSync('currency')
	// 终于可以用了
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
	})
</script>

<style lang="scss" scoped>
	.rightGif {
		position: fixed;
		right: 0;
		top: 400rpx;
		z-index: 999;
		// background:rgba(255,255,255,0.1);
	}

	.showAiWarr {
		display: flex;
		height: 100%;
		align-items: center;
		flex-direction: column;

		.content {
			position: relative;
			margin-top: 30rpx;
			width: calc(100% - 200rpx);
			height: 575rpx;
			padding-top: 350rpx;
			padding-left: 50rpx;
			padding-right: 50rpx;
			background: url('/static/themeNum1/img/aiBuy.png') no-repeat 100%/100%;
			text-align: center;
			color: #fff;
			.buyBtn {
				position: absolute;
				bottom: 0;
				height: 100rpx;
				width: 100%;
				left: 0;
				border-radius: 0 0 30rpx 30rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 34rpx;
				font-weight: bold;
				background: linear-gradient(#51FDFE, #4f8dff);
			}
		}

	}

	.pinelBg {
		background: url('/static/themeNum1/img/pinel.png') no-repeat 100%/100%;
		background-color: #03126f !important;
		min-height: 100vh;
		background-position: top;
		text-transform: none;
		background-size: 100%;
		// bac
		// background-attachment: fixed;
	}

	// .p_normal {
	// 	background-color: #e4ffd0;
	// }

	// .p_frozen {
	// 	background-color: #ffebdd;

	// }

	// .p_fix {
	// 	background-color: #e3e0e0;

	// }

	.tag_pass {
		border: 1rpx solid #16b739 !important;
		color: #16b739;
	}

	.tag_error {
		border: 1rpx solid #ffa115 !important;
		color: #ffa115;
	}

	.topNav {
		height: 88rpx;
		padding: 0 30rpx;
	}

	.commBox {
		padding: 43rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		border-radius: 30rpx;
		margin-top: 20rpx;
		background: linear-gradient(0deg, #0A6ED9 0%, #50FDFF 100%);
			}

	.color9 {
		color: #999;
		font-size: 20rpx;
	}

	.commItem {
		width: 50%;
	}

	.botList {
		margin-top: -100rpx;
		border-radius: 40rpx 40rpx 0 0;
		padding: 30rpx 30rpx 200rpx 30rpx;

		.typeList {
			background-color: #262626;
			padding: 25rpx 22rpx;
			border-radius: 20rpx;
			border: 4rpx solid #F4D891;

			.statusItem {
				// padding: 45rpx 27rpx;
				padding: 5rpx 20rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}

			.statusActItem {
				background: linear-gradient(0deg, #DFB857 0%, #FFEAB1 100%);
				border-radius: 10rpx;
				color: #000;
				// padding: 27rpx 45rpx;
			}
		}

	}

	.lineItem {
		background: #FFEDD2;
		border-radius: 10rpx;
		color: #FFA115;
		width: 48%;
		padding: 30rpx 0;
		font-size: 30rpx;
		font-weight: bold;
	}

	.proItem {
		// background: url('/static/themeNum1/img/itemBg.png') no-repeat 100%/100%;
		// background-color: #262626;
		padding: 40rpx 40rpx 20rpx 40rpx;
		margin: 25rpx 0;
		// box-shadow: 0rpx 1rpx 20rpx 1rpx rgba(197, 197, 197, 0.35);
		border-radius: 20rpx;

		.l_inpS {
			height: 100rpx;
		}
	}



	.normal {
		color: #16B739;
	}

	.error {
		color: #FD6260;
	}

	.info {
		color: #FFA116;
	}

	.tags {
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 14rpx 24rpx;
		font-size: 20rpx;
	}

	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.l_inpS {
			width: 450rpx;
			border-radius: 80rpx;
			margin-top: -70rpx;
			z-index: 99;
			height: 95rpx;
		}

		.content {
			display: flex;
			width: calc(100% - 100rpx);
			height: 530rpx;
			border-radius: 30rpx;
			align-items: center;
			justify-content: center;
			color: red;
		}
	}
</style>
