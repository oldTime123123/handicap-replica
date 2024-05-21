<template>
	<view class="pdlr30  l_bg pb100" style="background: #060D1F">
		<kefu></kefu>
		<!-- 头部 -->
		<view class=" pt30 between">
			<image src="/static/themeNum1/l_icon/l_back.png" mode="widthFix" style="width:70rpx;height:70rpx"
				@click="back"></image>
			<image src="/static/lang.png" style="width:57rpx;height:56rpx" @click="jumpPage('../mine/langSetting')">
			</image>
		</view>

		<view class="pdlr40">
			<!-- 欢迎文字 -->
			<view class="mt85  f60 text_bold" :style="{ color: store.$state.contentColor }">
				{{ t("lo_i.l_o1") }}
				<view style="font-size: 30rpx;margin-top: 20rpx;">
					{{ t("lo_i.l_o2") }}
				</view>
			</view>

			<view class="tasbsBox" v-if="loginStore.$state.showTypeStatus">
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd == 1 ? 'chooseItem' : ''"
					@click="changeTypeInd(1)">Phone</view>
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd == 2 ? 'chooseItem' : ''"
					@click="changeTypeInd(2)">Email</view>
			</view>
			<view style="margin-top:170rpx">
				<!-- 第一个完整的input框 -->
				<view style="font-size: 30rpx;margin-bottom: 20rpx;">{{ t("lo_i.l_o3") }}</view>
				<view class="flex   " style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<!-- 区号选择框 -->
					<view class=" between  pdlr20 " style="width:160rpx" @click="openPicker">
						<view class="between row_center" style="width: 70%;">
							<view class="center">
								<image :src="curCountryImg" style="width:43rpx;height:29rpx"></image>
							</view>
							<text class=" f22">{{ loginStore.$state.defaultCountryCode.country_code }}</text>
						</view>
						<view>
							<image src="@/static/themeNum1/l_icon/downSel.png" style="width:30rpx;height:18rpx"></image>
						</view>
					</view>
					<view class="   flex col_center" style="flex: 1;"
						:class="currenLang == 'ar' || currenLang == 'fa' ? 'mr20' : 'ml20'">

						<input type="number" placeholder-class="plaC" style="font-size: 14px;" :placeholder="t('login.l_l1')"
							v-model="loginForm.phone" v-if="loginStore.$state.chooseTypeInd == 1">

						<input type="mail" placeholder-class="plaC" style="font-size: 14px;" :placeholder="t('email.e_a1')"
							v-model="loginForm.email" v-if="loginStore.$state.chooseTypeInd == 2">

						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " :color="store.$state.contentColor">
						</nut-icon>
					</view>
				</view>
				<!-- 第二个，密码 -->
				<view style="font-size: 30rpx;margin: 40rpx 0 20rpx 0;">{{ t("lo_i.l_o4") }}</view>
				<view class=" between  mt40  pdlr30" style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" placeholder-class="plaC" :type="showPwd ? 'password' : 'text'"
							:placeholder="t('login.l_l2')" v-model="loginForm.password">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>


				<view class="flex between l_inpS mt40 l_inpBg pdlr30" v-if="imgFlag">
					<view>
						<image src="/static/themeNum1/l_icon/otp.png" style="width: 45rpx;height: 45rpx;font-size: 14px;"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input type="text" class="ml20" style="font-size: 14px;" :placeholder="t('login.l_l3')" placeholder-class="plaC f26"
							v-model="loginForm.captcha">
					</view>
					<view class="catUrl center ml20" style="flex: 1;" @click="genNewCat">
						<image :src="imgUrl" style="height: 100rpx;width: 240rpx;"></image>
					</view>
				</view>


				<view class="mt30 f24 flex xuan" :style="{ color: store.$state.contentColor }"
					style='justify-content: space-between;'>
					<nut-radiogroup v-model="radioVal">
						<nut-radio label="1">{{t('lo_i.l_o14')}}</nut-radio>
					</nut-radiogroup>
					<view @click="forgetHandle">
						{{ t('login.l_l6') }}
					</view>
				</view>



				<!-- 双按钮 -->
				<view class=" center l_inpS f32" style="margin-top:40rpx;color:#000;"
					:style="{ background: store.$state.secondColor }" @click="loginHandle">
					{{ t("lo_i.l_o5") }}
				</view>

				<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32 mt40"
					:style="{ color: store.$state.contentColor, background: store.$state.thirdColor, border: '1rpx solid ' + store.$state.contentColor }">
					<view @click="jumpPage('./register')" style="height: 100%;width: 100%;" class="center">
						{{ t("lo_i.l_o6") }}
					</view>
				</view>
				<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32"
					:style="{ color: store.$state.contentColor, background: store.$state.thirdColor, border: '1rpx solid ' + store.$state.contentColor }"
					@click="skip_home">
					{{ t("lo_i.l_o12") }}
				</view>

			</view>
		</view>
		<nut-popup position="left" :style="{ width: '40%', height: '100%', }" v-model:visible="showPicker">
			<view style="background-color: #1c1c50;min-height: 100vh;" class="pt30">
				<view class="inpSearch  ">
					<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
					<nut-icon name="search" style="margin-right: 40rpx;" size="20">
					</nut-icon>
				</view>
				<view class="mt30">
					<view class="listItem2" style="justify-content: start;" v-for="(item, index) in searchCode"
						:style="index == currentInd ? choStyle : ''" @click="confirm(item, index)">
						{{ item.text }} {{ item.name }}
					</view>
				</view>
			</view>
		</nut-popup>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import kefu from "@/components/kefu/kefu.vue"

	import CryptoJS from 'crypto-js'
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		loginStoreState
	} from "@/store/login.js";
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		computed,
		onMounted,

	} from 'vue';
	import {
		useI18n
	} from "vue-i18n";
	import COUNTRY from '../../../setting.js';
	const {
		t
	} = useI18n();
	const store = userStore();
	const loginStore = loginStoreState()
	const showPwd = ref(true)
	const countryList = ref([])

	const skip_home = () => {
		uni.navigateTo({
			url: '../tabbar/index'
		})
	}
	const radioVal = ref()

	// 登录表单
	const loginForm = ref({
		phone: '',
		password: '',
		email: '',
		captcha: '',
		uuid: ''
	})
	const imgUrl = ref("")
	const currenLang = uni.getStorageSync('lang')
	// const chooseTypeInd = ref(1)
	const changeTypeInd = ind => {
		if (loginStore.$state.chooseTypeInd == ind) return
		loginStore.setChooseTypeInd(ind)
	}

	const regFlag = ref(false)
	const currentInd = ref(0)
	const phoneRegFlag = ref(false)
	const country_code = ref("")
	const showPicker = ref(false)
	const showLoading = ref(null)
	const choStyle = {
		background: store.$state.secondColor,
		color: '#000',

	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}
	const isGoForgetPwd = ref(false)
	watch(loginForm, (newVal, oldVal) => {
		if (loginStore.$state.defaultCountryCode.preg) {
			let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			let re = /^\d{7,13}$/;
			if (re.test(loginForm.value.phone)) {

				phoneRegFlag.value = true
			} else {
				regFlag.value = false
				phoneRegFlag.value = false
			}

			if (phoneReg.test(loginForm.value.phone) && loginForm.value.password.length > 5 && loginForm.value
				.password
				.length < 25) {

				regFlag.value = true
			} else {
				regFlag.value = false
				regFlag.value = false
			}
		}
	}, {
		deep: true
	})

	const searchCode = ref([])
	const inpSeach = ref("")
	const searchHandle = (e) => {
		if (!countryList.value) {
			return false
		}
		let temArr = []
		countryList.value.forEach(item => {
			if (item.alias.toLowerCase().includes(inpSeach.value.toLowerCase()) || item.country_code
				.toLowerCase().includes(inpSeach.value.toLowerCase())) {
				temArr.push(item)
			} else {
				return false
			}
		})
		searchCode.value = temArr
	}

	const curCountryImg = computed(() => {
			if (loginStore.$state.defaultCountryCode.country_code) {
				try {
					let str = loginStore.$state.defaultCountryCode?.country_code?.replace(/\+/g, '') ?? '';
					// let str = String(loginStore.$state.defaultCountryCode.country_code)
					str = str.replace('+', '')
					return `/static/guojia/${str}.png`
				} catch (e) {
					//TODO handle the exception
				}
			}

		}
		// `/static/guojia/${country_code.country_code.replace('+','')}`
	)
	const confirm = (item, index) => {
		if (isGoForgetPwd.value) {
			let flag = item.sms_status
			if (flag == 1) {
				let code = item.code.replace("+", "")
				uni.navigateTo({
					url: './resetPwd?code=' + code
				})
			} else {
				uni.navigateTo({
					url: '../mine/service'
				})
			}
			showPicker.value = false
			return false
		}
		loginStore.setdefaultCountryCode(item)
		currentInd.value = index
		showPicker.value = false

		let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (phoneReg.test(loginForm.value.phone)) {
			phoneRegFlag.value = true
		} else {
			regFlag.value = false
			phoneRegFlag.value = false
		}
	}
	const loginHandle = () => {
		// 手机号登录
		if (loginStore.$state.chooseTypeInd == 1) {
			let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(loginForm.value.phone)) {
				Toast.text(t('login.l_l3'))
				return false
			}
			if (loginForm.value.password.length < 6 || loginForm.value.password.length > 24) {
				Toast.text(t('login.l_l4'))
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				loginByPhone()
			}, 1500)
		} else {
			let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
			if (reg.test(loginForm.value.email)) {
				showLoading.value.loading = true
				setTimeout(() => {
					loginByMail()
				}, 1500)
			} else {
				Toast.text(t('email.e_a2'))
				return
			}
		}

	}
	const loginByMail = () => {
		loginForm.value.country_code = loginStore.$state.defaultCountryCode.text
		showLoading.value.loading = false
		delete loginForm.value.phone
		request({
			url: 'join/email/login',
			methods: 'post',
			data: loginForm.value
		}).then(res => {
			showLoading.value.loading = false
			Toast.text(t('login.l_l5'))
			uni.setStorageSync('token', res.accessToken)
			setTimeout(() => {
				uni.navigateTo({
					url: '../tabbar/index'
				})
			}, 1000)
		}).catch(err => {
			console.log(err);
			showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})

		})
	}
	const loginByPhone = () => {
		loginForm.value.country_code = loginStore.$state.defaultCountryCode.text
		delete loginForm.value.email

		let encrypted;
		if (encryFlag.value) {
			let data = loginForm.value
			const key = CryptoJS.enc.Utf8.parse("login");
			const mode = CryptoJS.mode.ECB;
			const padding = CryptoJS.pad.Pkcs7;
			data = JSON.stringify(data)
			encrypted = CryptoJS.DES.encrypt(data, key, {
				mode: mode,
				padding: padding
			}).toString();
			request({
				url: '/join/login',
				methods: 'post',
				data: {
					data: encrypted
				}
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_l5'))

				if (sessionStorage.getItem('link')) {
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url: '../linkEgg/linkEgg?key=' + key
					})
					return false
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index',
					})
				}, 1000)
			}).catch(err => {
				showLoading.value.loading = false
				genNewCat()
				loginForm.value.captcha = ""
				uni.showToast({
					title: err.message,
					icon: 'none'
				})

			})
		} else {
			request({
				url: '/join/login',
				methods: 'post',
				data: loginForm.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_l5'))
				console.log(radioVal.value, '123445677')
				if (radioVal.value) {
					uni.setStorageSync('user', loginForm.value)

				} else {
					uni.removeStorageSync('user')
				}
				if (sessionStorage.getItem('link')) {
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url: '../linkEgg/linkEgg?key=' + key
					})
					return false
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)
			}).catch(err => {
				showLoading.value.loading = false
				uni.showToast({
					title: err.message,
					icon: 'none'
				})

			})
		}


	}
	const genRandom = () => {
		let times = Number(new Date())
		let nums = parseInt(Math.random() * 1000000)
		return nums + "" + times
	}

	const genNewCat = () => {
		loginForm.value.uuid = genRandom()
		imgUrl.value = COUNTRY.HOST + 'join/imgVerify?uuid=' + loginForm.value.uuid
	}
	const forgetHandle = () => {
		uni.navigateTo({
			url: '../mine/service'
		})
	}

	const openPicker = () => {
		isGoForgetPwd.value = false
		showPicker.value = true
	}
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const back = () => {
		history.back()
	}

	const getData = () => {
		request({
			url: '/setting/country',
			methods: 'get'
		}).then(res => {
			let tempArr = []
			for (let i = 0; i < res.length; i++) {
				res[i].text = res[i].country_code
				res[i].value = res[i].id
				tempArr.push(res[i])
			}
			searchCode.value = tempArr
			store.setCountryCode(tempArr)
			loginStore.setdefaultCountryCode(store.$state.countryCode[0])
			countryList.value = store.$state.countryCode
			showLoading.value.loading = false
		})

		request({
			url: 'setting/register',
			methods: 'get'
		}).then(res => {
			// 1 手机号  2  邮箱   1，2都存在
			let tempArr = res.registerChannel.channel
			if (tempArr.includes(1) && tempArr.includes(2)) {
				loginStore.$state.showTypeStatus = true
			} else if (tempArr.includes(1)) {
				loginStore.$state.showTypeStatus = false
				loginStore.$state.chooseTypeInd = 1
			} else {
				loginStore.$state.showTypeStatus = false
				loginStore.$state.chooseTypeInd = 2
			}
		})

		// request({
		// 	url: '/join/imgVerifyConfig',
		// 	methods: 'get'
		// }).then(res => {
		// 	res.encry == 1 ? encryFlag.value = true : ''
		// 	res.img_verify == 1 ? imgFlag.value = true : ''
		// 	if (encryFlag.value && imgFlag.value) {
		// 		genNewCat()
		// 	}
		// })

	}

	const encryFlag = ref(false)
	const imgFlag = ref(false)

	// 终于可以用了
	onMounted(() => {

		showLoading.value.loading = true
		if (uni.getStorageSync('user')) {
			loginForm.value.phone = uni.getStorageSync('user').phone
			loginForm.value.password = uni.getStorageSync('user').password
		}
		let curLang = uni.getStorageSync('lang')
		uni.removeStorageSync('token')
		uni.removeStorageSync('localVersion')
		uni.removeStorageSync('setLang')
		uni.removeStorageSync('currency')
		uni.removeStorageSync('lang')
		uni.removeStorageSync('setLang')
		currentInd.value = 0
		if (curLang) {
			uni.setStorageSync('lang', curLang)
			uni.setStorageSync('setLang', true)
		} else {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				history.go(0)
			})
			return false
		}
		getData()
	})
</script>

<style lang="scss" scoped></style>