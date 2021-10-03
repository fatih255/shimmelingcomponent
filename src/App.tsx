import React, { Component } from 'react';
import { Text, Dimensions, View } from 'react-native';
import Shimmering from './Shimmering';

export class App extends Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Shimmering
					wrapperStyle={{
						width: 250,
						height: 250,
						borderRadius: 500
					}}
				
				/>

				<Shimmering
					wrapperStyle={{
						width: 250,
						height: 250,
						borderRadius: 50,
						marginTop: 25
					}}
				/>
			</View>
		);
	}
}

export default App;
