<template>
	<view>
		<topNav title="Lottery"></topNav>
		<view class="pdlr45  ">
			<nutbig-turntable class="turntable" ref="turntable" :width="luckWidth" :height="luckheight"
				:prize-list="prizeList" :turns-number="turnsNumber" :turns-time="turnsTime" :prize-index="prizeIndex"
				:style-opt="styleOpt" :pointer-style="pointerStyle" @start-turns="startTurns" @end-turns="endTurns">
			</nutbig-turntable>

			<view class="mt30" style="margin-top: 800rpx;">
				<nutbig-squarenine :prize-list="dataArr" :prize-id="prizeId" :cardImg="cardImg" @click="click">
				</nutbig-squarenine>
			</view>

			<view>
				<nutbig-marquee :prize-list="prizeList3" :prize-index="prizeIndex3" :speed="100" :circle="40"
					@start-turns="startTurns3" @end-turns="endTurns3">
				</nutbig-marquee>
			</view>
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
	// import {
	// 	Toast
	// } from '@nutui/nutui';
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

	const {
		t
	} = useI18n();
	const showLoading = ref(null)
	const turntable = ref(null);
	// 转盘大小
	const luckWidth = ref("300px");
	const luckheight = ref("300px");
	// 转盘指针图片样式
	const pointerStyle = {
		width: "80px",
		height: "80px",
		backgroundImage: 'url("https://img11.360buyimg.com/imagetools/jfs/t1/89512/11/15244/137408/5e6f15edEf57fa3ff/cb57747119b3bf89.png")',
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
	};
	// 转盘上要展示的奖品数据
	const prizeList = ref([{
			id: "xiaomi",
			prizeName: "小米手机",
			prizeImg: "https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png",
		},
		{
			id: "blue",
			prizeColor: "rgb(251, 219, 216)",
			prizeName: "蓝牙耳机",
			prizeImg: "https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg",
		},
		{
			id: "apple",
			prizeName: "apple watch",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png",
		},
		{
			id: "fruit",
			prizeColor: "rgba(246, 142, 46, 0.5)",
			prizeName: "迪士尼苹果",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png",
		},
		{
			id: "fish",
			prizeName: "海鲜套餐",
			prizeImg: "https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png",
		},
		{
			id: "thanks",
			prizeName: "谢谢参与",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png",
		},
	]);
	// 转动圈数
	const turnsNumber = ref(5);
	// 转动需要持续的时间(秒)
	const turnsTime = ref(5);
	// 转盘样式的选项
	const styleOpt = reactive({
		// 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
		prizeBgColors: [
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
			"rgb(255, 231, 149)",
			"rgb(255, 247, 223)",
		],
		// 每一个扇形的外边框颜色
		borderColor: "#ff9800",
	});
	// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
	const prizeIndex = ref(-1);
	// 剩余抽奖次数
	const num = ref(5);
	const startTurns = () => {
		const index = Math.floor(Math.random() * prizeList.value.length);
		prizeIndex.value = index;
		turntable.value.rotateTurn();
	};
	const endTurns = () => {
		uni.showToast({
			title: prizeList.value[prizeIndex.value].prizeName,
			icon: 'none'
		});
	};
	const pageData = ref({})

	// lottery 2

	const dataArr = ref([{
			name: "商品名称名称",
			id: 1,
			pictureUrl: "//m.360buyimg.com/babel/s180x180_jfs/t1/174906/19/10256/188436/60a242afE89a800c9/801b64e5b80fde9a.jpg!q70.jpg",
		},
		{
			name: "没有中奖哦",
			id: 2,
			pictureUrl: "https://img14.360buyimg.com/imagetools/jfs/t1/213369/13/5346/13899/619b60e5E2761162e/dca9b64e09bb2fed.png",
		},
		{
			name: "商品名称名称",
			id: 3,
			pictureUrl: "//m.360buyimg.com/babel/s180x180_jfs/t1/17279/28/13940/140479/60b984f4E723b9981/d007711aa1cdc358.jpg!q70.jpg",
		},
		{
			name: "商品名称名称",
			id: 4,
			pictureUrl: "//m.360buyimg.com/babel/s180x180_jfs/t1/190452/2/84/116077/608627ecEef11d11e/e0a93f09eca31ddf.jpg!q70.jpg",
		},
		{
			name: "商品名称名称",
			id: 5,
			pictureUrl: "https://img10.360buyimg.com/n5/s54x54_jfs/t1/164065/10/8839/39628/603ee7edE9dee283f/e56acfa461919177.jpg",
		},
		{
			name: "祥禾饽饽铺京东自营旗舰店",
			id: 6,
			pictureUrl: "//m.360buyimg.com/babel/s66x66_jfs/t1/195378/33/9432/145698/60d0400eE0520ca9f/2283995f6c6176e7.jpg!q50.jpg",
		},
		{
			name: "鲜花4+1束 鲜花速递 ",
			id: 7,
			pictureUrl: "//m.360buyimg.com/babel/s180x180_jfs/t1/185809/36/6800/181830/60b4fdaaEa74ddfdf/7f3776e9a493ec20.jpg!q70.jpg",
		},
		{
			name: "大连萨米托爱心樱桃",
			id: 8,
			pictureUrl: "//m.360buyimg.com/babel/s180x180_jfs/t1/191656/26/7699/116921/60c1ed9eE933be59e/5c77c8eabda19d0d.jpg!q70.jpg",
		},
	]);
	const prizeId = ref(-1);
	const cardImg = ref(
		"//img11.360buyimg.com/imagetools/jfs/t1/73511/35/17197/9388/613852cdE75dc6822/ddb31e0f3cfdcb81.png"
	);
	const click = () => {
		prizeId.value = 3;
		
		uni.showToast({
			title: dataArr.value.find(item=>item.id == 3).name || "null",
			icon: 'none'
		});
	};

	// lottery 3

	const prizeList3 = ref([{
			id: "xiaomi",
			prizeName: "小米手机",
			prizeImg: "https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png",
		},
		{
			id: "blue",
			prizeColor: "rgb(251, 219, 216)",
			prizeName: "蓝牙耳机",
			prizeImg: "https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg",
		},
		{
			id: "thanks",
			prizeName: "谢谢参与",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png",
		},
		{
			id: "apple",
			prizeName: "apple watch",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png",
		},
		{
			id: "fruit",
			prizeColor: "rgba(246, 142, 46, 0.5)",
			prizeName: "迪士尼苹果",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png",
		},
		{
			id: "thanks",
			prizeName: "谢谢参与",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png",
		},
		{
			id: "fish",
			prizeName: "海鲜套餐",
			prizeImg: "https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png",
		},
		{
			id: "thanks",
			prizeName: "谢谢参与",
			prizeImg: "https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png",
		},
	]);
	// 转盘样式的选项
	const styleOpt3 = reactive({
		prizeItem: {},
		startStyle: {},
		contentBg: {
			background: "rgb(255, 231, 149)",
		},
	});
	// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
	const prizeIndex3 = ref(0);
	const startTurns3 = () => {
		const index = Math.floor(Math.random() * prizeList3.value.length);
		prizeIndex3.value = index;
	};
	const endTurns3 = () => {
		uni.showToast({
			title: prizeList3.value[prizeIndex3.value].prizeName,
			icon: 'none'
		});
	};
</script>

<style lang="scss" scoped>
	.mainBox {
		background-color: #fff;
		border-radius: 20px;
		padding: 50rpx;
		line-height: 40rpx;
		word-spacing: 0.1rem;
	}
</style>
