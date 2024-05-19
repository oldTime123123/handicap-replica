<template>
	<view class="box" style="background: #060D1F">
		<kefu></kefu>
		<view v-if="pageData.name">
			<topNav :title='pageData.name'></topNav>
			<view class="pdlr30 mt70 ">
				<div class="mainBox" @click="getImg($event)">
					<div class="detailContent" style="text-transform: none !important" v-html="pageData.contents"></div>
				</div>
			</view>
			<view style="height: 100rpx;"></view>
		</view>
		<view class="showimg" :style="showViewer" @click="closeimg">
			<img :src="previewList[0]" alt="" style="width: 100%;">
		</view>
		<Loading ref="showLoading"></Loading>

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
	import {
		onMounted
	} from "vue";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";


	const showViewer = ref("display: none;");
	const previewList = ref([]);
	const getImg = ($event) => {
		previewList.value = [$event.target.currentSrc];
		console.log(previewList.value);
		showViewer.value = "display:block;";

	}
	const closeimg = () => {
		showViewer.value = "display:none;";

	}
	const {
		t
	} = useI18n();


	const pageData = ref({
		name: "",
		des: '',
		content: ""
	})


	const id = ref(0)
	// /article/detail
	const getData = () => {
		request({
			url: 'page/article/detail',
			methods: 'get',
			data: {
				id: id.value
			}
		}).then(res => {
			if (!res.name) {
				Toast.text('No more data')
				history.back()
			} else {
				pageData.value = res
			}
		})
	}
	const showLoading = ref(null)
	// 终于可以用了
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1000)
	})
	onLoad(e => {
		if (e.pos) {
			id.value = e.pos
			getData()
		}

	})
</script>

<style lang="scss" scoped>
	.showimg {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, .7);
		line-height: 100vh;

		img {
			vertical-align: middle;
		}
	}

	.box {
		width: 100%;
		height: 100%;
		background: url('../../static/themeNum1/img/normalBg.png') no-repeat;
		background-size: 100% 100%;
		overflow-y: scroll;
	}

	.mainBox {
		background-color: #fff;
		border-radius: 20px;
		padding: 50rpx;
		line-height: 40rpx;
		word-spacing: 0.1rem;
		color: #000;
		margin-bottom: 100rpx;
	}

	.detailContent {
		p {
			img {
				margin: 0 auto;
			}
		}
	}
</style>