<template>
	<div>
		<q-page padding>
			<div class="flex justify-end mtt-20">
				<q-btn size="sm" label="Add Rolling Mills Parts" color="primary" @click="openPrompt()" />
			</div>
			<div class="row mtt-20">
				<div class="col-md-4 col-sm-4 col-xs-12 q-pa-md" style="margin:0 auto;" v-for="(item,index) in rolling_mill_parts_imgs" :key="index">
					<q-card dark bordered class="shadow-20">
						<q-card-section>
							<div class="text-body text-uppercase">{{ item.caption }}</div>
						</q-card-section>
						<img v-img:spimg :src="item.link" style="width: 100%;height:200px" :alt="item.caption">
						</img>
						<q-card-actions align="right" class="bg-white text-primary">
							<q-btn outlined @click="deleteImage(item.caption,item.link)">Delete Part</q-btn>
						</q-card-actions>
					</q-card>
				</div>
				<q-dialog v-model="prompt" persistent>
					<q-card bordered style="min-width: 350px">
						<q-card-section>
							<div class="text-h6">Add Rolling Mill Parts</div>
						</q-card-section>
						<q-card-section>
							<q-input @change="onFileChange" filled dense type="file" class="mtt-10" />
							<q-input filled label="Part Name" class="mtt-10" :loading=" loading" v-model="label" @keyup.enter="prompt = false" :rules="[
					          val => !!val || '* Required',
					          val => val.length <= 50 || 'Please use maximum 50 characters'
					        ]" />
						</q-card-section>
						<q-card-actions align="right" class="text-primary">
							<q-btn flat label="Cancel" v-close-popup />
							<q-btn label="Save" @click="saveParts()" />
						</q-card-actions>
					</q-card>
				</q-dialog>
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
import * as firebase from "firebase/app";

import
{
	Notify
}
from 'quasar'
export default
{
	data()
	{
		return {
			rolling_mill_parts_imgs: [],
			prompt: false,
			label: null,
			attachment:
			{
				name: null,
				file: null
			},
			loading: false,

		}
	},
	created()
	{
		this.buildRollingPartsGallery();
	},
	methods:
	{
		openPrompt: function()
		{

			this.prompt = true;
			console.log(this.prompt)

		},
		buildRollingPartsGallery: function()
		{
			let imageRef = this.product_images;
			let productData = firebaseStorage.collection('sub_products');
			let query = productData.where('id', '==', 'rolling_mills_parts').get()
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
					});

				})
				.catch(err =>
				{
					console.log('Error getting documents', err);
				});
		},
		deleteImage: function(imgCaption, imgUrl)
		{
			this.loading = true;
			let item = firebaseStorage.collection('sub_products').doc('rolling_mills_parts').update(
			{
				"images": firebase.firestore.FieldValue.arrayRemove(
				{
					'caption': imgCaption,
					'link': imgUrl
				})

			}).then(() =>
			{
				Notify.create(
				{
					message: 'Image Deleted Successfully',
					color: 'green'
				});
				this.buildRollingPartsGallery();
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
		saveParts: function()
		{
			this.loading = true;
			if (this.attachment.file)
			{
				const file = this.attachment.file;
				const name = this.attachment.name;
				let imgValidation = this.imageValidation();
				let id = this.$route.params.id;
				let label = this.label;
				let refDir = '/sub_products/rolling_mills_parts/' + file.name;
				if (imgValidation)
				{
					firebaseImageStorage.ref(refDir).put(file)
						.then(response =>
						{
							response.ref.getDownloadURL().then((downloadURL) =>
								{
									this.addRecord(label, downloadURL)
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
		addRecord: function(label, imgurl)
		{
			let docID = this.product_id;
			let imgURL = imgurl;
			let ref = firebaseStorage.collection('sub_products').doc('rolling_mills_parts').update(
			{
				images: firebase.firestore.FieldValue.arrayUnion(
				{
					'caption': label,
					'link': imgurl
				})

			}).then(() =>
			{
				Notify.create(
				{
					message: 'Image Added Successfully',
					color: 'green'
				});
				this.prompt = false;
				this.buildRollingPartsGallery();
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
	},
};

</script>
