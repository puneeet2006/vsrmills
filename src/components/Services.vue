<template>
	<div class="q-pa-xl">
		<div class="q-pa-md text-center text-h2">
			Services
		</div>
		<div class=" text-center text-grey text-body1">
			With {{ current_exp }}+ years of experience. We provide excellent services in following fields
		</div>
		<div class="row justify-center q-gutter-md">
			<div class="col-md-3 col-sm-12 col-xs-12 mtt-70" v-for="(service,index) in services" :key="index">
				<q-card class="services-card text-primary shadow-20">
					<div class="">
						<q-icon class="service-icon service-icon-top text-center text-primary" size="8em" :name="service.icon" style="" />
						<q-card-section class="services-card-section w-100" style="">
							<div class="col text-center ">
								<q-icon class="service-icon text-center" :name="service.icon" />
								<div class="text-body1" v-html="service.title"></div>
							</div>
						</q-card-section>
					</div>
				</q-card>
			</div>
		</div>
	</div>
</template>
<script>
import
{
	mapGetters
}
from "vuex";
export default
{

	computed:
	{
		...mapGetters(
		{
			current_exp: "global/getCurrenctExp"
		})
	},
	data()
	{
		return {
			services: [
			{
				title: 'Key/Consultancy for setting up complete plants ',
				icon: 'fas fa-handshake',
				to: ''
			},
			{
				title: 'Melting and casting plants for copper and copper alloys',
				icon: 'fas fa-hard-hat',
				to: ''
			},
			{
				title: 'Non Ferrous Rolling Plants',
				icon: 'fas fa-toolbox',
				to: ''
			},
			{
				title: 'Extrusion plants for copper & copper alloy product',
				icon: 'fas fa-hammer',
				to: ''
			},
			{
				title: 'Engineering Services',
				icon: 'fas fa-tools',
				to: ''
			}, ],
		}
	}
};

</script>
