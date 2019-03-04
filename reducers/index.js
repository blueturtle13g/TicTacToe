import {
    DRAW,
    UPDATE_BLOCK,
    RESTART,
    TOGGLE_SIGNS
} from "../actions/types";
import { whoWon, genBlocks } from '../utils';

const INITIAL_STATE = {
    blocks: genBlocks(9),
    winner: false,
    user_sign: "cross",
    pc_sign: "circle",
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case RESTART:
            return {...state, blocks: genBlocks(9), winner: false};

        case TOGGLE_SIGNS:
            return {...state, blocks: genBlocks(9), user_sign: state.pc_sign, pc_sign: state.user_sign, winner: false};

        case UPDATE_BLOCK:
            let { key, value} = action.payload;
            let new_blocks = [...state.blocks];
            if(key === DRAW) return {...state, winner: "draw"};
            if(!new_blocks[key] || state.winner) return {...state};
            new_blocks[key].condition = value;
            const returned_state = whoWon(new_blocks, state.user_sign, state.pc_sign);
            return {...state, winner: returned_state[0], blocks: returned_state[1]};

        default: return state;
    }
}