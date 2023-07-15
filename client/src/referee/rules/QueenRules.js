import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied } from "./GeneralRules";

export const queenMove = (prevX, prevY, currX, currY, team, boardState) => {

    for(let i = 1; i<8; i++){

        // DIAGONAL / VERTIAL / HORIZONTAL
        console.log("Queen DIAGONAL!");

        let multiplyerX = (currX < prevX) ? -1 : (currX > prevX) ? 1 : 0;
        let multiplyerY = (currY < prevY) ? -1 : (currY > prevY) ? 1 : 0;
        
        let passedX = prevX + (i*multiplyerX);
        let passedY = prevY + (i*multiplyerY);
        // iff the tile is destination
        if(passedX === currX && passedY === currY){
            if(tileIsEmptyOrOccupiedByOponent(passedX, passedY, boardState, team)){
                return true;
            }
        } else { // dealing with the passing tile
            if(tileIsOccupied(passedX, passedY, boardState)){
                console.log("illegal move!!");
                break;
            }
        }
    }

    return false;
}

export const getPossibleQueenMoves = (queen, boardState) => {
    let possibleMoves = [];

    // TOP-RIGHT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX + i, posY: queen.posY + i};
        if(!tileIsOccupied(queen.posX + i, queen.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX + i, queen.posY + i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // TOP-LEFT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX - i, posY: queen.posY + i};
        if(!tileIsOccupied(queen.posX - i, queen.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX - i, queen.posY + i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-RIGHT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX + i, posY: queen.posY - i};
        if(!tileIsOccupied(queen.posX + i, queen.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX + i, queen.posY - i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-LEFT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX - i, posY: queen.posY - i};
        if(!tileIsOccupied(queen.posX - i, queen.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX - i, queen.posY - i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // UP
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX, posY: queen.posY + i};
        if(!tileIsOccupied(queen.posX, queen.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX, queen.posY + i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // DOWN
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX, posY: queen.posY - i};
        if(!tileIsOccupied(queen.posX, queen.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX, queen.posY - i, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // RIGHT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX + i, posY: queen.posY};
        if(!tileIsOccupied(queen.posX + i, queen.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX + i, queen.posY, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // LEFT
    for(let i = 1; i<8; i++){
        const destination = {posX: queen.posX - i, posY: queen.posY};
        if(!tileIsOccupied(queen.posX - i, queen.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(queen.posX - i, queen.posY, boardState, queen.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves
}