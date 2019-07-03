import React, {PureComponent} from 'react';
import{ 
} from 'react-native';
import {Provider} from 'react-redux'
import store from './store/config-store'

import AppWithNavigationState from './navigatorApp/rootApp'


store.subscribe(() =>
  console.log(store.getState())
);

class rootApp extends PureComponent {
	render() {
		return (
			<Provider store={store}>
               <AppWithNavigationState />
            </Provider>
		   )
	}
}
export default rootApp;