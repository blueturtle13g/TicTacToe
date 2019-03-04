import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';

import { chooseTheBlock } from '../utils';
import { updateBlock} from '../actions';
import {CIRCLE, CROSS, EMPTY} from "../actions/types";

const w = Dimensions.get("screen");

class Block extends Component {
    render() {
        const { block, updateBlock, store:{ blocks, winner, user_sign, pc_sign } } = this.props;
        return (
            <TouchableOpacity
                style={[
                    styles.container,
                    (block.id === 0) && {borderTopWidth: 0},
                    (block.id > 0 && block.id < 2) && {borderTopWidth: 0},
                    (block.id > 5) && {borderBottomWidth: 0},
                    (block.id === 2) && {borderTopWidth: 0,borderRightWidth: 0},
                    (
                        block.id === 0
                        ||
                        block.id === 3
                        ||
                        block.id === 6
                    ) && {borderLeftWidth: 0},
                    (
                        block.id === 2
                        ||
                        block.id === 5
                        ||
                        block.id === 8
                    ) && {borderRightWidth: 0}
                ]}
                onPress={()=>{
                    if(block.condition === EMPTY && !winner){
                        updateBlock({key: block.id, value: user_sign});
                        updateBlock({key: chooseTheBlock(blocks, user_sign, pc_sign), value: pc_sign});
                    }
                }}
            >
                {block.condition === CROSS &&(
                    <Animatable.View animation="bounceIn" iterationCount={1}>
                        <Entypo name={"cross"} color={block.color} size={80}/>
                    </Animatable.View>
                )}
                {block.condition === CIRCLE &&(
                    <Animatable.View animation="bounceIn" iterationCount={1}>
                        <Entypo name={"circle"} color={block.color} size={70}/>
                    </Animatable.View>
                )}

            </TouchableOpacity>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateBlock}
)(Block);

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        width: "33%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    }
});
