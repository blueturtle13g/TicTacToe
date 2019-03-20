import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import * as Animatable from 'react-native-animatable';

import { toggleSigns, restart } from '../actions';
import Block from './Block';
import {
    CIRCLE,
    CROSS
} from "../actions/types";

class Game extends Component {

    renderWinner = winner=>{
        switch (winner){
            case "user":
                return(
                    <Animatable.View
                        animation="zoomIn"
                        iterationCount={1}
                        style={styles.winnerCon}
                    >
                        <Text style={[styles.text, { marginRight: 5}]}>You Won!</Text>
                        <MaterialCommunityIcons name={"trophy"} size={45} color={"#5a5a5a"}/>
                    </Animatable.View>
                );
            case "pc":
                return(
                    <Animatable.View
                        animation="zoomIn"
                        iterationCount={1}
                        style={styles.winnerCon}
                    >
                        <Text style={[styles.text, { marginRight: 5}]}>You Lost!</Text>
                        <MaterialCommunityIcons name={"trophy-broken"} size={45} color={"#5a5a5a"}/>
                    </Animatable.View>
                );
            case "draw":
                return(
                        <Animatable.View
                            animation="zoomIn"
                            iterationCount={1}
                            style={styles.winnerCon}
                        >
                        <Text style={[styles.text, { marginRight: 5}]}>Draw!</Text>
                        <FontAwesome5 name={"handshake"} size={50} color={"#5a5a5a"}/>
                    </Animatable.View>
                )
        }
    };

    render() {
        const { store:{ blocks, winner, user_sign}, toggleSigns, restart } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.blocksCon}>
                    {blocks.map(block=><Block key={block.id} block={block}/>)}
                </View>
                {this.renderWinner(winner)}
                <View style={styles.optionsCon}>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={()=>{
                            if(user_sign !== CROSS) toggleSigns();
                        }}
                    >
                        <Entypo name={"cross"} size={55} color={user_sign === CROSS ? "#2b2b2b" : "#fff"}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={restart}
                    >
                        <Foundation name={"refresh"} size={40} color={"#205370"}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={()=>{
                            if(user_sign === CROSS) toggleSigns();
                        }}
                    >
                        <Entypo name={"circle"} size={40} color={user_sign === CIRCLE ? "#2b2b2b" : "#fff"}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {toggleSigns, restart}
)(Game);

const styles = StyleSheet.create({
    container:{
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    blocksCon:{
        width: "95%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10
    },
    optionsCon:{
        backgroundColor: "#0090ad",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        width: "60%",
        marginBottom: 2,
        height: 50,
        borderRadius: 25
    },
    text:{
        fontSize: 25,
        textAlign: "center"
    },
    option:{
        flex: .5,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    winnerCon:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
});
