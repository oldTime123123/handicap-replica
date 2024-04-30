<template>
	<view class="normalBg" style="background: #060D1F">
		<topNav :title="t('construct.c_s6')"></topNav>
		<view class=" mgtb20  pdlr30 " style="color: #51FDFE;">
			{{ t('construct.c_s3') }}
		</view>
		<view class=" sign" style="width: 90%;">
			<nut-signature :line-width="3" @confirm="confirm" @clear="clear" :stroke-style="'#51FDFE'"></nut-signature>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
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
import { onMounted } from "vue";
const store = userStore();
import {
	Locale
} from '@nutui/nutui';
// 引入英文语言包
import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';

import {
	useI18n
} from "vue-i18n";
const demoSignUrl = ref('');

// setting/upload
const showLoading = ref(null)
const confirm = (canvas, data) => {

	if (data == '') {
		return false;
	}
	showLoading.value.loading = true
	uni.uploadFile({
		url: uploadUrl.value, //仅为示例，非真实的接口地址
		filePath: data,
		name: 'cert',
		success: (res) => {
			// console.log(JSON.parse(res.data).data);
			upData.value.contract = JSON.parse(res.data).data
			console.log(upData.value);
			request({
				url: 'machine/contract',
				methods: 'post',
				data: {
					...upData.value
				}
			}).then(res => {
				showLoading.value.loading = false
				// Toast.text(e.message)
				uni.navigateTo({
					url: './signSuccess',
				})
			}).catch(e => {
				showLoading.value.loading = false
				Toast.text(e.message)
			})
		},
		fail: (e) => {
			showLoading.value.loading = false
			console.log(e, 'eeeeeeeeeee');
		}
	});


};
const clear = () => {
	demoSignUrl.value = '';

}
const {
	t
} = useI18n();
const upData = ref({
	id: "",
	contract: ""
})
const uploadUrl = ref("")
const getData = () => {
	request({
		url: 'setting/upload',
		methods: 'get',
	}).then(res => {
		uploadUrl.value = res.upload_host + 'api/uploads'
		console.log(uploadUrl.value);

	}).catch(e => {
		Toast.text(e.message)
	})
}

// 终于可以用了
onMounted(() => {
	Locale.use('en-US', enUS);
	getData()
})
onLoad(e => {
	if (e.id) {
		upData.value.id = e.id
	} else {
		history.back()
	}
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

<style lang="scss"></style>
