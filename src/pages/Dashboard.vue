<template>
	<q-page class="page-q" padding>
		<div class="flex flex-center text-h4 mtt-40 text-primary">
			Admin Dashboard
		</div>
		<div class="mtt-40 ">
			<div class="row flex flex-center">
				<div class="col-md-3 q-pa-md" v-for="item in dash_card_items">
					<q-card bordered class="admin-main-card  shadow-20">
						<img class="dashboard-img" :src="item.imgsrc">
						<q-card-section>
							<div class="text-h6">{{ item.title}}</div>
						</q-card-section>
						<q-card-actions align="right">
							<q-btn color="primary" :to="item.btnlink">{{ item.btnlabel }}</q-btn>
						</q-card-actions>
					</q-card>
				</div>
			</div>
		</div>
		<div class="flex flex-center text-h4 mtt-40">
			Recent Enquiries
		</div>
		<div class="mtt-40">
			<EnquiryWidget />
		</div>
	</q-page>
</template>
<script>
import EnquiryWidget from './../components/Admin/EnquiryWidget.vue'
export default
{
	components:
	{
		EnquiryWidget
	},
	data()
	{
		return {
			dash_card_items: [
				{
					title: "First Section Carosuel Edit",
					imgsrc: "https://cdn.quasar.dev/img/mountains.jpg",
					btnlink: "/admin/carosuel",
					btnlabel: "Edit Carosuel"
				},
				{
					title: "Add Products",
					imgsrc: "https://cdn.quasar.dev/img/parallax1.jpg",
					btnlink: "/admin/addproduct",
					btnlabel: "Add Products"
				},
				{
					title: "Edit Products",
					imgsrc: "https://cdn.quasar.dev/img/parallax2.jpg",
					btnlink: "/admin/products",
					btnlabel: "Edit Products"
				},
				{
					title: "Rolling Mills Parts",
					imgsrc: "https://placeimg.com/500/300/nature",
					btnlink: "/admin/productparts",
					btnlabel: "Add/Edit"
				}


			]
		}
	}
};

</script>
