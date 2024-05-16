<template>
	<view>
		<kefu></kefu>
		<topNav :title="t('mine.m_d1')"></topNav>
		<view class="pdlr30 mt50">
			<view class="flex between" style="border-bottom: 2rpx solid #ddd;">
				<view class="topItem " v-for="(item,index) in types" :class="index == typeInd?'choStyle':''"
					@click="changeType(item,index)">
					{{item.name}}
				</view>
			</view>

			<view class="mt40 f24">

				<z-paging class="" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="true"
					:use-page-scroll="false" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
					:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="'No more data'"
					:loading-more-no-more-text="'No more data'" :empty-view-reload-text="'Click to load more'"
					:loading-more-loading-text="'Loading'" :loading-more-fail-text="'Please Refresh'"
					:loading-more-default-text="'Click to load more'" style="width: 90%;margin: 300rpx 5%  0 5%;">


					<view class="listItem mb20" v-for="(item, index) in recordsList" :key="index">
						<view class="vvItem">
							<view class="f26">{{t('mine.m_d2')}}</view>
							<view class="error">
								{{index +1}}
							</view>
						</view>

						<!-- <view class="vvItem">
							<view class="f26">{{t('mine.m_d3')}}</view>
							<view class="">
								{{item.level}}
							</view>
						</view> -->

						<view class="vvItem">
							<view class="f26">{{t('mine.m_d4')}}</view>
							<view class="" v-if="pages.level==1">
								{{item.phone}}
							</view>
							<view class="" v-else>
								{{item.filter_phone}}
							</view>
						</view>

						<view class="vvItem">
							<view class="f26">{{t('mine.m_t11')}}</view>
							<view class="">
								{{item.total_recharge}}
							</view>
						</view>
					</view>
				</z-paging>
			</view>
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
	// import {
	// 	Toast
	// } from '@nutui/nutui';
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

	const types = [
		// {
		// 	name: t('mine.m_d6'),
		// 	value: '0'
		// },
		{
			name: t('mine.m_t7'),
			value: '1'
		},
		{
			name: t('mine.m_t8'),
			value: '2'
		},
		{
			name: t('mine.m_t9'),
			value: '3'
		},
	]
	const typeInd = ref(0)

	const changeType = (item, index) => {
		typeInd.value = index
		pages.value.level = item.value
		paging.value.clean()
		getData(1)
	}

	const paging = ref(null)
	const recordsList = ref([])
	const pages = ref({
		page: 1,
		size: 10,
		level: '1'
	})
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'user/record/team/user',
			data: pages.value
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
	}
</script>

<style lang="scss" scoped>
	.choStyle::after {
		display: block;
		position: absolute;
		content: '';
		bottom: 0;
		width: 100%;
		height: 2rpx;
		background-color: #52fcff;
	}

	.choStyle {
		color: #52fcff;
		font-weight: bold;
		transition: .1s linear all;
	}

	.topItem {
		transition: .1s linear all;
		padding: 24rpx 0;
		border-radius: 20rpx;
		width: 23%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.table_head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 27rpx 11rpx;

		view {
			width: 25%;
			text-align: center;
			line-height: 100%;
		}
	}

	.botTable {
		.table_head {
			border-bottom: 1rpx solid #eee;
		}
	}
</style>