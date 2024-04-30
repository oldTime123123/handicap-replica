<template>
	<view style="padding-bottom: 150rpx; background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('construct.c_s7')" style="background-color: #000;"></topNav>
		<view class=" " style="position: relative;">
			<image :src="'/static/sign/hetong2.jpg'" mode="widthFix" style="width: 100%;"></image>
			<view class="signImg" :style="{ right: '150rpx', bottom: '340rpx' }">
				<image :src="imgUrl" style="width: 70rpx;height: 100%;"></image>
			</view>
		</view>

		<view class="pdlr30">
			<view class="">
				<view @click="jumpPage('../tabbar/panel')" class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32"
					:style="{ background: store.$state.secondColor }" v-if="imgUrl">
					{{ t('all.a_c2') }}
				</view>
				<view v-else>
					<view @click="jumpPage('./signName?id=' + id)" class=" center l_inpS mt40 l_inpBg pdlr30 color0 f32"
						:style="{ background: store.$state.secondColor }">
						{{ t('construct.c_s1') }}
					</view>

					<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white mt40 f32"
						:style="{ color: store.$state.contentColor, border: 'none' }" @click="jumpPage('../tabbar/panel')">
						{{ t('construct.c_s2') }}
					</view>
				</view>
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

const jumpPage = url => {
	uni.navigateTo({
		url
	})
}
// 终于可以用了
const imgUrl = ref("")
const id = ref("")

onLoad(e => {
	if (e.id) {
		id.value = e.id
	}
	if (e.url) {
		imgUrl.value = e.url
	}
 
})

const curLang = uni.getStorageSync('lang')
</script>

<style lang="scss">
.l_inpS {
	border-radius: 55rpx;
}

.l_inpS:nth-child(2) {
	border: 1rpx solid #16B739;
}

.signImg {
	// background-color: #16B739;
	position: absolute;


	z-index: 99;
	height: 200rpx;
	// transform: ;
	transform: rotate(-90deg);
}
</style>
