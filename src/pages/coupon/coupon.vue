<template>
	<view class="normalBg" style="background: #060D1F">
		<kefu></kefu>
		<topNav :title="t('parWel.p_p1')"></topNav>



		<view class="pdlr30 mt48">
			<couRecord ref="couRecordRef"></couRecord>
		</view>


		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import kefu from "@/components/kefu/kefu.vue"

import topNav from "@/components/topNav/topNav.vue"
import request from '../../../comm/request.ts';
import couRecord from '@/components/couRecord/couRecord.vue'
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
} from 'vue-i18n'

const {
	t
} = useI18n()

const currency = uni.getStorageSync('currency')




const showLoading = ref(null)
onLoad(() => {
 
})
</script>

<style lang="scss" scoped></style>
