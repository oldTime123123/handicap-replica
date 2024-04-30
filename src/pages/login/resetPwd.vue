<template>
	<view class="pdlr30  l_bg" style="background: #060D1F">
		<kefu></kefu>
		<view class=" pt30 between">
			<image src="@/static/themeNum1/l_icon/l_back.png" mode="widthFix" style="width:70rpx;height:70rpx"
				@click="back"></image>
			<image src="/static/lang.png" style="width:57rpx;height:56rpx" @click="jumpPage('../mine/langSetting')">
			</image>
		</view>
		<view class="pdlr40">
			<view class="mt85  f60 text_bold" :style="{ color: store.$state.contentColor }">
				{{ t('login.l_f1') }}
			</view>
			<view class="tasbsBox" v-if="loginStore.$state.showTypeStatus">
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd == 1 ? 'chooseItem' : ''"
					@click="changeTypeInd(1)">Phone</view>
				<view class="tabsItem" :class="loginStore.$state.chooseTypeInd == 2 ? 'chooseItem' : ''"
					@click="changeTypeInd(2)">Email</view>
			</view>
			<view style="margin-top:100rpx">
				<view class="flex between l_inpS ">
					<view class="l_inpBg between l_inpS pdlr20 " style="width:160rpx">
						<view class="flex col_center" style="width: 70%;">
							<view class="flex row_center">
								<image :src="`/static/guojia/${curImg}.png`" mode="widthFix"
									style="width:43rpx;height:29rpx">
								</image>
							</view>
							<text class="pl15 f22"> {{ regisForm.country_code }} </text>
						</view>
						<view>
							<image src="@/static/themeNum1/l_icon/downSel.png" style="width:30rpx;height:18rpx"></image>
						</view>
					</view>

					<view class=" l_inpS l_inpBg flex col_center pdlr50" style="flex:1"
						:class="currenLang == 'ar' ? 'mr20' : 'ml20'">
						<!-- <image src="@/static/themeNum1/country/en.png" mode="widthFix" style="width:43rpx;29rpx"></image> -->
						<input type="number" :placeholder="t('login.l_l1')" v-model="regisForm.phone"
							v-if="loginStore.$state.chooseTypeInd == 1">

						<input type="text" :placeholder="t('email.e_a1')" v-model="regisForm.email"
							v-if="loginStore.$state.chooseTypeInd == 2">
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn "
							:color="store.$state.contentColor"></nut-icon>
					</view>
				</view>

				<view class="flex between l_inpS mt40 l_inpBg pdlr30">
					<view>
						<image src="@/static/themeNum1/l_icon/pwd.png" style="width:40rpx;height:40rpx"></image>
					</view>
					<view class="l_inpS  flex col_center " style="width:100%">
						<input class="mglr39" :type="showPwd ? 'password' : 'text'" :placeholder="t('login.l_l2')"
							v-model="regisForm.password">
					</view>
					<image src="@/static/themeNum1/l_icon/eyeOpen.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="!showPwd"></image>
					<image src="@/static/themeNum1/l_icon/eyeClose.png" style="width:40rpx;height:40rpx"
						@click="showPwd = !showPwd" v-if="showPwd"></image>
				</view>
				<view class="flex between l_inpS  mt40">
					<view class=" l_inpS l_inpBg flex col_center pdlr50" style="width:100%">
						<!-- <image src="@/static/themeNum1/country/en.png" mode="widthFix" style="width:43rpx;29rpx"></image> -->
						<input type="text" :placeholder="t('login.l_r2')" v-model="regisForm.sms_code">
					</view>
					<view v-if="!hasSend" @click="sendHandle" class="l_inpBg center  otpEl l_inpS pdlr20   "
						:class="currenLang == 'ar' ? 'mr20' : 'ml20'" style="width:220rpx;"
						:style="{ background: store.$state.secondColor }">
						OTP
					</view>
					<view v-else class="l_inpBg center  l_inpS pdlr20   otpEl " style="width:220rpx;"
						:class="currenLang == 'ar' ? 'mr20' : 'ml20'" :style="{ background: store.$state.secondColor }">
						{{ hasSecond }}s
					</view>
				</view>
				<view @click="forgetHandle" class=" center l_inpS mt40  pdlr30 " style="margin-top:112rpx;color:#000"
					:style="{ background: store.$state.secondColor }">
					{{ t('login.l_f2') }}
				</view>
			</view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import kefu from "@/components/kefu/kefu.vue"

