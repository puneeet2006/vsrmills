<template>
	<div>
		<div v-if="pageLoader == true" class="fixed-center">
			<q-spinner-gears color="primary" size="6em" />
			<q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
		</div>
		<div v-if="pageLoader == false">
			<div v-if="product_parallex_img">
				<div class="q-col-gutter-md row items-start">
					<q-img :src="product_parallex_img" style="height:30vh">
						<div class="absolute-bottom text-h6 text-center text-uppercase">
							{{ name }}
						</div>
					</q-img>
				</div>
				<q-page padding>
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-12 q-pa-lg" v-for="(item,index) in images" :key="index">
							<q-card dark bordered class="shadow-20">
								<q-card-section>
									<div class="text-h6 text-uppercase">{{ item.img_caption }}</div>
								</q-card-section>
								<img v-img:spimg :src="item.img_link" style="width: 100%;height:400px" :alt="item.img_caption">
								</img>
							</q-card>
						</div>
					</div>
				</q-page>
			</div>
			<div v-else>
				<q-page padding>
					<q-card class="absolute-center text-h5 q-pa-md shadow-20">
						{{ name }}<br>
						<span class="text-negative mtt-20 text-h5 flex justify-center"> Data Not Available </span>
						<br>
						<div class="text-center">
							<q-btn class="flex text-center" color="primary" icon="keyboard_arrow_left" label="Back" @click="goBack()" />
						</div>
					</q-card>
				</q-page>
			</div>
		</div>
		<Enquiry />
	</div>
</template>
<script>
import
{
	firebaseStorage
}
from 'boot/firebase'
import Enquiry from '../components/Enquiry.vue'

export default
{
	data()
	{
		return {
			name: null,
			product_parallex_img: null,
			images: [],
			pageLoader: true,
		}
	},
	components:
	{
		Enquiry
	},
	created()
	{
		this.initSubProducts();
	},
	methods:
	{
		initSubProducts: function()
		{
			let id = this.$route.params.id;
			let productData = firebaseStorage.collection('sub_products');
			let query = productData.where('id', '==', id).get()
				.then(snapshot =>
				{
					if (snapshot.empty)
					{
						console.log('No matching documents.');
						return;
						this.pageLoader = false;
					}

					snapshot.forEach(doc =>
					{
						let subProduct = doc.data();
						this.name = subProduct.name;
						this.product_parallex_img = subProduct.images[0].img_link;
						this.images = subProduct.images;

					});
					this.pageLoader = false;

				})
				.catch(err =>
				{
					console.log('Error getting documents', err);
					this.pageLoader = false;
				});

		},
		goBack: function()
		{
			this.$router.go(-1);
		}
	}
};

</script>
