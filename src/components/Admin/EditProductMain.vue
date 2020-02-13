<template>
	<div>
		<div v-if="pageLoader == true" class="fixed-center">
			<q-spinner-gears color="primary" size="6em" />
			<q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
		</div>
		<q-page padding class="page-q">
			<div class="text-h6 text-center text-uppercase mbb-20 mtt-20">Edit Product</div>
			<div class="row flex flex-center">
				<div class="col-md-9">
					<q-tabs v-model="tab" class="bg-primary text-white shadow-2" active-color="yellow">
						<q-tab name="p_name" icon="view_list" label="Name" v-scroll-to="'#p_name'" />
						<q-tab name="p_image" icon="add_photo_alternate" label="Upload Image" v-scroll-to="'#p_image'" />
						<q-tab name="p_video" icon="video_call" label="Video" v-scroll-to="'#p_video'" />
						<q-tab name="p_gallery" icon="photo_library" label="Gallery" v-scroll-to="'#p_gallery'" />
						<q-tab name="p_back" icon="arrow_back" label="Back" @click="goBack()" />
					</q-tabs>
				</div>
				<div class="col-md-9 scroll_container" style="overflow-y:scroll;height:60vh">
					<div class="col-md-9" id="p_name">
						<q-card class="q-pa-md">
							<div class="text-h6 text-center text-primary text-uppercase mbb-20 mtt-20">{{ product_name }}</div>
							<q-form @submit="saveProductDetails" class="q-gutter-md">
								<q-input filled v-model="product_name" label="Product name *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Product Name']" />
								<q-input filled v-model="product_desc" type="textarea" label="Product Description *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Product Description']" />
								<div class="flex justify-end">
									<q-btn label="Submit" :loading="loading" type="submit" color="primary" />
								</div>
							</q-form>
						</q-card>
					</div>
					<div class="col-md-9 mtt-40 mbb-40" id="p_image">
						<q-card class="q-pa-md">
							<div class="text-h6 text-center text-primary text-uppercase mbb-20 mtt-20"> Upload Image</div>
							<q-form @submit="uploadImage" class="q-gutter-md">
								<q-input @change="onFileChange" filled dense type="file" class="mtt-10" />
								<div class="flex justify-end">
									<q-btn label="Upload Image" :loading="loading" type="submit" color="primary" />
								</div>
							</q-form>
						</q-card>
					</div>
					<div class="col-md-9 mbb-40" id="p_video">
						<q-card class="q-pa-md">
							<q-form @submit="saveVideoLink" class="q-gutter-md">
								<div class="text-h6 text-center text-primary text-uppercase mbb-20 mtt-20"> Video Link</div>
								<q-input filled v-model="video_link" label="Video Link *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Video Link']" />
								<div class="flex justify-end">
									<q-btn label="Submit" :loading="loading" type="submit" color="primary" />
								</div>
							</q-form>
						</q-card>
					</div>
					<div class="col-md-9" id="p_gallery">
						<q-card class="q-pa-md">
							<div class="text-h6 text-center text-primary text-uppercase mbb-20 mtt-20">Images</div>
							<div class="row flex justify-center mtt-10 mbb-10" v-if="product_id == 'rolling_mills_parts'">
								<div class="text-center text-h5">Rolling Mills Parts will update soon</div>
							</div>
							<div class="row" v-else>
								<div v-if="product_images.length > 0">
									<div class="col-md-3 col-sm-3 col-xs-12 q-pa-sm" style="margin:0 auto;" v-for="(item,index) in product_images" :key="index">
										<q-card bordered class="shadow-20 flex" style="width: 100%;height:100%">
											<img v-img:spimg :src="item" style="width: 100%;height:200px;margin-bottom:0 !important">
											</img>
											<q-card-actions align="right" class="w-100">
												<div class="text-right">
													<q-btn outline :loading="loading" class="mtt-10" color="primary" icon-right="delete" label="delete " @click="deleteImage(item)"></q-btn>
												</div>
											</q-card-actions>
										</q-card>
									</div>
								</div>
								<div v-else>
									<div class="mtt-10 mbb-10">
										<div>
											No images available.
										</div>
									</div>
								</div>
							</div>
						</q-card>
					</div>
				</div>
			</div>
		</q-page>
	</div>
</template>
<script>
import
{
	firebaseStorage,
	firebaseImageStorage
}
from 'boot/firebase'
import
{
	Notify
}
from 'quasar'

