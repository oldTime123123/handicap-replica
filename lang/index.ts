import {
	createI18n
} from 'vue-i18n'

import langEn from './en';
import langES from './es';
import langPt from './pt';
import langAr from './ar';
import langGe from './ge';
import langBd from './bd';
import langDe from './de';
import langFr from './fr';
import langIn from './in';
import langIt from './it';
import langJp from './jp';
import langKh from './kh';
import langPl from './pl';
import langRu from './ru';
import langTh from './th';
import langTr from './tr';
import langSr from './sr';
import langtw from './tw';
import langfa from './fa';
import langkk from './kk';
import langaz from './az';
import langVi from './vi';
const messages = {
	'en': langEn,
	'es': langES,
	'ar': langAr,
	'pt': langPt,
	'ge': langGe,
	'bn': langBd,
	'de': langDe,
	'fr': langFr,
	'hi': langIn,
	'it': langIt,
	'ja': langJp,
	'kh': langKh,
	'pl': langPl,
	'ru': langRu,
	'th': langTh,
	'tr': langTr,
	'sr': langSr,
	'tw':langtw,
	'fa':langfa,
	'kk':langkk,
	'az':langaz,
	'vi':langVi,
}
if (!uni.getStorageSync('lang')) {
	uni.setStorageSync('lang', 'en')
}
let cur_lang = uni.getStorageSync('lang')

if (cur_lang == 'ar' || cur_lang == 'fa') {
	let eles = document.querySelector("html")
	document.querySelector("html").setAttribute("dir", 'rtl')
}


const i18n = createI18n({
	globalInjection: true, //全局$t 生效
	locale: uni.getStorageSync('lang') || 'en',
	messages,
	legacy: false
})

export default i18n