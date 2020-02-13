export function SET_LOGGED_IN(state, value)
{
	state.user.loggedIn = value;
}

export function SET_USER(state, data)
{
	state.user.data = data;
}


export function SET_ENQ_FORM_SHOW(state, data)
{
	state.enq_form_show = data;
}

export function SET_ENQ_FORM_SUBMITTED(state, data)
{
	state.enq_form_submitted = data;
}

export function SET_CURRENT_EXP(state, data)
{
	state.current_exp = data;
}
