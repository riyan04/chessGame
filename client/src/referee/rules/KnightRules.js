import { tileIsEmptyOrOccupiedByOponent } from "./GeneralRules";

export const knightMove = (prevX, prevY, currX, currY, team, boardState) => {
    // 8 different movement pattern

    for(let i = -1; i<2; i+=2){
        for(let j = -1; j<2; j+=2){

            // TOP/BOTTOM line
            if(currY - prevY == 2*i){
                if(currX - prevX === j){
                    if(tileIsEmptyOrOccupiedByOponent(currX, currY, boardState, team)){
                        return true;
                    }
                    console.log("top/bottom left/right knight move");
                }
            }
            // RIGHT/LEFT line
            if(currX - prevX === 2*i){
                if(currY - prevY === j){
                    if(tileIsEmptyOrOccupiedByOponent(currX, currY, boardState, team)){
                        return true;
                    }
                    console.log("right/left top/bottom knight move");
                }
            }
        }
    }
    return false;
}

export const getPossibleKnightMoves = (knight, boardState) => {
    const possibleMoves = [];
    for(let i = -1; i<2; i+=2){
        for(let j = -1; j<2; j+=2){
            const verticalMove = {posX: knight.posX + j, posY: knight.posY + (i*2)};
            const horizontalMove = {posX: knight.posX + (i*2), posY: knight.posY + j}
            if(tileIsEmptyOrOccupiedByOponent(knight.posX + j, knight.posY + (i*2), boardState, knight.teamType)){
                possibleMoves.push(verticalMove);
            }
            if(tileIsEmptyOrOccupiedByOponent(knight.posX + (i*2), knight.posY + j, boardState, knight.teamType)){
                possibleMoves.push(horizontalMove);
            }
        }
    }
    return possibleMoves;
}