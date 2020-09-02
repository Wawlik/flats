<template>
	<div class="favs">
		<!-- <h2>Предложения,<br/> которые Вам понравились</h2> -->
		<div class="uk-grid uk-grid-small uk-child-width-1-4@l 
			uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@xs	uk-padding">
			<flat v-for="flat in fflats" :key="'flat-' + flat.id" 
				:data="flat" />
		</div>
		<div v-if="fflats && !fflats.length">
			<p class="uk-text-lead">Добавьте в избранное квартиры на <br/><router-link to="/">главной странице</router-link></p>
		</div>
	</div>
</template>

<script>
import flat from '@/components/flat.vue'
import _mixins from "../_mixins.js";

export default {
	name: "favs",
	components: {
		flat
	},
	mixins: [_mixins],
	data(){
		return {
			fflats: null,
			lskey: "flats"
		}
	},
	methods:{
		getFflats() {
			try {
				let str = localStorage.getItem(this.lskey);
				if (str) {
					this.fflats = JSON.parse(str);
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
	mounted(){
		this.getFflats();
	},
};
</script>
