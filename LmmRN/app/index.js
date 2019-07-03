import React, {PureComponent} from 'react';
import{ 
	View
} from 'react-native';
import Toast, {DURATION} from './component/LmmToast'
import AppWithNavigationState from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';
import LmmLoading from './component/LmmLoading'


class rootApp extends PureComponent {

	componentDidMount(){
		let self = this;
		global.showLoading = self.showLoading;
		global.hideLoading = self.hideLoading;
		global.toast = self.toast;
	}

	showLoading = () => {
		this.Loading.show();
	}

	hideLoading = () => {
		this.Loading.close();
	}

	toast = (msg) => {
		this.refs.toast.show(msg);
	}

	render() {
		return (<View style={{flex:1}}>
					<View style={{flex:1}}>
						<AppWithNavigationState 
						 	ref={navigatorRef => {
								NavigationService.setTopLevelNavigator(navigatorRef);
						  	}}
						/>
					</View>	
                    <LmmLoading ref={r=>{this.Loading = r}} hide = {true} /> 
					<Toast ref="toast" taxtStyle={{fontSize:20}} position="center" />
                </View>
		   )
	}
}


export default rootApp;