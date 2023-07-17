import { Position } from "../../models/Position";
import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied } from "./GeneralRules";

export const rookMove = (prevX, prevY, currX, currY, team, boardState) => {
    if(currX === prevX){
        console.log("Moving vertically");

        for(let i = 1; i<8; i++){
            let multiplyer = (currY<prevY) ? -1 : 1;

            let passedX = prevX;
            let passedY = prevY + (multiplyer*i);
            console.log(`x: ${passedX}, y: ${passedY}`);
            if(passedX === currX && passedY === currY){
                if(tileIsEmptyOrOccupiedByOponent(passedX, passedY, boardState, team)){
                    console.log("Arrived!");
                    return true;
                }
            } else { // dealing with the passing tile
                if(tileIsOccupied(passedX, passedY, boardState)){
                    console.log("illegal move!!");
                    break
                }
            }
        }
    }
    if(currY === prevY){
        console.log("Moving Horizontally");

        for(let i = 1; i<8; i++){
            let multiplyer = (currX<prevX) ? -1 : 1;

            let passedX = prevX + (multiplyer*i);
            let passedY = prevY;
            console.log(`x: ${passedX}, y: ${passedY}`);
            if(passedX === currX && passedY === currY){
                if(tileIsEmptyOrOccupiedByOponent(passedX, passedY, boardState, team)){
                    console.log("Arrived")
                    return true;
                }
            } else { // dealing with the passing tile
                if(tileIsOccupied(passedX, passedY, boardState)){
                    console.log("illegal move!!");
                    break
                }
            }
        }
    }

    return false;
}

export const getPossibleRookMoves = (rook, boardState) => {
    let possibleMoves = [];

    // UP
    for(let i = 1; i<8; i++){
        if(rook.posY + i > 7) break;

        const destination = new Position(rook.posX, rook.posY + i);
        
        if(!tileIsOccupied(rook.posX, rook.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(rook.posX, rook.posY + i, boardState, rook.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // DOWN
    for(let i = 1; i<8; i++){
        if(rook.posY - i < 0) break;

        const destination = new Position(rook.posX, rook.posY - i);

        if(!tileIsOccupied(rook.posX, rook.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(rook.posX, rook.posY - i, boardState, rook.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // RIGHT
    for(let i = 1; i<8; i++){
        if(rook.posX + i > 7) break;

        const destination = new Position(rook.posX + i, rook.posY);

        if(!tileIsOccupied(rook.posX + i, rook.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(rook.posX + i, rook.posY, boardState, rook.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // LEFT
    for(let i = 1; i<8; i++){
        if(rook.posX - i < 0) break;

        const destination = new Position(rook.posX - i, rook.posY);

        if(!tileIsOccupied(rook.posX - i, rook.posY, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(rook.posX - i, rook.posY, boardState, rook.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}