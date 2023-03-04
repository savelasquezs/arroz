<template>
	<header class="flex">
		<div class="main">
			<div class="brand">
				<img src="../assets/arrocito.png" alt="" />
				<h3>El señor arroz</h3>
			</div>
			<div class="navegacion">
				<router-link class="nav-link flex" :to="{ name: 'Pedidos' }">
					<div class="branding flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 384 512"
						>
							<path
								fill="gray"
								d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"
							/>
						</svg>
						<p>Pedidos(todos)</p>
					</div>
				</router-link>
				<router-link class="nav-link flex" :to="{ name: 'Clientes' }">
					<div class="branding flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
						>
							<path
								fill="gray"
								d="m21.7 13.35l-1 1l-2.05-2.05l1-1a.55.55 0 0 1 .77 0l1.28 1.28c.21.21.21.56 0 .77M12 18.94l6.06-6.06l2.05 2.05L14.06 21H12v-2.06M12 14c-4.42 0-8 1.79-8 4v2h6v-1.89l4-4c-.66-.08-1.33-.11-2-.11m0-10a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4Z"
							/>
						</svg>
						<p>Clientes</p>
					</div>
				</router-link>
				<div class="branding flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 512 512"
					>
						<path
							fill="gray"
							d="M64 0C46.3 0 32 14.3 32 32v64c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1c-.7 4.7-1.1 9.5-1.1 14.3V448c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64v-69.6c0-4.8-.4-9.6-1.1-14.4l-22.7-149.6c-4.7-31.3-31.6-54.4-63.2-54.4H208v-32h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zm32 48h160c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48a24 24 0 1 1 0 48zm120-24a24 24 0 1 1-48 0a24 24 0 1 1 48 0zm-72 104a24 24 0 1 1 0-48a24 24 0 1 1 0 48zm168-104a24 24 0 1 1-48 0a24 24 0 1 1 48 0zm-72 104a24 24 0 1 1 0-48a24 24 0 1 1 0 48zm168-104a24 24 0 1 1-48 0a24 24 0 1 1 48 0zm-72 104a24 24 0 1 1 0-48a24 24 0 1 1 0 48z"
						/>
					</svg>
					<p>Cuadre de caja</p>
				</div>
				<router-link class="nav-link flex" :to="{ name: 'Productos' }">
					<div class="branding flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
						>
							<path
								fill="gray"
								d="M7 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM5 21a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9H3V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Zm8-17h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-2 19a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9h-4V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Zm8-17h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-2 19a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9h-4V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Z"
							/>
						</svg>
						<p>Productos</p>
					</div>
				</router-link>
				<div class="branding flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 48 48"
					>
						<path
							fill="gray"
							fill-rule="evenodd"
							d="M48 0H0v48h48V0ZM10.49 36v-4h2v1.038A3 3 0 0 1 15.484 36h24.022a2.999 2.999 0 0 1 2.982-3V22.996A3 3 0 0 1 40 21.67V18h2.49a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-30a2 2 0 0 1-2-2ZM25 20a4 4 0 1 1-8 0a4 4 0 0 1 8 0ZM4 12a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12Zm29.001 0H8.998A3 3 0 0 1 6 15v10.038A2.999 2.999 0 0 1 8.996 28h24.021A3.001 3.001 0 0 1 36 25V14.996A3 3 0 0 1 33.001 12Z"
							clip-rule="evenodd"
						/>
					</svg>
					<p>Gastos</p>
				</div>
				<div class="branding flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path
							fill="gray"
							d="M19 5c0-1.1-.9-2-2-2h-3v2h3v2.65L13.5 12H10V7H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.5L19 8.35V5M7 15c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1M5 4h5v2H5V4m14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1M7 20h4v-2l6 3h-4v2l-6-3Z"
						/>
					</svg>
					<p>Domiciliarios</p>
				</div>
				<div class="branding flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path
							fill="gray"
							d="M16.8 11H7.225l-.275 2h10.1l-.25-2ZM4 20l1.225-9H3q-.5 0-.788-.4t-.162-.875l1.425-5q.1-.325.35-.525t.6-.2h15.15q.35 0 .6.2t.35.525l1.425 5q.125.475-.162.875T21 11h-2.2l1.2 9h-2l-.675-5H6.675L6 20H4Z"
						/>
					</svg>
					<p>Gastos</p>
				</div>
				<div class="branding flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path
							fill="gray"
							d="M5 17v-7h2v7H5Zm6 0v-7h2v7h-2Zm-9 4v-2h20v2H2Zm15-4v-7h2v7h-2ZM2 8V6l10-5l10 5v2H2Z"
						/>
					</svg>
					<p>Contabilidad</p>
				</div>
			</div>
		</div>
		<div class="nav-footer"></div>
	</header>
</template>

<script>
export default {
	name: 'navbar',
	components: {},
};
</script>

<style scoped lang="scss">
header {
	z-index: 99;
	display: grid;
	width: 200px;
	height: 100vh;
	align-content: space-between;
	border-right: 1px solid rgba(0, 0, 0, 0.1);
	.branding {
		border-radius: 0 20px 20px 0;
		align-content: start;
		padding: 20px;
		color: gray;
		cursor: pointer;
		width: 100%;
		&:hover {
			background: #f5f5f5;
			color: black;
		}
		p {
			padding-left: 10px;
			margin: 0;
		}
	}
	.brand {
		padding: 20px;
		display: grid;
		place-items: center;
		img {
			width: 50px;
		}
	}
	.navegacion {
		margin-top: 20px;
	}
	h3 {
		text-align: center;
		font-size: 1.5rem;
	}
}
</style>
