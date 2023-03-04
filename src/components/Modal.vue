<template>
	<transition name="fade" appear><div class="modal-overlay"></div></transition>
	<transition name="slide" appear><slot></slot></transition>
</template>

<script>
export default {
	name: 'Modal',
};
</script>

<style scoped>
.card {
	position: fixed;
	background: white;
	z-index: 101;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 30px;
}
.modal-overlay {
	z-index: 100;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.slide-enter,
.slide-leave-to {
	opacity: 0;
	transform: scale(0.3) translateY(-50%);
}
</style>
