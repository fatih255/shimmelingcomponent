import React, { Component } from 'react';
import { Text, Dimensions, View } from 'react-native';
import Shimmering from './Shimmering';

export class App extends Component {
	render() {
		return (
			<View style={{ backgroundColor:'#0097ff',flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
				<Shimmering
					wrapperStyle={{
						width: 150,
						height: 50,
						borderRadius: 500,
					}}
          duration={250}
				/>

				<Shimmering
					wrapperStyle={{
						width: 250,
						height: 250,
						borderRadius: 50,
						marginTop: 25
					}}
          duration={500}
				/>
			</View>
		);
	}
}

export default App;
