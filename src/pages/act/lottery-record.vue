<template>
	<topNav :title="t('newAct.l_l5')"></topNav>
	<view class="content">
		<view class="item flex pdtb20 pdlr20" v-for="item in list">
			<image :src="item.gift.cover" mode="aspectFit" style="height: 100px; width: 100px"></image>
			<view class="flex-col between pdtb10 pdlr20 " style="align-items: flex-start; flex-grow: 1;">
				<view><span style="color: #666;">{{ t('newAct.l_l6') }}: </span>{{ item.gift.name }}</view>
				<view><span style="color: #666;">{{ t('newAct.l_l7') }}: </span>{{ item.gift.gift_price }}{{ currency }}
				</view>
				<view class="f24" style="text-align: right;">{{ item.createTime }}</view>
			</view>

		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
import request from '../../../comm/request.ts';
let currency = localStorage.getItem('currency')
import {
	useI18n
} from 'vue-i18n';

const {
	t
} = useI18n();
let list = ref([]);
const getData = () => {
	request({
		url: 'activity/lottery/log',
		methods: 'get'
	}).then((res) => {
		console.log(res);
		list.value = res.data;
	});
};

onMounted(() => {
	getData();
});
onLoad(() => {
 
})
</script>

<style lang="scss">
.content {
	margin: 24rpx;
	background-color: #fff;
}
</style>
