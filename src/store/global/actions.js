import
{
	firebaseStorage
}
from 'boot/firebase'
import
{
	getYear
}
from 'date-fns'
import * as firebase from "firebase/app";


export function fetchUser(
{
	commit
}, user)
{
	commit("SET_LOGGED_IN", user !== null);
	if (user)
	{
		commit("SET_USER",
		{

			displayName: 'ADMIN',
			email: user.email
		});
	}
	else
	{
		commit("SET_USER", null);
	}
}

export function checkUserState(context)
{

	firebase.auth().onAuthStateChanged(user =>
	{
		context.dispatch("fetchUser", user);
	});

}

export function processCurrentYear(context)
{
	let devYear = context.state.app_dev_year;
	let totalExp = context.state.total_exp;

	let currentYear = getYear(new Date());

	let yearsExp = currentYear - devYear;

	let finalYearExp = parseInt(totalExp) + parseInt(yearsExp);

	context.commit("SET_CURRENT_EXP", finalYearExp);
}
