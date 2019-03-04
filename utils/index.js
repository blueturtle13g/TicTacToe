import {
    EMPTY,
    PC,
    USER,
    DRAW,
    SINGLE,
    TRIPLE,
    DOUBLE,
} from "../actions/types";

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

export const whoWon = (blocks, user_sign, pc_sign)=>{
    let winner = false;
    winConditions.forEach(winCondition=>{
        let user_blocks = 0;
        let pc_blocks = 0;
        winCondition.forEach(id=>{
            if(blocks[id].condition === user_sign) user_blocks++;
            if(blocks[id].condition === pc_sign) pc_blocks++;
        });

        switch (user_blocks){
            case 3:
                winCondition.forEach(id=>{
                    blocks[id].color = TRIPLE;
                });
                winner = USER;
                break;
            case 2:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === user_sign && blocks[id].color !== TRIPLE) blocks[id].color = DOUBLE;
                });
        }

        switch (pc_blocks){
            case 3:
                winCondition.forEach(id=>{
                    blocks[id].color = TRIPLE;
                });
                winner = PC;
                break;
            case 2:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === pc_sign && blocks[id].color !== TRIPLE) blocks[id].color = DOUBLE;
                });
        }
    });
    return [winner, blocks];
};

export const genBlocks = number=>{
    let generatedBlocks = [];
    for(let i=0; i < number; i++){
        generatedBlocks.push({id: i, condition: EMPTY, color: SINGLE});
    }
    return generatedBlocks;
};

export const chooseTheBlock = (blocks, user_sign, pc_sign)=>{
    let first_priority_pc = [];
    let second_priority_pc = [];
    let first_priority_user = [];
    let second_priority_user = [];

    winConditions.map(winCondition=>{
        let user_blocks = 0;
        let pc_blocks = 0;
        winCondition.map(id=>{
            if(blocks[id].condition === user_sign) user_blocks++;
            if(blocks[id].condition === pc_sign) pc_blocks++;
        });

        switch (pc_blocks){
            case 2:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === EMPTY) first_priority_pc.push(id);
                });
                break;

            case 1:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === EMPTY) second_priority_pc.push(id);
                });
        }
        switch (user_blocks){
            case 2:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === EMPTY) first_priority_user.push(id);
                });
                break;

            case 1:
                winCondition.forEach(id=>{
                    if(blocks[id].condition === EMPTY) second_priority_user.push(id);
                });
        }
    });

    if(!!first_priority_pc.length){
        return blocks[first_priority_pc[0]].id
    }

    if(!!first_priority_user.length){
        return blocks[first_priority_user[0]].id
    }

    if(!!second_priority_pc.length){
        return blocks[second_priority_pc[0]].id
    }

    if(!!second_priority_user.length){
        return blocks[second_priority_user[0]].id
    }

    for(let i=0; i<9; i++){
        if(blocks[i].condition === EMPTY){
            return blocks[i].id
        }
    }

    return DRAW;
};