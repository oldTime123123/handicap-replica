<template>
	<view class="pdlr30  l_bg pb100" style="background: #060D1F">
		<kefu></kefu>
		<view class=" pt30 between">
			<image src="@/static/themeNum1/l_icon/l_back.png" mode="widthFix" style="width:70rpx;height:70rpx"
				@click="back"></image>
			<image src="/static/lang.png" style="width:57rpx;height:56rpx" @click="jumpPage('../mine/langSetting')">
			</image>
		</view>

		<view class="pdlr40">
			<view class="mt85  f60 text_bold" :style="{color:store.$state.contentColor}">
				{{t('login.l_b2')}}
			</view>

			<view class="tasbsBox" v-if="loginStore.$state.showTypeStatus">
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd ==1?'chooseItem':''"
					@click="changeTypeInd(1)">Phone</view>
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd ==2?'chooseItem':''"
					@click="changeTypeInd(2)">Email</view>
			</view>
			<view style="margin-top:100rpx">
				<!-- 注册号码 -->
				<view style="font-size: 30rpx;margin-bottom: 20rpx;">{{t("lo_i.l_o7")}}</view>
				<view class="flex between " style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<view class=" between l_inpS pdlr20 " style="width:160rpx" @click="showPicker = true">
						<view class="between" style="width: 70%;">
							<view class="center">
								<image :src="curCountryImg" style="width:43rpx;height:29rpx"></image>
							</view>
							<text class="pl5 f22">{{loginStore.$state.defaultCountryCode.country_code}}</text>
						</view>
						<view>
							<image src="@/static/themeNum1/l_icon/downSel.png" style="width:30rpx;height:18rpx"></image>
						</view>
					</view>

					<view class=" l_inpS  flex col_center pdlr50" style="flex:1"
						:class="currenLang == 'ar'?'mr20':'ml20'">
						<!-- <image src="@/static/themeNum1/country/en.png" mode="widthFix" style="width:43rpx;29rpx"></image> -->

						<input type="number" :placeholder="t('login.l_l1')" v-model="regisForm.phone"
							v-if="loginStore.$state.chooseTypeInd == 1">

						<input type="mail" :placeholder="t('email.e_a1')" v-model="regisForm.email"
							v-if="loginStore.$state.chooseTypeInd == 2">
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " :color="store.$state.contentColor">
						</nut-icon>
					</view>
				</view>
				<!-- 第二个 -->
				<view style="font-size: 30rpx;margin: 40rpx 0 20rpx 0;" v-show="false">{{t("lo_i.l_o8")}}</view>
				<view class="flex between  mt40  pdlr30" style="border-bottom: 2rpx solid #ffffff;height: 70rpx;"
					v-show="false">
					<view>
						<image src="@/static/themeNum1/l_icon/name.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" type="text" :placeholder="t('add3.a_a1')" v-model="regisForm.user_name">
					</view>
				</view>
				<!-- 第三个 -->
				<view style="font-size: 30rpx;margin: 40rpx 0 20rpx 0;">{{t("lo_i.l_o9")}}</view>
				<view class="flex between  mt40  pdlr30" style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" :type="showPwd?'password':'text'" :placeholder="t('login.l_l2')"
							v-model="regisForm.password">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>
				<!-- 确认密码 -->
				<view style="font-size: 30rpx;margin: 40rpx 0 20rpx 0;">{{t("lo_i.l_o10")}}</view>
				<view class="flex between mt40  pdlr30" style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" :type="showPwd?'password':'text'" :placeholder="t('login.l_r1')"
							v-model="regisForm.password2">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>


				<!-- v-if="smsFlag" -->

				<view class="flex between   mt40" v-if="smsFlag || loginStore.$state.chooseTypeInd == 2">


					<view class=" l_inpS l_inpBg flex col_center pdlr50" style="width:100%">
						<!-- <image src="@/static/themeNum1/country/en.png" mode="widthFix" style="width:43rpx;29rpx"></image> -->
						<input type="text" :placeholder="t('login.l_r2')" v-model="regisForm.sms_code">
					</view>

					<view class="l_inpBg center  l_inpS pdlr20   otpEl" style="width:220rpx;"
						:class="currenLang == 'ar'?'mr20':'ml20'" :style="{background:store.$state.secondColor}"
						v-if="!hasSend" @click="sendHandle">
						OTP
					</view>

					<view class="l_inpBg center  l_inpS pdlr20  otpEl " style="width:220rpx;"
						:class="currenLang == 'ar'?'mr20':'ml20'" :style="{background:store.$state.secondColor}" v-else>
						{{hasSecond}}
					</view>
				</view>
				<!-- 邀请码 -->
				<view style="font-size: 30rpx;margin: 40rpx 0 20rpx 0;">{{t("lo_i.l_o11")}}</view>
				<view class="flex between  mt40  pdlr30" style="border-bottom: 2rpx solid #ffffff;height: 70rpx;">
					<view>
						<image src="@/static/themeNum1/l_icon/invite.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" type="text" :placeholder="t('login.l_r3')" v-model="regisForm.invite_code"
							:disabled="!canInpCode">
					</view>
				</view>

				<view class=" center l_inpS mt40  pdlr30  f32 color3" style="color:#000"
					:style="{background:store.$state.secondColor}" @click="methods.regisHandle()">
					{{t('login.l_b2')}}
				</view>
				<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32 mt40"
					:style="{ color: store.$state.contentColor, background: store.$state.thirdColor, border: '1rpx solid ' + store.$state.contentColor }"
					@click="skip_home('./login')">
					{{ t("lo_i.l_o5") }}
				</view>
				<view class=" center l_inpS mt40 l_inpBg pdlr30 text_white f32"
					:style="{ color: store.$state.contentColor, background: store.$state.thirdColor, border: '1rpx solid ' + store.$state.contentColor }"
					@click="skip_home('../tabbar/index')">
					{{ t("lo_i.l_o12") }}
				</view>
			</view>
		</view>
		<nut-popup position="left" :style="{ width: '40%', height: '100%' }" v-model:visible="showPicker">
			<view style="background-color: #1c1c50;min-height: 100vh;" class="pt30">
				<view class="inpSearch  ">
					<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
					<nut-icon name="search" style="margin-right: 40rpx;" size="20">
					</nut-icon>
				</view>
				<view class="mt30">
					<view class="listItem2" v-for="(item,index) in searchCode" :style="index == currentInd?choStyle:''"
						@click="confirm(item,index) ">
						{{item.text}} {{item.name}}
					</view>
				</view>
			</view>
		</nut-popup>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import kefu from "@/components/kefu/kefu.vue"

	import request from '../../../comm/request.ts';
	import {
		loginStoreState
	} from "@/store/login.js";
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		useI18n
	} from "vue-i18n";
	const store = userStore();
	const {
		t
	} = useI18n();
	const loginStore = loginStoreState()
	const showPwd = ref(true)
	const jumpPage = url => {
		uni.navigateTo({
			url
		})
	}
	const back = () => {
		history.back()
	}
	const openPwd = ref(true) // 密码可见
	const openCpwd = ref(true) // 第二次密码可见
	const changeTypeInd = ind => {
		if (loginStore.$state.chooseTypeInd == ind) return
		loginStore.setChooseTypeInd(ind)
	}
	const skip_home = (url) => {
		uni.navigateTo({
			url: url
		})
	}
	const currenLang = uni.getStorageSync('lang')
	// 登录表单
	const regisForm = ref({
		phone: '',
		password: '',
		password2: '',
		invite_code: '',
		sms_code: '',
		email: "",
		user_name: ""
	})
	const btnDis = ref(false)
	// 　const { t } = useI18n()
	const country_code = ref('')
	const showPicker = ref(false)

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {
		if (loginStore.$state.defaultCountryCode.preg) {
			let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
			// `\b\d{7,11}\b`
			let phoneReg = new RegExp(tempReg);
			let re = /^\d{7,13}$/;
			console.log(re.test(regisForm.value.phone));
			if (!re.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

		if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
			.length > 24 || regisForm.value.password2.length > 24) {
			regFlag.value = false
			return false
		}
		if (regisForm.value.password !== regisForm.value.password2) {
			regFlag.value = false
			return false
		}
		if (smsFlag.value && !regisForm.value.sms_code) {
			regFlag.value = false
			return false
		}
		if (codeFlag.value && !regisForm.value.invite_code) {
			regFlag.value = false
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: store.$state.secondColor,
		color: '#000',
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#fff'
	}
	const curCountryImg = computed(() => {
			try {
				let str = loginStore.$state.defaultCountryCode?.country_code?.replace(/\+/g, '') ?? '';

				return `/static/guojia/${str}.png`
			} catch (e) {
				//TODO handle the exception
			}

		}
		// `/static/guojia/${country_code.country_code.replace('+','')}`
	)
	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {

		if (loginStore.$state.chooseTypeInd == 1) {
			let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				Toast.text(t('login.l_l3'))
				return false
			}

			if (timer.value) {
				clearInterval(timer.value)
			}
			const data = {
				tel: regisForm.value.phone,
				country: loginStore.$state.defaultCountryCode.country_code,
				type: 1
			}
			showLoading.value.loading = true
			request({
				url: 'join/sms',
				methods: 'post',
				data: data
			}).then(res => {
				startTimer()
				hasSend.value = true
				Toast.text(t('login.l_r8'))
				showLoading.value.loading = false
			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})
		} else {
			let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
			if (reg.test(regisForm.value.email)) {
				showLoading.value.loading = true
				if (timer.value) {
					clearInterval(timer.value)
				}
				const data = {
					email: regisForm.value.email,
					country: loginStore.$state.defaultCountryCode.country_code,
					type: 1
				}
				showLoading.value.loading = true
				request({
					url: 'join/email/sms',
					methods: 'post',
					data: data
				}).then(res => {
					startTimer()
					hasSend.value = true
					Toast.text(t('login.l_r8'))
					showLoading.value.loading = false
				}).catch(err => {
					showLoading.value.loading = false
					Toast.text(err.message)
				})
			} else {
				Toast.text(t('email.e_a2'))
				return
			}
		}
	}

	const timer = ref(null)
	const startTimer = () => {
		timer.value = setInterval(() => {
			if (hasSecond.value == 0) {
				clearInterval(timer.value)
				hasSend.value = false
				hasSecond.value = 60
			}
			hasSecond.value--;
		}, 1000)

	}
	const currentInd = ref(0)

	const showLoading = ref(null)

	const confirm = (item, index) => {
		loginStore.setdefaultCountryCode(item)
		currentInd.value = index
		showPicker.value = false
		regFlag.value = false
		loginStore.$state.defaultCountryCode.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false


		if (loginStore.$state.defaultCountryCode.preg) {
			let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

	}
	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../mine/langSetting'
			})
		},
		regisHandle() {
			if (loginStore.$state.chooseTypeInd == 1) {
				let tempReg = loginStore.$state.defaultCountryCode.preg.replace('/', '').replace('/', '')
				let phoneReg = new RegExp(tempReg);
				if (!phoneReg.test(regisForm.value.phone)) {
					Toast.text(t('login.l_l3'))

					return false
				}

				// if (regisForm.value.user_name.trim() == '') {
				// 	Toast.text(t('add3.a_a1'))
				// 	regFlag.value = false
				// 	return false
				// }
				if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value
					.password
					.length > 24 || regisForm.value.password2.length > 24) {
					Toast.text(t('login.l_l4'))
					return false
				}
				if (regisForm.value.password !== regisForm.value.password2) {
					Toast.text(t('login.l_r4'))
					return false
				}
				if (smsFlag.value && !regisForm.value.sms_code) {
					Toast.text(t('login.l_r5'))
					return false
				}
				if (codeFlag.value && !regisForm.value.invite_code) {
					Toast.text(t('login.l_r6'))
					return false
				}
				showLoading.value.loading = true
				setTimeout(() => {
					methods.regisHandle1()
				}, 1500)
			} else {
				let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
				if (regisForm.value.user_name.trim() == '') {
					Toast.text('Please enter your real name')
					regFlag.value = false
					return false
				}
				if (reg.test(regisForm.value.email)) {
					showLoading.value.loading = true
					setTimeout(() => {
						methods.regisByMail()
					}, 1500)
				} else {
					Toast.text(t('email.e_a2'))
					return
				}
			}
		},
		regisByMail() {
			regisForm.value.country_code = loginStore.$state.defaultCountryCode.country_code;
			delete regisForm.value.phone
			request({
				url: '/join/email/register',
				methods: 'post',
				data: regisForm.value
			}).then(res => {
				try {
					window.AndroidEM.onEvent('register')
				} catch (e) {}
				showLoading.value.loading = false
				Toast.text(t('login.l_r7'))
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})
		},
		regisHandle1() {
			regisForm.value.country_code = loginStore.$state.defaultCountryCode.country_code;
			delete regisForm.value.mail
			request({
				url: '/join/register',
				methods: 'post',
				data: regisForm.value
			}).then(res => {

				showLoading.value.loading = false
				Toast.text(t('login.l_r7'))

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
					try {
						window.AndroidEM.onEvent('register')
					} catch (e) {}
					fbq('track', 'CompleteRegistration');
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})

		},



	};

	const smsFlag = ref(false)
	const codeFlag = ref(false)
	const countryList = ref([])

	const getSetting = () => {
		request({
			url: 'setting/register',
			methods: 'get'
		}).then(res => {

			// 邀请码 状态 1.必填 0.选填
			res.registerInviteCode.status == 1 ? codeFlag.value = true : codeFlag.value = false
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
		if (store.$state.countryCode.length > 0) {
			countryList.value = store.$state.countryCode
			loginStore.$state.defaultCountryCode.country_code == '' ? loginStore.setdefaultCountryCode(
				countryList.value[0]) : ''
			searchCode.value = countryList.value
			// /状态 1.开启 0关闭 短信
			loginStore.$state.defaultCountryCode.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
		} else {

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
				countryList.value = store.$state.countryCode
				if (canChoCountry.value) {
					store.$state.countryCode.forEach(item => {
						let str = "+" + countryVal.value
						if (item.country_code == str) {
							loginStore.setdefaultCountryCode(item)
						}
					})
				} else {
					loginStore.$state.defaultCountryCode.country_code == '' ? loginStore.setdefaultCountryCode(
						store.$state.countryCode[0]) : ''
				}
				loginStore.$state.defaultCountryCode.sms_status == 1 ? smsFlag.value = true : smsFlag.value =
					false
			})

		}
	}
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

	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onMounted(() => {
		showLoading.value.loading = true
		getSetting()
		setTimeout(() => {
			showLoading.value.loading = false
		}, 1500)
	})
	const canInpCode = ref(true)
	const canChoCountry = ref(false)
	const countryVal = ref(0)
	onLoad((e) => {

		if (window.location.host == 'defi-wallet.com') {
			regisForm.value.invite_code = "111111"
		} else if (window.location.host == 'defi22.com') {
			regisForm.value.invite_code = "222222"
		} else if (window.location.host == 'defi44.com') {
			regisForm.value.invite_code = "444444"
		} else if (window.location.host == 'defi00.com') {
			regisForm.value.invite_code = "000000"
		} else if (window.location.host == 'defi99.com') {
			regisForm.value.invite_code = "999999"
		} else if (window.location.host == 'defiaa.com') {
			regisForm.value.invite_code = "666666"
		} else if (window.location.host == 'defiee.com') {
			regisForm.value.invite_code = "777777"
		} else if (e.code) {
			regisForm.value.invite_code = e.code
			canInpCode.value = false
		}
		if (e.country) {
			canChoCountry.value = true
			countryVal.value = e.country
		}
		if (!uni.getStorageSync('setLang')) {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				history.go(0)
			})
		}
	})
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;


	}
</style>