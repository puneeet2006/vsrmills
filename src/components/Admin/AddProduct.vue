<template>
	<div class="q-pa-md">
		<div class="text-center text-h5 mtt-20 mbb-20 text-primary">Add a Product</div>
		<div class="row flex flex-center">
			<div class="col-md-9">
				<q-stepper v-model="step" ref="stepper" alternative-labels color="primary" animated>
					<q-step :name="1" title="Product Name" icon="settings" :done="step > 1">
						<q-form @submit="saveProductDetails" class="q-gutter-md">
							<q-input dense filled v-model="product_name" label="Product name *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Product Name']" />
							<q-input dense filled v-model="product_desc" type="textarea" label="Product Description *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Product Description']" />
							<div class="flex justify-end">
								<q-btn label="Submit" :loading="loading" type="submit" color="primary" />
							</div>
						</q-form>
					</q-step>
					<q-step :name="2" title="Thumb Image" icon="create_new_folder" :done="step > 2">
						<q-form @submit="uploadThumbImage" class="q-gutter-md">
							<q-input @change="onFileChange" filled dense type="file" class="mtt-10" />
							<div class="flex justify-end">
								<q-btn label="Upload Image" :loading="loading" type="submit" color="primary" />
							</div>
						</q-form>
					</q-step>
					<q-step :name="3" title="Finish" icon="add_comment" :done="step == 3">
						<span class="text-uppercase fw-500 text-primary">{{ product_name }}</span> Added Successfully
						<div class="flex justify-end mtt-20">
							<q-btn label="Open Product" :loading="loading" @click="openProduct()" color="primary" />
						</div>
					</q-step>
				</q-stepper>
			</div>
		</div>
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
			step: 1,
			product_name: null,
			product_desc: null,
			product_id: null,
			loading: false,
			order: "",
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
		initProducts: function()
		{
			let productCollection = firebaseStorage.collection('products').get()
				.then(querySnapshot =>
				{
					let products = querySnapshot.docs.map(doc => doc.data());
					this.order = products.length;
				})
				.catch(err =>
				{
					this.pageLoader = false;
				});
		},
		saveProductDetails: function()
		{
			this.loading = true;
			const id = this.generateProductId();

			firebaseStorage.collection('products').doc(id).set(
			{
				id: id,
				name: this.product_name.toUpperCase(),
				desc: this.product_desc,
				images: [],
				sub_type: [],
				thumb_img: "",
				order: this.order
			}).then(() =>
			{
				Notify.create(
				{
					message: 'Saved Successfully',
					color: 'green'
				});
				this.step = 2;
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
		onFileChange: function()
		{
			this.attachment.name = 'red';
			this.attachment.file = event.target.files[0]
		},
		generateProductId: function()
		{
			let product_name = this.product_name.trim();
			let product_id = product_name.replace(' ', '_');
			this.product_id = product_id;
			return product_id;
		},
		imageValidation: function()
		{
			const file = this.attachment.file;
			let typeValidation = false;
			let sizeValidation = false;
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
		uploadThumbImage: function()
		{
			this.loading = true;
			if (this.attachment.file)
			{
				const file = this.attachment.file;
				const name = this.attachment.name;
				let imgValidation = this.imageValidation();
				let refDir = '/products/thumbnail/' + file.name;
				if (imgValidation)
				{
					firebaseImageStorage.ref(refDir).put(file)
						.then(response =>
						{
							response.ref.getDownloadURL().then((downloadURL) =>
								{
									this.updateThumbImageRecord(downloadURL)
									Notify.create(
									{
										message: 'Upload Successful',
										color: 'green'
									})
									this.step = 3;
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
		updateThumbImageRecord: function(img)
		{
			let docID = this.product_id;
			let ref = firebaseStorage.collection('products').doc(docID).update(
			{
				thumb_img: firebase.firestore.FieldValue.arrayUnion(img)

			}).then(() =>
			{
				Notify.create(
				{
					message: 'Image Added Successfully',
					color: 'green'
				});
				this.step = 3;
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
		openProduct: function()
		{
			this.$router.push(
			{
				name: 'AdminProducts'
			})

		}
	}
};

</script>
