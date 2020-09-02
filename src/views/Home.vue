<template>
	<div class="home">
		<div v-if="fflats && fflats.length" 
			class="uk-grid uk-grid-small uk-child-width-1-4@l 
			uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@xs	uk-padding"
			uk-grid>
			<flat v-for="(flat,ind) in fflats" :key="'flat-' + flat.id" 
				:data="flat" :index="''+ind" />
		</div>
		<div class="uk-align-center" v-else>
			<div class="orbit-spinner uk-margin-auto">
				<div class="orbit"></div>
				<div class="orbit"></div>
				<div class="orbit"></div>
			</div>
			<div class="uk-margin-small-top">
				<p class="uk-text-meta uk-margin-remove-top uk-text-truncate">
				Ищем подходящие для вас варианты...</p>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import flat from "@/components/flat.vue";
import flats from '../data/flats.json';

export default {
	name: "Home",
	components: {
		flat
	},
	data(){
		return {
			fflats: null
		}
	},
	methods:{
		async getFlats(){
			let promise = new Promise((resolve) => {
				setTimeout(() => resolve(flats.response), 1000)
			});
			this.fflats = await promise;
		}
	},
	mounted(){
		this.getFlats();
	}
};
</script>

<style>
/* spinner */
	.orbit-spinner, .orbit-spinner * {
      box-sizing: border-box;
    }

    .orbit-spinner {
      height: 55px;
      width: 55px;
      border-radius: 50%;
      perspective: 800px;
    }

    .orbit-spinner .orbit {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .orbit-spinner .orbit:nth-child(1) {
      left: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
      border-bottom: 3px solid #ff1d5e;
    }

    .orbit-spinner .orbit:nth-child(2) {
      right: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
      border-right: 3px solid #ff1d5e;
    }

    .orbit-spinner .orbit:nth-child(3) {
      right: 0%;
      bottom: 0%;
      animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
      border-top: 3px solid #ff1d5e;
    }

    @keyframes orbit-spinner-orbit-one-animation {
      0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-two-animation {
      0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-three-animation {
      0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
</style>