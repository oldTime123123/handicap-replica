<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('login.l_l5')">

		</topNav>
		<view class="pdlr45 mt70">

			<view class=" center" style="margin-top: 200rpx;">
				<image src="../../static/signSuccess.png" style="width: 266rpx;height: 250rpx;"></image>
			</view>
			<view @click="jumpPage('../tabbar/panel')" class=" center l_inpS mt40 l_inpBg pdlr30 color0  f32"
				style="margin-top:214rpx" :style="{ background: store.$state.secondColor }">
				{{ t('construct.c_s4') }}
			</view>

			<!-- 	<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white mt40 f32"    :style="{color:store.$state.contentColor}" @click="jumpPage('./sign')" >
				{{t('construct.c_s5')}}
			</view> -->
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

const jumpPage = url => {
	uni.navigateTo({
		url
	})
}
// 终于可以用了
onShow(() => {

})
onLoad(() => {

})
</script>

<style lang="scss"></style>
