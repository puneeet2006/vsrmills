<template>
	<q-page padding>
		<div class="w-100">
			<div class="q-pa-md">
				<q-table :dense="$q.screen.lt.md" title="Carosuel" :data="data" :columns="columns" row-key="name">
					<template v-slot:body="props">
						<q-tr :props="props">
							<q-td key="slides" :props="props" class="text-primary">
								{{ props.row.slides }}
							</q-td>
							<q-td key="heading" :props="props">
								{{ props.row.heading }}
							</q-td>
							<q-td key="edit" :props="props">
								<q-btn outline size="sm" label="Edit Heading" color="primary" @click="openPrompt(props.row.edit,props.row.heading)" />
							</q-td>
							<q-td key="editimage" :props="props">
								<q-btn outline size="sm" color="secondary" label="Edit Image" @click="openImageForm(props.row.slides,props.row.editimage)" />
							</q-td>
						</q-tr>
					</template>
				</q-table>
			</div>
			<div>
				<div class="q-pa-md" v-if="image_form">
					<q-card>
						<q-card-section>
							<div class="text-h6 mbb-40 text-primary">Upload Image for {{edit_image_slide}}</div>
							<q-form @submit="submitImage" class="q-gutter-md">
								<q-input @change="onFileChange" filled dense type="file" class="mtt-10" />
								<div>
									<q-btn :loading="loading" label="Submit" type="submit" color="primary" />
								</div>
							</q-form>
						</q-card-section>
					</q-card>
				</div>
				<q-dialog v-model="prompt" persistent>
					<q-card bordered style="min-width: 350px">
						<q-card-section>
							<div class="text-h6">Edit Heading</div>
						</q-card-section>
						<q-card-section>
							<q-input dense :loading="loading" v-model="address" autofocus @keyup.enter="prompt = false" :rules="[
					          val => !!val || '* Required',
					          val => val.length <= 50 || 'Please use maximum 50 characters'
					        ]" />
						</q-card-section>
						<q-card-actions align="right" class="text-primary">
							<q-btn flat label="Cancel" v-close-popup />
							<q-btn flat label="Save" @click="saveHeading()" />
						</q-card-actions>
					</q-card>
				</q-dialog>
			</div>
		</div>
	</q-page>
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
export default
{
	data()
	{
		return {
			prompt: false,
			edit_heading_id: null,
			address: '',
			loading: false,
			edit_image_id: null,
			edit_image_slide: null,
			image_form: false,
			carousel_data: [],
			attachment:
			{
				name: null,
				file: null
			},
			columns: [
			{
				name: 'slides',
				label: 'Slides',
				field: 'slides'
			},
			{
				name: 'heading',
				label: 'Heading',
				field: 'heading'
			},
			{
				name: 'edit',
				label: 'Edit',
				field: 'edit'
			},
			{
				name: 'editimage',
				label: 'Edit Image',
				field: 'editimage'
			}],
			data: [],
		}

	},
	mounted()
	{
		this.initPage();
	},
	methods:
	{
		initPage: function()
		{

			let carosuelData = firebaseStorage.collection('carosuel').get()
				.then(querySnapshot =>
				{
					this.carousel_data = querySnapshot.docs.map(doc => doc.data());
					this.generateColumns();
				})
				.catch(err =>
				{
					console.log('Error getting document', err);
				});
		},
		generateColumns: function()
		{
			let cData = this.carousel_data;

			let tabledata = [];

			cData.forEach(function(value, i)
			{

				tabledata[i] = {
					'slides': 'Slide ' + (i + 1),
					'heading': value.heading,
					'edit': value.id,
					'editimage': value.id
				}
			});

			this.data = tabledata;

		},
		openPrompt: function(id, heading)
		{
			this.edit_heading_id = id;
			this.prompt = true;
			this.address = heading;
		},
		saveHeading: function()
		{
			this.loading = true;
			let data = this.address;
			let docID = this.edit_heading_id;
			if (data)
			{
				firebaseStorage.collection('carosuel').doc(docID).update(
				{
					"heading": data.toUpperCase()
				}).then(() =>
				{
					Notify.create(
					{
						message: 'Saved Successfully',
						color: 'green'
					});
					this.prompt = false;
					this.initPage();
				}).catch((error) =>
				{
					Notify.create(
					{
						message: 'Saving Error!',
						color: 'red'
					});
				});
			}
			this.loading = false;
		},
		openImageForm: function(slide, id)
		{
			this.image_form = true;
			this.edit_image_id = id;
			this.edit_image_slide = slide;
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


		},
		submitImage: function(e)
		{
			this.loading = true;
			const file = this.attachment.file;
			const name = this.attachment.name;
			let imgValidation = this.imageValidation();
			if (imgValidation)
			{
				firebaseImageStorage.ref('products/product_gallery/' + file.name).put(file)
					.then(response =>
					{
						response.ref.getDownloadURL().then((downloadURL) =>
							{
								this.updateImageRecord(downloadURL)
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

		},
		updateImageRecord: function(imgurl)
		{
			let docID = this.edit_image_id;
			firebaseStorage.collection('carosuel').doc(docID).update(
				{
					"img": imgurl
				}).then(() =>
				{
					Notify.create(
					{
						message: 'Image Uploaded Successfully',
						color: 'green'
					});
					this.loading = false;
					this.image_form = false;
				})
				.catch((error) =>
				{
					console.log(error);
					Notify.create(
					{
						message: 'Error in saving',
						color: 'red'
					})
					this.loading = false;
				})

		}
	}
};

</script>
