import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import global from './global'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function( /* { ssrContext } */ )
{
	const Store = new Vuex.Store(
	{
		modules:
		{
			global
			// example
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})

	if (process.env.DEV && module.hot)
	{
		module.hot.accept(['./global'], () =>
		{
			const newTest = require('./global').default
			Store.hotUpdate(
			{
				modules:
				{
					global: newTest
				}
			})
		})
	}

	return Store
}
