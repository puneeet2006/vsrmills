<template>
	<div>
		<div v-if="pageLoader == true" class="fixed-center">
			<q-spinner-gears color="primary" size="6em" />
			<q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
		</div>
		<div v-if="pageLoader == false">
			<div v-if="product_desc">
				<div class="q-col-gutter-md row items-start">
					<q-img :src="product_parallex_img" style="height:30vh">
						<div class="absolute-bottom text-h3 text-center text-uppercase">
							{{ this.product_name }}
						</div>
					</q-img>
				</div>
				<q-page padding>
					<q-card class="q-pa-md">
						<div class="text-body1"><span class="text-uppercase"><b>{{ this.product_name }} </b> </span> <span v-if="product_desc">:- {{ this.product_desc }}</span></div>
					</q-card>
					<div v-if="product_id == 'rolling_mills_parts'">
						<q-card class="q-pa-md mtt-20">
							<q-list>
								<q-item v-for="(item,index) in product_subtypes" :key="item.id">
									<q-item-section top avatar>
										<q-avatar color="primary" text-color="white">{{ index+1 }}</q-avatar>
									</q-item-section>
									<q-item-section>
										<q-item-label class="text-weight-medium text-uppercase text-primary text-body">{{ item }}</q-item-label>
									</q-item-section>
									<q-separator spaced inset />
								</q-item>
							</q-list>
						</q-card>
					</div>
					<div v-else>
						<div v-if="product_subtypes.length > 0">
							<q-card class="q-pa-md mtt-20">
								<q-list>
									<q-item v-for="(item,index) in product_subtypes" :key="item.id">
										<q-item-section top avatar>
											<q-avatar color="primary" text-color="white">{{ index+1 }}</q-avatar>
										</q-item-section>
										<q-item-section>
											<q-item-label class="text-weight-medium text-uppercase text-primary text-body">{{ item.name }}</q-item-label>
										</q-item-section>
										<q-item-section side top>
											<q-btn color="primary" icon-right="keyboard_arrow_right" label="Know More" @click="openSubTypes(item.id)" />
										</q-item-section>
										<q-separator spaced inset />
									</q-item>
								</q-list>
							</q-card>
						</div>
					</div>
					<q-card class="q-pa-md mtt-20">
						<div class="text-body1"><b>Gallery</b></div>
						<div class="row mtt-20" v-if="product_id == 'rolling_mills_parts'">
							<div class="col-md-3 col-sm-3 col-xs-12 q-pa-sm" style="margin:0 auto;" v-for="(item,index) in rolling_mill_parts_imgs" :key="index">
								<q-card dark bordered class="shadow-20">
									<q-card-section>
										<div class="text-h6 text-uppercase">{{ item.caption }}</div>
									</q-card-section>
									<img v-img:spimg :src="item.link" style="width: 100%;height:200px" :alt="item.caption">
									</img>
								</q-card>
							</div>
						</div>
						<div v-else class="row mtt-20">
							<div class="col-md-6 col-sm-6 col-xs-12 q-pa-md" style="margin:0 auto;" v-for="(item,index) in product_images" :key="index">
								<img v-img:pimg :src="item" class="shadow-10 " style="width: 100%;height:400px;" :alt="product_name">
								</img>
							</div>
						</div>
					</q-card>
					<q-card class="q-pa-md mtt-20">
						<div class="text-body1"><b>Production Video</b></div>
						<div class="row mtt-20 flex flex-center">
							<div v-if="video_link" class="col-md-4 col-sm-12 col-xs-12">
								<iframe class="w-100" height="400" :src="video_link">
								</iframe>
							</div>
							<div v-else>
								<div class="text-h6 mbb-40 text-primary">Production Video coming soon!</div>
							</div>
						</div>
					</q-card>
					<Enquiry />
				</q-page>
			</div>
			<div v-else>
				<q-page padding>
					<q-card class="absolute-center text-h5 q-pa-md shadow-20">
						{{ product_name }}<br>
						<span class="text-negative mtt-20 text-h5 flex justify-center"> Data Not Available </span>
						<br>
						<div class="text-center">
							<q-btn class="flex text-center" color="primary" icon="keyboard_arrow_left" label="Back" @click="goBack()" />
						</div>
					</q-card>
				</q-page>
			</div>
		</div>
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
			product_name: null,
			product_parallex_img: null,
			product_desc: null,
			product_subtypes: [],
			product_types: [],
			product_images: [],
			product_id: this.$route.params.id.trim(),
			rolling_mill_parts_imgs: [],
			pageLoader: true,
			video_link: null,
		}
	},
	components:
	{
		Enquiry
	},
	created()
	{
		this.initProducts();
	},

	methods:
	{
		initProducts: function()
		{
			this.pageLoader = true;
			let id = this.$route.params.id;
			let productData = firebaseStorage.collection('products');
			let query = productData.where('id', '==', id).get()
				.then(snapshot =>
				{
					if (snapshot.empty)
					{
						this.pageLoader = false;
						console.log('No matching documents.');
						return;
					}

					snapshot.forEach(doc =>
					{
						let product = doc.data();
						this.product_name = product.name;
						this.product_parallex_img = product.thumb_img;
						this.product_types = product.sub_type;
						this.product_images = product.images;
						this.product_desc = product.desc;
						this.video_link = product.video_link;
					});
					if (this.product_id.trim() === 'rolling_mills_parts')
					{
						this.product_subtypes = this.product_types;
						this.buildRollingPartsGallery();
					}
					else
					{

						if (this.product_types.length > 0)
						{

							this.fetchSubTypes();
						}
						else
						{
							this.pageLoader = false;
						}
					}
				})
				.catch(err =>
				{
					console.log('Error getting documents', err);
				});
		},
		fetchSubTypes: function()
		{
			let product_types = this.product_types;

			product_types.forEach(types =>
			{
				types.get().then(snap =>
				{
					let data = snap.data()
					let subId = data.id;
					let subName = data.name;

					let subTypes = {
						id: subId,
						name: subName,
					}
					this.product_subtypes.push(subTypes);
				})
			})
			this.pageLoader = false;

		},
		buildRollingPartsGallery: function()
		{
			let id = this.$route.params.id;
			let imageRef = this.product_images;
			let productData = firebaseStorage.collection('sub_products');
			let query = productData.where('id', '==', id.trim()).get()
				.then(snapshot =>
				{
					if (snapshot.empty)
					{
						console.log('No matching documents.');
						return;
					}

					snapshot.forEach(doc =>
					{
						let subProduct = doc.data();
						this.rolling_mill_parts_imgs = subProduct.images;
						console.log(this.rolling_mill_parts_imgs)
					});

				})
				.catch(err =>
				{
					console.log('Error getting documents', err);
				});
			this.pageLoader = false;

		},
		openSubTypes: function(id)
		{
			this.$router.push(
			{
				name: 'OpenSubProduct',
				params:
				{
					id: id
				}
			})
		},
		goBack: function()
		{
			this.$router.go(-1);
		}

	}
};

</script>
