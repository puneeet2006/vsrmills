<template>
	<div>
		<div class="q-pa-md">
			<div class="text-h5 text-center text-primary mbb-20 mtt-20">Edit About Us</div>
			<div class="row flex flex-center">
				<q-card class="q-pa-md shadow-20 card-top-border col-md-9 w-85">
					<div>
						<q-editor v-model="editor" min-height="5rem" />
					</div>
					<div class="mtt-20 row flex justify-end">
						<q-btn size="sm" color="primary" icon="check" :loading="loading" label="Save" @click="saveAbout()" />
					</div>
				</q-card>
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
export default
{

	data()
	{
		return {
			editor: null,
			loading: false
		}
	},
	mounted()
	{
		let about_data = firebaseStorage.collection('about').get()
			.then(querySnapshot =>
			{
				let aboutData = querySnapshot.docs.map(doc => doc.data())
				this.editor = aboutData[0].text;
			})
			.catch(err =>
			{
				console.log('Error getting document', err);
				//this.carosuel_loader = false;

			});
	},
	methods:
	{
		saveAbout: function()
		{
			this.loading = true;
			let data = this.editor;
			let docID = 'about';
			if (data)
			{
				firebaseStorage.collection('about').doc(docID).update(
				{
					"text": data
				}).then(() =>
				{
					Notify.create(
					{
						message: 'Saved Successfully',
						color: 'green'
					});

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
	}

};

</script>