import * as firebase from "firebase/app";
export default
{
	data()
	{
		return {
			tab: "p_name",
			product_name: null,
			product_parallex_img: null,
			product_desc: null,
			product_subtypes: [],
			product_types: [],
			product_images: [],
			product_id: this.$route.params.id.trim(),
			rolling_mill_parts_imgs: [],
			video_link: null,
			pageLoader: true,
			loading: false,
			attachment:
			{
				name: null,
				file: null
			},
		}
	},
	created()
	{
		this.initProducts();
	},

	methods:
	{

		deleteImage: function(imgUrl)
		{
			this.loading = true;
			let id = this.product_id;
			let productRef = firebaseStorage.collection('products').doc(id).update(
			{
				"images": firebase.firestore.FieldValue.arrayRemove(imgUrl)

			}).then(() =>
			{
				Notify.create(
				{
					message: 'Image Deleted Successfully',
					color: 'green'
				});
				this.initProducts();
				this.loading = false;
			}).catch((error) =>
			{
				Notify.create(
				{
					message: 'Error Deleting Image!',
					color: 'red'
				});
				this.loading = false;
			});


		},
		saveProductDetails: function()
		{
			this.loading = true;
			let id = this.product_id;

			firebaseStorage.collection('products').doc(id).update(
			{
				"name": this.product_name.toUpperCase(),
				"desc": this.product_desc
			}).then(() =>
			{
				Notify.create(
				{
					message: 'Saved Successfully',
					color: 'green'
				});
				this.prompt = false;
				this.initProducts();
			}).catch((error) =>
			{
				Notify.create(
				{
					message: 'Saving Error!',
					color: 'red'
				});
			});

			this.loading = false;
		},
		saveVideoLink: function()
		{
			this.loading = true;
			let id = this.product_id;

			firebaseStorage.collection('products').doc(id).update(
			{
				"video_link": this.video_link
			}).then(() =>
			{
				Notify.create(
				{
					message: 'Saved Successfully',
					color: 'green'
				});
				this.initProducts();
			}).catch((error) =>
			{
				Notify.create(
				{
					message: 'Saving Error!',
					color: 'red'
				});
			});

			this.loading = false;
		},
		uploadImage: function()
		{
			this.loading = true;
			if (this.attachment.file)
			{
				const file = this.attachment.file;
				const name = this.attachment.name;
				let imgValidation = this.imageValidation();
				let id = this.$route.params.id;
				let refDir = 'products/product_gallery/' + id + '/' + file.name;
				if (imgValidation)
				{
					firebaseImageStorage.ref(refDir).put(file)
						.then(response =>
						{
							response.ref.getDownloadURL().then((downloadURL) =>
								{
									this.updateImageRecord(downloadURL)
									Notify.create(
									{
										message: 'Upload Successful',
										color: 'green'
									})
									this.loading = false;


								})
								.catch(err =>
								{
									Notify.create(
									{
										message: 'Error in saving',
										color: 'red'
									})
									this.loading = false;
								})

						})
				}
				else
				{
					Notify.create(
					{
						message: 'File type must be jpg, jpeg , png and less than 2MB',
						color: 'red'
					})
					this.loading = false;
				}
			}
			else
			{
				Notify.create(
				{
					message: 'Please select an image',
					color: 'red'
				})
				this.loading = false;
			}
		},
		updateImageRecord: function(imgurl)
		{
			let docID = this.product_id;
			let imgURL = imgurl;
			let ref = firebaseStorage.collection('products').doc(docID).update(
			{
				images: firebase.firestore.FieldValue.arrayUnion(imgURL)

			}).then(() =>
			{
				Notify.create(
				{
					message: 'Image Added Successfully',
					color: 'green'
				});
				this.prompt = false;
				this.initProducts();
			}).catch((error) =>
			{
				console.log(error)
				Notify.create(
				{
					message: 'Error Adding Image!',
					color: 'red'
				});
			});
			this.loading = false;
		},

		onFileChange: function(event)
		{
			this.attachment.name = 'red';
			this.attachment.file = event.target.files[0]
		},
		imageValidation: function()
		{
			const file = this.attachment.file;
			let typeValidation = false;
			let sizeValidation = false
			console.log(typeof file)
			if (file === null)
			{
				return false;
			}
			else
			{
				if (file['type'] === 'image/jpg' || file['type'] === 'image/jpeg' || file['type'] === 'image/png')
				{
					typeValidation = true;
				}

				if (file.size < 2084 * 2084)
				{
					sizeValidation = true;
				}

				if (typeValidation == true && sizeValidation == true)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		},
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
				})
				.catch(err =>
				{
					console.log('Error getting documents', err);
				});
		},

		goBack: function()
		{
			this.$router.go(-1);
		},

	}
};

</script>
