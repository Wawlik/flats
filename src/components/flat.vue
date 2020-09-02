<template>
	<div class="flat">
		<div class="uk-card uk-card-default ">
			<!-- <router-link :to="'/flat/' + data.id" class="uk-link-reset"> -->
				<div class="uk-card-header">
					<div class="uk-grid-small uk-flex-middle" uk-grid>
						<div class="uk-width-auto uk-margin-small-right">
							<svg v-if="isFlatInFavs(data.id)" @click="favsRmFlat(data.id)" class="favs-rm-flat-icon" uk-tooltip="Убрать из избранного"
								xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
							<svg v-else @click="favsAddFlat()" class="favs-add-flat-icon" uk-tooltip="Добавить в избранное"
								xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" /></svg>
						</div>
						<div class="uk-width-expand">
							<h3 class="uk-card-title uk-margin-remove uk-text-truncate">{{data.attributes.title}}</h3>
							<p class="uk-text-meta uk-margin-remove-top uk-text-truncate">
								<span>Комнат: {{data.attributes.rooms}}</span>
								<br/>
								<span>Площадь: {{data.attributes.area}} {{data.attributes.unit}}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="uk-card-body flat-body">
					<p class="flat-body--text">{{getFlatAdr(data.attributes)}}</p>
				</div>
				<!-- :uk-tooltip="'title:'+(isAgent(data.relationships) ? 'Владелец' : 'Агент')" -->
				<div class="uk-card-footer">
					<div class="uk-grid-small uk-flex-middle" uk-grid>
						<div class="uk-width-auto">
							<img uk-tooltip="Агент" v-if="isAgent(data.relationships)" class="uk-border-circle" width="40" height="40" src="./../../public/agent.png">
							<img uk-tooltip="Владелец" v-else class="uk-border-circle" width="40" height="40" src="./../../public/owner.jpg">
						</div>
						<div class="uk-width-expand uk-flex">
							<p class="uk-card-title uk-margin-remove uk-flex flat-rls-name uk-flex-middle">
								<span class="uk-flex-middle">{{getRlsName(data.relationships)}}</span></p>
							<!-- <p class="uk-text-meta uk-margin-remove-top">
								<span>
									Номер в базе: {{data.relationships.id}}
								</span>
							</p> -->
						</div>
					</div>
					<!-- <a href="#" class="uk-button uk-button-text">Read more</a> -->
				</div>
			<!-- </router-link> -->
		</div>
	</div>
</template>

<script>
import _mixins from "../_mixins.js";

export default {
	name: 'flat',
	mixins: [_mixins],
	props: {
		data: Object,
		index: String
	},
	data(){
		return{
			lskey: 'flats'
		}
	},
	methods:{
		getRlsName(rls){
			const name = rls.attributes?.first_name;
			const name2 = rls.attributes?.last_name;
			return (name2 || name) ? name2 + ' ' + name : 'Неизвестно';
		},
		isAgent(rls){
			return rls?.type === 'agent';
		},
		getFlatAdr(atr){
			let result = '';
			const adr = atr?.address;
			result += (adr.city ? adr.city : '');
			result += (result ? ', ' : '') + (adr.street ? 'ул.'+ adr.street : '');
			result += (result ? ', ' : '') + (adr.house ? 'дом '+ adr.house : '');
			result += (result ? ', ' : '') + (adr.room ? 'кв. '+ adr.room : '');
			return result;
		},
		favsAddFlat() {
			let data = null;
			let obj = this.$props.data;
			try {
				let str = localStorage.getItem(this.lskey);
				if (str) {
					data = JSON.parse(str);
					data.splice(0, 0, obj);
					let misc = JSON.stringify(data);
					localStorage.setItem(this.lskey, misc);
				} else {
					data = JSON.stringify([obj]);
					localStorage.setItem(this.lskey, data);
				}
				this.notifyOk("Изменения успешно сохранены");
				// update list to see favs updated
				this.$forceUpdate();
			} catch (error) {
				console.error(error);
				this.notifyErr(
					"Что-то пошло не так. Попробуйте перезагрузить страницу"
				);
			}
		},
		favsRmFlat(id) {
			let data = null;
			try {
				let str = localStorage.getItem(this.lskey);
				if (str) {
					data = JSON.parse(str);
					const ind = data.findIndex(one => (''+one.id === ''+id));
					if(~ind){
						data.splice(ind, 1);
						let misc = JSON.stringify(data);
						localStorage.setItem(this.lskey, misc);
						this.$forceUpdate();
					} else {
						this.notifyErr(
							"Что-то пошло не так. Попробуйте перезагрузить страницу"
						);
					}
				}
				this.notifyOk("Изменения успешно сохранены");
				// update list to see favs updated
				this.$forceUpdate();
			} catch (error) {
				console.error(error);
				this.notifyErr(
					"Что-то пошло не так. Попробуйте перезагрузить страницу"
				);
			}
		},
		isFlatInFavs(id){
			try {
				let str = localStorage.getItem(this.lskey);
				if (str) {
					const data = JSON.parse(str);
					const ind = data.findIndex(one => (''+one.id === ''+id));
					return ~ind;
				}
			} catch (error) {
				console.error(error);
				this.notifyErr(
					"Что-то пошло не так. Попробуйте перезагрузить страницу"
				);
			}
			return;
		}
	},
}
</script>

<style>
.flat-body--text{
	height: 2.8em;
	overflow: hidden;
	line-height: 1.4em;
}
.flat-rls-name{
	height: 2.8em;
	overflow: hidden;
}
.favs-add-flat-icon, .favs-rm-flat-icon{
	cursor: pointer;
}
.favs-add-flat-icon:focus, .favs-rm-flat-icon:focus{
	outline: none;
}
</style>
