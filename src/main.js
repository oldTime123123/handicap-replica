import { createApp } from "vue";
import App from "./App.vue";
import '@/build/rem';
import '../comm/main.scss';
import '../comm/animate.css'
import i18n from '../lang/index.ts'
import pinia from './store/index'
import piniaPersist from 'pinia-plugin-persist'
pinia.use(piniaPersist)
import NutBig from "@nutui/nutui-bingo";
import "@nutui/nutui-bingo/dist/style.css";
import { IconFont } from '@nutui/icons-vue';
import '@nutui/icons-vue/dist/style_iconfont.css';
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";

// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";

createApp(App).use(i18n).use(IconFont).use(NutBig).use(pinia).use(NutUI).mount("#app");

