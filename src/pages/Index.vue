<template>
	<div>
		<div v-if="pageLoader == true" class="fixed-center">
			<q-spinner-gears color="primary" size="6em" />
			<q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
		</div>
		<div v-if="pageLoader == false">
			<q-page class="page-q">
				<Carosuel />
				<Products />
				<q-separator class="mtt-20 mbb-20" inset color="primary" />
				<Services />
				<q-separator class="mtt-20 mbb-20" inset color="primary" />
				<AboutUs />
				<q-separator class="mtt-20 mbb-20" inset color="primary" />
				<Contact />
				<Enquiry />
				<div class="text-center">
					<q-card>
						Developed By: <a href="https://puneetkushwah.com/" target="_blank">Puneet Kushwah</a>
					</q-card>
				</div>
			</q-page>
		</div>
	</div>
</template>
<script>
import Carosuel from '../components/Carosuel.vue'
import Products from '../components/Products.vue'
import Services from '../components/Services.vue'
import AboutUs from '../components/AboutUs.vue'
import Contact from '../components/Contact.vue'
import Enquiry from '../components/Enquiry.vue'
export default
{
	name: 'PageIndex',
	components:
	{
		Carosuel,
		Products,
		Services,
		AboutUs,
		Contact,
		Enquiry
	},
	data()
	{
		return {
			pageLoader: true,
		}
	},
	created()
	{

		this.hideLoader();
	},
	methods:
	{
		hideLoader: function()
		{
			setTimeout(() =>
			{
				this.pageLoader = false;
			}, 2000);
		}
	}
};

</script>
