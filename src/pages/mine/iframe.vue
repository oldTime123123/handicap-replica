<template>
	<view style="background: #060D1F;min-height: 100vh;">
		<kefu></kefu>
		<view class="pdlr30 pt33">
			<view class="between">
				<view class="flex between">
					<nut-icon name="left" @click="goBack"></nut-icon>
				</view>
				<view class="f34">
					<!-- 					{{t('add2.t_t5')}} -->
				</view>
				<view style="width: 30rpx;"></view>
			</view>


			<web-view :webview-styles="webviewStyles" src="https://www.baidu.com/"></web-view>

		</view>

	</view>
</template>

<script setup>
import kefu from "@/components/kefu/kefu.vue"

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

const changeStyle = {
	color: '#14DBDD'
}

const goBack = () => {
	history.back()
}


const webUrl = ref()

onLoad((e) => {
	if (e.webUrl) {
		webUrl.vlaue = e.url

	}
 
})

</script>

<style lang="scss" scoped></style>
