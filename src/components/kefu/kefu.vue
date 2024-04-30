<template>
    <view>
        <nut-drag attract :boundary="{ top: 50, left: 0, bottom: 55, right: 0 }" :style="{ top: '50vh', right: '0px' }">
            <img class="kefu" type="primary" src="../../static/kefu.png" alt="" @click="kefuToPage('../mine/service')">
        </nut-drag>
    </view>
</template>

<script setup>



const kefuToPage = (url) => {

    uni.navigateTo({
        url,
    });
};
</script>

<style scoped lang="scss">
.kefu {
    width: 100rpx;
    height: 100rpx;
}
</style>
