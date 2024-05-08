import themeNum1 from './color/themeNum1.js';
import {
	userStore
} from "@/store/themeNum.js";
const store = userStore();

let dev = 1
let COUNTRY = {
	url: '',
	qianzhui: '',
	lang: "",
	title: "",
	icon: ""
}

// /api
if (dev == 1) {
	COUNTRY.url = 'tujdndhsjbd.xyz',
		COUNTRY.lang = "en",
		COUNTRY.title = "",
		COUNTRY.icon = "/static/defi.png"
} else if (dev == 2) {
	COUNTRY.url = 'follow.task678.com',
		COUNTRY.lang = "en",
		COUNTRY.title = "",
		COUNTRY.icon = "/static/defi.png"
}


COUNTRY.HOST = `https://${COUNTRY.url}` + '/api/'


export default COUNTRY