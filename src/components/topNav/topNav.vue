<template>
  <view class="between" style="height: 88rpx; padding: 0 31rpx">
    <view style="width: 45rpx; height: 30rpx">
      <image
        :src="store.$state.imgObj.backIcon"
        style="width: 32rpx; height: 100%"
        @click="back"
        v-if="curLang !== 'ar'"
      ></image>
      <IconFont v-else name="rect-right" color="#fff" @click="back"></IconFont>
    </view>
    <view
      class="f36 text_white textHiddenOne center"
      style="font-weight: 500; width: 80%; height: 100%"
      >{{ title }}
    </view>
    <view style="width: 45rpx; height: 45rpx">
      <image
        v-if="rightIcon"
        :src="rightIcon"
        style="width: 100%; height: 100%"
        @click="rightClickHandle"
      >
      </image>
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/store/themeNum.js";
export default defineComponent({
  props: ["title", "rightIcon", "rightUrl", "goBackNum"],
  setup(props, { emit }) {
    const { t } = useI18n();
    const title = props.title;
    const rightIcon = props.rightIcon;
    const store = userStore();
    const back = () => {
      if (props.goBackNum && props.goBackNum == 2) {
        history.go(-2);
      } else {
        history.back();
      }
    };
    const rightClickHandle = () => {
      if (props.rightUrl) {
        uni.navigateTo({
          url: props.rightUrl,
        });
      }
    };
    const curLang = uni.getStorageSync("lang");
    return {
      back,
      t,
      curLang,
      rightClickHandle,
      rightIcon,
      store,
      title,
    };
  },
});
</script>