import request from '../../../comm/request.ts';
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
import {
	loginStoreState
} from "@/store/login.js";
const {
	t
} = useI18n();
const store = userStore();
const loginStore = loginStoreState()
const currenLang = uni.getStorageSync('lang')
const showPwd = ref(true)
const jumpPage = url => {
	uni.navigateTo({
		url
	})
}
const back = () => {
	history.back()
}
const regisForm = ref({
	phone: '',
	password: '',
	sms_code: '',
	email: "",
	country_code: ""
})
const changeTypeInd = ind => {
	if (loginStore.$state.chooseTypeInd == ind) return
	loginStore.setChooseTypeInd(ind)
}
const btnDis = ref(false)
// 　const { t } = useI18n()
const country_code = ref('')
const showPicker = ref(false)

const regFlag = ref(false)
const phoneRegFlag = ref(false)
// 监听
watch(regisForm, (newVal, oldVal) => {


	if (regisForm.value.password.length < 6 || regisForm.value.password.length > 24) {
		return false
	}
	if (!regisForm.value.phone || !regisForm.value.sms_code) {
		return false
	}
	regFlag.value = true
}, {
	deep: true
})

const choStyle = {
	background: store.$state.contentColor,
	color: '#fff',
	boxShadow: '0rpx 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35)'
}
const noCho = {
	background: store.$state.btnDis,
	color: '#fff'
}

const hasSecond = ref(60)
const hasSend = ref(false)
const sendHandle = () => {
	if (loginStore.$state.chooseTypeInd == 1) {


		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: regisForm.value.country_code,
			type: 2
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			Toast.text(t('login.l_f3'))
		}).catch(err => {
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
				country: country_code.value.text,
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
const forgetHandle = () => {

	if (loginStore.$state.chooseTypeInd == 1) {
		showLoading.value.loading = true
		delete regisForm.value.email
		request({
			url: 'join/forget',
			methods: 'post',
			data: regisForm.value
		}).then(res => {
			Toast.text(t('login.l_f4'))
			showLoading.value.loading = true
			setTimeout(() => {
				uni.navigateTo({
					url: './login'
				})
			}, 1000)
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	} else {
		showLoading.value.loading = true
		delete regisForm.value.phone
		request({
			url: 'join/email/forget',
			methods: 'post',
			data: regisForm.value
		}).then(res => {
			Toast.text(t('login.l_f4'))
			showLoading.value.loading = true
			setTimeout(() => {
				uni.navigateTo({
					url: './login'
				})
			}, 1000)
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
}
const startTimer = () => {
	timer.value = setInterval(() => {
		if (hasSecond.value == 0) {
			clearInterval(timer.value)
			hasSecond = false
		}
		hasSecond.value--;
	}, 1000)

}
const currentInd = ref(0)

const showLoading = ref(null)

const methods = {
	back() {
		history.back()
	},
	changePage() {
		uni.navigateTo({
			url: '../mine/langSetting'
		})
	},

	openPwdHandle(type) {
		if (type == 'second') {
			openCpwd.value = !openCpwd.value
		}
		if (type == 'first') {
			openPwd.value = !openPwd.value
		}
	}
};

const countryList = ref([])


onHide(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})
const curImg = ref("")
onLoad((e) => {
	if (e.code) {
		curImg.value = e.code
		regisForm.value.country_code = "+" + e.code
	}

})
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
</style>
