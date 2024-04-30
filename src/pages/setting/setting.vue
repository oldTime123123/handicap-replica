<template>
	<view class="normalBg" style="background: #060D1F">
		<topNav :title="t('setting.s_c1')"></topNav>
		<view class="pdlr45 mt70">

			<view v-for="item in list" @click="jumpPage(item.url)">
				<view class="listItem mb30" v-show="item.flag">
					<view class="flex col_center">
						<image :src="item.img" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
						<view class="mglr45">
							{{ item.name }}
						</view>
					</view>

					<IconFont v-if="curLang !== 'ar'" name="right" color="#fff"></IconFont>
					<IconFont v-else name="rect-left" color="#fff"></IconFont>
				</view>
			</view>
		</view>

		<nut-overlay v-model:visible="loginOutMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{ t('all.a_t1') }}</view>
					<view class="f30 mt40">
						{{ t('setting.s_c2') }}
					</view>

					<view class="between">
						<view style="border: 1rpx solid;"
							:style="{ 'border-color': store.$state.contentColor, color: store.$state.contentColor }">
							{{ t('all.a_c2') }}</view>
						<view class="color0" :style="{ background: store.$state.secondColor, color: '#000' }"
							@click="confirmHandle">
							{{ t('all.a_c1') }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
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
	onLoad
} from "@dcloudio/uni-app";
const store = userStore();
import {
	useI18n
} from "vue-i18n";
const {
	t
} = useI18n();
const loginOutMask = ref(false)
const confirmHandle = () => {
	uni.navigateTo({
		url: '../login/login'
	})
}
const list = ref([{
	name: t('setting.s_c3'),
	url: './set1',
	flag: false,
	img: "/static/themeNum1/setting/usdt.png"
},
{
	name: t('setting.s_c4'),
	url: './set2',
	flag: false,
	img: "/static/themeNum1/setting/bank.png"
},
{
	name: t('setting.s_c5'),
	url: './set3',
	flag: true,
	img: "/static/themeNum1/setting/fundPwd.png"
},
{
	name: t('setting.s_c6'),
	url: './set4',
	flag: true,
	img: "/static/themeNum1/setting/loginPwd.png"
},
{
	name: t('setting.s_c7'),
	url: '',
	flag: true,
	img: "/static/themeNum1/setting/loginOut.png"
},
])
const jumpPage = url => {
	if (url) {
		uni.navigateTo({
			url
		})
	} else {
		loginOutMask.value = true
	}
}

const getData = () => {
	request({
		url: 'setting/financeWay',
		methods: 'get'
	}).then(res => {
		let {
			withdraw_type
		} = res
		//数组 可以包含多个方式 1.USDT  2.三方
		if (withdraw_type.includes(1)) {
			list.value[0].flag = true
		}
		if (withdraw_type.includes(2)) {
			list.value[1].flag = true
		}
	})
}
const curLang = uni.getStorageSync('lang')
// 终于可以用了
onShow(() => {
	getData()
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

<style lang="scss">
.listItem {
	background: #262626;
	border-radius: 15rpx;
	padding: 30rpx 45rpx;
	display: flex;
	color: #fff;
	align-items: center;
	justify-content: space-between;
}
</style>
