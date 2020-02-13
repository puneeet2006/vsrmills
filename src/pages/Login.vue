<template>
	<q-page class="admin-login-bg">
		<div class="q-pa-md ">
			<div class="admin-login absolute-center">
				<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md ">
					<q-card class="q-pa-md card-top-border ">
						<div class="text-h5 text-primary">VSR Admin Login</div>
						<q-separator class="mtt-20 mbb-20" />
						<q-input filled v-model="form.email" label="Email *" type="email" autofocus lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Email']" />
						<q-input filled class="mtt-10" type="password" v-model="form.password" label="Password *" lazy-rules :rules="[
        		val => val && val.length > 0 || 'Please Enter Password']" />
						<div class="flex justify-end">
							<q-btn label="Submit" :loading="loading" type="submit" color="primary" />
							<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
						</div>
					</q-card>
				</q-form>
			</div>
		</div>
	</q-page>
</template>
<script>
import
{
	firebaseAuth
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
			form:
			{
				email: null,
				password: null,
			},
			loading: false,
		}
	},

	methods:
	{
		onSubmit()
		{
			this.loading = true;
			firebaseAuth.signInWithEmailAndPassword(this.form.email, this.form.password)
				.then(data =>
				{
					let userState = this.$store.dispatch('global/checkUserState');

					this.$router.replace(
					{
						name: "Dashboard"
					});
				})
				.catch(err =>
				{
					console.log(err.message)
					this.error = err.message;
					this.loading = false;
					Notify.create(
					{
						message: 'Error in logging. Check Username and Password',
						color: 'red'
					});
				});
		},

		onReset()
		{
			this.form.email = null
			this.form.password = null
		}
	}
};

</script>
