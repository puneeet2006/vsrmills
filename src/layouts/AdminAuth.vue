<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="drawer = !drawer" />
				<q-toolbar-title>
					<q-btn stretch class="app-name" flat size="0.9em" :label="appName" to="/" />
				</q-toolbar-title>
				<!--<q-btn stretch flat v-for="(item,index) in navbaritems" :key="index" :label="item.label" :to="item.to" />-->
				<q-btn stretch flat label="Dashboard" to="/admin/dashboard" />
				<q-btn stretch flat label="LogOut" @click="logout()" />
			</q-toolbar>
		</q-header>
		<q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" :width="200" :breakpoint="500" bordered content-class="bg-grey-3">
			<q-scroll-area class="fit">
				<q-list padding>
					<q-item clickable v-ripple v-for="(item,index) in draweritems" :key="index" :to="item.to">
						<q-item-section avatar>
							<q-icon :name="item.icon" />
						</q-item-section>
						<q-item-section>
							{{ item.label }}
						</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>
		</q-drawer>
		<q-page-container>
			<router-view />
			<back-to-top :visibleoffset="100">
				<q-btn round color="primary" icon="expand_less" />
			</back-to-top>
		</q-page-container>
	</q-layout>
</template>
<script>
import
{
	firebaseAuth
}
from 'boot/firebase'
import
{
	mapGetters
}
from "vuex";
import BackToTop from 'vue-backtotop'

export default
{
	components:
	{
		BackToTop
	},
	data()
	{
		return {
			drawer: false,
			miniState: true,
			left: true,
			appName: null,
			draweritems: [
			{
				label: 'Dashboard',
				to: '/admin/dashboard',
				icon: 'fas fa-home'
			},
			{
				label: 'Carosuel',
				to: '/admin/carosuel',
				icon: 'fas fa-clone'
			},
			{
				label: 'Products',
				to: '/admin/products',
				icon: 'fas fa-tachometer-alt'
			},
			{
				label: 'Add Product',
				to: '/admin/addproduct',
				icon: 'fas fa-images'
			},
			{
				label: 'Mills Parts',
				to: '/admin/productparts',
				icon: 'fas fa-pencil-ruler'
			},
			{
				label: 'Enquiry',
				to: '/admin/enquiry',
				icon: 'fas fa-headset'
			},
			{
				label: 'Edit About',
				to: '/admin/about',
				icon: 'fas fa-edit'
			}, ]
		}
	},
	computed:
	{
		...mapGetters(
		{
			user: "global/user"
		})
	},
	mounted()
	{
		this.appName = process.env.APP_NAME;
	},
	created()
	{
		this.initCheckLogin();
	},
	methods:
	{
		initCheckLogin: function()
		{
			let x = this.$store.dispatch('global/checkUserState');
			if (this.user.loggedIn == false)
			{
				this.$router.push(
				{
					name: 'AdminLogin',
				})
			}
		},
		logout()
		{
			firebaseAuth
				.signOut()
				.then(() =>
				{
					this.$router.replace(
					{
						name: "AdminLogin"
					});
				});
		}
	}
};

</script>
