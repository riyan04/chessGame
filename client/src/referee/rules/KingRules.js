import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied } from "./GeneralRules";

export const kingMove = (prevX, prevY, currX, currY, team, boardState) => {
    // DIAGONAL / VERTIAL / HORIZONTAL
    console.log("KING Movement!");

    let multiplyerX = (currX < prevX) ? -1 : (currX > prevX) ? 1 : 0;
    let multiplyerY = (currY < prevY) ? -1 : (currY > prevY) ? 1 : 0;

    let passedX = prevX + (1*multiplyerX);
    let passedY = prevY + (1*multiplyerY);
    // iff the tile is destination
    if(passedX === currX && passedY === currY){
        if(tileIsEmptyOrOccupiedByOponent(passedX, passedY, boardState, team)){
            return true;
        }
    } else { // dealing with the passing tile
        if(tileIsOccupied(passedX, passedY, boardState)){
            console.log("illegal move!!");
            return false;
        }
    }

    return false;
}

export const getPossibleKingMoves = (king, boardState) => {
    let possibleMoves = [];

    // TOP-RIGHT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX + i, posY: king.posY + i};
        if(!tileIsOccupied(king.posX + i, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // TOP-LEFT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX - i, posY: king.posY + i};
        if(!tileIsOccupied(king.posX - i, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-RIGHT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX + i, posY: king.posY - i};
        if(!tileIsOccupied(king.posX + i, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-LEFT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX - i, posY: king.posY - i};
        if(!tileIsOccupied(king.posX - i, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // UP
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX, posY: king.posY + i};
        if(!tileIsOccupied(king.posX, king.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX, king.posY + i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // DOWN
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX, posY: king.posY - i};
        if(!tileIsOccupied(king.posX, king.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX, king.posY - i, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // RIGHT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX + i, posY: king.posY};
        if(!tileIsOccupied(king.posX + i, king.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX + i, king.posY, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // LEFT
    for(let i = 1; i<2; i++){
        const destination = {posX: king.posX - i, posY: king.posY};
        if(!tileIsOccupied(king.posX - i, king.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(king.posX - i, king.posY, boardState, king.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves
}