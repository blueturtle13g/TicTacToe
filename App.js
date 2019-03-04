import React from "react";
import {
    View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import SplashScreen from 'react-native-splash-screen';

import Game from './components/Game';

export default class App extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Provider store={createStore(reducers)}>
                    <Game/>
                </Provider>
            </View>
        )
    }
}