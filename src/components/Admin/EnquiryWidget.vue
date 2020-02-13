<template>
	<div>
		<div class="q-pa-md">
			<div class="row flex flex-center">
				<q-card class="q-pa-md shadow-20 card-top-border  col-md-6">
					<q-list>
						<div v-for="item in enq_data">
							<q-item>
								<q-item-section>
									<q-item-label class="text-uppercase text-primary fw-600">Name : {{ item.name}}</q-item-label>
									<q-item-label lines="1">Product: <span class="text-positive"><b>{{ item.product }}</b></span></q-item-label>
									<q-item-label lines="2">Mobile: {{ item.mobile }}</q-item-label>
									<q-item-label lines="3">Email: {{ item.email }}</q-item-label>
									<q-item-label caption>Desc: {{ item.desc }}</q-item-label>
								</q-item-section>
								<q-item-section side top>
									<q-item-label caption class="text-negative">{{ item.time|formatTime }}</q-item-label>
									<q-btn color="negative" class="mtt-10" dense size="sm" icon="delete" @click="deleteEnquiry(item.id)" />
								</q-item-section>
							</q-item>
							<q-separator spaced inset class="mtt-10 mbb-10" />
						</div>
					</q-list>
				</q-card>
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
import
{
	format,
	formatDistance
}
from 'date-fns'
export default
{
	data()
	{
		return {
			enq_data: [],
		}

	},
	created()
	{
		this.initEnquiries();
	},
	filters:
	{
		formatTime: function(value)
		{
			return formatDistance(new Date(value), new Date(),
			{
				includeSeconds: true,
				addSuffix: true
			})
		}
	},

	methods:
	{
		initEnquiries: function()
		{
			let enquiryCollection = firebaseStorage.collection('enquiry').get()
				.then(querySnapshot =>
				{
					let data = querySnapshot.docs.map(

						doc =>
						{
							let qData = doc.data()
							qData.id = doc.id;
							return qData;
						}

					);

					let a_sort = data.sort(function(a, b)
					{
						return new Date(b.time) - new Date(a.time);
					});
					this.enq_data = a_sort;
				})
				.catch(err =>
				{
					console.log('Error getting document', err);
				});
		},
		deleteEnquiry: function(id)
		{
			var deleteQuery = firebaseStorage.collection('enquiry').doc(id).delete()
			this.initEnquiries();
		}
	}
};

</script>
