import {
    RESTART,
    UPDATE_BLOCK,
    TOGGLE_SIGNS
} from "./types";

export const restart = ()=>{
    return{
        type: RESTART
    }
};

export const toggleSigns = ()=>{
    return{
        type: TOGGLE_SIGNS
    }
};

export const updateBlock = payload=>{
    return{
        type: UPDATE_BLOCK,
        payload
    }
};