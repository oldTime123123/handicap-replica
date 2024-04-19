<template>
	<div class="peeek-loading center" v-if="loading">
		<div class="cssload-loader"></div>
	</div>
</template>

<script setup>
	const loading = ref(false)
	defineExpose({
		loading
	})
</script>

<style lang="scss">
	.peeek-loading {
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		left: 0;
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 99999;

	}
.cssload-loader {
	width: 146px;
	height: 146px;
	line-height: 146px;
	margin: 49px auto;
	position: relative;
	box-sizing: border-box;
	text-align: center;
	z-index: 0;
	text-transform: uppercase;
		-o-text-transform: uppercase;
		-ms-text-transform: uppercase;
		-webkit-text-transform: uppercase;
		-moz-text-transform: uppercase;
}

.cssload-loader:before,
.cssload-loader:after {
	opacity: 0;
	box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	content: "\0020";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 97px;
	border: 5px solid rgb(194,255,61);
	box-shadow: 0 0 49px rgb(194,255,61), inset 0 0 49px rgb(194,255,61);
		-o-box-shadow: 0 0 49px rgb(194,255,61), inset 0 0 49px rgb(194,255,61);
		-ms-box-shadow: 0 0 49px rgb(194,255,61), inset 0 0 49px rgb(194,255,61);
		-webkit-box-shadow: 0 0 49px rgb(194,255,61), inset 0 0 49px rgb(194,255,61);
		-moz-box-shadow: 0 0 49px rgb(194,255,61), inset 0 0 49px rgb(194,255,61);
}

.cssload-loader:after {
	z-index: 1;
	animation: cssload-gogoloader 2.3s infinite 1.15s;
		-o-animation: cssload-gogoloader 2.3s infinite 1.15s;
		-ms-animation: cssload-gogoloader 2.3s infinite 1.15s;
		-webkit-animation: cssload-gogoloader 2.3s infinite 1.15s;
		-moz-animation: cssload-gogoloader 2.3s infinite 1.15s;
}

.cssload-loader:before {
	z-index: 2;
	animation: cssload-gogoloader 2.3s infinite;
		-o-animation: cssload-gogoloader 2.3s infinite;
		-ms-animation: cssload-gogoloader 2.3s infinite;
		-webkit-animation: cssload-gogoloader 2.3s infinite;
		-moz-animation: cssload-gogoloader 2.3s infinite;
}



@keyframes cssload-gogoloader {
	0% {
		transform: scale(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}

@-o-keyframes cssload-gogoloader {
	0% {
		-o-transform: scale(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		-o-transform: scale(1);
		opacity: 0;
	}
}

@-ms-keyframes cssload-gogoloader {
	0% {
		-ms-transform: scale(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		-ms-transform: scale(1);
		opacity: 0;
	}
}

@-webkit-keyframes cssload-gogoloader {
	0% {
		-webkit-transform: scale(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		-webkit-transform: scale(1);
		opacity: 0;
	}
}

@-moz-keyframes cssload-gogoloader {
	0% {
		-moz-transform: scale(0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		-moz-transform: scale(1);
		opacity: 0;
	}
}
</style>
