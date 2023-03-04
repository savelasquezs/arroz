<template>
	<div class="input-group mb-3">
		<input type="text" class="form-control" placeholder="...Telefono" />
		<span class="input-group-text">@</span>
	</div>
</template>

<script>
export default {
	name: 'product_form',
	methods: {
		checkClick(e) {
			if (e.target == this.$refs.pedidoWrap) {
				Modal().toggleModal();
			}
		},
	},
};
</script>

<style scoped></style>
