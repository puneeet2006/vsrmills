<template>
	<div class="q-pa-xl">
		<div class="q-pa-md text-center mbb-20 text-h2">
			About
		</div>
		<div class="row justify-center mtt-20">
			<q-card class="bg-white w-85 q-pa-md ">
				<q-card-section class="q-pa-sm text-center text-body1 " style="word-wrap: break-word;">
					<div class="mbb-10 text-center text-grey">
						<q-avatar size="200px">
							<img src="/statics/founder.jpg">
						</q-avatar>
					</div>
					<div class="mbb-30 text-center text-grey text-body1">
						{{ appName }} by founded by <b>Mr. S.S. VAIDYA</b>
					</div>
					<div v-html="about_data"></div>
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>
<script>
import
{
	firebaseStorage
}
from 'boot/firebase'
export default
{
	data()
	{
		return {
			slide: 1,
			about_data: null,
			appName: process.env.APP_NAME,
		}

	},
	mounted()
	{
		let about_data = firebaseStorage.collection('about').get()
			.then(querySnapshot =>
			{
				let aboutData = querySnapshot.docs.map(doc => doc.data())
				this.about_data = aboutData[0].text;
			})
			.catch(err =>
			{
				console.log('Error getting document', err);
				//this.carosuel_loader = false;

			});
	}


};

</script>
