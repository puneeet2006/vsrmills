<template>
	<div class="carosuel-main">
		<div class="q-gutter-md row flex flex-center" style="height:100vh !important" v-if="carosuel_loader">
			<div>
				<q-spinner-grid color="primary" size="3em" />
				<q-tooltip :offset="[0, 8]">QSpinnerAudio</q-tooltip>
			</div>
		</div>
		<q-carousel animated height="70%" v-model="slide" navigation infinite :autoplay="15000" transition-prev="slide-right" transition-next="slide-left">
			<q-carousel-slide div v-for="(item,index) in carousel_data" :key="index" :name="index" :img-src="item.img">
				<div class="row">
					<div class="col-md-6 flex items-center">
						<div class="asap-font text-white text-h3 q-pa-md image-title carousel-heading">
							{{ item.heading }}</br>
							<div class="text-h5">{{ item.subtitle }}</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="flex justify-end mtt-10">
							<q-card squared class="mbb-30 carosuel-property-card shadow-20 flex items-end ">
								<q-img src="statics/experience.jpg">
									<div class="absolute-bottom text-uppercase text-weight-bolder text-h5 text-left">
										{{ current_exp }}+ Years of Experience
									</div>
								</q-img>
							</q-card>
						</div>
						<div class="flex justify-end">
							<q-card squared class="mbb-30 carosuel-property-card shadow-20">
								<q-img src="statics/makeinindia.jpg"></q-img>
							</q-card>
						</div>
						<div class="flex justify-end">
							<q-card squared class="mbb-30 carosuel-property-card  shadow-20">
								<q-img src="statics/iso9001.jpg"></q-img>
							</q-card>
						</div>
					</div>
				</div>
			</q-carousel-slide>
		</q-carousel>
	</div>
</template>
<script>
import
{
	firebaseStorage
}
from 'boot/firebase'
import
{
	mapGetters
}
from "vuex";

export default
{
	data()
	{
		return {
			slide: 1,
			carousel_data: [],
			carosuel_loader: true,
		}

	},
	computed:
	{
		...mapGetters(
		{
			current_exp: "global/getCurrenctExp"
		})
	},
	mounted()
	{
		this.$store.dispatch('global/processCurrentYear');
		let carosuelData = firebaseStorage.collection('carosuel').get()
			.then(querySnapshot =>
			{
				this.carousel_data = querySnapshot.docs.map(doc => doc.data());
				this.carosuel_loader = false;
			})
			.catch(err =>
			{
				console.log('Error getting document', err);
				this.carosuel_loader = false;

			});
	}


};

</script>
