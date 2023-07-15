import { tileIsEmptyOrOccupiedByOponent, tileIsOccupied } from "./GeneralRules";

export const bishopMove = (prevX, prevY, currX, currY, team, boardState) => {
    // Up-Right movement

        // we can't do this
        // if(Math.abs(currX - prevX) === Math.abs(currY - prevY)){
        //     console.log("bishop single up-right move");
        // }

    // we've to use for loop

    for(let i = 1; i<8; i++){
        let multiplyerX = (currX < prevX) ? -1 : 1;
        let multiplyerY = (currY < prevY) ? -1 : 1;

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
        // *******EXTENDED LOGIC FOR THE ABOVE CODE*******

            // // check if passed tile is occupied
            // if(this.tileIsOccupied(passedX, passedY, boardState)){
            //     // if yes then check if it's occupied by the opponent
            //     if(this.tileIsOccupiedByOpponent(passedX, passedY, boardState, team) && (passedX === currX && passedY === currY)){
            //         console.log("advance and attack!!");
            //         return true;
            //     } else{
            //         console.log("illegal move!!");
            //         break;
            //     }
            // }
            // if(passedX === currX && passedY === currY){
            //     console.log("same passed and desired position");
            //     return true;
            // }
                
            // *******END*******
    }
    return false;
}

export const getPossibleBishopMoves = (bishop, boardState) => {
    let possibleMoves = [];

    // TOP-RIGHT
    for(let i = 1; i<8; i++){
        const destination = {posX: bishop.posX + i, posY: bishop.posY + i};
        if(!tileIsOccupied(bishop.posX + i, bishop.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(bishop.posX + i, bishop.posY + i, boardState, bishop.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    // TOP-LEFT
    for(let i = 1; i<8; i++){
        const destination = {posX: bishop.posX - i, posY: bishop.posY + i};
        if(!tileIsOccupied(bishop.posX - i, bishop.posY + i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(bishop.posX - i, bishop.posY + i, boardState, bishop.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-RIGHT
    for(let i = 1; i<8; i++){
        const destination = {posX: bishop.posX + i, posY: bishop.posY - i};
        if(!tileIsOccupied(bishop.posX + i, bishop.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(bishop.posX + i, bishop.posY - i, boardState, bishop.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // BOTTOM-LEFT
    for(let i = 1; i<8; i++){
        const destination = {posX: bishop.posX - i, posY: bishop.posY - i};
        if(!tileIsOccupied(bishop.posX - i, bishop.posY - i, boardState)){
            possibleMoves.push(destination);
        } else if (tileIsEmptyOrOccupiedByOponent(bishop.posX - i, bishop.posY - i, boardState, bishop.teamType)){
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}