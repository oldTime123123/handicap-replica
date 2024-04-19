import {
	defineStore
} from 'pinia'

export const loginStoreState = defineStore({
	id: 'loginType', // 命名，唯一
	state: () => {
		return {
			chooseTypeInd: '1',
			showTypeStatus: false,
			defaultCountryCode: {
				country_code:'',
				reg:''
			}
		}
	},
	actions: {
		setChooseTypeInd(data) {
			// 可直接通过this访问state属性
			this.chooseTypeInd = data;
		},
		setdefaultCountryCode(data) {
			// 可直接通过this访问state属性
			this.defaultCountryCode = data;
		},
	},
	// 持久化存储
	// persist:{
	// 	enabled:false,
	// 	strategies:[{
	// 		key:'themeNum',
	// 		storage:localStorage
	// 	}]
	// }
})
