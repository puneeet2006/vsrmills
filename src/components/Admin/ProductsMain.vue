<template>
	<div>
		<div v-if="pageLoader == true" class="fixed-center">
			<q-spinner-gears color="primary" size="6em" />
			<q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
		</div>
		<div v-if="pageLoader == false">
			<q-page padding>
				<div class="text-h2 text-center">Products</div>
				<div class="row mtt-20">
					<div class="col-md-4 col-sm-4 col-xs-12 q-pa-lg" style="margin:0 auto;" v-for="(item,index) in products_data" :key="index">
						<q-card bordered class="shadow-20 flex" style="width: 100%;height:100%">
							<img v-img:spimg :src="item.thumb_img" style="width: 100%;height:200px;margin-bottom:0 !important" :alt="item.name">
							</img>
							<q-card-section class="w-100 bg-primary text-white flex" style="height:auto">
								<div style="font-size:16px;" class="text-uppercase fw-400">{{ item.name }}</div>
							</q-card-section>
							<q-card-actions align="right" class="w-100">
								<div class="text-right">
									<q-btn outline class="mtt-10" color="primary" icon-right="edit" label="edit " @click="openProduct(item.id)"></q-btn>
								</div>
							</q-card-actions>
						</q-card>
					</div>
				</div>
			</q-page>
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
			products_data: [],
			pageLoader: true,
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
			this.pageLoader = true;
			let x = firebaseStorage.collection('products').get()
				.then(querySnapshot =>
				{
					this.products_data = querySnapshot.docs.map(doc => doc.data());
					this.products_data = this.products_data.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
					this.pageLoader = false;
				})
				.catch(err =>
				{
					this.pageLoader = false;
				});
		},
		openProduct: function(id)
		{
			this.$router.push(
			{
				name: 'AdminEditProduct',
				params:
				{
					id: id
				}
			})

		}
	}
};

</script>
